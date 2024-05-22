import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getCook: (args) => ipcRenderer.send('get-cookies', args),
  getCookToRenderer: (arg) => ipcRenderer.on('get-cook-renderer', arg),
  updateCheck: (callback) => ipcRenderer.on('update-available', (_, info) => {
    callback(info)
  }),
  updateDownloaded: (callback) => ipcRenderer.on('update-downloaded', (_, info) => {
    callback(info)
  })
}
   
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
