/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import './App.css'
import useSWR from "swr";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./store/counterSlice";

import useCounterStore from "./store/zustand";


const fetcher = (url: string) => fetch(url).then(res => res.json());

function App() {
  const [words, setWords] = useState<any[]>([]);
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  const { count2, increment2, decrement2, reset2, incrementByAmount2 } = useCounterStore();

  
  const { data } = useSWR("http://localhost:3020/w100", fetcher);
  // if (data?.data) {
  //   setWords(data?.data || []);
  // }

  useEffect(() => {
    // fetch('http://localhost:3020/w100',{method: 'get'})
    //   .then((res) => res.json())
    //   .then((data) => setWords(data.data || []));
    if (data?.data) {
      setWords(data?.data || []);
    }
  }, [data?.data])

  return (
    <>
      <div className="card">

      <div>
        <h2>Count: {count}</h2>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      </div>

      <div>
        <h2>Count 2: {count2}</h2>
        <button onClick={increment2}>+1</button>
        <button onClick={decrement2}>-1</button>
        <button onClick={reset2}>reset</button>
        <button onClick={() => incrementByAmount2(5)}>+5</button>
      </div>

      </div>
      
    </>
  )
}

export default App
