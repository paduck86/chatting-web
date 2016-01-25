import alt from '../../alt';
import MessageAsideActions from '../../actions/main/MessageAsideActions';

class MessageAsideStore {
  constructor() {
    this.bindActions(MessageAsideActions);
	this.memo = {
	    _id: '',
		user : '',
		receiver : '',
		date : '',
		content : ''
	};
	this.memos = [];
	this.memoId  = '';
	this.receiver = {
		_id: '',
		name : '',
		email : '',
		profile : '',
		role : ''
	};
  }

  onGetReceiverInfoSuccess(data) {
    this.receiver._id = data._id;
	this.receiver.name = data.name;
	this.receiver.email = data.email;
	this.receiver.profile = data.profile;
	this.receiver.role = data.role;
  }

  onGetMemosSuccess(data) {
	if(data instanceof Array) {
		this.memos = data;
	}else{
		this.memos[0] = data;
	}

    
  }
  onGetMemosFail() {
  }
  
  onSaveMemoSuccess(data) {
	this.memo= {
		_id: data._id,
		user: data.user,
		receiver: data.receiver,
		date: data.date,
		content: data.content
	};

	for( var i = 0; i < this.memos.length; i++) {
		if(this.memos[i]._id == 'tmp') {
			this.memos.splice(i,1);
		}
	}
	this.memos.push(this.memo);
  }

  onSaveMemoFail() {

  }

  onUpdateMemoSuccess(data) {
	this.memoId = data._id;
  }

  onUpdateMemoFail() {

  }

  onDeleteMemoSuccess(data) {
	this.memoId = data;
	for( var i = 0; i < this.memos.length; i++) {
		if(this.memos[i]._id == this.memoId) {
			this.memos.splice(i,1);
		}
	}
  }

  onDeleteMemoFail() {

  }

  onMemoAdd(memo) {
	this.memo = memo;
	this.memos.push(memo);
  }

  onUpdateDate(event) {
	this.memoId = event.target.id;
	for( var i = 0; i < this.memos.length; i++) {
		if(this.memos[i]._id == this.memoId) {
			this.memo = this.memos[i] ;
			break;
		}
	}
	this.memo.date = event.target.value;
  }

  onUpdateContent(event) {
	this.memoId = event.target.id;
	for( var i = 0; i < this.memos.length; i++) {
		if(this.memos[i]._id == this.memoId) {
			this.memo = this.memos[i] ;
			break;
		}
	}	
    this.memo.content = event.target.value;
  }
}

export default alt.createStore(MessageAsideStore);
