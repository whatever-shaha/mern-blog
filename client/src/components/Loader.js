import React from 'react'

export const Loader = () => (
  <div id = "blogPreview" style={{display: 'flex', justifyContent: 'center', paddingTop: '2rem'}}>
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>  
  </div>
)
