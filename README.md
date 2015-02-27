# Koa-DocumentDB-Eaxmple
> A users CRUD app using Koa and DoQmentDB(DocumentDB wrapper)

#### Install
* clone this project
* add config file in the `src/` directory, should look like that: 
```js
module.exports = {
  HOST: 'https://your-application.documents.azure.com:443/',
  OPTIONS: {
    masterKey:'add-your-master-key-here'
  },
  DB: 'database-name' // e.g: `test`
};
```

#### Run the app:
```sh
$ node src/
```

#### Run the tests:
```sh
$ npm test
```
