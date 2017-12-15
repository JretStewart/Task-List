const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        height: 800,
        width:  1000,
        title: 'Add Item to Task List'
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function(){
        app.quit();
    })

    const mainMenu = Menu.buildFromTemplate(menuTemplate)

    Menu.setApplicationMenu(mainMenu)
});

function openAddWindow(){
    addWindow = new BrowserWindow({
      width: 300,
      height:200,
      title:'Add Shopping List Item'
    });
    addWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'addWindow.html'),
      protocol: 'file:',
      slashes:true
    }));
  }
  
  ipcMain.on('item:add', function(e, item){
    mainWindow.webContents.send('item:add', item);
  });

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    openAddWindow()
                }
            },
            {
                label: 'Load List'
            },
            {
                label: 'Quit',
                click(){
                    app.quit();
                },
                accelerator: 'Ctrl+Q'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
          {
            role: 'undo'
          },
          {
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            role: 'cut'
          },
          {
            role: 'copy'
          },
          {
            role: 'paste'
          },
          {
            role: 'selectall'
          },
          {
              label: 'Clear All',
              click(){
                mainWindow.webContents.send('item:clear');
              },
              accelerator: 'Ctrl+Shift+X'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Ctrl+R',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload()
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Ctrl+Shift+I',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.webContents.toggleDevTools()
            }
          },
          {
            type: 'separator'
          },
          {
            role: 'resetzoom'
          },
          {
            role: 'zoomin'
          },
          {
            role: 'zoomout'
          },
          {
            type: 'separator'
          },
          {
            role: 'togglefullscreen'
          }
        ]
      },
      {
        role: 'window',
        submenu: [
          {
            role: 'minimize'
          },
        ]
      }
]

