import React from 'react';
import {Link} from 'react-router';
import Header from './Header'
import Footer from './Footer';

class Welcome extends React.Component {
  onChallengeButtonClicked(event) {
	let id = event.currentTarget.id;
	if(id === 'signupQB'){
		window.location.href="/signup";
	}else if(id === 'loginQB'){
		window.location.href="/login";
	}
  }

  render() {
    return (
		<section id="welcomePage" className="l-page l-flexbox l-flexbox_column l-flexbox_flexbetween">
		  <Header/>
		  <div className="l-form l-flexbox l-flexbox_column">
			<button id="signupFB" className="btn btn_form btn_welcome btn_fb"><img className="btn-icon btn-icon_fb" src="/files/images/icon-fb.svg" alt="fb"/>Connect with Facebook</button>
			<button id="signupQB" className="btn btn_form btn_welcome btn_qb" onClick={this.onChallengeButtonClicked.bind(this)}>
				Sign Up with Email
			</button>
			<a id="loginQB" className="text text_welcome" onClick={this.onChallengeButtonClicked.bind(this)}>Already have an account?</a>
		  </div>
		  <Footer/>
		</section>
    );
  }
}

export default Welcome;
