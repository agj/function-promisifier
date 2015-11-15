'use strict';

global.Promise = require('pinkie-promise');

var promisifier = require('../');
var test = require('tape-catch');

function add(a, b) {
	return a + b;
}
function addProps(a, b) {
	return this[a] + this[b];
}

test("When arguments are promises", function (assert) {
	var addP = promisifier(add);

	addP(Promise.resolve(1), Promise.resolve(2))
	.then( function (result) {
		assert.equal(result, add(1, 2));
		assert.end();
	});
});

test("When arguments are values", function (assert) {
	var addP = promisifier(add);

	addP(1, 2)
	.then( function (result) {
		assert.equal(result, add(1, 2));
		assert.end();
	});
});

test("Respect `this`", function (assert) {
	var obj = {
		a: 1,
		b: 2,
		addProps: addProps,
		addPropsP: promisifier(addProps),
	};

	obj.addPropsP('a', Promise.resolve('b'))
	.then( function (result) {
		assert.equal(result, obj.addProps('a', 'b'));
		assert.end();
	});
})

