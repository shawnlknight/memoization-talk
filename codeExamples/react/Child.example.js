import React, {memo, useMemo} from 'react'

const Child = props => {
  const { counter, updateCounter } = props
  console.log('Child is rendering!!!')

  const number = useMemo(() => {
    let output = 0
    for (let i = 0; i < 500_000_000; i++) {
      output++
    }
    return output
  }, [])

  // Without useMemo example
  // let number = 0
  // for (let i = 0; i < 500_000_000; i++) {
  //   number++
  // }

  return (
    <div className='child component-container'>
      <h2>Child component: {counter}</h2>
      <button onClick={() => updateCounter()}>+1</button>
      <h3>Computed value: {number}</h3>
    </div>
  )
}

export default memo(Child)