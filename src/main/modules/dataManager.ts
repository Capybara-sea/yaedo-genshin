import type { AppDataType, AppData } from '../../types/data'
import { app } from 'electron'
import { join } from 'path'
import { Common } from '../common'
import { hash, readFile, writeFile } from '../utils/files'
import { getGithubFile } from '../utils/github'
import Logger from '../utils/logger'

type FileLockItem = {
  path: string
  hash: string
}

type FileLock = {
  [propName: string]: FileLockItem
}

export default class DataManager {
  private static instance: DataManager
  private logger = new Logger('DataManager')
  static init(): DataManager {
    if (DataManager.instance) return DataManager.instance
    DataManager.instance = new DataManager()
    DataManager.instance.logger.info('初始化')
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
    console.log('数据文件地址(cmd+shift+G):', this.appDataPath)
  }

  async checkUpdate() {
    // 检查版本文件
    const isHasLocalFileLock = readFile(this.localFileLockPath) as string
    let localFileLock: FileLock = {}
    let remoteFileLock: FileLock = {}
    try {
      localFileLock = isHasLocalFileLock === '' ? {} : JSON.parse(isHasLocalFileLock)
    } catch (error) {
      this.logger.error('本地数据版本读取失败', error)
    }

    // 从远端检查更新
    try {
      remoteFileLock = JSON.parse(await getGithubFile(Common.APP_DATA_FILE_LOCK))
    } catch (error) {
      this.logger.error('远端数据版本读取失败', error)
    }

    // 比对版本
    const needUpdate = Object.keys(remoteFileLock).filter((key) => {
      return remoteFileLock[key].hash !== localFileLock[key]?.hash
    })

    // 没有更新
    if (needUpdate.length === 0) {
      this.fileLock = localFileLock
      this.logger.info('没有更新')
      return
    }

    // 下载更新
    await Promise.all(
      needUpdate.map(async (key) => {
        const item = remoteFileLock[key]
        this.logger.info(`${item.path} 下载中...`)
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
      this.logger.error('更新失败', error)
      throw error
    })

    // 写入本地版本
    writeFile(this.localFileLockPath, JSON.stringify(localFileLock, null, 2))

    // 更新完成
    this.logger.info('更新完成')
    this.isInit = true
    this.fileLock = localFileLock
  }

  dataCache = new Map<AppDataType, AppData[AppDataType]>()

  async get(appDataType: AppDataType): Promise<AppData[AppDataType]> {
    await this.initialization
    if (this.dataCache.has(appDataType)) {
      return this.dataCache.get(appDataType) as AppData[AppDataType]
    }
    const path = this.fileLock[appDataType]?.path || ''
    const data = require(join(this.appDataPath, path))
    this.dataCache.set(appDataType, data)
    return data
  }
}
