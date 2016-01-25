import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {

  render() {
    return (
	  <footer className="l-welcome-footer l-flexbox l-flexbox_column l-flexbox_flexbetween">
		<div className="l-welcome-footer-logo">
		  <a href=""><img src="/files/images/logo-quickblox.svg" alt="QuickBlox"/></a>
		</div>
	  </footer>
    );
  }
}

export default Footer;