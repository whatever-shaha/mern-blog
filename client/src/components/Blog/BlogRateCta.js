import React, { useState, useEffect} from 'react'

const BlogRateCta = ({id, userId, token, isLogged}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [blogLikes, setBlogLikes] = useState(0)
  const [isDisliked, setIsDisliked] = useState(false)
  const [blogDislikes, setBlogDislikes] = useState(0)
  const [loading, setLoading] = useState(false)

  const initials = async (url, body = {id, userId}, method = "PATCH", headers= {}) => { 
    try {
      setLoading(true)
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json'
      headers.Authorization = `Bearer ${token}`

      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if(!response.ok){
        throw new Error( data.msg || 'something went wrong')
      }
      if(!isNaN(data.dislikes)) {
        setBlogDislikes(data.dislikes)
        setIsDisliked(data.disliked)
      }
      if(!isNaN(data.likes)){
        setBlogLikes(data.likes)
        setIsLiked(data.liked)
      } 
      setLoading()
      return data
    } catch (e) {
      console.log(e.message);
    }
  }
  useEffect(() => { 
    initials('/api/blog/like') }, [])

  const handleLike = () => { 
    initials('/api/blog/like',{id}, 'POST')
  }
  const handleDislike = () => { 
    initials('/api/blog/dislike',{id}, 'POST')
  }

  return (
    <div className="d-flex  flex-column">
      <div className="row justify-content-between px-3">
        <div className="marking d-flex align-items-start  ">
          <button 
          disabled = {loading || !isLogged}
          type= 'button' 
          className={
            `${isLiked? 'text-primary': 'text-secondary'} 
            pl-1 py-1 d-inline-block btn fas fa-thumbs-up`
          } 
          onClick= {handleLike}/>
          <p className= ' '>{blogLikes}</p>
        </div>
        <div className="marking d-flex align-items-start ">
          <button 
          disabled = {loading || !isLogged}
          type= 'button' 
          className={
            `${isDisliked? 'text-primary': 'text-secondary'} 
            px-2 py-1 d-inline-block btn fas fa-thumbs-down`
          } 
          onClick= {handleDislike}/>
          <p className= ' '>{blogDislikes}</p>
        </div>
      </div>
      <progress 
        value = {blogLikes}
        max = { blogDislikes + blogLikes } 
        className="progress row mx-auto">
      </progress>
    </div>
    
  )
}

export default BlogRateCta
