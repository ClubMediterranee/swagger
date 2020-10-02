
<p align="center">
<img src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" alt="Swagger logo" width="250" />
</p>

> Swagger UI plugins and application developped by Clubmed.

See our OpenSpec documentation here: https://api.clubmed.com/doc/

## Prerequisite

* [nvm](https://github.com/creationix/nvm)
* [Node.js](https://nodejs.org) 
* [Yarn](https://yarnpkg.com/) 

Install node and yarn:
```
# nvm
nvm install v12.13.1
nvm alias default v12.13.1
nvm use default

# ensure npm is at its latest version
npm i -g npm

#yarn
npm install -g yarn
```

> Note: Behind the scene, this monorepo is built with lerna and yarn workspaces

> Note: CI and deployement are done with CircleCI

## Frameworks
    
* [React](https://fr.reactjs.org/)
* [Redux](https://redux.js.org/)
* [Swagger](http://swagger.io/)
* [Lerna](https://lerna.js.org/)
* [Babel](https://babeljs.io/)
* [Webpack](https://webpack.js.org/)

## Run in Development

Run theses command to start application:

```sh
# start app on http://localhost:8083
yarn start:swagger
```

Then open this url in your browser: [http://localhost:8083/](http://localhost:3003/)
