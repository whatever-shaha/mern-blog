import {useState, useCallback, useEffect } from 'react'
const storage = 'cookie'
export const useAuth = () => { 
  const [token, setToken] = useState(null)
  const [userId, setUserId ] = useState(null)
  const [username, setUsername] = useState(null)
  
  const login = useCallback(
    (data) => {
      setUserId(data.userId)
      setToken(data.token)
      setUsername(data.username)
      const jsoned = JSON.stringify({token: data.token, userId: data.userId, username: data.username })
      localStorage.setItem(storage, jsoned)
    },
    []
  )
  const logout = useCallback(() => { 
    console.log('out!!');
    setUserId(null)
    setToken(null)
    setUsername(null)
    localStorage.removeItem(storage)
   }, []
  )
    useEffect( () => { 
      const data = JSON.parse(localStorage.getItem(storage))
      if(data && data.token){
        login(data)
      }
    }, [login])

  return {login ,logout, token, userId, username}
 }