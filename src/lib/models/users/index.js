'use strict';
const db    = require('../db')           // DataBaseManager (e.g: `test-db`)
    , model = require('./schema')        // Get a schema model
    , hooks = require('./hooks')         // hooks/middleware
    , users = db.use('users');           // CollectionManager

users.schema(model);                     // Use the given model as a schema

users.pre('create', hooks.createdAt,     // `Create` hooks
                    hooks.updatedAt);
users.pre('create', hooks.hash);
users.post('create', hooks.successLog);

users.pre('update', hooks.updatedAt);     // `Update` hooks

/**
 * @exports CollectionManager(`users`)
 */
module.exports = users;