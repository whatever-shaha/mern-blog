import React,  { useState, useContext } from 'react'
import  useMd  from '../hooks/markdown.hook';
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const BlogCreate = ({initial = {}, edit, handleEditShown, _id}) => {
  const {register, handleSubmit, errors} = useForm()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [form, setForm] = useState(initial)
  const [isValid, setIsValid] = useState({}) 
  const [isShown, setIsShown] = useState(false)
  const {request, loading } =  useHttp()
  const handeChange = (e) => { 
    setForm({...form, [e.target.name]: e.target.value}) 
    if(e.target.name === 'title'){
      if(e.target.value.length >= 4) {
        setIsValid({...isValid, title: true})
      }else( setIsValid({...isValid, title: false}))
    } else if(e.target.name ==='body') {
      if(e.target.value.length >= 10) {
        setIsValid({...isValid, body: true})
      }else( setIsValid({...isValid, body: false}))
    }
  } 
  const handleClick = () => { setIsShown(!isShown) }

  const submit = async (input, e) => {
    console.log(e, 'input');
    e.preventDefault();
    const data = await request(
      '/api/create', "POST",
      {...input, author: auth.userId},
      {Authorization: `Bearer ${auth.token}`})
    console.log(data, 'data');
    history.push(`/blogs/${data.id}`)
  }

  const handleEdit = async (input, e) => {
    e.preventDefault();
    await request(
      '/api/create/edit', "POST",
      {...input, _id},
      {Authorization: `Bearer ${auth.token}`})
    handleEditShown()
  }

  useMd('blogPreview', form.body)

  return (
    <div className = "container my-4" >
      {edit?
      <button 
        type ='button' 
        className='btn btn-primary mb-3' 
        onClick = {handleEditShown} 
      >Go back</button> : '' }
      <form>
        <div className="form-group">
          <label htmlFor="title">Blog's title</label>
          <input 
            ref = {register({required: true, minLength:4, maxLength: 40})}
            value = {form.title}
            name= 'title'
            type="text" 
            className={`${errors.title? 'is-invalid':''} form-control ${isValid.title?'is-valid':''}`} 
            id="title" 
            placeholder="Title here" 
            onChange= {handeChange}
          />
        <div className="invalid-feedback">
          {errors.title && errors.title.type === 'minLength' && 'Minimal length for title is 4 characters' }
          {errors.title && errors.title.type === 'maxLength' && 'Maximal length for title is 40 characters' }
        </div>
        <div className="valid-feedback">Looks Good</div>
        </div>
        <div className="form-group">
          <label htmlFor="bodyText">
            Write Your thoughts
            <span className= "text-secondary"> (Markdown is supported)</span>
            </label>
          <textarea 
            ref = {register({required: true, minLength:10})}
            value = {form.body}
            name= 'body'
            className={`${errors.body? 'is-invalid':''} form-control ${isValid.body?'is-valid':''}`} 
            id="bodyText" 
            rows="3" 
            placeholder = "Enter your blog's body text here"
            onChange= {handeChange}
          ></textarea>
          <div className="invalid-feedback">
          {errors.body && errors.body.type === 'minLength' && 'Minimal length for blog\'s body is 10 characters' }
        </div>
        <div className="valid-feedback">Looks Good</div>
        </div>
        <div className="form-group">
          <input 
          type="submit" 
          value="Send" 
          className= 'btn btn-primary mr-4'
          onClick = {edit? handleSubmit(handleEdit): handleSubmit(submit)}
          disabled ={loading || ((form.title && form.body)?false:true)}
          />
          <input 
          type="button" 
          value=  {isShown? 'Hide preview': 'Show preview'} 
          className= {(form.title || form.body)? `btn btn-outline-primary ${isShown? 'active':''}`:'d-none' }
          onClick = {handleClick}
          />
        </div>
      </form>
      <div className= {isShown? "prewiev": 'd-none'}>
        <h3>{form.title}</h3>
        <div id= "blogPreview"className = "text-justify blogBody"><p></p></div>
      </div>
    </div>
  )
}

export default BlogCreate
