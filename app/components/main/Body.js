import React from 'react';
import {Link} from 'react-router';

class Body extends React.Component {

  render() {
    return (
		<section id="capBox" className="l-workspace l-flexbox">
		  <div className="l-cap l-flexbox l-flexbox_column">
			<span className="cap-text">Is anybody here?</span>
			<img className="cap-anybody" src="/files/images/anybody.png" alt="QuickBlox anybody"/>
			<button className="search btn btn_add btn_invite">
				<img className="btn-icon btn-icon_invite" src="/files/images/icon-invite.svg" alt="invite"/>
				Search for Friends
			</button>
		  </div>
		</section>
    );
  }
}

export default Body;