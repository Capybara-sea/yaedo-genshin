/**
 * Should match main/preload.ts for typescript support in renderer
 */
import type API from '../../types/api'

declare global {
  interface Window {
    api: API
  }
}
