import type { AppDataType } from '../../types/data'
import { app } from 'electron'
import Path from 'path'
import { Common } from '../common'
import { checkDir, hasFile, writeFile, hash } from '../utils/files'
import { Http } from '../utils/request'

type FileLock = {
  [propName: string]: FileLockItem
}

type FileLockItem = {
  path: string
  hash: string
}

const github = {
  name: 'Capybara-sea',
  repo: 'yaedo-metadata',
  branch: 'latest',
}
const githubUrl = (path: string) =>
  `https://cdn.jsdelivr.net/gh/${github.name}/${github.repo}@${github.branch}/${path}`

export default class DataManager {
  private static instance: DataManager
  static init(): DataManager {
    if (DataManager.instance) return DataManager.instance
    DataManager.instance = new DataManager()
    console.log('[DataManager] initialized')
    return DataManager.instance
  }

  // 是否初始化
  public isInit: boolean = false
  public initialization: Promise<void>

  private appDataPath: string
  private fileLock: FileLock = {}
  private localFileLockPath: string

  private constructor() {
    this.appDataPath = Path.join(app.getPath('appData'), app.getName(), Common.APP_DATA_PATH)
    this.localFileLockPath = Path.join(this.appDataPath, Common.APP_DATA_FILE_LOCK)
    this.initialization = this.checkUpdate()
  }

  async checkUpdate() {
    // 检查目录是否存在
    const isExist = checkDir(this.localFileLockPath)
    if (!isExist) throw new Error('[DataManager] appDataPath is not exist')

    // 检查版本文件
    const isHasLocalFileLock = hasFile(this.localFileLockPath)
    const localFileLock: FileLock = isHasLocalFileLock
      ? require(Path.join(this.localFileLockPath))
      : {}

    // 从远端检查更新
    const remoteFileLock = JSON.parse(await Http.GET(githubUrl(Common.APP_DATA_FILE_LOCK)))

    // 比对版本
    const needUpdate = Object.keys(remoteFileLock).filter((key) => {
      return remoteFileLock[key].hash !== localFileLock[key]?.hash
    })

    // 没有更新
    if (needUpdate.length === 0) {
      this.fileLock = localFileLock
      console.log('[DataManager] no update')
      return
    }

    // 下载更新
    await Promise.all(
      needUpdate.map(async (key) => {
        const item = remoteFileLock[key]
        console.log('[dataManager] data update', item.path, '...')
        const data = await Http.GET(githubUrl(item.path)) // 下载
        const localHash = hash(data, 'hex')
        if (localHash !== item.hash) throw new Error('[DataManager] hash is not equal')
        writeFile(Path.join(this.appDataPath, item.path), data) // 写入
        localFileLock[key] = item // 更新本地版本
      })
    ).catch((error) => {
      console.error('[DataManager] update error', error)
      throw error
    })

    // 写入本地版本
    writeFile(this.localFileLockPath, JSON.stringify(localFileLock, null, 2))

    // 更新完成
    console.log('[DataManager] update finished')
    this.isInit = true
    this.fileLock = localFileLock
  }

  async get(dataType: AppDataType): Promise<any> {
    await this.initialization
    const path = this.fileLock[dataType].path
    return require(Path.join(this.appDataPath, path))
  }
}
