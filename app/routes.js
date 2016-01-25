import React from 'react';
import {Route} from 'react-router';
import Welcome from './components/login/Welcome';
import Signup from './components/login/Signup';
import Login from './components/login/Login';
import Body from './components/main/Body';
import Main from './components/main/Main';
import Chat from './components/main/Chat';

export default (
  <Route>
	<Route path='/' component={Login} />
	<Route path='/signup' component={Signup} />
	<Route path='/' component={Main}>
		<Route path='/main' component={Body} />
		<Route path='/chat/:id' component={Chat} />
	</Route>
  </Route>

);