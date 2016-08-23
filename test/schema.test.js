'use strict';
var chai = require('chai');
var expect = chai.expect;
var validator = require('json-schema-remote');
validator.setLoggingFunction(()=>{});
var schema = require('../schema/hypermediadoc.json');

describe('hypermediadoc JSON Schema', function() {
  it('has link to schema definition', function(done) {
    expect(schema).to.have.property('$schema');
    done();
  });
  it('is valid JSON Schema', function() {
    validator.validate(schema, schema.$schema, function(error, valid) {
      if (error) {
        console.log(error.errors);
      }
      expect(valid).to.be.true();
      done();
    })
  });
});
