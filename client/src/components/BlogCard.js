import React  from 'react'
import { Link } from "react-router-dom";
import timeConverter from '../hooks/date.hook';
import useMd from '../hooks/markdown.hook';
const BlogCard = ({blog, id}) => {
  const preview = `${blog.body.slice(0, 200)}${(blog.body.length > 200)?'...':''}` 
  useMd( id, preview )

  return (
    <div className="card mb-4 blogCard" >
      <div className="card-body">
        <h5 className="h5 card-title">{blog.title}</h5>
        <div className="d-flex justify-content-between">
        <p className="card-subtitle  text-muted align-self-end">by 
          <span 
            className = { 
              `${(blog.author.isAdmin)?'text-danger':''}
              text-capitalize font-weight-bold `} > {blog.author.username}
          </span>
        </p>
        <div className="d-flex  flex-column">
      <div className="row justify-content-between px-3">
        <div className="marking d-flex align-items-start  ">
          <button 
          disabled
          className={
            `pl-1 py-1 d-inline-block btn fas fa-thumbs-up text-secondary`
          } />
          <p className= ' '>{blog.likes}</p>
        </div>
        <div className="marking d-flex align-items-start ">
          <button 
          disabled
          className={
            `px-2 py-1 d-inline-block btn  fas fa-thumbs-down text-secondary`
          }/>
          <p className= ' '>{blog.dislikes}</p>
        </div>
      </div>
      <progress 
        value = {blog.likes}
        max = { blog.dislikes + blog.likes } 
        className="progress row mx-auto">
      </progress>
    </div>
        </div>
        <hr/>
        <p  id = {id} className="card-text blogPreview"></p>
        <div className="btnDate">
        <Link to= {`/blogs/${blog._id}`} className="card-link">Read more</Link>
        <p className= "mb-0 date text-secondary">
        {(blog.createdAt < blog.updatedAt)?'edited at ': ''}
        {timeConverter(blog.updatedAt)}
          
        </p>
        </div>
      </div>
      
    </div>   
  )
}
export default BlogCard