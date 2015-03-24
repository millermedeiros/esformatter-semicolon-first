//jshint node:true, eqnull:true
/*global describe, it, before*/
'use strict';

var esformatter = require('esformatter');
var fs = require('fs');
var plugin = require('../');
var expect = require('chai').expect;


describe('compare input/output', function() {

  var input;

  before(function() {
    input = getFile('input.js');
    esformatter.register(plugin);
  });

  describe('single quote', function() {
    it('should convert to single quotes and normalize escapes', function() {
      var output = esformatter.format(input);
      expect(output).to.be.eql(getFile('output.js'));
    });
  });

});


function getFile(name) {
  return fs.readFileSync('test/compare/' + name).toString();
}
