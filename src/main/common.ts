import type { BrowserWindowConstructorOptions } from 'electron'

export class Common {
  static isDev = process.env.NODE_ENV === 'development'

  static APP_DATA_PATH = 'appData'
  static APP_DATA_FILE_LOCK = 'fileLock.json'
  static APP_DATA_IMAGE_LOCK = 'imageLock.json'
  static USER_SETTING = 'userSetting.json'

  static REQUEST_SCHEMES = 'yaedo'

  static WINDOW_DEFAULT_OPTIONS: BrowserWindowConstructorOptions = {
    show: false,
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#888',
  }

  static GITHUB = {
    name: 'Capybara-sea',
    repo: 'yaedo-metadata',
    branch: 'master',
  }

  static USER_AGENT = {
    freebsd:
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    sunos:
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    win32:
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    linux:
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    darwin:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36',
  }
}
