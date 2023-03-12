import fs from 'fs'
import { join, relative } from 'path'
import { app } from 'electron'
import { Common } from '../common'
import { readFile, writeFile } from '../utils/files'
import { getGithubFile } from '../utils/github'

type imageLock = {
  [propName: string]: imageLockItem
}

type imageLockItem = {
  path: string
  hash: string
}

export default class ImageManager {
  private static instance: ImageManager
  static init(): ImageManager {
    if (ImageManager.instance) return ImageManager.instance
    ImageManager.instance = new ImageManager()
    console.log('[ImageManager] initialized')
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
    const imageLock = readFile(this.localImageLockPath)
    this.imageLock = imageLock === '' ? {} : JSON.parse(imageLock)

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
    this.fileList = getDir(this.appDataPath).map((path) => relative(this.appDataPath, path))
    console.log(this.fileList)
  }

  private async download(path): Promise<string> {
    return path
  }

  async getPath(path): Promise<string> {
    if (this.fileList.includes(path)) return join(this.appDataPath, path)
    else return this.download(path)
  }

  async getImageFile(path): Promise<string> {
    // 检查文件是否在本地
    return ''
  }
}
