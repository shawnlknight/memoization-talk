// Some live coding!!!

// const squareNum = num => num * num

const memoize = func => {
  // create a cache for the results
  const results = {}

  return (...args) => {
    console.log('results', results)
    // create a key for our cache
    const argsKey = JSON.stringify(args)
    // Only execute func if no cache value found
    if (!results[argsKey]) {
      results[argsKey] = func(...args)
    }
    return results[argsKey]
  }
}

const inefficientSquare = memoize(num => {
  let total = 0
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      total++
    }
  }
  return total
})

const start = new Date()
const result1 = inefficientSquare(40000)
console.log('result 1:', result1)
console.log('process time:', new Date() - start)

const start2 = new Date()
const result2 = inefficientSquare(40000)
console.log('result 2:', result2)
console.log('process time:', new Date() - start2)

const start3 = new Date()
const result3 = inefficientSquare(60000)
console.log('result 3:', result3)
console.log('process time:', new Date() - start3)

inefficientSquare(60000)