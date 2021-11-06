const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  });

  // and load the index.html of the app.
  win.loadFile('dist/index.html');
}

app.once("ready", () => {
  createWindow();
})