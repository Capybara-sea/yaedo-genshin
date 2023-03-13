import { Common } from '../common'
import { app, protocol, session } from 'electron'
import ImageManager from '../modules/imageManager'

const imageManager = ImageManager.init()

export function injectWebRequest() {
  // 该方法必须在app ready之前调用
  app.on('will-finish-launching', () => {
    protocol.registerSchemesAsPrivileged([{ scheme: 'yaedo', privileges: { standard: true } }])
  })

  app.whenReady().then(() => {
    session.defaultSession.clearCache()

    // 为了让webview可以加载本地图片，需要修改webview的content-security-policy
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ["script-src 'self'"],
        },
      })
    })

    // 注册协议 用于加载本地图片
    protocol.registerBufferProtocol(Common.REQUEST_SCHEMES, async (request, callback) => {
      const filePath = request.url.replace(`${Common.REQUEST_SCHEMES}://`, '')
      callback({ mimeType: 'image/webp', data: await imageManager.getImageFile(filePath) })
    })

    // 监听图片请求
    // session.defaultSession.webRequest.onBeforeRequest(
    //   { urls: ['*://*.localhost:*/images/**'] },
    //   (details, callback) => {
    //     // 这里可以通过details.resourceType判断请求的是否为图片类型，这里也获取了other，是因为视频也会存在在other中
    //     if (details.resourceType === 'image' || details.resourceType === 'other') {
    //       // 获取请求地址
    //       console.log(details.url)
    //       callback({})
    //     }
    //     const redirectURL = 'yaedo://images/character-10000002-card.webp'
    //     // callback({ redirectURL })
    //     callback({ redirectURL })
    //   }
    // )
  })
}
