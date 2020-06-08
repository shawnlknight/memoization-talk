---
marp: true
paginate: true
theme: uncover
class: invert
---
<style>
  section {
    background: #2d3436 !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #ff7675;
  }
</style>
<!--

Welcome everyone to my talk on memoization

-->

# Memoization

---

### Shawn Leberknight
*Software Engineer* - **Somo Global**

---

<!--

So what exactly is memoization?

- A technique to optimize a function in order to reduce function calls
- Usually used with expensive function calls... i.e. calls that take a long time and/or use a lot of computing power
- There are plenty of libraries you can use like memoizee (https://www.npmjs.com/package/memoizee)

-->

### So what is it?

**Memoization** is an optimization technique used in many programming languages to reduce the number of redundant, expensive function calls.

---

### How does it work?

* Caching the values that the function returns after its initial execution.
* If the input values remain the same, the memoized function returns the cached response.
* The program does not have to recalculate anything.

---

<!--

Here is a very simple example to show how this technique works.

We don't need to worry about caching the results here since a function
like this is relatively cheap to execute. However, imagine a function
with an execution included a lot of data clean up and/or mapping of
different properties.

-->

### Simple Example

Before memoization
```javascript
function add(a, b) {
 console.log('add')
 return a + b
}
console.log(add(1, 2))
console.log(add(1, 2))

// will output the following:
// add
// 3
// add
// 3

```
---

<!--

You will see that `add` was logged twice.

So let's add some caching to this function!

-->

### Simple Example cont...

After memoization
```javascript
function add(a, b) {
 console.log('add')
 return a + b
}

const memAdd = memoize(add)
console.log(memAdd(1, 2))
console.log(memAdd(1, 2))

// will output the following:
// add
// 3
// 3

```

---

<!--

Live code `inefficientSquare` example

# Step 1:
const squareNum = num => num * num

const start = new Date()
const result1 = squareNum(40000)
console.log('result 1:', result1)
console.log('process time:', new Date() - start)

const start2 = new Date()
const result2 = squareNum(40000)
console.log('result 2:', result2)
console.log('process time:', new Date() - start2)

---------------------------------------------------

# Step 2:
const inefficientSquare = num => {
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

---------------------------------------------------

# Step 3:
NOTE: We are using JSON.stringify to create the key
but would not want to use it outside of an example.
It will not serialize certain inputs like functions or Symbols
or anything that you would not find in JSON.
// Simple memoization function example
// Sourced from: https://dev.to/nas5w/what-is-memoization-4lod
const memoize = func => {
  // Create cache for results
  const results = {}

  return (...args) => {
    console.log('results', results)
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

---------------------------------------------------

# Step 4:
With our current memoize function, the order of the parameters matters
if we want it to be able to return a cached value.

What if we had the following function we wanted to memoize? The output value
will be correct but it will not use the cache the second time.

const sum = (a, b) => {
  console.log('adding numbers')
  return a + b
}
const memoizedSum = memoize(sum)

const addResult1 = memoizedSum(1, 2)
const addResult2 = memoizedSum(2, 1)
console.log('addResult1', addResult1)
console.log('addResult2', addResult2)

---------------------------------------------------

# Step 5:
What if we wanted to memoize a function that takes in a function as an argument?

const functionArgument = (fn, num1, num2) => fn(num1, num2)
const memoizeFunctionArgument = memoize(functionArgument)

const addResult = memoizeFunctionArgument(sum, 2, 2)
console.log('addResult', addResult)

const subtractResult = memoizeFunctionArgument(subtract, 2, 2)
console.log('subtractResult', subtractResult)

The first time it runs, our cache key gets set as '[null,2,2]' b/c JSON.stringify sets
our function argument as `null`.
-->

### Some live coding!!!

---

### Some gotchas to remember

---

<!--

A fundamental rule when using memoization is you should only use them with pure functions.
There should be no side effects in the function and given a set of argument params to the function,
we should always expect the same result.

Since the variable c is outside of the scoped function, it is not pure. The final result should be 5
but the memoization library does not know the variable c has been updated and sees the inputs are the
same so it returns the wrong result of 4.

-->

### Use with pure functions only

```javascript
let c = 1
function sideEffectAdd(a, b) {
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
```

---

<!--

Be careful when memoizing functions that make network calls to other
apis where the data could have changed.
Likewise, be careful with using this technique on DB calls.

-->

### Network & database calls

* Expire cache after given period of time
* Clear cache manually if needed

---

### Resources

* https://dev.to/nas5w/what-is-memoization-4lod
* https://medium.com/better-programming/react-memo-vs-memoize-71f85eb4e1a
* https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19
