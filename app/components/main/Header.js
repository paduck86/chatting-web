import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  constructor(props) {
	super(props);
	//this.props = props;
	//this.state = MainStore.getState();
	//this.onChange = this.onChange.bind(this);
  }
  render() {
	
	let divStyle;
	let profileSrc;
	if (this.props.user.profile && this.props.user.name){
		profileSrc = "/files/images/" + this.props.user.name + "/" + this.props.user.profile;
		divStyle = {
			backgroundImage: 'url(' + profileSrc + ')'
		};
	}

    return (
        <header className="l-header l-flexbox l-flexbox_flexbetween">
          <div className="header-logo">
            <a id="home" href="#"><img src="/files/images/logo-qmunicate.svg" alt="Q-municate"/></a>
          </div>
          <ul className="header-links l-flexbox">
            <li className="header-links-item is-hidden">
              <a id="share" href="#">
                <img className="btn-icon btn-icon_fb_header icon-normal" src="/files/images/icon-fb_header.svg" alt="fb"/>
                <img className="btn-icon btn-icon_fb_header icon-active" src="/files/images/icon-fb_header_active.svg" alt="fb"/>
                Share
              </a>
            </li>
            <li className="header-links-item">
              <a id="contacts" className="createGroupChat" href="#">Contacts</a>
            </li>
            <li className="header-links-item">
              <a id="profile" href="#"><div className="avatar" style={divStyle}></div></a>
            </li>
          </ul>
          <div className="no-connection is-hidden"><b>Not Connected.</b> Connecting...</div>
        </header>
    );
  }
}

export default Header;