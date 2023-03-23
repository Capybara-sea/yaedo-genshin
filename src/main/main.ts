import { app, BrowserWindow } from 'electron'
import { bindIpcApi } from './api'
import { autoUpdater } from './modules/autoUpdater'
import { createMainWindow } from './window/mainWindow'
import { injectWebRequest, keyboardListener } from './inject'
import Logger from './utils/logger'
const logger = new Logger('Main')

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', error.stack)
  // app.quit()
})

// 监听未处理的 Promise 拒绝
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled Rejection', reason)
  // app.quit()
})

autoUpdater() // 检查更新
injectWebRequest() // 注入本地图片的协议
keyboardListener() // 注册快捷键监听
bindIpcApi() // 注册所有的api

app.whenReady().then(() => {
  createMainWindow() // 创建主窗口
})

app.on('activate', function () {
  // 在macOS上，当dock图标被点击并且没有其他窗口打开时，通常会在应用中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.on('window-all-closed', function () {
  // 在macOS上，除非用户用Cmd + Q显式退出，否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
