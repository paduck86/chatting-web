import React from 'react';
import {Link} from 'react-router';
import ChatStore from '../../stores/main/ChatStore'
import ChatActions from '../../actions/main/ChatActions';
import MessageList from './MessageList';
import Aside from './Aside';
import MessageAside from './MessageAside';

class Chat extends React.Component {
   constructor(props) {
	super(props);
	this.state = ChatStore.getState();
	this.state.sender = props.user;
	this.state.filteredMessages = [];
	this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    ChatStore.listen(this.onChange);
	if(this.props.id) {
		//this.socket= io.connect($url);

		ChatActions.getReceiverInfo(this.props.id);
		ChatActions.getMessages(this.props.id);

		socket.on('init', this._initialize);
		socket.on('send:message', this._messageReceive);
	}
  }

  componentWillUnmount() {
    this.setState({filteredMessages: this.state.messages})
  }

  onChange(state) {
	
    this.setState(state);
  }

  handleMessageSubmit(event) {
      
	  if(event.keyCode == 13) {
		  event.preventDefault();
  		  var {messages} = this.state;
		  var message = {
			  sender : this.state.sender._id,
			  senderName : this.state.sender.name,
			  receiver : this.state.receiver._id,
			  receiverName : this.state.receiver.name,
			  senderProfile : this.state.sender.profile,
			  receiverProfile : this.state.receiver.profile,
			  type : 'T', // T : text / F : file
			  content : event.currentTarget.innerText,
			  imagePath : '',
			  createAt : new Date().format('HH:mm')
		  }
		 
		  //this.setState({messages: messages});
		  ChatActions.onMessageAdd(message);
		  socket.emit('send:message', message);
		   event.currentTarget.innerText = '';
		  
		  var formData = new FormData();
		  formData.append('sender', message.sender);
		  formData.append('senderName', message.senderName);
		  formData.append('receiver', message.receiver);
		  formData.append('receiverName', message.receiverName);
		  formData.append('senderProfile', message.senderProfile);
		  formData.append('receiverProfile', message.receiverProfile);
		  formData.append('type', message.type);
		  formData.append('content', message.content);
		  ChatActions.postMessage(formData);
		  ChatActions.updateUserContent(formData);
		  $('#chat'+message.receiver).text(message.content.substring(0,5) + '...');		  

	  }

  }

  _initialize(data) {
      var {messages} = data;
      this.setState({messages, messages});
  }

  _messageReceive(message) {

	  var msg = message.message;
	  ChatActions.onMessageAdd(msg);
	  var statusStr = msg.type == 'tmpFile' ? 'photo' : msg.content.substring(0,5) + '...';
	  $('#chat'+msg.sender).text(statusStr);		
  }

  filterList(event) {
    var filteredMessages = this.state.messages;
    filteredMessages = filteredMessages.filter(function(message){
      return message.content.search(
        event.target.value) !== -1;
    });
    this.setState({filteredMessages: filteredMessages});
  }

  handleChange(event) {
	 event.preventDefault();

	 let reader = new FileReader();
     let file = event.target.files[0];
	 var self = this;			

	 reader.onloadend = () => {
		// 리스트에 넣기
		var message = {
			sender:  self.state.sender._id,
			senderName: self.state.sender.name,
			receiver: self.state.receiver._id,
			receiverName: self.state.receiver.name,
			senderProfile: self.state.sender.profile,
			receiverProfile: self.state.receiver.profile,
			type: 'tmpFile',
			imagePath: reader.result,
			createAt : new Date().format('HH:mm')
		}

		ChatActions.onMessageAdd(message);
		
		// 전송
		socket.emit('send:message', message);
		
		var formData = new FormData();
		formData.append('file', file);
		formData.append('sender', self.state.sender._id);
		formData.append('senderName', self.state.sender.name);
		formData.append('receiver', self.state.receiver._id);
		formData.append('receiverName', self.state.receiver.name);
		formData.append('senderProfile', self.state.sender.profile);
		formData.append('receiverProfile', self.state.receiver.profile);
		formData.append('type', 'F');
		ChatActions.postMessage(formData);

		$('#chat'+self.state.receiver._id).text('photo');		
	 } 

	 reader.readAsDataURL(file);
  }
  
  onButtonClick() {
	$('#attach_image').trigger('click'); 
  }

  render() {

	if(!this.props.id) {
		return (
			<div className="l-content l-flexbox">
				<Aside user={this.props.user} userList={this.props.userList} id={this.props.id}/>
				<div className="l-workspace-wrap">
					<section id="capBox" className="l-workspace l-flexbox">
					  <div className="l-cap l-flexbox l-flexbox_column">
						<span className="cap-text">Is anybody here?</span>
						<img className="cap-anybody" src="/files/images/anybody.png" alt="QuickBlox anybody"/>
					  </div>
					</section>
				</div>
			</div>
		);

	}else{
		let style = {overflow: 'hidden'};
		let profileSrc;
		let style2;
		if (this.state.receiver.profile && this.state.receiver.name){
			profileSrc = "/files/images/" + this.state.receiver.name + "/" + this.state.receiver.profile;
			style2 = {backgroundImage: 'url(' + profileSrc + ')'};
		}else{
			style2 = {backgroundImage: 'url(/files/images/ava-single.svg)'};
		}
		let style3 = {backgroundImage: 'url(/files/images/icon-attach.svg) no-repeat'};
		
		return (
			<div className="l-content l-flexbox">
				<Aside user={this.props.user} userList={this.props.userList} id={this.props.id}/>
				<div className="l-workspace-wrap">
					<section className="l-workspace l-chat l-chat_private presence-listener">
						<header className="l-chat-header l-flexbox l-flexbox_flexbetween">
							<div className="chat-title">
								<div className="l-flexbox_inline">
									<div className="contact-avatar avatar avatar_chat profileUserAvatar"
										style={style2}></div>
									<h2 className="name name_chat profileUserName">{this.state.receiver.name}</h2>
									<span className="status"></span>
								</div>
							</div>
							<div className="chat-controls">
								<form id="searchContacts" className="l-search localSearch" action="#">
								  <input className="form-input-search" type="search" placeholder="Search" onChange={this.filterList.bind(this)}/>
								</form>
							</div>
						</header>
						<MessageList messages={this.state.filteredMessages} sender={this.state.sender} receiver={this.state.receiver} user={this.state.user}/>
						
						<footer className="l-chat-footer">
							<form className="l-message" encType="multipart/form-data">
								<div className="form-input-message textarea" contentEditable="true"
									placeholder="Type a message" tabIndex="3"
									style={style} onKeyDown={this.handleMessageSubmit.bind(this)}>
								</div>
								<button className="btn_message btn_message_smile" href="#">
									<img src="/files/images/icon-smile.svg" alt="smile"/>
								</button>
								<div className="btn_message btn_message_attach" onClick={this.onButtonClick}>
									<img src="/files/images/icon-attach.svg" alt="attach" href="#"/>
									<input id="attach_image" type="file" className="attachment"  accept="image/*"  onChange={this.handleChange.bind(this)}/>
								</div>
							</form>
						</footer>
					</section>	
				</div>
				<MessageAside user={this.props.user} receiver={this.props.id}/>
			</div>
		);
	}
  }
}

export default Chat;


