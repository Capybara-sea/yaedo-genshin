import chroma from 'chroma-js'

export const mainColor = {
  light: '#469fc0',
  dark: '#3ac1b3',
}

export const bgColor = {
  light: '#ffffff',
  dark: '#2d2d4b',
}

export const bgSubColor = {
  light: '#f5f6fb',
  dark: '#1d1d30',
}

export const bgSubColorLite = {
  light: chroma(bgSubColor.light).luminance(0.05).hex(),
  dark: chroma(bgSubColor.dark).luminance(0.05).hex(),
}
