// Simple memoization function example
// Sourced from: https://dev.to/nas5w/what-is-memoization-4lod
const memoize = func => {
  // Create cache for results
  const results = {}

  return (...args) => {
    // Create a key for our cache
    const argsKey = JSON.stringify(args)
    // Only execute func if no cache val
    if(!results[argsKey]) {
      results[argsKey] = func(...args)
    }
    return results[argsKey]
  }
}

const inefficientSquare = memoize(num => {
  let total = 0
  for(let i = 0; i < num; i++) {
    for(let j = 0; j < num; j++) {
      total++
    }
  }
  return total
})

const start = new Date()
inefficientSquare(40000)
console.log(new Date() - start)

const start2 = new Date()
inefficientSquare(40000)
console.log(new Date() - start2)