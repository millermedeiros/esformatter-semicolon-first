'use strict'

// should add if missing
var x = 2
[1,2,3].map(function() {})

var y = 8
(function() {
  bar()
}())

// should keep if it already contains
;[4,5].forEach(doStuff)

;(function() {
  init()
})

// should not add if not needed
if (true) {
  [1, 2, 3].map(function() {})
}
