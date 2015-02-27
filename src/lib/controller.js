'use strict';
const users = require('./models/users');

/**
 * @description
 * Get all users
 * @route /
 * @method GET
 */
function *getAllAction() {
  this.body = yield users.find({});
  this.status = 200;
}

/**
 * @description
 * Add new user
 * Do it safety with schema validation
 * @route /
 * @method POST
 */
function *addAction() {
  try {
    this.body = yield users.create(this.request.body);
    this.status = 201;
  } catch(e) {
    this.body = e.message;
    this.status = 400;
  }
}

/**
 * @description
 * Get user by id(without unexposed fields(e.g: `password`))
 * @route /:id
 * @method GET
 */
function *getAction(id) {
  this.body = yield users.findById(id);
  this.status = this.body ? 200 : 404;
}

/**
 * @description
 * Update user by id
 * We're using the `$update`(instead of `update`) function to handle concurrency well.
 * Read More: `atomic transactions`, `stored procedures`
 * @route /:id
 * @method PUT
 */
function *updateAction(id) {
  try {
    this.body = yield users.$updateOne({ id: id }, this.request.body);
    this.set('location', '/' + id);
    this.status = 204;
  } catch(e) {
    this.body = e.message;
    this.status = 400;
  }
}

/**
 * @description
 * Remove user by id
 * like above we're using the `stored-procedure` version of `$findAndRemove`
 * @route /:id
 * @method DELETE
 */
function *removeAction(id) {
  yield users.$findAndRemove({id : id});
  this.status = 200;
}

/**
 * @description
 * Error handler middleware
 * @returns {*}
 */
function errorInterceptor() {
  return function *(next) {
    try {                                  // try catch all downstream here
      yield next;
    } catch (err) {
      this.status = err.status || 500;
      this.body = err.message;
      this.app.emit('error', err, this);   // emit event for logging
    }
  }
}

/**
 * @expose
 */
module.exports = {
  errorHandler: errorInterceptor,
  getAll: getAllAction,
  update: updateAction,
  remove: removeAction,
  add: addAction,
  get: getAction
};