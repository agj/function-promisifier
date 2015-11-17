
function-promisifier
====================

[![Build Status](https://travis-ci.org/agj/function-promisifier.svg?branch=master)](https://travis-ci.org/agj/function-promisifier)
[![Dependency Status](https://david-dm.org/agj/function-promisifier.svg)](https://david-dm.org/agj/function-promisifier)

A small javascript utility function for [Node][node] and the browser (using [Browserify][browserify]) that converts any synchronic function into one that accepts [promises][promises] as arguments and in turn returns a promise.

[node]: https://nodejs.org/
[browserify]: http://browserify.org/
[promises]: https://www.promisejs.org/


## Usage


```js
var promisify = require('function-promisifier');

function add(a, b) { return a + b }

var add_p = promisify(add);

add_p(5, Promise.resolve(2))
.then(console.log); // => 7
```

As exemplified above, both promises and raw values can be exchangeably passed to the promisified function; however, the function will always execute asynchronously (that is, return a promise).

### Specifying arity

By default, the input function's `length` property is read, and the returned function's arity (amount of parameters) is set to match it, but you can also define it manually with the `n` method:

```js
promisify.n(1, add).length; // 1
```


## Installation

Using [Node][node], type into the command line:

```sh
npm install function-promisifier
```


## Dependencies

Uses the global `Promise` object, as defined in the ES2015 specification. For older platforms, use a polyfill.


## License

Copyright (c) 2015, agj

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
