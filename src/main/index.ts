import { app, shell, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import fs from 'fs'

const cfgLoc = join(app.getPath('userData'), 'todos', 'todo.json');
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1020,
    height: 720,
    resizable: false,
    show: false,    
    autoHideMenuBar: true,
    fullscreenable: false,
    webPreferences: { 
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })  
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // IPC Functions
  function saveTodos(todos) {
    fs.writeFileSync(cfgLoc, JSON.stringify(todos));
  }
  
  function loadTodos() {
    if (fs.existsSync(cfgLoc)) {
      const data = fs.readFileSync(cfgLoc);
      //@ts-ignore
      return JSON.parse(data);
    }
    return [];
  }
  // IPC Proccess
  ipcMain.handle('load-todos', () => { 
    return loadTodos();
  });
  
  ipcMain.handle('save-todos', (_event, todos) => {
    saveTodos(todos);
  });

  ipcMain.handle('dark-mode:toggle', () => { 
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
  
  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'light'
  })
  
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
