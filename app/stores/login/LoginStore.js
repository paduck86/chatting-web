import alt from '../../alt';
import LoginActions from '../../actions/login/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.email = '';
    this.password = '';
	this.isError = '';
	this.errorMessage = '';
  }

  onLoginSuccess(data) {
	if(data.success == true) {
		localStorage.access_token = data.access_token.token;
		window.location.href='/main';
	}else{
		if(data.isError == true) {
			this.isError = true;
			this.errorMessage = 'Invalid id or password.';
		}
	}

  }

  onLoginFail() {
    this.isError = true;
    this.errorMessage = 'Invalid id or password.';
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }

}

export default alt.createStore(LoginStore);