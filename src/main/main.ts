import { app, BrowserWindow } from 'electron'
import { bindIpcApi } from './api'
import { injectWebRequest, registerSchemes } from './inject/webRequest'
import { createMainWindow } from './window/mainWindow'

app.on('will-finish-launching', () => {
  registerSchemes() // 注册协议
})

app.whenReady().then(() => {
  bindIpcApi() // 注册所有的api
  injectWebRequest() // 注入本地图片的协议
  createMainWindow()
})

app.on('activate', function () {
  // 在macOS上，当dock图标被点击并且没有其他窗口打开时，通常会在应用中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.on('window-all-closed', function () {
  // 在macOS上，除非用户用Cmd + Q显式退出，否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') app.quit()
})
