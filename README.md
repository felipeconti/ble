# BLE

## Initial config for RPi

### Update and upgrade Linux
```sh
sudo apt-get update && sudo apt-get upgrade && sudo apt-get dist-upgrade && sudo apt-get autoremove && sudo apt-get clean
```

 * Optional: Overclock (push the TURBO button):
```sh
 sudo raspi-config
````

### install git
```sh
sudo apt-get install git
```
### install node
```sh
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### install bluetooth libs
```sh
sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```
### Finally clone repo of ble
```sh
cd ~
git clone https://github.com/felipeconti/ble.git
cd ble/client
npm install
npm start
```
