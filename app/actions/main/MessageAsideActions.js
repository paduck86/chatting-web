import alt from '../../alt';

class MessageAsideActions {
  constructor() {
    this.generateActions(
      'getMemosSuccess',
      'getMemosFail',
      'saveMemoSuccess',
      'saveMemoFail',
      'updateMemoSuccess',
      'updateMemoFail',
      'deleteMemoSuccess',
      'deleteMemoFail',
	  'onMemoAdd',
	  'updateDate',
	  'updateContent',
      'getReceiverInfoSuccess'  
    );
  }

  getMemos(receiverId) {
    $.ajax({
		url: '/api/memo/list' ,
		type: 'POST',
		data: {receiver : receiverId},
		headers: {'x-access-token': localStorage.access_token}
    })
    .done(data => {
    	this.actions.getMemosSuccess(data);
    })
    .fail((jqXhr) => {
	    this.actions.getMemosFail();
    });
  }
  
  saveMemo(memo) {
    $.ajax({
		url: '/api/memo' ,
		type: 'POST',
		data: {user : memo.user,
			   receiver: memo.receiver,
			   date: memo.date,
			   content: memo.content},
		headers: {'x-access-token': localStorage.access_token}
    })
    .done(data => {
    	this.actions.saveMemoSuccess(data);
    })
    .fail((jqXhr) => {
	    this.actions.saveMemoFail();
    });
  }

  updateMemo(id,memo) {
    $.ajax({
		url: '/api/memo/' + id ,
		type: 'PUT',
		data: {user : memo.user,
			   receiver: memo.receiver,
			   date: memo.date,
			   content: memo.content},
		headers: {'x-access-token': localStorage.access_token}
    })
    .done(data => {
    	this.actions.updateMemoSuccess(data);
    })
    .fail((jqXhr) => {
	    this.actions.updateMemoFail();
    });
  }

  deleteMemo(memoId) {
    $.ajax({
		url: '/api/memo/' + memoId ,
		type: 'DELETE',
		headers: {'x-access-token': localStorage.access_token}
    })
    .done(data => {
    	this.actions.deleteMemoSuccess(data);
    })
    .fail((jqXhr) => {
	    this.actions.deleteMemoFail();
    });
  }

  getReceiverInfo(receiverId) {
    $.ajax({ 
		url: '/api/user/' + receiverId ,
		type: 'GET',
		headers: {'x-access-token': localStorage.access_token}
	}) .done(data => {
    	this.actions.getReceiverInfoSuccess(data);
    });
  }
}

export default alt.createActions(MessageAsideActions);
