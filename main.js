const { app, BrowserWindow, globalShortcut } = require("electron");

require("dotenv").config({ path: __dirname + "/.env" });

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/preload.js",
    },
    frame: false,
    alwaysOnTop: true,
    useContentSize: true,
    transparent: true,
  });

  win.loadFile("index.html");

  win.on("blur", (e) => {
    // window外をクリックしたタイミング(blur)で閉じる
    app.hide();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("ready", function () {
  globalShortcut.register("alt+space", function () {
    // 現在focusしているwindowを取得
    const window = BrowserWindow.getFocusedWindow();
    // windowが存在すればhide、なければshow
    window ? hideWindow(window) : showWindow();
  });
});

app.on("will-quit", function () {
  // 終了するタイミングで全てのglobalShortcutを解除
  globalShortcut.unregisterAll();
});

function showWindow() {
  // focusさせる事でBrowserWindowのblurイベントを検知させる
  app.focus({ steal: true });
  app.show();
}

function hideWindow(window) {
  // center()する事でshowする時に中央で表示される
  window.center();
  app.hide();
}
