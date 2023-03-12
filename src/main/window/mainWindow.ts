import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { Common } from '../common'

const isDevelopment = process.env.NODE_ENV === 'development'

export function createMainWindow() {
  console.log('[mainWindow] createMainWindow')
  const mainWindow = new BrowserWindow({
    ...Common.WINDOW_DEFAULT_OPTIONS,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
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

  // 监听渲染进程的ready-to-show事件，等待渲染进程加载完毕后再显示窗口
  ipcMain.once('ready-to-show', () => {
    console.log('[mainWindow] ready-to-show')
    mainWindow.show()
  })
}
