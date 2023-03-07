import { HelloApi } from './helloApi'

/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface api {
  HelloApi: HelloApi
}

declare global {
  interface Window {
    api: api
  }
}
