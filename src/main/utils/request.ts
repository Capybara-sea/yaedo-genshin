import { app, net } from 'electron'
import { URL } from 'url'

export class Http {
  static async GET(url: string, params: object = {}): Promise<any> {
    await app.whenReady()

    return new Promise((resolve, reject) => {
      const request = net.request({
        method: 'GET',
        url: Http.addParams(url, params),
      })

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
}
