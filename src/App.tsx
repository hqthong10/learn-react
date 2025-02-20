/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [list, setList] = useState<any[]>([]);
  const [words, setWords] = useState<any[]>([]);

  

  useEffect(() => {
    setList([{ name: 'name-1' }]);

    fetch('http://localhost:3020/w100',{method: 'get'})
      .then((res) => res.json())
      .then((data) => setWords(data.data || []));
  }, [])

  const addItem = () => {
    // setList((list) => list.push({ name: `name-${list.length + 1}` }));
    setList([ ...list, { name: `name-${list.length + 1}` }]);
  }

  const removeItem = (item: any) => {
    // setList((list) => list.push({ name: `name-${list.length + 1}` }));
    const _lis = list.filter((obj) => obj.name !== item.name);
    setList(_lis);
  }

  const listEle = list.map((item: any) => {
    return <p>{item.name} <button onClick={() => removeItem(item)}>remove</button></p>
  })

  return (
    <>
      <div className="card">
        <div className='list'>
          {listEle}
        </div>


        {words.length}

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button onClick={addItem}>
          add
        </button>
        
      </div>
      
    </>
  )
}

export default App
