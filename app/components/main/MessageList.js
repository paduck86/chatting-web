import React from 'react';
import {Link} from 'react-router';
import Message from './Message';

class MessageList extends React.Component {
  constructor(props) {
	super(props);
	this.onChange = this.onChange.bind(this);
	
  }

  onChange(state) {
	
    this.setState(state);
  }

  componentDidMount() {
    $('#mCSB_27').mCustomScrollbar('scrollTo',['bottom','right']);
  }

  render() {
	let style1 = {overflow: 'visible'};
	let style2 = {position: 'relative'};
	let style3 = {display: 'block'};
	let style4 = {position: 'absolute',minHeight: '50px', height: '2px',top: '0px',display: 'block',maxHeight: '14px'};
	let style5 = {lineHeight: '50px'};
    return (
		<section className="l-chat-content scrollbar_message mCustomScrollbar _mCS_27 mCS-autoHide" style={style1}>
			<div id="mCSB_27"
				className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside"
				tabIndex="0">
				<div id="mCSB_27_container" className="mCSB_container"
					style={style2} dir="ltr">
					{
						this.props.messages.map((message, i) => {
							return (
								<Message key={i} message={message} sender={this.props.sender} receiver={this.props.receiver} user={this.props.user}/>
							);
						})
					}					
				</div>
			</div>
		</section>
    );
  }
}

export default MessageList;
