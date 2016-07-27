const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')

const newWindowBtn = document.getElementById('new-window')

newWindowBtn.addEventListener('click', function (event) {
  const modalPath = path.join('file://', __dirname, '../resources/foundation/index.html')
  let win = new BrowserWindow({ width: 800, height: 600 })
  win.on('close', function () { win = null })
  win.loadURL(modalPath)
  win.show()
})