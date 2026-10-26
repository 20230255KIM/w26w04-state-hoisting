import './App.css'
import { useState } from 'react'

function App(){
  const INITIAL_COUNTS = [
    {id: crypto.randomUUID(), value:0},
    {id: crypto.randomUUID(), value:0},
    {id: crypto.randomUUID(), value:0}
  ]
  const [counts, setCounts] = useState(INITIAL_COUNTS)
  const onIncrement=(id)=>{
    setCounts(prevCounts=>prevCounts.map((item)=>id===item.id ? {...item, value:item.value+1} : item))
  }
  const total = counts.reduce((sum, current)=>sum + current.value, 0)
  const onAddCounter = () => {
    setCounts(prevCounts => [...prevCounts, {id: crypto.randomUUID(), value:0}])
  }
  const onRemoverCounter = (id) =>{
    setCounts(prevCounts=>prevCounts.filter((item)=>id!==item.id))
  }
  const onDecrement=(id)=>{
    setCounts(prevCounts=>prevCounts.map((item)=>item.id===id&&item.value!==0?{...item, value:item.value-1}:item))
  }
  const reset=()=>{
    setCounts(prevCounts=>prevCounts.map((item)=>({...item, value:0})))
  }
  return(
    <div>
      <h1>총합: {total}</h1>
      <button onClick = {onAddCounter}>추가</button>
      <button onClick = {reset}>초기화</button>
      {counts.map((item) => <Counter count = {item.value} key = {item.id} onIncrement  = {()=>onIncrement(item.id)} onRemoverCounter={()=>onRemoverCounter(item.id)} onDecrement = {()=>onDecrement(item.id)}/>)}
    </div>
  )
}

function Counter({count, onIncrement, onRemoverCounter, onDecrement}){
  const [bgColor, setBgColor] = useState(
          () => '#' + Math.floor(Math.random()*16777215)
            .toString(16)
            .padStart(6, '0')
  )
  return(
    <div style = {{backgroundColor : bgColor}}>
      <h1>{count}</h1>
      <button onClick={onIncrement}>증가</button>
      <button onClick={onDecrement}>감소</button>
      <button onClick={onRemoverCounter}>삭제</button>
    </div>
  )
}

export default App