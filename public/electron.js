const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

let mainWindow;

if (!isDev){
  require("update-electron-app")({
    repo: "TechStudent11/microtext",
    updateInterval: "1 hour"
  });
}
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

if (isDev) {
  app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS, {
      loadExtensionOptions: {
        allowFileAccess: true
      }
    })
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log(`An error occured when trying to install an extension: ${err}`))
  })
}
