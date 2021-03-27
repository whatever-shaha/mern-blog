import React, { useState, useMemo } from 'react'
function time(num) {
	// for (let i = 0; i < 10e7; i++) {
	// 	Math.random()
	// }
	return num*2
}
const Counter = (props) => { 
	const [count, setCount] = useState(10);
	const [color, setColor] = useState(false)
	function increment() {
		setCount((prev) =>  prev + 1 )
	}
	function decrement() {
		setCount((prev) =>  prev - 1 )
	}
	// const wasted = time(count)
	const wasted = useMemo(() => {return time(count)}, [count])
	return (
		<div className="mb-5">
			<h1 style = {{color: color?'red': 'black'}}>counter header</h1>
			<p>counter is {count} and some {wasted}</p>
			<button className="btn btn-primary" onClick = {increment}>incr</button>
			<button className="btn btn-danger" onClick = {decrement}>decr</button>
			<button className="btn btn-outline-warning" onClick = {() => { setColor((prev) => { return !prev }) }}>change</button>
		</div>
	)
}
export default Counter