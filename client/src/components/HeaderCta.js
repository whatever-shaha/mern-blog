import React from 'react'
import {Link} from 'react-router-dom'

const HeaderCta = ({isLogged, handleClick}) => {
  if(isLogged) {
    return (<div className="navbar-nav">
      <button className="btn btn-outline-danger" type = "button" onClick = {handleClick}>Log Out</button>
    </div>)
    
  }
  return (
    <div className="navbar-nav">
      <Link to = "/auth/login" className = "login btn btn-outline-primary">Log in</Link> 
      <Link to = "/auth/signup" className = "btn btn-primary">Sign up</Link> 
    </div>
  )
}

export default HeaderCta
