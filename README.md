# EV-TANK Manual Server Replacement Vehicle

## Device setup
```
Advantech ADAM-6050: for Digital Device Input
Advantech ADAM-6017: for  Analog Device Input
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```
Before deploying to production, make sure to install FUSE with the following command:
```sudo apt install libfuse2```

### Auto launch application after Ubuntu Startup
Please put the electron-app.desktop under the folder:
```
~/.config/autostart/electron-app.desktop
```
Then reboot the system to check if launched in fullscreen mode
