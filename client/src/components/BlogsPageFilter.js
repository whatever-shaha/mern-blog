import React from 'react'

const BlogsPageFilter = ({toShow, handelClick}) => {
  
  return (
    <div className= 'filter'>
      <p className = 'my-3'>Blogs to Show</p>
      <div className="d-flex">
        <button 
          type = 'button' 
          className= {`${(toShow === 'all')? 'active': ''} btn btn-outline-info all-btn`} 
          name='all' 
          onClick = {handelClick}>
          All
        </button>
        <button 
          type = 'button' 
          className= {`${(toShow === 'my')? 'active': ''} btn btn-outline-info my-btn`}  
          name = 'my' 
          onClick = {handelClick}>
          My blogs
        </button>
        <button 
          type = 'button' 
          className= {`${(toShow === 'liked')? 'active': ''} btn btn-outline-info liked-btn`}  
          name = 'liked' 
          onClick = {handelClick}>
          Liked
        </button>
      </div>
    </div>
  )
}

export default BlogsPageFilter
