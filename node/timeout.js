'use strict';

// 処理時間
var workTime = process.argv[2];

// killされたら、終了処理をして終わる
process.on('SIGTERM', function() {
    console.log('Signal Interupted.');
    process.exit(1);
});

// Ctrl + Cされたら、終了処理をする
process.on('SIGINT', function() {
    console.log('SIGINT Interupted.');
    process.exit(1);
});


// 30秒でタイムアウト
var handle = setTimeout(function() {
    console.log('timeout.');
    process.exit(1);
}, 30*1000);

// 実際には、なにか重たい処理
console.log('work begin.');
setTimeout(function() {
    console.log('work end.');
}, workTime * 1000);

// 時間内に終了したらクリア
clearTimeout(handle);
