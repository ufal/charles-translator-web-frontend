RUN:
----
```
npm i && npm run build && npm run start -- -p 8080
```

CONFIG PATH
-----------
```
// next.config.js
module.exports = {
	assetPrefix: '/translation',
}
```