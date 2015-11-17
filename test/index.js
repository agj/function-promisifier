'use strict';

global.Promise = require('pinkie-promise');

var promisifier = require('../');
var test = require('tape-catch');
var toArray = Function.prototype.call.bind([].slice);

function add(a, b) {
	return a + b;
}
function addProps(a, b) {
	return this[a] + this[b];
}

test("When arguments are promises", function (assert) {
	assert.plan(1);
	var addP = promisifier(add);

	addP(Promise.resolve(1), Promise.resolve(2))
	.then( function (result) {
		assert.equal(result, add(1, 2));
	});
});

test("When arguments are values", function (assert) {
	assert.plan(1);
	var addP = promisifier(add);

	addP(1, 2)
	.then( function (result) {
		assert.equal(result, add(1, 2));
	});
});

test("Respect `this`", function (assert) {
	assert.plan(1);
	var obj = {
		a: 1,
		b: 2,
		addProps: addProps,
		addPropsP: promisifier(addProps),
	};

	obj.addPropsP('a', Promise.resolve('b'))
	.then( function (result) {
		assert.equal(result, obj.addProps('a', 'b'));
	});
});

test("Specifying arity.", function (assert) {
	assert.plan(2);

	assert.equal(2, promisifier(add).length);
	assert.equal(5, promisifier.n(5, add).length);
});

test("Regardless of function arity, all arguments should be passed to target function.", function (assert) {
	assert.plan(2);
	var returnArgumentsP = promisifier(function returnArgumentsP(a, b) {
		return toArray(arguments);
	});

	returnArgumentsP(1, 2)
	.then( function (result) {
		assert.deepEqual(result, [1, 2]);
	});

	returnArgumentsP(1, 2, 3, 4, 5)
	.then( function (result) {
		assert.deepEqual(result, [1, 2, 3, 4, 5]);
	});
});

