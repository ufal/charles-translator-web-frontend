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


## Before committing changes

```bash
# run linter and formatter
npm run lint
npm run prettier-write

# also try building for production,
# because parcel production is more strict and may fail
# even if development compiled fine:
npm run clean
npm run build
```


## Using prettier to format code

```bash
# just see what files fail
npm run prettier-check

# format all files
npm run prettier-write

# or you can just format one file:
npx prettier src/MyFile.jsx --write

# or just see what the formatted file would look like
npx prettier src/MyFile.jsx
```

Prettier is configured in `.prettierrc` and it's empty ON PURPOSE! See the [prettier philosophy](https://prettier.io/docs/en/option-philosophy). If you don't like it, don't change it. Go find medical help instead.


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
