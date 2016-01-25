import React from 'react';
import {Link} from 'react-router';
import Header from './Header';
import Footer from './Footer';
import LoginStore from '../../stores/login/LoginStore'
import LoginActions from '../../actions/login/LoginActions';

class Login extends React.Component {
  constructor(props) {
	super(props);
	this.state = LoginStore.getState();
	this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
	
    this.setState(state);
  }

  handleSubmit(event) {
	
	if(!this.state.email || !this.state.password){
		this.valid = false;
		return;
	}else if(this.state.email.indexOf('@') == -1) {
		this.valid = false;
		return;
	}
	
	event.preventDefault();

	LoginActions.login(this.state);

  }

  onChallengeButtonClicked(event) {
	let id = event.currentTarget.id;
	if(id === 'signupQB'){
		window.location.href="/signup";
	}
  }

  render() {
    return (
		<section id="loginPage" className="l-page">
		  <div className="l-container l-flexbox l-flexbox_column l-flexbox_flexbetween">
		  <Header/>
			<form className="l-form l-flexbox l-flexbox_column">
			  <span className="text text_error">Error</span>
			  <input id="login-email" className="form-input" type="email" placeholder="Email" onChange={LoginActions.updateEmail} required/>
			  <div className="chroma-hash">
				<input id="login-password" className="form-input pattern-pass" type="password" placeholder="Password" onChange={LoginActions.updatePassword} required/>
			  </div>
			  <span className="text text_error is-error">{this.state.errorMessage}</span>
			  <button id="loginForm" className="btn btn_form btn_login btn_qb" onClick={this.handleSubmit.bind(this)}>
				Log In
			  </button>
			  <a id="loginQB" className="text text_welcome" href="/signup">
				Sign Up with Email
			  </a>
			  <br/>		
			</form>
		  <Footer/>
		  </div>
		</section>
    );
  }
}

export default Login;
