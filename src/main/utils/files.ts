import fs from 'fs'
import Path from 'path'
import crypto from 'crypto'
import Logger from './logger'
const logger = new Logger('files')

export const hasDir = (path: string): boolean => {
  try {
    const stats = fs.statSync(path)
    return stats.isDirectory()
  } catch (err) {
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

/**
 * 读取文件内容，返回文件内容的字符串表示或者 Buffer。
 * @param filePath - 文件路径。
 * @param encoding - 文件编码格式，默认为 utf-8。
 * @returns 如果文件不存在，则返回空字符串；如果 encoding 为 null，则返回 Buffer，否则返回文件内容的字符串表示。
 */
export const readFile = (
  filePath: string,
  encoding: BufferEncoding | null = 'utf-8'
): string | Buffer => {
  if (!fs.existsSync(filePath)) return encoding == null ? Buffer.alloc(0) : ''
  else return encoding == null ? fs.readFileSync(filePath) : fs.readFileSync(filePath, encoding)
}

export const writeFile = (filePath: string, data: string | NodeJS.ArrayBufferView): boolean => {
  if (!fs.existsSync(Path.dirname(filePath))) {
    fs.mkdirSync(Path.dirname(filePath), { recursive: true })
  }
  try {
    fs.writeFileSync(filePath, data)
    return true
  } catch (error) {
    logger.error('writeFile文件写入失败', error)
    return false
  }
}

export const hash = (
  data: string | NodeJS.ArrayBufferView,
  encoding: 'base64' | 'base64url' | 'hex' = 'hex'
): string => {
  const hash = crypto.createHash('sha256')
  return hash.update(data).digest(encoding)
}
