'use strict';

var puzzle  = require('puzzle');
var context = puzzle.context();

var file1 = process.argv[2];
var file2 = process.argv[3];
console.log('compare: ', file1, file2);

var startTime = new Date().getTime();
var distance  = context.compare(file1, file2);
var workTime  = new Date().getTime() - startTime;

console.log('distance:', distance);
console.log('workTime:', workTime + 'ms');
