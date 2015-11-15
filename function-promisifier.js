'use strict';

var R = require('ramda');
var toArray = Function.prototype.call.bind([].slice);

var promisifierN = function (arity, fn) {
	return R.nAry(arity, function () {
		return Promise.all(toArray(arguments))
			.then(R.apply(fn.bind(this)));
	});
}

var promisifier = function (fn) {
	return promisifierN(fn.length, fn);
}


module.exports = promisifier;
