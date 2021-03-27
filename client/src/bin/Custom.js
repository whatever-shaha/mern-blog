import  { useState, useEffect, useRef } from 'react'

const Custom = () => {
  const [text, setText] = useState('') 
  const rendersCount = useRef(0)
  function handleChange(e) {
    setText(e.target.value)
    rendersCount.current++
  }
  useEffect(() => { console.log('custom mounted') }, [])
  return (
    <div className = 'mt-4'>
      <input 
      type="text" 
      placeholder= 'write something' 
      onChange = {(e) => { handleChange(e) }}
      value = {text}/>
      <p>{text}</p>
      <p>{rendersCount.current}</p>
    </div>
  )
}

export default Custom
