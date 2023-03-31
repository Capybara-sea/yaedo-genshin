import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { Common } from '../common'
import { IpcMainProvider } from '../preload/ipcMainProvider'
import Logger from '../utils/logger'

const ipcMainProvider = new IpcMainProvider()
const logger = new Logger('MainWindow')

export function createMainWindow() {
  logger.info('createMainWindow')
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },

    show: false,
    width: 960,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#888',
    // 开发环境
    ...(Common.isDev && {
      x: 1700,
      y: 800,
    }),
  })

  if (Common.isDev) {
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}`)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
  }

  mainWindow.setMenuBarVisibility(false)

  // 监听渲染进程的ready-to-show事件，等待渲染进程加载完毕后再显示窗口
  ipcMain.once('ready-to-show', () => {
    logger.info('ready-to-show')
    mainWindow.show()
    // 注册sendApi
    ipcMainProvider.sendRegister(mainWindow)
  })

  mainWindow.on('closed', () => {
    // 窗口关闭之后关闭监听通道
    ipcMainProvider.sendUnregister()
  })

  return mainWindow
}
