'use strict';

var nAry = require('ramda/src/nAry');
var apply = require('ramda/src/apply');
var toArray = Function.prototype.call.bind([].slice);

var promisifierN = function (arity, fn) {
	return nAry(arity, function () {
		return Promise.all(toArray(arguments))
			.then(apply(fn.bind(this)));
	});
}

var promisifier = function (fn) {
	return promisifierN(fn.length, fn);
}
promisifier.n = promisifierN;


module.exports = promisifier;
