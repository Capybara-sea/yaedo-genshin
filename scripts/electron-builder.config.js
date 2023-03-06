module.exports = {
  productName: '八重堂',
  appId: 'com.electron.app',
  artifactName: '${productName}.${ext}',
  directories: {
    output: 'dist',
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    shortcutName: '八重堂',
  },
  win: {
    target: 'nsis',
  },
  linux: {
    target: ['snap'],
  },
  files: [
    'build/main/**/*',
    {
      from: 'build/renderer',
      to: 'renderer',
      filter: ['**/*'],
    },
    {
      from: 'src/main/static',
      to: 'static',
      filter: ['**/*'],
    },
    '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
    '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
    '!**/node_modules/*.d.ts',
    '!**/node_modules/.bin',
    '!src',
    '!config',
    '!README.md',
    '!scripts',
    '!build/renderer',
    '!dist',
  ],
}
