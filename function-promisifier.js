'use strict';

var apply = require('ramda/src/apply');
var toArray = Function.prototype.call.bind([].slice);

function ary(n, fn) {
	switch (n) {
		case 0: return function() { return fn.apply(this, toArray(arguments)) };
		case 1: return function(a0) { return fn.apply(this, toArray(arguments)) };
		case 2: return function(a0, a1) { return fn.apply(this, toArray(arguments)) };
		case 3: return function(a0, a1, a2) { return fn.apply(this, toArray(arguments)) };
		case 4: return function(a0, a1, a2, a3) { return fn.apply(this, toArray(arguments)) };
		case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, toArray(arguments)) };
		case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, toArray(arguments)) };
		case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, toArray(arguments)) };
		case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, toArray(arguments)) };
		case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, toArray(arguments)) };
		case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, toArray(arguments)) };
		default: throw new Error("Arity should be a number between 0 and 10.");
	}
}

var promisifierN = function (arity, fn) {
	return ary(arity, function () {
		return Promise.all(toArray(arguments))
			.then(apply(fn.bind(this)));
	});
}

var promisifier = function (fn) {
	return promisifierN(fn.length, fn);
}
promisifier.n = promisifierN;


module.exports = promisifier;
