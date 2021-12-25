import { ipcMain } from 'electron';
import { login } from './wealthsimple/auth';
import queryBonuses from './wealthsimple/bonuses';

ipcMain.handle('login', async (_event, username, password, otp?) => {
  const res = await login(username, password, otp);
  return res;
});

ipcMain.handle('queryBonuses', async () => {
  const res = await queryBonuses();
  return res;
});
