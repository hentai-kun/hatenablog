var async = require('async');

var failed = [];
var q = async.queue(function (task, callback) {
    console.log('hello ' + task.name);
	if (task.name != 'foo') {
		failed.push(task);
	}
    callback();
}, 2);


// assign a callback
q.drain = function(err) {
    console.log('finish', failed.length);
}

// // add some items to the queue

// q.push({name: 'foo'}, function (err) {
//     console.log('finished processing foo');
// });
// q.push({name: 'bar'}, function (err) {
//     console.log('finished processing bar');
// });

// // add some items to the queue (batch-wise)

// q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function (err) {
//     console.log('finished processing bar');
// });

// // add some items to the front of the queue

// q.unshift({name: 'bar'}, function (err) {
//     console.log('finished processing bar');
// });

q.push({name:'foo'});
q.push({name:'bar'});
q.push({name:'foo'});
