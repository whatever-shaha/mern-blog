import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { useAuth } from '../hooks/auth.hook'
import { useRoutes } from '../routes';
import '../css/app.css';
import { AuthContext } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';
// import React10 from '../bin/React10';

function App() {	
	const {token, userId , username, login, logout} = useAuth()
	const isLogged = !!token
	const routes = useRoutes(isLogged)
	return (
		<AuthContext.Provider value = {{
			token,
			userId,
			username,
			isLogged,
			login,
			logout,
		}} >
			<Router>
				<Header/>
				<div className="app">					
				{routes}	
				</div>
				<Footer/>
			</Router>
		</AuthContext.Provider>
	);
}

export default App; 