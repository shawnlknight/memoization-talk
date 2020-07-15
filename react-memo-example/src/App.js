import React, {useState, useCallback} from 'react'
import './App.css'
import Child from './Child'

function App() {
  const [counter, setCounter] = useState(0)

  return (
    <div className="App">
      <div className="parent">
        <h1>Parent component: {counter}</h1>
        <button onClick={() => setCounter(counter + 1)}>+1</button>
        <Child />
      </div>
    </div>
  )
}

export default App;
