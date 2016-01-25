import alt from '../../alt';

class SignupActions {
	constructor() {
		this.generateActions(
			'signupSuccess',
			'signupFail',
			'updateName',
			'updateEmail',
			'updatePassword',
			'updateFile'
		);
	}

	signup(formData) {
		$.ajax({
		  type: 'POST',
		  url: '/signup',
		  data: formData,
          processData: false,
		  contentType: false
		})
		.done((data) => {
			this.actions.signupSuccess(data);
		})
		.fail((jqXhr) => {
			this.actions.signupFail(jqXhr.responseJSON.isExist);
		});	
	}
}

export default alt.createActions(SignupActions);