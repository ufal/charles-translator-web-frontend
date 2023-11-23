# Charles Translator

This repository contains the frontend single-page web application for the Charles Translator - a Charles University natural language translator.


## Development setup

You need to have [node.js](https://nodejs.org/) intalled. I recommend the [Node version manager](https://github.com/nvm-sh/nvm) tool. You can install the latest node version, but it works for me with `14.17.2`. If the project won't compile due to some strange internal exception, try upgrading node.

After cloning the repository:

```bash
npm ci # installs packages from package_lock.json at EXACT versions
```

Start the Parcel development server and you are ready to go:

```bash
npm run start
```

## Building for production

After cloning the repository:

```bash
npm ci # installs packages from package_lock.json at EXACT versions
```

Build the website and run a static webserver:

```bash
npm run clean # remove build data
npm run build # build the website into dist folder
npm run serve -- -p 8080 # start a static webserver within the dist folder
```
