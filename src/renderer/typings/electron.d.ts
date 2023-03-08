/**
 * Should match main/preload.ts for typescript support in renderer
 */
import API from '../../types/api/index'

declare global {
  interface Window {
    api: API
  }
}
