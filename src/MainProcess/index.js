const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const exec = require('child_process').exec;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, '../../public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.webContents.on('did-finish-load', () => {
    exec('docker -v', (error, stdout, stderr) => {
      if (!stdout || !stdout.match(/^Docker version.*/)) {
        win.webContents.send('no-docker', true);
      }
    });
  });

  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
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
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});

ipcMain.on('fetch-docker-process', (event) => {
  exec('docker ps -a', (error, stdout, stderr) => {
    let containers = createContainersFromConsole(stdout);
    event.sender.send('docker-ps-result', containers);
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createContainersFromConsole(log) {
  let results = [];
  let indexes;
  let log_lines = log.split('\n');

  indexes = getLogIndexes(log_lines);
  if (!indexes) return results;

  for (const log_line of log_lines) {
    if (!log_line || log_line.match(/^CONTAINER ID/i)) continue;
    results.push({
      container_id: log_line.slice(indexes.container_id, indexes.image - 1).trim(),
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

function getLogIndexes(log_line) {
  return (!log_line[0] || !log_line[0].match(/^CONTAINER ID/i)) ? null : {
    container_id: log_line[0].match('CONTAINER ID').index,
    image: log_line[0].match('IMAGE').index,
    command: log_line[0].match('COMMAND').index,
    created: log_line[0].match('CREATED').index,
    status: log_line[0].match('STATUS').index,
    ports: log_line[0].match('PORTS').index,
    names: log_line[0].match('NAMES').index,
  };
}
