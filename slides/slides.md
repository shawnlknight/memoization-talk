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
* If the input values remain the same, the memoized function returns the cahced response.
* The program does not have to recalculate anything.

---

<!--

Here is a very simple example to show how this technique works

-->

### Simple Example

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

<!--

Live code `inefficientSquare` example

-->

---

### Some live coding!!!

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

### Resources

* https://dev.to/nas5w/what-is-memoization-4lod
* https://medium.com/better-programming/react-memo-vs-memoize-71f85eb4e1a
* https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19

---
