import React from 'react'

const Footer = () => {
  return (
    <div className = "bg-dark footerDiv text-center">
      <footer className= "container ">
      <p className="text-secondary ">All rights are reserved x {new Date().getFullYear()}. Working in test mode</p>
      </footer>
    </div>
  )
}

export default Footer
