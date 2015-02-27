'use strict';
/*global describe, it, before, after*/
const should  = require('should')
    , Promise = require('bluebird')
    , stub    = require('sinon').stub
    , users   = require('lib/models/users').__proto__
    , app     = require('.')
    , request = require('supertest').agent(app.listen())
    ;

// Helper function for micking result
function promisifyFn(err, data) {
  return function() {
    return new Promise(function(resolve, reject) {
      err ? reject(err) : resolve(data);
    });
  }
}

describe('Users API', function() {
  describe('GET => /', function() {
    before(function() {
      stub(users, 'find', promisifyFn(null, []));
    });

    it('should return status 200 and the result data', function(done) {
      request
        .get('/')
        .expect(function(res) {
          res.body.should.eql([]);
        })
        .expect(200, done)
    });

    after(function() {
      users.find.restore();
    });
  });

  describe('POST => /', function() {
    describe('#onSuccess', function() {
      before(function() {
        stub(users, 'create', promisifyFn(null, {}));
      });

      it('should return status `201` and the result data', function(done) {
        request
          .post('/')
          .send({})
          .expect(201, done)
      });

      after(function() {
        users.create.restore();
      });
    });

    describe('#onError', function() {
      before(function() {
        stub(users, 'create', promisifyFn(Error('Validation'), null));
      });

      it('should return status `400` and the error message', function(done) {
        request
          .post('/')
          .send({})
          .expect(400, done)
      });

      after(function() {
        users.create.restore();
      });
    });
  });

  describe('GET => /:id', function() {
    before(function() {
      let s = stub(users, 'findById');
      s.onCall(0).returns(promisifyFn(null, {})());
      s.onCall(1).returns(promisifyFn(null)());
    });

    it('should return status `200` and the result data', function(done) {
      request
        .get('/:1')
        .expect(200, done)
    });

    it('should return status `404` if the user not exist', function(done) {
      request
        .get('/1')
        .expect(404, done)
    });

    after(function() {
      users.findById.restore();
    });
  });

  describe('PUT => /:id', function() {
    describe('#onSuccess', function () {
      before(function () {
        stub(users, '$update', promisifyFn(null, {}));
      });

      it('should return status `200` and the result data', function (done) {
        request
          .put('/1')
          .send({})
          .expect(204, done)
      });

      after(function () {
        users.$update.restore();
      });
    });

    describe('#onError', function () {
      before(function () {
        stub(users, '$update', promisifyFn(Error('Validation'), null));
      });

      it('should return status `400` and the error message', function (done) {
        request
          .put('/1')
          .send({})
          .expect(400, done)
      });

      after(function () {
        users.$update.restore();
      });
    });
  });

  describe('DELETE => /:id', function() {
    before(function() {
      stub(users, '$findAndRemove', promisifyFn(null, {}));
    });

    it('should return status `200`', function(done) {
      request
        .delete('/1')
        .expect(200, done)
    });

    after(function() {
      users.$findAndRemove.restore();
    });
  });
});