# typescript-node-boilerplate
A typescript express template for robust and type safe node web development. 

## Introduction
This project is born in Easybroadcast. The Typescript gives us the ability to write maintenable and type safe software in browser, which proves to be beneficial. In order to extend its action area, I've created this boilerplate in order Typescript can also be used in server side to help develop node applications. 

However, this project is in its early phase, and the test framework are not included yet.

## Features
1. Prometheus
2. Expressjs
3. Typescript
4. Webpack
5. Cassandra

## Advantage
1. With the mode development, the webpack build speed can be fast. 
2. Easy to deploy with docker. `docker run -it -v $(shell pwd)/dist:/node -e ENV=env node:12.9.0-alpine node /node/index.bundle.js`. The dependencies will be packaged by webpack, resulting in a single javascript file to run. 

## Usage
1. `yarn install` to install the dependencies. 
2. `yarn watch` to compile the typescript continuously
3. `node dist/index.bundle.js` to start the server. 
4. in order to compile the production code, `ENV=production yarn build`. 
