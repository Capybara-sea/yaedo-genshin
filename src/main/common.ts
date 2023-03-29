import { join } from 'path'
import { app } from 'electron'

export class Common {
  static isDev = process.env.NODE_ENV === 'development'

  static APP_VERSION = require('../../package.json').version

  static GET_APP_ROOT_PATH = () => join(app.getPath('appData'), app.getName())
  static APP_DATA_PATH = 'appData'
  static APP_DATA_FILE_LOCK = 'fileLock.json'
  static APP_DATA_IMAGE_LOCK = 'imageLock.json'
  static USER_SETTINGS = 'userSettings.json'
  static LOG_PATH = 'log'

  static REQUEST_SCHEMES = 'yaedo'

  static GITHUB = {
    name: 'Capybara-sea',
    repo: 'yaedo-metadata',
    branch: 'main',
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
