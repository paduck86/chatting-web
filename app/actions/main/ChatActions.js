import alt from '../../alt';

class ChatActions {
  constructor() {
    this.generateActions(
      'getReceiverInfoSuccess',
      'getReceiverInfoFail',
      'getMessagesSuccess',
      'getMessagesFail',
      'postMessagesSuccess',
      'postMessagesFail',
	  'updateUserContentSuccess',
	  'onMessageAdd'
    );
  }

  getReceiverInfo(id) {
    $.ajax({ 
		url: '/api/user/' + id ,
		type: 'GET',
		headers: {'x-access-token': localStorage.access_token}
	})
    .done(data => {
    	this.actions.getReceiverInfoSuccess(data);
    })
    .fail(jqXhr => {
		this.actions.getReceiverInfoFail();
    });
  }

  getMessages(id) {
    $.ajax({ 
		url: '/api/message/'+id ,
		type: 'GET',
		headers: {'x-access-token': localStorage.access_token}
	})
    .done(data => {
    	this.actions.getMessagesSuccess(data);
    })
    .fail(jqXhr => {
		this.actions.getMessagesFail();
    });
  }

  postMessage(formData) {

	
    $.ajax({ 
		url: '/api/message' ,
		type: 'POST',
		data: formData,
        processData: false,
		contentType: false,
		headers: {'x-access-token': localStorage.access_token}
	})
    .done(data => {
    	this.actions.postMessagesSuccess(data);
    })
    .fail(jqXhr => {
		this.actions.postMessagesFail();
    }); 
  }

  updateUserContent(formData) {

	$.ajax({
		url: '/api/user' ,
		type: 'PUT',
		data: formData,
		processData: false,
		contentType: false,
		headers: {'x-access-token': localStorage.access_token}	
	});
  }
}

export default alt.createActions(ChatActions);