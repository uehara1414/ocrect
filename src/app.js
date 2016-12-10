const electron = require('electron');
const {app} = require('electron')
const {BrowserWindow} = require('electron')
const {globalShortcut} = require('electron');
const {Tray} = require('electron');
const {Menu} = require('electron');

var tray = null

let mainWindow = null
console.log(__dirname)
function createTray()
{
  tray = new Tray(__dirname + '/resources/tmpicon.jpg')
  const contextMenu = Menu.buildFromTemplate([
    {label: '終了', click() {app.quit();}},
    {label: 'crop', click(){createOcrWindow();}},
  ]);
  tray.setContextMenu(contextMenu);
}

function createOcrWindow(){
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 400,
    height: 400
  })

  // mainWindow.maximize()

  mainWindow.loadURL("file://" + __dirname + "/window/index.html")
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('window-all-closed', () => {
  return;
})

app.on('ready', function () {

  createTray()

  globalShortcut.register('Control+W', () => {
    app.quit()
  })

});
