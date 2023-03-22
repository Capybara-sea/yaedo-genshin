import fs from 'fs'
import fsExtra from 'fs-extra'
import Logger from '@/utils/logger'
import { app } from 'electron'
import { Common } from '@/common'
import { basename, join, relative } from 'path'
import { getGithubFile } from '@/utils/github'
import { hasDir, hash, readFile, writeFile } from '@/utils/files'

type imageLock = {
  [propName: string]: imageLockItem
}

type imageLockItem = {
  path: string
  hash: string
}

export default class ImageManager {
  private static instance: ImageManager
  private logger = new Logger('ImageManager')
  static init(): ImageManager {
    if (ImageManager.instance) return ImageManager.instance
    ImageManager.instance = new ImageManager()
    ImageManager.instance.logger.info('初始化')
    return ImageManager.instance
  }

  private appDataPath: string
  private localImageLockPath: string
  private imageLock: imageLock = {}
  private fileList: string[] = []

  private constructor() {
    this.appDataPath = join(app.getPath('appData'), app.getName(), Common.APP_DATA_PATH)
    this.localImageLockPath = join(this.appDataPath, Common.APP_DATA_IMAGE_LOCK)

    this.initImageLock()
    this.initFileList()
  }

  private initImageLock() {
    const imageLock = readFile(this.localImageLockPath) as string
    try {
      this.imageLock = imageLock === '' ? {} : JSON.parse(imageLock)
    } catch (error) {
      this.logger.error('本地图片版本读取失败', error)
    }

    getGithubFile(Common.APP_DATA_IMAGE_LOCK).then((imageLock) => {
      writeFile(this.localImageLockPath, imageLock)
    })
  }

  private initFileList() {
    // 获取 this.appDataPath 下的所有文件目录包括子目录
    function getDir(path) {
      const res: string[] = []
      const fileList = fs.readdirSync(path, { withFileTypes: true })
      fileList.forEach((file) => {
        if (file.name === '.DS_Store') return
        const filePath = join(path, file.name)
        if (file.isDirectory()) res.push(...getDir(filePath))
        else res.push(filePath)
      })
      return res
    }
    if (!hasDir(this.appDataPath)) return
    this.fileList = getDir(this.appDataPath).map((path) => relative(this.appDataPath, path))
  }

  private async download(path: string): Promise<{ path: string; file: Buffer }> {
    const file = await getGithubFile(path)
    const localPath = join(this.appDataPath, path)
    writeFile(localPath, file)
    this.fileList.push(path)
    return { path, file }
  }

  async getPath(path): Promise<string> {
    if (!this.fileList.includes(path)) {
      await this.download(path)
    }
    return join(this.appDataPath, path)
  }

  async getImageFile(path): Promise<any> {
    const filePath = await this.getPath(path)
    const file = readFile(filePath, null) as Buffer

    const fileName = basename(filePath)
    const imageLockItem = this.imageLock[fileName] || {}

    // 检查图片是否完整 和 hash是否一致
    const isHashSame = imageLockItem.hash === hash(file)
    if (!isHashSame) {
      this.logger.warn('图片损坏,重新下载', path)
      const res = await this.download(path)
      return res.file
    }
    return file
  }

  clearCache(): void {
    fsExtra.removeSync(join(this.appDataPath, 'images'))
    this.fileList = []
  }
}
