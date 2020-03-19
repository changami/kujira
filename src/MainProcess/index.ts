import { exec } from 'child_process';
import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
} from 'electron';
import * as path from 'path';
import * as url from 'url';
import {
  DOCKER_PROCESS_ALL,
  DOCKER_VERSION,
} from '../Constants/dockerCommands';
import {
  ALL_CONTAINERS_DATA_EXCHANGE,
  FETCH_ALL_CONTAINERS,
} from '../Constants/ipcChannels';
import { createContainersFromConsole } from './logConverter';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let browserWindow: BrowserWindow;

async function createWindow(): Promise<void> {
  // Create the browser window.
  browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  await browserWindow.loadURL(url.format({
    pathname: path.resolve(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  browserWindow.webContents.on('did-finish-load', () => {
    exec(DOCKER_VERSION, (error, stdout) => {
      if (!stdout || !stdout.match(/^Docker version.*/)) {
        browserWindow.webContents.send('no-docker', true);
      }
    });
  });

  // Open the DevTools.
  // browserWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  browserWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    browserWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (browserWindow === null) {
    await createWindow();
  }
});

ipcMain.on(FETCH_ALL_CONTAINERS, (event: IpcMainEvent) => {
  exec(DOCKER_PROCESS_ALL, (error, stdout) => {
    const containers = createContainersFromConsole(stdout);
    event.sender.send(ALL_CONTAINERS_DATA_EXCHANGE, containers);
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
