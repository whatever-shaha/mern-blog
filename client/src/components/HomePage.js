import React from 'react'
import {Link} from 'react-router-dom';
const HomePage = () => {
  return (
    <div className= "container text-center mt-4">
      <h3 className = 'display-5'>Welcome to my Blog</h3>
      <p className = "lead">Try it out <Link to = '/blogs' className= 'link' >now</Link></p>
    </div>
  )
}
export default HomePage