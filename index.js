"use strict";
const electron = require("electron");

const app = electron.app;

// adds debug features like hotkeys for triggering dev tools and reload
require("electron-debug")();

// prevent window being garbage collected
let mainWindow;

function createMainWindow() {
    if (mainWindow) return;

    mainWindow = new electron.BrowserWindow({
        width: 600,
        height: 400
    });

    mainWindow.loadURL(`file://${__dirname}/views/main.html`);
    mainWindow.on("closed", () => mainWindow = null);
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", createMainWindow);
app.on("ready", createMainWindow);
