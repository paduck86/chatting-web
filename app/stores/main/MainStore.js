import alt from '../../alt';
import MainActions from '../../actions/main/MainActions';

class MainStore {
  constructor() {
    this.bindActions(MainActions);
	this.user = {
		_id: '',
		name : '',
		email : '',
		profile : '',
		role : ''
	};
	this.userList = [];
  }

  onGetUserInfoSuccess(data) {
	this.user._id = data._id;
	this.user.name = data.name;
	this.user.email = data.email;
	this.user.profile = data.profile;
	this.user.role = data.role;
  }

  onGetUserInfoFail() {
    //toastr.error(errorMessage);
  }

  onGetUserListSuccess(data) {
	if(data instanceof Array) {
		this.userList = data;
	}else{
		this.userList[0] = data;
	}

    
  }

  onGetUserListFail(errorMessage) {
    //toastr.error(errorMessage);
  }
}

export default alt.createStore(MainStore);