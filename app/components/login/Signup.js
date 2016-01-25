import React from 'react';
import {Link} from 'react-router';
import Header from './Header'
import Footer from './Footer'
import SignupStore from '../../stores/login/SignupStore'
import SignupActions from '../../actions/login/SignupActions';

class Signup extends React.Component {
  constructor(props) {
	super(props);
	this.state = SignupStore.getState();
	this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SignupStore.unlisten(this.onChange);
  }

  onChange(state) {
	if(this.file) {
		state.file = this.file;
	}
	if(this.imagePreviewUrl) {
		state.imagePreviewUrl = this.imagePreviewUrl;
	}
	
    this.setState(state);
  }
  
  handleChange(event) {
	 event.preventDefault();
	 let reader = new FileReader();
     let file = event.target.files[0];
	 var self = this;			
	 reader.onloadend = () => {
		self.file = file;
		self.imagePreviewUrl = reader.result; 
		self.setState({
			name: self.state.name,
			email: self.state.email,
			password: self.state.password,
			file: file,
			imagePreviewUrl : reader.result,
			isError : self.state.isError,
			errorMessage : self.state.errorMessage
		});
	 } 

	 reader.readAsDataURL(file);
  }

  handleSubmit(event) {
	
	if(!this.state.name || !this.state.email || !this.state.password){
		this.valid = false;
		return;
	}else if(this.state.email.indexOf('@') == -1) {
		this.valid = false;
		return;
	}
	
	event.preventDefault();
	var formData = new FormData();
    formData.append('file', this.state.file);
	formData.append('name', this.state.name);
	formData.append('email', this.state.email);
	formData.append('password', this.state.password);

	SignupActions.signup(formData);

  }

  render() {
    let {imagePreviewUrl} = this.state;
	let divStyle;
	if(imagePreviewUrl) {
		divStyle = {
			backgroundImage: 'url(' + imagePreviewUrl + ')'
		};
	}
	

    return (
		<section id="signUpPage" className="l-page l-flexbox l-flexbox_column l-flexbox_flexbetween">
	      <div className="l-container l-flexbox l-flexbox_column l-flexbox_flexbetween">
		  <Header/>
			<form className="l-form l-flexbox l-flexbox_column" encType="multipart/form-data">
				<span className="text text_error">Error</span>
				<input id="signup-full_name" className="form-input pattern-name" type="text" placeholder="Name" onChange={SignupActions.updateName} required />
				<input id="signup-email" className="form-input" type="email" placeholder="Email" onChange={SignupActions.updateEmail} required/>
				<div className="chroma-hash">
					<input id="signup-password" className="form-input pattern-pass" type="password" placeholder="Password" onChange={SignupActions.updatePassword} required/>
				</div>
				<div className="form-file">
					<div className="form-file-custom l-flexbox_inline l-flexbox_flexcenter">
						<div style={divStyle} className="contact-avatar_signup avatar avatar_signup">
							
						</div>
						<span className="name name_signup">Choose user picture</span>
						<input id="signup-avatar" className="form-file-default" type="file" accept="image/*" 
							onChange={this.handleChange.bind(this)}/>
					</div>
				</div>
				<span className="text text_error is-error">{this.state.errorMessage}</span>
				<button id="signupForm" className="btn btn_form btn_signup btn_qb" onClick={this.handleSubmit.bind(this)}>
					Sign Up
				</button>
				<span className="text text_signup">
				clicking Sign Up, you agree to<br/>
				Q-MUNICATE <a href="http://q-municate.com/agreement/" target="_blank"><b>User Agreement</b></a>, <a href="http://quickblox.com/privacy/" target="_blank"><b>Privacy Policy</b></a>.
				</span>
			</form>
		  <Footer/>
		  </div>
		</section>
    );
  }
}

export default Signup;
