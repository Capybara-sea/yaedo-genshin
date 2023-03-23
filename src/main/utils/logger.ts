import { app } from 'electron'
import { join } from 'path'
import { Common } from '../common'
import winston, { format, Logger as WinstonLogger } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

/** 获取日志文件地址 */
function n(name) {
  return join(app.getPath('appData'), app.getName(), Common.LOG_PATH, name)
}

/** 格式化日志输出格式 */
function printFormatter(info) {
  return `[${info.timestamp}][${info.module}][${info.level.toUpperCase()}] ${info.message}`
}

interface LogFunction {
  (message: string, ...args: any[]): void
}

class Logger {
  private logger: WinstonLogger

  constructor(moduleName: string) {
    this.logger = winston.createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.printf(printFormatter)
      ),
      defaultMeta: { module: moduleName },
      transports: Common.isDev
        ? [new winston.transports.Console()]
        : [
            new DailyRotateFile({
              filename: n('log-%DATE%.log'),
              maxSize: '20m',
              maxFiles: '14d',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
            }),
            new DailyRotateFile({
              filename: n('error-%DATE%.log'),
              maxSize: '20m',
              maxFiles: '90d',
              datePattern: 'YYYY-MM-DD',
              level: 'error',
              zippedArchive: true,
            }),
          ],
    })
  }

  private log(level: string, message: string, ...args: any[]) {
    const logFunction: LogFunction = this.logger[level] as LogFunction
    if (args.length > 0) {
      message += '\n' + JSON.stringify(args)
    }
    logFunction(message)
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args)
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args)
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args)
  }

  debug(message: string, ...args: any[]) {
    this.log('debug', message, ...args)
  }
}

export default Logger
