import fs from 'fs'
import Path from 'path'
import crypto from 'crypto'

export const checkDir = (path: string, doNewFile: boolean = true): boolean => {
  try {
    const dir = Path.dirname(path)
    try {
      fs.accessSync(dir)
    } catch (error) {
      if (!doNewFile) return false
      checkDir(dir)
      fs.mkdirSync(dir)
      console.log('[file:checkDir] 路径不存在，新建文件夹', dir)
    }
    return true
  } catch (error) {
    console.error('[file:checkDir] 文件夹创建失败', error)
    return false
  }
}

// 检查文件是否存在
export const hasFile = (path: string, fileName?: string): boolean => {
  if (fileName) {
    return fs.readdirSync(path).indexOf(fileName) > -1
  } else {
    const dirname = Path.dirname(path)
    fileName = Path.basename(path)
    return fs.readdirSync(dirname).indexOf(fileName) > -1
  }
}

export const writeFile = (path: string, data: string): boolean => {
  checkDir(path)
  try {
    fs.writeFileSync(path, data)
    return true
  } catch (error) {
    console.error('[file:writeFile] 文件写入失败', error)
    return false
  }
}

export const hash = (
  data: string | NodeJS.ArrayBufferView,
  encoding: 'base64' | 'base64url' | 'hex'
): string => {
  const hash = crypto.createHash('sha256')
  return hash.update(data).digest(encoding)
}
