import React, { useState, useEffect, useCallback, useContext} from 'react'
import BlogCard from './BlogCard'
import { Link, useHistory } from "react-router-dom";
import { Loader } from './Loader';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext'
import BlogsPageFilter from './BlogsPageFilter';
const BlogsPage = () => {
  const history = useHistory()
  const [blogs, setBlogs] = useState([])
  const [toShow, setToShow] = useState('all')
  const {request, loading} = useHttp()
  const {isLogged, userId } = useContext(AuthContext)
  console.log(Array.isArray(blogs));
  const fetchBlogs = useCallback(async () => { 
    try {
      const data = await request('/api/latest', "POST", {filter:toShow, userId});
      console.log(toShow);
      if(Array.isArray(data)){
        setBlogs(data)
        return data
      }
      else {
        setBlogs([]); 
        history.push('/500'); 
        console.log('something');
      }
    } catch (e) {
      setBlogs([])
      console.log(e.message);
    }
  }, [request,history, toShow, userId])

  useEffect( () => { 
    fetchBlogs()
    return () => { setBlogs([]) }
  }, [fetchBlogs])

  

  const handelClick = (e) => { 
    setToShow(e.target.name)  

  }
  return (
    <div className = 'container mt-4 BlogsPage'>
      <Link 
        to = {isLogged? "/create/new": '/auth/login'} 
        className = "btn btn-primary">
        Create
      </Link>
      
      {isLogged? <BlogsPageFilter toShow = {toShow} handelClick = {handelClick} />: ''}
      <div className="my-4">
      {(loading)? <Loader/> :''}
      {(blogs.length === 0 && !loading)? <h3 className= 'text-center'>There is no blogs to show</h3> :''}
        {blogs.length !== 0? blogs.map( (blog, i) => <BlogCard id = {`cardId${i}`} blog = {blog} key={blog._id} />): ''}
      </div>
    </div>
  )
}

export default BlogsPage
