const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('wealthsimple', {
  login: (username, password, otp) => ipcRenderer.invoke('login', username, password, otp),
  getTokenInfo: () => ipcRenderer.invoke('getTokenInfo'),
  queryBonuses: () => ipcRenderer.invoke('queryBonuses'),
});
