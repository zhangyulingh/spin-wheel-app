var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var path = require('path');
function createWindow() {
    var win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    // 强制开发模式加载 Nuxt 服务器，添加日志调试
    var isDev = process.env.NODE_ENV === 'development' || true; // 临时强制为 true
    console.log('Is Development Mode:', isDev); // 调试环境变量
    if (isDev) {
        console.log('Loading Nuxt dev server at http://localhost:3000');
        win.loadURL('http://localhost:3000').catch(function (err) {
            console.error('Failed to load Nuxt dev server:', err);
        });
        win.webContents.openDevTools();
    }
    else {
        console.log('Loading production build at', path.join(__dirname, '../dist/index.html'));
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}
app.whenReady().then(function () {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit();
});
