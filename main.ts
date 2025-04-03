const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  // 强制开发模式加载 Nuxt 服务器，添加日志调试
  const isDev = process.env.NODE_ENV === 'development' || true // 临时强制为 true
  console.log('Is Development Mode:', isDev) // 调试环境变量

  if (isDev) {
    console.log('Loading Nuxt dev server at http://localhost:3000')
    win.loadURL('http://localhost:3000').catch((err: any) => {
      console.error('Failed to load Nuxt dev server:', err)
    })
    win.webContents.openDevTools()
  } else {
    console.log(
      'Loading production build at',
      path.join(__dirname, '../dist/index.html'),
    )
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
