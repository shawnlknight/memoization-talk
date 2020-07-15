import React, {useState, useCallback} from 'react'
import './App.css'
import Child from './Child'

function App() {
  const [counter, setCounter] = useState(0)
  const [input, setInput] = useState('')
  const updateCounterFromChild = useCallback(() => setCounter(counter + 1), [counter])

  return (
    <div className="App">
      <div className="parent">
        <h1>Parent component: {counter}</h1>
        <button onClick={() => setCounter(counter + 1)}>+1</button>
        <div>
          <input type="text" onChange={e => setInput(e.target.value)} value={input}/>
        </div>
        <Child counter={counter} updateCounter={updateCounterFromChild} />
      </div>
    </div>
  )
}

export default App;