'use strict';

var R = require('ramda');

var promisifierN = function (arity, fn) {
	return R.nAry(arity, function () {
		return Promise.all(arguments)
			.then(R.apply(fn.bind(this)));
	});
}

var promisifier = function (fn) {
	return promisifierN(fn.length, fn);
}


module.exports = promisifier;
