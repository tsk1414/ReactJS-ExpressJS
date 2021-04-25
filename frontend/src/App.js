import React from 'react';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Logout from './pages/logout';
import EZVerify from './pages/EZVerify';
import Dashboard from "./pages/dashboard";
import Create from './pages/create';
import View from './pages/view';
import Edit from './pages/edit';
import './App.css';


export default class App extends React.Component {
	render() {
    return (
		<BrowserRouter>
			<div className='banner'>
				Under Development. Some errors may occur.	
			</div>
			<ul>
				<li><Link to="/">E-Z Verify</Link></li>
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/logout">Logout</Link></li>
			</ul>

			<Switch>
				<Route path="/" exact component={EZVerify} />
				<Route path="/dashboard" exact component={Dashboard} />
				<Route path="/login" exact component={Login} />
				<Route path="/create" exact component={Create} />
				<Route path="/view" exact component={View} />
				<Route path="/edit" exact component={Edit} />
				<Route path="/logout" exact component={Logout} />
			</Switch>
		</BrowserRouter>
		

	);
  }
}