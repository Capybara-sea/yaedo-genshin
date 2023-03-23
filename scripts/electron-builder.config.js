module.exports = {
  productName: '八重堂',
  appId: 'yaedo.capybara-sea.app',
  artifactName: '${productName}.${ext}',
  directories: {
    output: 'dist',
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    artifactName: 'yaedo_Setup_${version}.${ext}', // 安装包名称，不能有中文，否则release时名称会缺少
    shortcutName: '八重堂', // 快捷方式名称
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
