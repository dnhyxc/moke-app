const { ipcRenderer } = require('electron')

function startDrag(name) {
  console.log(name, 'name')
  ipcRenderer.send('test', name)
}

window.mokeApi = {
  startDrag
}

console.log('dnhyxc')

