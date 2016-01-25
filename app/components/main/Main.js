import React from 'react';
import {Link} from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Chat from './Chat';
import MainStore from '../../stores/main/MainStore'
import MainActions from '../../actions/main/MainActions';

class Main extends React.Component {
  constructor(props) {
	super(props);
	this.state = MainStore.getState();
	this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    MainStore.listen(this.onChange);
	MainActions.getUserInfo();
	MainActions.getUserList();
  }

  componentWillUnmount() {
    MainStore.unlisten(this.onChange);

  }

  onChange(state) {
	
    this.setState(state);
  }

  handleSubmit(event) {
	
  }

  render() {
    return (
		<section id="mainPage" className="l-page">
			<div className="l-container">
				<Header user={this.state.user}/>

				<Chat user={this.state.user} userList={this.state.userList} id={this.props.params.id}/>
			</div>
		  <Footer/>
		</section>
    );
  }
}

export default Main;
