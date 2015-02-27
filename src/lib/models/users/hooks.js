'use strict';
const bcrypt = require('bcrypt');

// Add `createdAt` field
function createdAt(next) {
  this.createdAt = new Date().toString();
  next();
}

// Generating a hash before storing in the db
function hash(next) {
  var doc = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(doc.password, salt, function(err, hash) {
      doc.password = hash;
      next();
    });
  });
}

// Add `updatedAt` field
function updatedAt(next) {
  this.updatedAt = new Date().toString();
  next();
}

// success log for create operation
function successLog(doc) {
  console.log(doc, 'saved!');
}

/**
 * @expose
 */
module.exports = {
  createdAt: createdAt,
  updatedAt: updatedAt,
  successLog: successLog,
  hash: hash
};