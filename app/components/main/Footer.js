import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {

  render() {
    return (
      <footer className="l-footer l-flexbox l-flexbox_flexbetween">
        <div className="footer-logo">
          <a href="#" ><img src="/files/images/logo-quickblox-gray.svg" alt="QuickBlox"/></a>
        </div>
        <div className="footer-apps l-flexbox">
          <a className="footer-apps-ios" href="#" ><img src="/files/images/icon-ios.svg" alt="download Q-municate iOS"/></a>
          <a href="#" ><img src="/files/images/icon-android.svg" alt="download Q-municate Android"/></a>
        </div>

        <nav className="footer-links">
          <ul>
            <li className="footer-links-item"><a href="#">Support</a></li>
            <li className="footer-links-item"><a href="#">FAQ</a></li>
            <li className="footer-links-item"><a href="#">Help</a></li>
          </ul>
        </nav>
      </footer>
    );
  }
}

export default Footer;