/*
# Step 1:
*/

const squareNum = (num) => num * num

const start = new Date()
const result1 = squareNum(40000)
console.log('result 1:', result1)
console.log('process time:', new Date() - start)

const start2 = new Date()
const result2 = squareNum(40000)
console.log('result 2:', result2)
console.log('process time:', new Date() - start2)

// ---------------------------------------------------

/*
# Step 2:
*/

const inefficientSquare = (num) => {
  let total = 0
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      total++
    }
  }
  return total
}

const start = new Date()
const result1 = inefficientSquare(40000)
console.log('result 1:', result1)
console.log('process time:', new Date() - start)

const start2 = new Date()
const result2 = inefficientSquare(40000)
console.log('result 2:', result2)
console.log('process time:', new Date() - start2)

// ---------------------------------------------------

/*
# Step 3:

NOTE: We are using JSON.stringify to create the key
but would not want to use it outside of an example.
As is, it will not serialize certain inputs like functions or Symbols
or anything that you would not find in JSON.
// Simple memoization function example
// Sourced from: https://dev.to/nas5w/what-is-memoization-4lod

*/

const memoize = (func) => {
  // Create cache for results
  const results = {}

  return (...args) => {
    console.log('args', args)
    console.log('results', results)
    // Create a key for our cache
    const argsKey = JSON.stringify(args)
    // Only execute func if no cache val
    if (!results[argsKey]) {
      results[argsKey] = func(...args)
    }
    return results[argsKey]
  }
}

const inefficientSquare = memoize((num) => {
  let total = 0
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      total++
    }
  }
  return total
})

// ---------------------------------------------------

/*
# Step 4:

With our current memoize function, the order of the parameters matters
if we want it to be able to return a cached value.

What if we had the following function we wanted to memoize? The output value
will be correct but it will not use the cache the second time.

*/

const sum = (a, b) => {
  console.log('adding numbers')
  return a + b
}
const memoizedSum = memoize(sum)

const addResult1 = memoizedSum(1, 2)
console.log('addResult1', addResult1)
const addResult2 = memoizedSum(2, 1)
console.log('addResult2', addResult2)

// ---------------------------------------------------

/*
# Step 5:

What if we wanted to memoize a function that takes in a function as an argument?
*/

const sum = (a, b) => {
  console.log('adding numbers')
  return a + b
}

const functionArgument = memoize((fn, num1, num2) => fn(num1, num2))

const addResult = functionArgument(sum, 2, 2)
console.log('addResult', addResult)
const addResult2 = functionArgument(sum, 2, 2)
console.log('addResult2', addResult2)

const subtract = (a, b) => {
  return a - b
}
const subtractResult = functionArgument(subtract, 2, 2)
console.log('subtractResult', subtractResult)

// The first time it runs, our cache key gets set as '[null,2,2]' b/c JSON.stringify sets
//our function argument as `null`.

// See https://www.npmjs.com/package/fast-memoize#function-arguments on how they solve for this

// ---------------------------------------------------

/*
# Step 6:

A fundamental rule when using memoization is you should only use them with pure
functions. There should be no side effects in the function and given a set of
argument params to the function, we should always expect the same result.

Since the variable c is outside of the scoped function, it is not pure. The final
result should be 5 but the memoization library does not know the variable c has
been updated and sees the inputs are the same so it returns the wrong result of 4.
*/

let c = 1
const sideEffectAdd = (a, b) => {
  console.log('sideEffectAdd')
  return a + b + c
}
const memAdd = memoize(sideEffectAdd)
console.log(memAdd(1, 2))
console.log(memAdd(1, 2))
c++
console.log(memAdd(1, 2))

// will output the following:
// sideEffectAdd
// 4
// 4
// 4

// Lets fix this!
let c = 0
const sideEffectAdd = (a, b, c) => {
  console.log('sideEffectAdd')
  return a + b + c
}

const memAdd = memoize(sideEffectAdd)
console.log(memAdd(1, 2, c))
console.log(memAdd(1, 2, c))
c++
console.log('c: ', c)
console.log(memAdd(1, 2, c))
console.log(memAdd(1, 2, c))
