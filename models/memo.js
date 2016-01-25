// package 호출
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
// schema 정의
var MemoSchema = new mongoose.Schema({
	user: {
		type: String
	},
	receiver: {
		type: String
	},
	date: {
		type: String
	},
	content: {
		type: String
	}
});
MemoSchema.plugin(timestamps);
// Export Mongoose model
module.exports = mongoose.model('Memo', MemoSchema);
