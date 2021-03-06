'use strict';
const koa        = require('koa')
    , routes     = require('koa-route')
    , bodyParser = require('koa-bodyparser')
    , controller = require('./lib/controller')
    , app        = module.exports = koa()
    ;

// App Middleware
app.use(controller.errorHandler());
app.use(bodyParser());

// App Routes
app.use(routes.get('/', controller.getAll));
app.use(routes.post('/', controller.add));
app.use(routes.get('/:id', controller.get));
app.use(routes.put('/:id', controller.update));
app.use(routes.delete('/:id', controller.remove));

// Run Koa
app.listen(3000);
