import React from 'react'
import { Link } from 'react-router-dom'
const LoggingCta = ({logging, submitting, loading}) => {
  if (logging === 'login') {
    return (
      <div className = "loggingCta d-flex justify-content-between  ">
        <button 
          type = 'submit' 
          className="btn btn-primary mr-3"
          onClick= {submitting}
          disabled ={loading}
        >Log in</button> 
        <div className="d-flex">
        <p className= 'text-secondary mr-2 align-self-end'>
          Don't have an account yet? Then  
        </p>
        <Link to= "signup" className="btn btn-outline-primary"  >Sign up</Link> 
        </div>
      </div>
    )
  }
  return (
    <div className = "loggingCta d-flex justify-content-between ">
      <button 
        type = 'submit' 
        className="btn btn-primary mr-3"
        onClick= {submitting}
        disabled ={loading}
      >Sign up</button> 
      <div className="d-flex">
        <p className= 'text-secondary mr-2 align-self-end'>
          Have an account? Then  
        </p>
        <Link to= "login" className="btn btn-outline-primary" >Log in</Link>
        </div>
    </div>
  )
}

export default LoggingCta
