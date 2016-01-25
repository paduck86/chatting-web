import React from 'react';
import {Link} from 'react-router';

class Message extends React.Component {
  constructor(props) {
	super(props);
	this.sender = props.sender;
	this.receiver = props.receiver;
	this.message = props.message;
	this.user = props.user;
	
  }

  
  componentDidMount() {

  }	
  render() {
	let profileSrc;
	let style;
	if (this.message.senderProfile && this.message.senderName){
		profileSrc = "/files/images/" + this.message.senderName + "/" + this.message.senderProfile;
		style = {backgroundImage: 'url(' + profileSrc + ')'};
	}else{
		style = {backgroundImage: 'url(/files/images/ava-single.svg)'};
	}
	

	// 파일일때 img 태그 삽입
	let fileImg;
	let fileSrc;
	let imgStyle = {width:'200px',height:'200px'};
	if (this.message.type == 'F' || this.message.type == 'tmpFile' ) {
		if(this.message.type == 'F'){
			fileSrc = "/files/images/" + this.message.senderName + "/" + this.message.imagePath;
		}else{
			fileSrc = this.message.imagePath;
		}

		fileImg = (
			<div className="preview preview-photo">
				<img src={fileSrc} style={imgStyle} alt="attach" className="mCS_img_loaded"/>
			</div>
		);
	}

    return (
		<article className="message l-flexbox l-flexbox_alignstretch" data-type="message">
			<div className="message-avatar avatar contact-avatar_message profileUserAvatar" style={style}>
			</div>
			<div className="message-container-wrap">
				<div
					className="message-container l-flexbox l-flexbox_flexbetween l-flexbox_alignstretch">
					<div className="message-content">
						<h4 className="message-author">
							<span className="profileUserName">{this.message.senderName}</span>
						</h4>
						<div className="message-body">{fileImg}{this.message.content}</div>
					</div>
					<time className="message-time">{this.message.createAt}</time>
				</div>
			</div>
		</article>
    );
  }
}

export default Message;