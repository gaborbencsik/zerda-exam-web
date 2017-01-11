'use strict';

var test = require('tape');
var validator = require('./server.js').validator;

test("validator accepts valid email, a scale of 15 and positive feedback");
test("validator rejects unfilled email, a scale of 15 and positive feedback");
test("validator rejects valid email, a scale of 9 and positive feedback");


test('validator send true', function (t) {
  t.equal(validator('', 10, 'a@b.com'), true);
  t.end();
})
