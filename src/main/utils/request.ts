import { app, net } from 'electron'
import { extname } from 'path'
import { URL } from 'url'

enum MIME {
  htm = 'text/html',
  html = 'text/html',
  css = 'text/css',
  gif = 'image/gif',
  ico = 'image/x-icon',
  jpg = 'image/jpeg',
  js = 'text/javascript',
  png = 'image/png',
  webp = 'image/webp',
  rar = 'application/x-rar-compressed',
  txt = 'text/plain',
  json = 'application/json',
  jar = 'application/java-archive',
}

export class Http {
  static async GET(url: string, params: object = {}): Promise<any> {
    await app.whenReady()

    return new Promise((resolve, reject) => {
      const request = net.request({
        method: 'GET',
        url: Http.addParams(url, params),
      })
      request.setHeader('Content-Type', Http.getContentType(url))
      request.on('response', (response) => {
        let data = Buffer.concat([])

        response.on('data', (chunk) => {
          data = Buffer.concat([data, chunk])
        })
        response.on('end', () => {
          resolve(data)
        })
      })
      request.on('error', (error) => {
        reject(error)
      })
      request.end()
    })
  }

  private static addParams(url: string, params: object = {}): string {
    const urlObj = new URL(url)
    Object.keys(params).forEach((key) => {
      urlObj.searchParams.append(key, params[key])
    })
    return urlObj.toString()
  }

  private static getContentType(url: string): MIME {
    const ext = extname(url).replace('.', '')
    return MIME[ext] || 'application/octet-stream'
  }
}
