import React, { useState, useEffect } from 'react'

const Items = (props) => { 
  const [item, setItem] = useState('users')
	const [data, setData] = useState([])
	useEffect(() => { 
		fetch(`https://jsonplaceholder.typicode.com/${item}`)
		.then(response => response.json())
		.then(json => setData(json))
	}, [item])
	return (
    <div className="wrap">
				<h1>{item}</h1>
				<button className="btn btn-primary ml-1" onClick = {() => { setItem('users') }} > users </button>
				<button className="btn btn-primary ml-1" onClick = {() => { setItem('todos') }} > list </button>
				<button className="btn btn-primary ml-1" onClick = {() => { setItem('posts') }} > posts </button>
				{data.map((item) => { 
					if(item.body){
						return(
							<div className="wrap" key = {item.id}>
								<h1 >{item.title} </h1>
								<p >{item.body}</p>
							</div>
						) 
					}else if (item.name){
						return  <p key = {item.id} >{item.id + ':' +item.name}</p>
					}else {
						return(
						<div className="wrap" key = {item.id}>
							<h1  style = {{display: 'inline-block'}}>{item.title}</h1>	<input type="checkbox" name="done"   />
						</div>
						)
					}
				})}
			</div>
  )
}
export default Items