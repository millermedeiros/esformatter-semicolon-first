//jshint node:true, eqnull:true
'use strict';

var tk = require('rocambole-token');
var rocambole = require('rocambole');

// need to use `stringBefore` since we are actually changing the
// behavior/structure of the program by introducing the semi-colons
exports.stringBefore = function(str) {
  var ast = rocambole.parse(str);
  tk.eachInBetween(ast.startToken, ast.endToken, processToken);
  return ast.toString();
};

// we use token after to remove line breaks and whitespaces in between the `;`
// and `[` and `(`
exports.tokenAfter = function(token) {
  if (token.value !== '[' && token.value !== '(') return;

  var prev = tk.findPrevNonEmpty(token);
  if (prev && prev.value === ';') {
    tk.removeEmptyInBetween(prev, token);
  }
};

function processToken(token) {
  if (!tk.isBr(token)) {
    return;
  }

  var opening = findOpening(token);

  // only insert semicolon if missing
  if (shouldInsert(opening)) {
    tk.before(opening, {
      type: 'Punctuator',
      value: ';'
    });
  }
}

function findOpening(token) {
  token = token.next;
  while (token) {
    // only search on current line
    if (tk.isBr(token)) return;

    var value = token.value;
    if (value === '[' || value === '(') {
      return token;
    }

    // if first non empty token in the line is not `[` or `(` we ignore it
    if (tk.isNotEmpty(token)) return;

    token = token.next;
  }
}

function shouldInsert(opening) {
  if (!opening) return;

  var prev = tk.findPrevNonEmpty(opening);
  return prev.type !== 'Punctuator' || prev.value === ')';
}

