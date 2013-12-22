'use strict';

// 準備
// $ mkdir temp
// $ cd temp
// $ wget http://www.nikon-image.com/products/camera/slr/digital/d4/img/sample/img_01_l.jpg
// $ wget http://www.nikon-image.com/products/camera/slr/digital/d4/img/sample/img_02_l.jpg
// $ wget http://www.nikon-image.com/products/camera/slr/digital/d4/img/sample/img_03_l.jpg
// $ wget http://www.nikon-image.com/products/camera/slr/digital/d4/img/sample/img_04_l.jpg
// $ wget http://www.nikon-image.com/products/camera/slr/digital/d4/img/sample/img_05_l.jpg
// $ wget http://www.nikon-image.com/products/camera/slr/digital/d4/img/sample/img_06_l.jpg

var fs    = require('fs');
var im    = require('imagemagick-native');
var exec  = require('child_process').exec;
var async = require('async');

var dir   = './temp/';
var files = ['img_01_l.jpg', 'img_02_l.jpg', 'img_03_l.jpg', 'img_04_l.jpg', 'img_05_l.jpg', 'img_06_l.jpg'];


// ネイティブ版
function nativeIM() {
    var startTime = new Date().getTime();
    for (var i=0; i<files.length; i++) {
        var srcPath  = dir + files[i];
        var destPath = dir + 'native_' + files[i];

        var srcData  = fs.readFileSync(srcPath);

        var resizedBuffer = im.convert({
            srcData: srcData,
            width:  100,
            height: 100,
            resizeStyle: 'aspectfill',
            quality: 80,
            format: 'JPEG'
        });

        fs.writeFileSync(destPath, resizedBuffer, 'binary');
    }
    console.log('native:  ', new Date().getTime() - startTime + 'ms');
}


// コマンド版
function commandIM() {
    var startTime = new Date().getTime();
    async.eachSeries(files, function(file, nextFile) {
        var srcPath  = dir + file;
        var destPath = dir + 'command_' + file;

        var cmd  = 'convert -resize 100x100! -gravity center -quality 80 ' + srcPath + ' JPEG:' + destPath;
        exec(cmd, nextFile);
    }, function() {
        console.log('command: ', new Date().getTime() - startTime + 'ms');
    });
}


// 実行
nativeIM();
commandIM();
