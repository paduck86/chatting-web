// package »£√‚
var Memo = require('../models/memo');


// Create endpoint /api/memo for POST
exports.postMemo = function(req, res){

	var memo = new Memo({
		user : req.body._id,
		receiver : req.body.receiver,
		date : req.body.date,
		content : req.body.content
	});

	memo.save(function(err) {
		if (err) 
			res.send(err);
		console.log('memo saved');
		res.status(200);
		res.json(memo);
	});
};

// Create endpoint /api/memos for GET
exports.getMemos = function(req, res) {
	console.log(req.body._id + ',,,,,,,,' + req.body.receiver);
	Memo.find({ $and: [ { user: req.body._id }, { receiver: req.body.receiver } ] }, function(err, memos) {
		if(err)
			res.send(err);
		res.json(memos);
	});
}

// Create endpoint /api/memos/:memo_id for GET
exports.getMemo = function(req, res) {
  Memo.findById({ _id: req.params.memo_id }, function(err, memo) {
    if (err)
      res.send(err);

    res.json(memo);
  });
};

// Create endpoint /api/memo/:memo_id for PUT
exports.putMemo = function(req, res) {
	Memo.findById({ _id: req.params.memo_id }, function(err, memo) {
		if (err) {
			res.status(500);
			res.json({'success': false});
		} else {
			Memo.update({ _id: req.params.memo_id }, 
						{ date: req.body.date,
							 content: req.body.content
						}, function(err) {
				if (err) {
					res.json({'success': false});
				}
				res.json({'success': true});
			});
		}
	});
};

// Create endpoint /api/memo/:memo_id for DELETE
exports.deleteMemo = function(req, res) { 
  Memo.remove({ _id: req.params.memo_id }, function(err) {
    if (err) {
      res.json({'success': false});
	}
	res.json(req.params.memo_id);
  });
};
