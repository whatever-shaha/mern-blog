import React, {useCallback, useState, useEffect, useContext} from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'
import timeConverter from '../../hooks/date.hook';
import { useHttp } from '../../hooks/http.hook';
import useMd from '../../hooks/markdown.hook';
import { Loader } from '../Loader';
import {AuthContext} from '../../context/AuthContext'
import BlogCta from './BlogCta';
import BlogRateCta from './BlogRateCta';
import BlogCreate from '../BlogCreate';

const Blog = () => {
  console.log('fetched Blog');
  //OPTIMIZATION ISSUE!
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {loading, request}  = useHttp()
  const [editing, setEditing] = useState(false)
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({});
  const idObj = useParams() 
  const isOwn = (auth.userId === author._id) ? true : false;
  
  const fetchBlog = useCallback( async () => { 
    try {
      const fetched = await request(`/api/blog`, 'POST', idObj )
      if(fetched.body){
        setBlog(fetched)
        setAuthor(fetched.author)
        console.log('fetched Blog');
      }
    } catch (error) {
      history.push('/500')
      console.log(error.message)
    }
  }, [idObj, request,history]);
  
  useEffect(() =>{ fetchBlog()
    return () => {  setAuthor({}); setBlog({}) }
  }, [fetchBlog, editing]);
  useMd('blogPreview', (!loading)?blog.body:'')
  
  const handleEditShown = () => {
    setEditing((prev) => !prev)
  }

  const handleDelete = async (e) => { 
    e.preventDefault()
    await request(
      '/api/blog',
      'DELETE',
      idObj,
      {Authorization: `Bearer ${auth.token}`})
    history.push('/blogs')
  }
  if(editing) {
    return <BlogCreate 
      handleEditShown = {handleEditShown}
      initial= {blog} 
      edit
      _id = {idObj.id}
    />
  }

  if (loading) {
    return <Loader />
  }
  return (
    <div className = "container my-4 blog">
      <Link to = "/blogs" className= "btn btn-primary btn-back">Back to latest</Link>
      <div className="d-flex justify-content-between  flex-column  my-3">        
        <h2 className= 'mb-0'>{blog.title}</h2>
        <div className="d-flex justify-content-between mt-2">
        <BlogCta 
          id = {idObj.id}
          handleEditShown = {handleEditShown}
          handleDelete= {handleDelete} 
          isOwn = {isOwn} 
          loading = {loading} 
        />        
        <p className= "align-self-end date text-secondary">
          {(blog.createdAt < blog.updatedAt)?'edited at ': ''}
          { timeConverter(blog.updatedAt) }
        </p>      
        </div>
      </div>
      <div className="author d-flex justify-content-between">
        <p className= "text-secondary mb-4">by 
        <span 
          className = { 
            (author.isAdmin)?
            'text-danger text-capitalize font-weight-bold':
            'text-capitalize font-weight-bold'}
          // style= {}
        > { author.username }</span>
        </p>
        <BlogRateCta 
          history = {history}
          loading = {loading} 
          token = {auth.token} 
          id = {idObj.id}
          userId = {auth.userId}
          isLogged = {auth.isLogged}
        />
      </div>
      <hr/>
      <div id = 'blogPreview' className = "text-justify blogBody mb-4"></div>
    </div>
  )
}

export default Blog
