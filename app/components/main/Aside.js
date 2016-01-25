import React from 'react';
import {Link} from 'react-router';

class Aside extends React.Component {
  constructor(props) {
	super(props);

  }

  componentDidMount(){

  }
	
  handleChange(event) {
	$('#userList').children('li').removeClass('is-selected').addClass('is-not-selected');
	this.props.userList.map(function(user){
		user.isSelected = false;
	});
	var target = event.target.parentNode.parentNode;
	if (target.nodeName === 'LI') {
		target.className="list-item dialog-item presence-listener is-selected";
		window.location.href='/chat/'+target.id;
	}

	
  }
  
  render() {
	let userList = this.props.userList.map((user, index) => {

			
		let divStyle;
		let profileSrc;
		if (user.profile && user.name){
			profileSrc = "/files/images/" + user.name + "/" + user.profile;
			divStyle = {
				backgroundImage: 'url(' + profileSrc + ')'
			};
		}
		let divStyle2 = {
			backgroundColor: '#f8f8ff'
		}
		
		let liClass;
		if(this.props.id == user._id){
			liClass = "list-item dialog-item presence-listener is-selected";
		}else{
			liClass = "list-item dialog-item presence-listener is-not-selected";
		}
		let spanStyle = {
			float: 'right',
			color: '#008b8b'
		};
		let spanId = 'chat' + user._id;

		return (

			<li className={liClass} key={user._id} id={user._id} onClick={this.handleChange.bind(this)} >
				<a href="#" className="contact l-flexbox">
					<div className="l-flexbox_inline">
						<div className="contact-avatar avatar profileUserAvatar" style={divStyle}></div>
						<span className="name profileUserName">{user.name}</span> <br/>
						
					</div>
					<span id={spanId} style={spanStyle}> <img/><img/><img/> {user.content}</span>	
				</a>

			</li>
		);

	});
    return (
		<aside className="l-sidebar">

			<div className="l-list-wrap scrollbar">

			  <section id="requestsList" className="l-list">
				<header className="l-list-header">
				  <h3 className="l-list-header-title">UserList</h3>
				</header>
				<ul id='userList' className="list list_contextmenu">
					{userList}
			    </ul>
			  </section>

			</div>
		 </aside>
    );
  }
}

export default Aside;