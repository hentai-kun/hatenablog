'use strict';

var exec     = require('child_process').exec;
var async    = require('async');
var sprintf  = require('sprintf').sprintf;
var mongodb  = require('mongodb');

async.waterfall([

    // 接続情報
    function(next) {
        var info = {
            localName:  'localhost', // これはlocalhost固定でいいと思う
            localPort:  27717,       // ローカルでもMongDBを立ち上げているので、ポートを変えている
            serverName: 'sakura',    // 接続先のサーバー名。./ssh/configファイルのHostの値
            serverPort: 27017,       // サーバー側のポート名。MongoDBデフォルトなら27017
            database:   'test'       // 接続するデータベース名
        };
        next(null, info);
    },

    // SSHポート転送
    function(info, next) {
        var cmd = sprintf('ssh -24N -L %d:%s:%d %s', info.localPort, info.localName, info.serverPort, info.serverName);
        console.log('exec:', cmd);

        info.ssh = exec(cmd);

        // 接続されるまで少し待つ
        setTimeout(function() {
            next(null, info);
        }, 5000);
    },

    // MongoDB接続
    function(info, next) {
        var url = sprintf('mongodb://%s:%d/%s', info.localName, info.localPort, info.database);
        console.log('connect:', url);

        mongodb.MongoClient.connect(url, function(err, db) {
            next(err, info, db);
        });
    },

    // なんかの処理
    function(info, db, next) {
        var admin = new mongodb.Admin(db);
        admin.buildInfo(function (err, buildInfo) {
            console.log('MongoDB version:', buildInfo.version);
            next(err, info, db);
        });
    },

    // MongoDB切断
    function(info, db, next) {
        db.close(function(err) {
            next(err, info);
        });
    }

], function(err, info) {
    if (err) {
        console.log(err, err.stack);
    }

    // SSH切断
    if (info) {
        info.ssh.kill();
    }
});
