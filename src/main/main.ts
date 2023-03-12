import { app, BrowserWindow, session } from 'electron'
import { join } from 'path'
import { Common } from './common'

import { IpcMainProvider } from './preload/ipcMainProvider'
import AppData from './api/appData'
import Setting from './api/setting'

const isDevelopment = process.env.NODE_ENV === 'development'

function createWindow() {
  const mainWindow = new BrowserWindow({
    ...Common.WINDOW_DEFAULT_OPTIONS,
    webPreferences: {
      preload: join(__dirname, 'preload/index.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
    ...(isDevelopment && {
      x: 1700,
      y: 800,
    }),
  })

  if (isDevelopment) {
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}`)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
  }
}

app.whenReady().then(() => {
  // DataManager.init()
  // 注册所有的api
  const ipcMainProvider = new IpcMainProvider()
  ipcMainProvider.register(new AppData())
  ipcMainProvider.register(new Setting())

  createWindow()
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["script-src 'self'"],
      },
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
