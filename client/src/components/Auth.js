import React, {useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import AuthCta from './AuthCta';
import { useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import { useHistory } from "react-router-dom";


const Auth = () => {
  const auth = useContext(AuthContext)
  const {request , loading } = useHttp()
  const {logging} = useParams()
  const [form, setForm] = useState({})
  const history = useHistory()

  const handleChange = (e) => { 
    setForm({...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => { 
    e.preventDefault()
    try {
      const data = await request(`/api/auth/${logging}`, "POST", {...form})
      auth.login(data, true)
      history.push(`/blogs`)
    } catch(e){}
  }
  return (
    <div className="auth container">
      <form >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            autoComplete="username"
            type="text" 
            className="form-control" 
            name="username" 
            id="username"  
            placeholder="Enter username"
            onChange = {handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            autoComplete="password"
            type="password" 
            className="form-control" 
            name="password" 
            id="password" 
            placeholder="Password" 
            suggested =  "new-password"
            onChange = {handleChange}
          />
        </div>
        <div className={(logging === 'login')? 'd-none': "form-group" }>
          <label htmlFor="passwordRpt">Repeat Your password</label>
          <input 
            autoComplete="password"
            type="password" 
            className="form-control" 
            name="passwordRpt" 
            id="passwordRpt" 
            suggested =  "new-password"
            placeholder="Repeated password" 
            onChange = {handleChange}
          />
        </div>
        <AuthCta loading = {loading} logging = {logging} submitting={handleSubmit}/>
      </form>
    </div>
  )
}

export default Auth
