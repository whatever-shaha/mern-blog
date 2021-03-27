import React, {useState, useCallback, useEffect} from 'react'
import ItemList from './ItemList';
function Callback() {
  const [colored, setColored] = useState(false)
  const [count, setCount] = useState(1)

  const styles = { color: colored ? 'limegreen' : 'black' }

  const temp =  useCallback(() => { return new Array(count).fill('')
    .map(( _ ,i ) => { return `index is ${i + 1}` }) }, [count])

  return (
    <div className = 'mt-4'>
      <h1 style={styles}>Количество элементов: {count}</h1>
      <button className={'btn btn-success'} onClick={() => setCount(prev => prev + 1)}>Добавить</button>
      <button className={'btn btn-warning'} onClick={() => setColored(prev => !prev)}>Изменить</button>
      <ItemList getItems = {temp}/>
    </div>
  )
}

export default Callback
