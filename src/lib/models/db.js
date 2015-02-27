'use strict';
const DoQmentDB  = require('doqmentdb')
    , CONFIG     = require('../../config')          // Your configuration
    , connection = new (require('documentdb')       // Create DocumentDB connection
    .DocumentClient)(CONFIG.HOST, CONFIG.OPTIONS);

/**
 * @description
 * expose DataBaseManager, e.g(`test-db`)
 * @expose
 */
module.exports = new DoQmentDB(connection, CONFIG.DB);