const Editor = require('editor-framework');

Editor.App.extend({
  init ( opts, cb ) {
    Editor.init({
      'package-search-path': [
        Editor.url('app://packages/'),
      ],
    });

    if ( cb ) {
      cb ();
    }
  },

  run () {
    // create main window
    let mainWin = new Editor.Window('main', {
      title: 'Editor Framework',
      width: 900,
      height: 700,
      minWidth: 900,
      minHeight: 700,
      show: false,
      resizable: true,
    });
    Editor.Window.main = mainWin;

    // restore window size and position
    mainWin.restorePositionAndSize();

    // load and show main window
    mainWin.load( 'app://index.html' );
    mainWin.show();

    // open dev tools if needed
    if ( Editor.argv.showDevtools ) {
      // NOTE: open dev-tools before did-finish-load will make it insert an unused <style> in page-level
      mainWin.nativeWin.webContents.once('did-finish-load', function () {
        mainWin.openDevTools({
          detach: true
        });
      });
    }
    mainWin.focus();
  },
});