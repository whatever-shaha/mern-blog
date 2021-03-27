import {useState, useCallback } from 'react';

export const useHttp = () => { 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback( async (url, method = "GET", body = null, headers= {}) => { 
    setLoading(true)
    headers['Content-Type'] = 'application/json'
    try {
      if(body) {
        body = JSON.stringify(body);
      }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if(!response.ok){
        throw new Error( data.msg || 'something went wrong')
      }
      setLoading(false)
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
    }
  }, [])
  const clearError = () => { setError(null) }
  return {loading, error, request, clearError  }
 }