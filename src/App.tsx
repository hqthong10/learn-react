/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'

// Component con sử dụng React.memo
const ChildComponent = React.memo(({ data }: { data: {value: number} }) => {
  console.log("🔄 ChildComponent re-render!");
  return <p>Count: {data.value}</p>;
});

const ChildClick = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("🔄 Child re-render!");
  return <button onClick={onClick}>Click me</button>;
});



function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [list, setList] = useState<any[]>([]);
  const [words, setWords] = useState<any[]>([]);
  const memoizedData = useMemo(() => ({ value: count }), [count]);
  const memoizedOnClick = useCallback(() => console.log("Clicked!"), []);
  

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

        <ChildComponent data={memoizedData} />

        <ChildClick onClick={memoizedOnClick}/>
        
      <p>

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setText(text + "a")}>Update Text</button>
      </p>

        <button onClick={addItem}>
          add
        </button>
        
      </div>
      
    </>
  )
}

export default App
