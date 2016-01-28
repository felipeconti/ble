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

### Install git
```sh
sudo apt-get install git
```
### Install node
```sh
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### Install bluetooth libs
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
===

## Wi-Fi
```sh
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```
Go to the bottom of the file and add the following:
```js
network={
    ssid="Your ESSID"
    psk="Your password"
}
```
* Get ESSID using this comand:
```sh
sudo iwlist wlan0 scan
```
Now save the file by pressing ***ctrl+x*** then ***y***, then finally press ***enter***.
```sh
sudo reboot
```
