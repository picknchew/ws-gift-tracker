import { ipcMain } from 'electron';
import { getTokenInfo, login, isLoggedIn } from './wealthsimple/auth';
import queryBonuses from './wealthsimple/bonuses';

ipcMain.handle('login', async (_event, username, password, otp?) => {
  const res = await login(username, password, otp);
  return res;
});

ipcMain.handle('getTokenInfo', async (_event) => {
  const res = await getTokenInfo();
  return res;
});

ipcMain.handle('queryBonuses', async () => {
  const res = await queryBonuses();
  return res;
});

ipcMain.handle('isLoggedIn', () => {
  return isLoggedIn();
});
