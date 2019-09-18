import { exec } from 'child_process';
import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainEvent,
} from 'electron';
import * as path from 'path';
import * as url from 'url';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let browserWindow: BrowserWindow;

async function createWindow() {
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
    slashes: true
  }));

  browserWindow.webContents.on('did-finish-load', () => {
    exec('docker -v', (error, stdout, stderr) => {
      if (!stdout || !stdout.match(/^Docker version.*/)) {
        browserWindow.webContents.send('no-docker', true);
      }
    });
  });

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  browserWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    browserWindow = null
  })
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

ipcMain.on('fetch-docker-process', (event: IpcMainEvent) => {
  exec('docker ps -a', (error, stdout, stderr) => {
    let containers = createContainersFromConsole(stdout);
    event.sender.send('docker-ps-result', containers);
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createContainersFromConsole(log: string): ContainerData[] {
  let log_lines = log.split('\n');

  let indexes: ContainerLogIndexes = getLogIndexes(log_lines);
  if (!indexes) return [];

  const results: ContainerData[] = [];
  for (const log_line of log_lines) {
    if (!log_line || log_line.match(/^CONTAINER ID/i)) continue;
    results.push({
      containerId: log_line.slice(indexes.containerId, indexes.image - 1).trim(),
      image: log_line.slice(indexes.image, indexes.command - 1).trim(),
      command: log_line.slice(indexes.command, indexes.created - 1).trim(),
      created: log_line.slice(indexes.created, indexes.status - 1).trim(),
      status: log_line.slice(indexes.status, indexes.ports - 1).trim(),
      ports: log_line.slice(indexes.ports, indexes.names - 1).trim(),
      names: log_line.slice(indexes.names).trim(),
    });
  }
  return results;
}

function getLogIndexes(log_lines: string[]): ContainerLogIndexes {
  return (!log_lines[0] || !log_lines[0].match(/^CONTAINER ID/i)) ? null : {
    containerId: log_lines[0].match('CONTAINER ID').index,
    image: log_lines[0].match('IMAGE').index,
    command: log_lines[0].match('COMMAND').index,
    created: log_lines[0].match('CREATED').index,
    status: log_lines[0].match('STATUS').index,
    ports: log_lines[0].match('PORTS').index,
    names: log_lines[0].match('NAMES').index,
  };
}
