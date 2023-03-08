import { app } from 'electron'
import Path from 'path'
import { Common } from '../common'
import { checkDir, hasFile, writeFile } from '../utils/files'
import { Http } from '../utils/request'

type FileLock = {
  path: string
  hash: string
}

const github = {
  name: 'Capybara-sea',
  repo: 'yaedo-metadata',
  branch: 'main',
}
const githubUrl = (path: string) =>
  `https://cdn.jsdelivr.net/gh/${github.name}/${github.repo}@${github.branch}/${path}`

export default class DataManager {
  private static instance: DataManager
  static init(): DataManager {
    if (DataManager.instance) return DataManager.instance
    DataManager.instance = new DataManager()
    console.log('[DataManager]initialized')
    return DataManager.instance
  }

  // 是否初始化
  isInit: boolean = false
  initialization: Promise<void>
  appDataPath: string
  localFileLockPath: string

  constructor() {
    this.appDataPath = Path.join(app.getPath('appData'), app.getName(), Common.APP_DATA_PATH)
    this.localFileLockPath = Path.join(this.appDataPath, Common.APP_DATA_FILE_LOCK)
    this.initialization = this.checkUpdate()
  }

  async checkUpdate() {
    // 检查目录是否存在
    const isExist = checkDir(this.localFileLockPath)
    if (!isExist) throw new Error('[DataManager]appDataPath is not exist')

    // 检查版本文件
    const isHasLocalFileLock = hasFile(this.localFileLockPath)
    const localFileLock: FileLock[] = isHasLocalFileLock
      ? require(Path.join(this.localFileLockPath))
      : []

    // 从远端检查更新
    const remoteFileLock = JSON.parse(await Http.GET(githubUrl(Common.APP_DATA_FILE_LOCK)))

    // 比对版本
    const needUpdate = remoteFileLock.filter((item) => {
      return item.hash !== localFileLock.find((i) => i.path === item.path)?.hash
    })

    // 没有更新
    if (needUpdate.length === 0) {
      console.log('[dataManager]no update')
      return
    }

    // 下载更新
    const downloadData = await Promise.all(
      needUpdate.map((item) => {
        console.log('[dataManager]data update', item.path, '...')
        return Http.GET(githubUrl(item.path))
      })
    )
    const updatedFiles = needUpdate.filter((item, i) => {
      const path = Path.join(this.appDataPath, item.path)
      const isUpdated = writeFile(path, downloadData[i])
      return isUpdated
    })

    // 更新版本文件
    const newFileLock = [
      ...localFileLock.filter((item) => !updatedFiles.find((i) => i.path === item.path)),
      ...updatedFiles,
    ]
    writeFile(Path.join(this.localFileLockPath), JSON.stringify(newFileLock, null, 2))

    // 更新完成
    console.log('[dataManager]update finished')
    this.isInit = true
  }

  async get<T>(path: string): Promise<T> {
    await this.initialization
    return require(Path.join(this.appDataPath, path))
  }
}
