// import { dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import { IpcMainProvider } from '../preload/ipcMainProvider'
import Logger from '../utils/logger'
const logger = new Logger('appUpdater')

const mainWindowSender = IpcMainProvider.sender('AppUpdater')

// 定义返回给渲染层的相关提示文案
const message = {
  error: '检查更新出错',
  checking: '正在检查更新……',
  updateAva: '检测到新版本，正在下载……',
  updateNotAva: '现在使用的就是最新版本，不用更新',
}

export function checkUpdate() {
  autoUpdater.checkForUpdates()
}

export function appUpdater() {
  logger.info('初始化')

  autoUpdater.autoDownload = false

  // 检测下载错误
  autoUpdater.on('error', (error) => {
    logger.error(message.error, error)
    mainWindowSender('error', message.error, error)
  })

  // 检测是否需要更新
  autoUpdater.on('checking-for-update', () => {
    logger.info(message.checking)
  })

  // 检测到可以更新时
  autoUpdater.on('update-available', () => {
    // 这里我们可以做一个提示，让用户自己选择是否进行更新
    autoUpdater.downloadUpdate()
    logger.info(message.updateAva)
  })

  // 检测到不需要更新时
  autoUpdater.on('update-not-available', () => {
    logger.info(message.updateNotAva)
  })

  // 更新下载进度
  autoUpdater.on('download-progress', (progress) => {
    logger.info(`下载进度：${progress.percent}`)
  })

  // 下载完成
  autoUpdater.on('update-downloaded', () => {
    mainWindowSender('downloaded')
    // dialog
    //   .showMessageBox({
    //     title: '安装更新',
    //     message: '更新下载完毕，应用将重启并进行安装',
    //   })
    //   .then(() => {
    //     // 退出并安装应用
    //     setImmediate(() => autoUpdater.quitAndInstall())
    //   })
  })
}
