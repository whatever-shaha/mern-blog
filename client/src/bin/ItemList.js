import React, {useState, useEffect} from 'react'

function ItemLIst({getItems}) {
  const [items, setItems] = useState([])
  
  useEffect(() => { 
    const newItems = getItems();
    setItems(newItems)
    console.log('listItem');

   }, [getItems])
  return (
    <div>
      <ul>
        {items.map((i) => { return <li key = {i}> {i} </li> })}
      </ul>
    </div>
  )
}

export default ItemLIst
