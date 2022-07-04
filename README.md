PREREQUISITES
=============

NODEJS (v16.x)
------
### Ubuntu
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```
### Windows
https://nodejs.org/en/download/

CONFIG PATH
-----------
```
// next.config.js
assetPrefix: '/translation',
```


RUN
===
```
npm i && npm run build && npm run start -- -p 8080
```
