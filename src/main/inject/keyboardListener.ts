import { app, globalShortcut } from 'electron'
import { Common } from '../common'

export function keyboardListener() {
  app.whenReady().then(() => {
    if (!Common.isDev) {
      // 禁止刷新
      globalShortcut.register('CommandOrControl+R', () => {
        console.log('CommandOrControl+R is pressed')
      })
    }
  })

  app.on('will-quit', () => {
    // 注销所有快捷键
    globalShortcut.unregisterAll()
  })
}
