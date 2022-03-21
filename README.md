PREREQUISITES
=============

NODEJS (v16.x)
------
```
# Using Ubuntu
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

CONFIG PATH
-----------
```
// next.config.js
module.exports = {
	assetPrefix: '/translation',
}
```


RUN
===
```
npm i && npm run build && npm run start -- -p 8080
```
