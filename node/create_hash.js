'use strict';

var crypto = require('crypto');
var fs     = require('fs');

var data = fs.readFileSync(process.argv[2]);
var algo = ['md5', 'sha1', 'sha256', 'sha512'];

for (var i=0; i<algo.length; i++) {
    var shasum = crypto.createHash(algo[i]);
    shasum.update(data);
    console.log(algo[i] + ':', shasum.digest('hex'));
}
