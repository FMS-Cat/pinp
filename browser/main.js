const electron = require( 'electron' );

// == well easier keyevent wrapper ===========================================
const keyEv = ( which, func ) => {
  window.addEventListener( 'keydown', ( event ) => {
    if ( event.which === which && event.repeat === false ) {
      func( true );
    }
  } );

  window.addEventListener( 'keyup', ( event ) => {
    if ( event.which === which ) {
      func( false );
    }
  } );
};

// == set or toggle capture mode =============================================
const MODE_IGNORE = 1;
const MODE_DRAG = 2;
const MODE_BROWSE = 3;
let currentMode = MODE_BROWSE;

const setMode = ( mode ) => {
  currentMode = mode;
  electron.ipcRenderer.send( 'capture', mode === MODE_IGNORE ? '0' : '1' );
  window.dragModeUI.style.display = mode === MODE_DRAG ? 'block' : 'none';

  if ( mode === MODE_IGNORE ) {
    window.bg.style.background = '#000';
  } else if ( mode === MODE_DRAG ) {
    window.bg.style.background = '#00f';
    window.dragModeUI.focus();
  } else if ( mode === MODE_BROWSE ) {
    window.bg.style.background = '#0f0';
  }
};

// == double tapping the ctrl key toggles the dragMode =======================
let ctrlLastDown = 0;

keyEv( 17, ( down ) => { // ctrl
  if ( !down ) { return; }
  
  const now = Date.now();
  if ( 300 < now - ctrlLastDown ) {
    ctrlLastDown = now;
    return;
  }

  setMode( currentMode === MODE_DRAG ? MODE_BROWSE : MODE_DRAG );
  ctrlLastDown = 0;
} );

// == message listener =======================================================
electron.ipcRenderer.on( 'window-focus', ( event, arg ) => {
  if ( currentMode !== MODE_BROWSE ) {
    setMode( arg === '0' ? MODE_IGNORE : MODE_DRAG );
  }
} );

// == opacity buttons ========================================================
let opacity = 1.0;

window.buttonOpacityDecl.addEventListener( 'click', () => {
  opacity = Math.max( 0.1, opacity - 0.1 );
  document.body.style.opacity = opacity;
} );

window.buttonOpacityIncl.addEventListener( 'click', () => {
  opacity = Math.min( 1.0, opacity + 0.1 );
  document.body.style.opacity = opacity;
} );

// == address bar ============================================================
window.webview.addEventListener( 'did-start-loading', ( event ) => {
  window.addressBar.value = window.webview.src;
} );

window.addressBar.addEventListener( 'keydown', ( event ) => {
  if ( event.which === 13 ) { // enter
    window.webview.src = window.addressBar.value;
  }
} );