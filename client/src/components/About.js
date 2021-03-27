import React from 'react'
import {Link} from 'react-router-dom';

const About = () => {
  return (
    <div className = "container text-center mt-4">
      <h3 className = 'display-5 '>This is my blog developed based on  <a href = 'https://ru.reactjs.org/' className = "link">React</a></h3>
      <p className = "lead">You can find GitHub repository of the Blog <Link to = '/blogs' className= 'link' >here</Link></p>
    </div>
  )
}
export default About