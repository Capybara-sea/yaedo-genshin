import type { AppDataType } from '../../types/data'
import { app } from 'electron'
import { join } from 'path'
import { Common } from '../common'
import { hash, readFile, writeFile } from '../utils/files'
import { getGithubFile } from '../utils/github'
import Logger from '../utils/logger'
const logger = new Logger('DataManager')

type FileLockItem = {
  path: string
  hash: string
}

type FileLock = {
  [propName: string]: FileLockItem
}

export default class DataManager {
  private static instance: DataManager
  static init(): DataManager {
    if (DataManager.instance) return DataManager.instance
    DataManager.instance = new DataManager()
    logger.info('初始化')
    return DataManager.instance
  }

  // 是否初始化
  public isInit: boolean = false
  public initialization: Promise<void>

  private appDataPath: string
  private fileLock: FileLock = {}
  private localFileLockPath: string

  private constructor() {
    this.appDataPath = join(app.getPath('appData'), app.getName(), Common.APP_DATA_PATH)
    this.localFileLockPath = join(this.appDataPath, Common.APP_DATA_FILE_LOCK)
    this.initialization = this.checkUpdate()
  }

  async checkUpdate() {
    // 检查版本文件
    const isHasLocalFileLock = readFile(this.localFileLockPath) as string
    const localFileLock: FileLock = isHasLocalFileLock === '' ? {} : JSON.parse(isHasLocalFileLock)

    // 从远端检查更新
    const remoteFileLock = JSON.parse(await getGithubFile(Common.APP_DATA_FILE_LOCK))

    // 比对版本
    const needUpdate = Object.keys(remoteFileLock).filter((key) => {
      return remoteFileLock[key].hash !== localFileLock[key]?.hash
    })

    // 没有更新
    if (needUpdate.length === 0) {
      this.fileLock = localFileLock
      logger.info('没有更新')
      return
    }

    // 下载更新
    await Promise.all(
      needUpdate.map(async (key) => {
        const item = remoteFileLock[key]
        logger.info(`${item.path} 下载中...`)
        const data = await getGithubFile(item.path) // 下载
        // TODO: 临时解决方案，hash值只有在写入的文件读取后才会正确
        const localHash = hash(data)
        if (localHash !== item.hash) {
          throw new Error(`[DataManager] hash is not equal
          remote: ${item.hash}
          local: ${localHash}
          `)
        }
        writeFile(join(this.appDataPath, item.path), data) // 写入
        localFileLock[key] = item // 更新本地版本
      })
    ).catch((error) => {
      logger.error('更新失败', error)
      throw error
    })

    // 写入本地版本
    writeFile(this.localFileLockPath, JSON.stringify(localFileLock, null, 2))

    // 更新完成
    logger.info('更新完成')
    this.isInit = true
    this.fileLock = localFileLock
  }

  async get(dataType: AppDataType): Promise<any> {
    await this.initialization
    const path = this.fileLock[dataType]?.path || ''
    return require(join(this.appDataPath, path))
  }
}
