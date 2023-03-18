/**
 * Should match main/preload.ts for typescript support in renderer
 */
import type { API } from './api'

declare global {
  interface Window {
    api: API
  }
}
