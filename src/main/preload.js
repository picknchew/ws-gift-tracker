const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('wealthsimple', {
  login: (username, password, otp) => ipcRenderer.invoke('login', username, password, otp),
  queryBonuses: () => ipcRenderer.invoke('queryBonuses'),
});
