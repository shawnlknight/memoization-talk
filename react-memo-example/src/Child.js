import React from 'react'

const Child = props => {
  console.log('Child is rendering!!!')

  return (
    <div className='child'>
      <h2>Child component</h2>
    </div>
  )
}

export default Child