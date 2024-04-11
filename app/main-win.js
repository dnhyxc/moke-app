// @ts-ignore
const path = require('path')
const { BrowserWindow, ipcMain } = require('electron')
const { getIconPath, isMac, isDev } = require('./utils')

// 屏蔽警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

const globalInfo = {
  mainWin: null
}

// 解决 http 下无法使用媒体api（navigator.mediaDevices.getUserMedia）的问题
// app.commandLine.appendSwitch('unsafely-treat-insecure-origin-as-secure', DOMAIN_URL);

const createMainWindow = () => {
  console.log(process.cwd(), 'process.cwd()')
  globalInfo.mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: false,
      nodeIntegration: true,       // 为了解决require 识别问题
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, './preload.js'),
      // 注意：配置了这个属性后，会影响 iframe pdf 的加载
      // partition: String(+new Date()), // 防止加载线上项目地址缓存在磁盘中
    },
    icon: path.join(__dirname, getIconPath()),
  });

  if (isMac) {
    app.dock.setIcon(path.join(__dirname, isDev ? '../public/mac/favicon.ico' : '../dist/mac/favicon.ico'));
  }

  console.log(isDev, 'isDev', process.env.NODE_ENV)

  if (!isDev) {
    globalInfo.mainWin?.webContents.openDevTools();

    globalInfo.mainWin?.loadURL('http://101.43.50.15:9216/');
  } else {
    globalInfo.mainWin?.webContents.openDevTools();
    globalInfo.mainWin?.loadURL("http://localhost:5173");
  }
}

ipcMain.on('test', (_, status) => {
  console.log(status, 'status')
});

module.exports = {
  createMainWindow
}