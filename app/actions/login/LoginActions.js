import alt from '../../alt';

class LoginActions {
	constructor() {
		this.generateActions(
			'loginSuccess',
			'loginFail',
			'updateEmail',
			'updatePassword'
		);
	}

	login(props) {
		$.ajax({
		  type: 'POST',
		  url: '/auth/login',
		  data: {email: props.email, password: props.password},
		  contentType:'application/x-www-form-urlencoded'
		})
		.done((data) => {
			this.actions.loginSuccess(data);
		})
		.fail((jqXhr) => {
			this.actions.loginFail();
		});	
	}
}

export default alt.createActions(LoginActions);