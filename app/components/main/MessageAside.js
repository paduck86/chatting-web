import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import MessageAsideActions from '../../actions/main/MessageAsideActions';
import MessageAsideStore from '../../stores/main/MessageAsideStore';


class MessageAside extends React.Component {
  constructor(props) {
	super(props);
	this.state = MessageAsideStore.getState();
    this.user = this.props.user;
	this.receiver = this.props.receiver;
    //this.state.memo.date = moment();
	this.onChange = this.onChange.bind(this);
	this.targetId = '';
  }

  componentDidMount() {
    MessageAsideStore.listen(this.onChange);
	MessageAsideActions.getMemos(this.receiver);
	MessageAsideActions.getReceiverInfo(this.receiver);
  }	

  onChange(state) {	
    this.setState(state);
  }

  handleMemoAdd() {
	this.targetId = 'tmp';
	var memo = {
	    _id: 'tmp',
		user : '',
		receiver : '',
		date : moment().format("YYYY-MM-DD"),
		content : ''
	};
	MessageAsideActions.onMemoAdd(memo);
  }

  handleSave(event) {
	if(!this.state.memo.date || !this.state.memo.content){
		this.valid = false;
		return;
	}
	

	event.preventDefault();
	
	var memo = {
		user : this.user._id,
		receiver : this.receiver,
		date : moment().format("YYYY-MM-DD"),
		content : this.state.memo.content			
	}

	if(event.target.id == 'tmp'){
		MessageAsideActions.saveMemo(memo);
	}else{
			this.setState({memo : memo});
		MessageAsideActions.updateMemo(event.target.id, memo);
	}
 }

 handleDelete(event) {
	event.preventDefault();
	if( event.target.id === 'tmp') {
		for( var i = 0; i < this.state.memos.length; i++) {
			if(this.state.memos[i]._id == this.state.memo._id) {
				this.state.memos.splice(i,1);
				var memos = this.state.memos;
				this.setState({memos : memos});
			}
		}
	}else{
		MessageAsideActions.deleteMemo(event.target.id );
	}
 }


  render() {
	let style1 = {position: 'relative', overflow: 'visible'};
	let style2 = {position: 'relative', top: '0', left: '0'};
	let style3 = {display: 'inline',margin: '0 auto'};
	let style4 = {display: 'block'};
	let style5 = {position: 'absolute',minHeight: '50px',height: '38px',top: '0px',display: 'block',maxHeight: '119px'};
	let style6 = {lineHeight: '50px'};	
	let style7 = {float: 'right'};	
	let style8 = {width: '20',height: '20',float: 'left'};
	let style9 = {width: '100px',float: 'left'};
	let style10 = {width: '200px',float: 'left'};
	let style11 = {float: 'left'};	
	return (
		<aside className="l-rightbar">
			<div className="l-list-wrap scrollbar mCustomScrollbar _mCS_8 mCS-autoHide" style={style1}>
                <div id="mCSB_8" className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" tabIndex="0">
					<div id="mCSB_8_container" className="mCSB_container" style={style2} dir="ltr">
						
					<div id="recentList" className="l-list">
						<header className="l-list-header">
						  <h3 className="l-list-header-title">profile</h3>
						</header>
					  
						<div className="userProfile-preview">
							<div className="userProfile-field userProfile-field_email">
								<span className="userDetails-label">Name:</span>
								<span className="userProfile-email">{this.state.receiver.name}</span>
							</div>                          
							<div className="userProfile-field userProfile-field_email">
								<span className="userDetails-label">Email:</span>
								<span className="userProfile-email">{this.state.receiver.email}</span>
							</div>
						</div>
					</div>

						<div id="searchList" className="l-list">
							<header className="l-list-header">
								<div style={style3}>
									<h3 className="l-list-header-title">Memo
										<a href="#" onClick={this.handleMemoAdd.bind(this)}>
											<img src="/files/images/icon-add.svg" alt="add"/>
										</a>
									</h3>
								</div>    
							</header>
						</div>

						{
						
							this.state.memos.map((memo, i) => {

								return (
									<div style={style11} key = {i}>				
										<input className="userProfile-phone editable-profile" type="text" style={style9} value={memo.date} contentEditable="true"
											id={memo._id} onChange={MessageAsideActions.updateDate} />							
										<input className="userProfile-phone editable-profile" type="text" style={style10} value={memo.content} contentEditable="true"
											id={memo._id} onChange={MessageAsideActions.updateContent}  />						
										<img src = "/files/images/save-icon.png"  style={style8} onClick={this.handleSave.bind(this)} id={memo._id}/>
										<img src = "/files/images/delete-icon.png"  style={style8} onClick={this.handleDelete.bind(this)} id={memo._id}/>
									</div>
								);
							})
					  
						}

					</div>
				</div> 
			</div>
		</aside>        
    );
  }
}

export default MessageAside;
