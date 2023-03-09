import type { AppState } from './types'

export function defaultTheme(): AppState {
  return { theme: 'auto' }
}

export function getLocalSetting(): AppState {
  const localSetting: AppState = JSON.parse(localStorage.getItem('setting') || '{}')
  return { ...defaultTheme(), ...localSetting }
}
