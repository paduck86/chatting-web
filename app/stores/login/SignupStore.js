import alt from '../../alt';
import SignupActions from '../../actions/login/SignupActions';

class SignupStore {
  constructor() {
    this.bindActions(SignupActions);
    this.name = '';
    this.email = '';
    this.password = '';
	this.file = '';
	this.imagePreviewUrl = '';
	this.isError = '';
	this.errorMessage = '';
  }

  onSignupSuccess(data) {
	if(data.success == true) {
		window.location.href='/';
	}else{
		if( data.isExist == true ) {
			this.isError = data.isExist;
			this.errorMessage = 'A user with the same email is already exists.';		
		}
	}
  }

  onSignupFail(isExist) {
    this.isError = isExist;
    this.errorMessage = 'A user with the same email is already exists.';
  }

  onUpdateName(event) {
    this.name = event.target.value;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }

//  onUpdateFile(event) {
//	event.preventDefault();
//	let reader = new FileReader();
//	let file = event.target.files[0];
	
//	var self = this;

//	reader.onloadend = () => {
//		self.file = file;
//		self.imagePreviewUrl = reader.result;
//	}

//	reader.readAsDataURL(file);
 // }
}

export default alt.createStore(SignupStore);