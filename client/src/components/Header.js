import React, { useContext } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext';
import HeaderCta from './HeaderCta';

function Header() {
  const history = useHistory()
  
  const {logout, isLogged} = useContext(AuthContext)
  const handleClick = () => { 
    logout()
    history.push('/blogs')
   }
  return (
    <div className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark navContainer"> 
      <nav className="container">
        <div className="logo navbar-brand"><Link to = "/">BLOG</Link> </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="links navbar-collapse collapse" id="navbarNavAltMarkup">
          <div className=" navbar-nav">            
            <NavLink to = "/blogs" className = "nav-item nav-link">Latest</NavLink>             
            <NavLink to = {isLogged? "/create": '/auth/login'} className = "nav-item nav-link">Create</NavLink> 
            <NavLink to = "/about" className = "nav-item nav-link">About</NavLink> 
          </div>
          <HeaderCta isLogged ={isLogged} handleClick = {handleClick} />
        </div>
      </nav>
    </div>
  )
}

export default Header
