const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const net = require('net');

const serverPort = 65432;
const serverAddr = "192.168.1.6";

let mainWindow;
let client;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    client = net.createConnection({ port: serverPort, host: serverAddr }, () => {
        console.log('connected to server!');
    });

    client.on('data', (data) => {
        mainWindow.webContents.send('data-from-server', data.toString());
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });
}

app.whenReady().then(createWindow);

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('send-to-server', (event, data) => {
    client.write(`${data}\r\n`);
});