'use strict';

var pHash = require('phash');

var file1 = process.argv[2];
var file2 = process.argv[3];
console.log('compareFile: ', file1, file2);

var startTime = new Date().getTime();

var hash1 = pHash.imageHashSync(file1);
var hash2 = pHash.imageHashSync(file2);

var calcTime  = new Date().getTime() - startTime;
console.log('calcTime:', calcTime + 'ms');

var distance  = pHash.hammingDistance(hash1, hash2);
console.log('distance:', distance);

var compareTime  = new Date().getTime() - startTime - calcTime;
console.log('compareTime:', compareTime + 'ms');
