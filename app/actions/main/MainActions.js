import alt from '../../alt';

class MainActions {
  constructor() {
    this.generateActions(
      'getUserInfoSuccess',
      'getUserInfoFail',
      'getUserListSuccess',
      'getUserListFail'
    );
  }

  getUserInfo() {
    $.ajax({ 
		url: '/api/user' ,
		type: 'GET',
		headers: {'x-access-token': localStorage.access_token}
	})
    .done(data => {
    	this.actions.getUserInfoSuccess(data);
    })
    .fail(jqXhr => {
		this.actions.getUserInfoFail();
    });
  }

  getUserList() {
    $.ajax({
		url: '/api/user/list' ,
		type: 'GET',
		headers: {'x-access-token': localStorage.access_token}
    })
    .done(data => {
    	this.actions.getUserListSuccess(data);
    })
    .fail((jqXhr) => {
	    this.actions.getUserListFail();
    });
  }
}

export default alt.createActions(MainActions);