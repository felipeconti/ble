# BLE Client

## Prerequisites

### OS X

 * install [Xcode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12)

### Linux

 * Kernel version 3.6 or above
 * ```libbluetooth-dev```

#### Ubuntu/Debian/Raspbian

```sh
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```

Make sure ```node``` is on your path, if it's not, some options:
 * symlink ```nodejs``` to ```node```: ```sudo ln -s /usr/bin/nodejs /usr/bin/node```
 * [install Node.js using the NodeSource package](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

### Windows
 
 * May the force be with you

## Install

```sh
npm install
```

## Usage

```sh
npm start

or

node client.js
```
