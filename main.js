const electron = require( 'electron' );

let browserWindow = null;

// == create a window ========================================================
const createWindow = () => {
  browserWindow = new electron.BrowserWindow( {
    width: 650,
    height: 370,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  } );

  browserWindow.loadFile( 'browser/index.html' );

  browserWindow.on( 'closed', () => {
    browserWindow = null;
  } );
};

electron.app.on( 'ready', () => {
  createWindow();
} );

// == setting for macOS ========================================================
electron.app.on( 'window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    electron.app.quit();
  }
} );

electron.app.on( 'activate', () => {
  electron.ipcMain.emit( 'hoge', 'a' );

  if ( browserWindow === null ) {
    createWindow();
  }
} );

// == focus and blur ===========================================================
electron.app.on( 'browser-window-focus', ( event, window ) => {
  event.sender.send( 'window-focus', '1' );
} );

electron.app.on( 'browser-window-blur', ( event, window ) => {
  event.sender.send( 'window-focus', '0' );
} );

// == ignore mouse events ======================================================
electron.ipcMain.on( 'capture', ( event, b ) => {
  browserWindow.setIgnoreMouseEvents( b === '0' );
} );