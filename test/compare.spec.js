//jshint node:true, eqnull:true
/*global describe, it, before*/
'use strict';

var esformatter = require('esformatter');
var fs = require('fs');
var path = require('path');
var plugin = require('../');
var diff = require('diff');

var basePath = path.join(__dirname, 'compare');

esformatter.register(plugin);

formatAndCompare('input.js', 'output.js');

function formatAndCompare(inputFile, expectedFile) {
  var input = getFile(inputFile);
  var expected = getFile(expectedFile);
  var output = esformatter.format(input);

  if (output !== expected) {
    process.stderr.write(diff.createPatch(expectedFile, expected, output));
    process.exit(1);
  } else {
    console.error('ok %s', inputFile);
  }
}

function getFile(name) {
  return fs.readFileSync(path.join(basePath, name)).toString();
}
