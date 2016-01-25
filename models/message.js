// package 호출
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
// schema 정의
var MessageSchema = new mongoose.Schema({
	sender: {
		type: String,
		required: true
	},
	senderName: {
		type: String
	},
	receiver: {
		type: String,
		required: true
	},
	receiverName: {
		type: String
	},
	senderProfile: {
		type: String
	},
	receiverProfile: {
		type: String
	},
	type: {
		type: String
	},
	content: {
		type: String
	},
	imagePath: {
		type: String
	},
	createAt: {
		type: String
	}
});

// Export Mongoose model
module.exports = mongoose.model('Message', MessageSchema);
