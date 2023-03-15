import { app } from 'electron'
import fs from 'fs'
import fsExtra from 'fs-extra'
import { read as JimpRead } from 'jimp'
import { basename, extname, join, relative } from 'path'
import { Common } from '../common'
import { hasDir, hash, readFile, writeFile } from '../utils/files'
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
    const imageLock = readFile(this.localImageLockPath) as string
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
    if (!hasDir(this.appDataPath)) return
    this.fileList = getDir(this.appDataPath).map((path) => relative(this.appDataPath, path))
  }

  // 检查图片是否完整
  private async checkImage(data: Buffer): Promise<boolean> {
    try {
      await JimpRead(data)
      return false
    } catch (e) {
      console.error(`Image file is broken: ${e}`)
      return true
    }
  }

  private async download(path: string): Promise<{ isBroken: Boolean; path: string; file: Buffer }> {
    const file = await getGithubFile(path)
    // 下载文件后检查图片是否完整
    const isBroken = await this.checkImage(file)
    if (!isBroken) {
      // 如果完整就写入文件夹
      const localPath = join(this.appDataPath, path)
      writeFile(localPath, file)
      this.fileList.push(path)
    }
    return { isBroken, path, file }
  }

  async getPath(path): Promise<string> {
    // 检查path是否有文件类型后缀,使用Path.extname(path)获取
    if (extname(path) === '') {
      path = path + '.webp'
    }
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
    const isBroken = await this.checkImage(file)
    const isHashSame = imageLockItem.hash === hash(file)
    if (isBroken || !isHashSame) {
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
