import fs from 'fs'
import Path from 'path'
import crypto from 'crypto'

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

export const readFile = (filePath: string): string => {
  if (!fs.existsSync(Path.dirname(filePath))) return ''
  else return filePath ? fs.readFileSync(filePath, 'utf-8') : ''
}

export const writeFile = (filePath: string, data: string): boolean => {
  if (!fs.existsSync(Path.dirname(filePath))) {
    fs.mkdirSync(Path.dirname(filePath), { recursive: true })
  }
  try {
    fs.writeFileSync(filePath, data)
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
