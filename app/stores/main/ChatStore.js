import alt from '../../alt';
import ChatActions from '../../actions/main/ChatActions';

class ChatStore {
  constructor() {
    this.bindActions(ChatActions);
	this.receiver = {
		_id: '',
		name : '',
		email : '',
		profile : '',
		role : ''
	};
	this.messages = [];
	this.filteredMessages = [];
	this.imagePath = '';
  }

  onGetReceiverInfoSuccess(data) {
    this.receiver._id = data._id;
	this.receiver.name = data.name;
	this.receiver.email = data.email;
	this.receiver.profile = data.profile;
	this.receiver.role = data.role;
  }

  onGetReceiverInfoFail() {
    //toastr.error(errorMessage);
  }

  onGetMessagesSuccess(data) {
	if(data instanceof Array) {
		this.messages = data;
	}else{
		this.messages[0] = data;
	}
	this.filteredMessages = this.messages;
  }

  onGetMessagesFail() {
    //toastr.error(errorMessage);
  }

  onPostMessagesSuccess(data) {

  }

  onPostMessagesFail() {
    //toastr.error(errorMessage);
  }

  onUpdateUserContentSucccess(data) {
  
  }
  
  onMessageAdd(message) {
	this.messages.push(message);
	this.filteredMessages = this.messages;
  }
}

export default alt.createStore(ChatStore);