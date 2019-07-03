const { app } = require('electron');
const ipc = require('electron').ipcRenderer;

window.bx = {
    getName() {
        return new Promise(function(resolve, reject) {
            ipc.send('gibs name');
            ipc.on('name', (stuff, name) => {
                resolve(name);
            });
        });
    },
    getVersion() {
        return new Promise(function(resolve, reject) {
            ipc.send('gibs version');
            ipc.on('version', (stuff, version) => {
                resolve(version);
            });
        });
    },
}