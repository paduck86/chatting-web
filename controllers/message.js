// package 호출
var Message = require('../models/message');
var User = require('../models/message');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var util = require('../util/common.js');

// Create endpoint /api/message for POST
exports.postMessage = function(req, res) {

	var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        if(err)
			res.json(err);

		// 파일 관련 변수
		var File = files.file;
		
		if(File) {
			postImage(fields, File, req, res);
		} else {
			postMessage(fields, req, res);
		}
		
	});
};

// Create endpoint /api/messages/:id for GET
exports.getMessages = function(req, res) {
	Message.find({ $or : [
		{ $and: [ { sender: req.body._id }, { receiver: req.params.id } ] },
		{ $and: [ { sender: req.params.id }, { receiver: req.body._id } ] }
	]}
	, function(err, messages) {
		if(err)
			res.send(err);
		res.json(messages);
	});
}

// Create endpoint /api/message/:message_id for GET
exports.getMessage = function(req, res) {
  Message.findById({ _id: req.params.message_id }, function(err, message) {
    if (err)
      res.send(err);

    res.json(message);
  });
};



// Create endpoint /api/message/:message_id for DELETE
exports.deleteMessage = function(req, res) { 
  Message.remove({ _id: req.params.message_id }, function(err) {
    if (err)
      res.json({'success': false});
	res.json({'success': true});
  });
};

// 이미지 업로드 
function postImage(fields, File, req, res) {
	var strFile = JSON.stringify(File);
	var obj = JSON.parse(strFile);


	var old_path = obj.path;
	var file_size = obj.size;
	var file_ext = obj.name.split('.').pop();
	var index = old_path.lastIndexOf('/') + 1;
	var file_name = old_path.substr(index); // + timestamp
	var new_path = '/home/files/images/' + fields.senderName + '/' + file_name + '.' + file_ext;	
	var dir = '/home/files/images/' + fields.senderName;
	
	// 디렉토리 없을때 만들기
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}

	fs.readFile(old_path, function(err, data) {
		fs.writeFile(new_path, data, function(err) {
			fs.unlink(old_path, function(err) {
				if (err) {
					res.status(500);
					res.json({'success': false});
				} else {
					var message = new Message({
						sender: fields.sender,
						senderName: fields.senderName,
						receiver: fields.receiver,
						receiverName: fields.receiverName,
						senderProfile: fields.senderProfile,
						receiverProfile: fields.receiverProfile,
						type: 'F',	// T : text / F : file 
						content: '',
						imagePath: file_name + '.' + file_ext,
						createAt: new Date().format('yyyy-MM-dd HH:mm')
					});

					message.save(function(err) {
						if (err) 
							res.send(err);
						console.log('message saved');
						res.status(200);
						res.json({'success': true, 'type': 'F', 'imagePath': new_path});
					});
				}
			});
		});
	});
}

// 메세지 업로드 
function postMessage(fields, req, res) {

	var message = new Message({
		sender: fields.sender,
		senderName: fields.senderName,
		receiver: fields.receiver,
		receiverName: fields.receiverName,
		senderProfile: fields.senderProfile,
		receiverProfile: fields.receiverProfile,
		type: 'T',	// T : text / F : file 
		content: fields.content,
		imagePath: '',
		createAt: new Date().format('yyyy-MM-dd HH:mm')
	});

	message.save(function(err) {
		if (err) {
			res.send(err);
		}
		User.update({ $or: [{ _id: message.sender }, { _id: message.receiver }]},
					{content: message.content}, function(err){
			if (err) {
				res.send(err);
			}
			console.log('message saved');
			res.status(200);
			res.json({'success': true});
		});
	});

}