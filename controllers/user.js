// package 호출
var User = require('../models/user');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var Message = require('../models/message');

// Create endpoint /signup for POST
exports.postUser = function(req, res) {

	var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        // 파일 관련 변수
		var File = files.file;
		var strFile = JSON.stringify(File);
		var obj = JSON.parse(strFile);
		console.log(fields);

        var old_path = obj.path;
        var file_size = obj.size;
        var file_ext = obj.name.split('.').pop();
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = old_path.substr(index); // + timestamp
        var new_path = '/home/files/images/' + fields.name + '/' + file_name + '.' + file_ext;	
		var dir = '/home/files/images/' + fields.name;
		
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
						User.findOne({
							email: fields.email
						}, function(err, user) {
							if (err) {
								res.json({'success': false});
								return;
							}

							if (user) {
								res.json({'success': false, 'isExist' : true});
							}
						  
							if (!user) {
								var user = new User({
									name: fields.name,
									email: fields.email,
									password: fields.password,
									profile: file_name + '.' + file_ext
								});

								user.save(function(err) {
									if (err) 
										res.send(err);
									console.log('user saved');
									res.status(200);
									res.json({'success': true});
								});
							}
						});
                    }
                });
            });
        });
	});
};

// Create endpoint /users for GET
exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if(err)
			res.send(err);
		res.json(users);
	});
};

// Create endpoint /api/user for GET
exports.getUser = function(req, res) {

	User.findById({_id:req.body._id}, function(err, user) {
		if(err)
			res.send(err);
		res.json(user);
	});
};

// Create endpoint /api/user/list for GET
exports.getUserList = function(req, res) {
	if(req.body.role == 'admin') {
		User.find({email: { $ne: 'admin@admin.com' } }, function(err, users) {
			if(err) {
				res.send(err);
			}
			res.json(users);
		});
	}else{
		User.findOne({email:'admin@admin.com'}, function(err, users) {
			if(err) {
				res.send(err);
			}
			res.json(users);
		});
	}
};

// Create endpoint /api/user/:id for GET
exports.getUserById = function(req, res) {
	User.findById({_id:req.params.id}, function(err, user) {
		if(err) {
			res.send(err);
		}
		res.json(user);
	});
};

// Create endpoint /api/user for PUT
exports.updateUser = function(req, res) {
	var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {

        if(err)
			res.json(err);

		console.log(fields);

		User.update({ _id: fields.sender }
				  , {content: fields.content} , function(err) {
			if(err) {
				res.send(err);
			}
			console.log('content saved');
		});
		
		User.update({ _id: fields.receiver }
				  , {content: fields.content} , function(err) {
			if(err) {
				res.send(err);
			}
			console.log('content saved');
		});
	});

};



