import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
  
  render() {
    return (
	  <header className="l-welcome-header l-flexbox l-flexbox_column l-flexbox_flexbetween">
		<img className="l-welcome-header-logo" src="/files/images/logo-qmunicate-big.svg" alt="Q-municate"/>
		<img className="l-welcome-header-text" src="/files/images/logo-qmunicate-text.svg" alt="Q-municate"/>
	  </header>
    );
  }
}

export default Header;