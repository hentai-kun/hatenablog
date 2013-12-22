'use strict';

var cluster = require('cluster');
var cpus    = require('os').cpus();

if (cluster.isMaster) {
    // マスター側の処理

    console.log(process.pid, 'cluster begin.');

    var timeout = process.argv[2];

    // タイムアウト処理
    var handle = setTimeout(function() {
        // 処理が終わってないWorkerはkillする
        for (var id in cluster.workers) {
            var worker = cluster.workers[id];
            console.log(worker.process.pid, 'worker timeout.');
            worker.kill();
        }
    }, timeout * 1000);
    
    // Workerの終了通知
    cluster.on('exit', function() {
        for (var id in cluster.workers) {
            return;
        }

        // 全てのWorkerが終了
        console.log(process.pid, 'cluster end.');
        clearTimeout(handle);
    });

    // Worker作成
    for (var i=0; i<cpus.length; i++) {
        var worker = cluster.fork();
        worker.send((i+1) * 3);
    }

} else {
    // Workerの処理

    process.on('message', function(workTime) {
        console.log(process.pid, 'worker begin.', workTime);
        setTimeout(function() {
            console.log(process.pid, 'worker end.');
            process.exit(0);
        }, workTime * 1000);
    });

    // マスター側からのkill通知
    process.on('SIGINT', function() {
        console.log(process.pid, 'worker killed.');
        process.exit(0);
    });
}
