---
marp: true
paginate: true
theme: uncover
class: invert
---

<style>
  section {
    background: #2d3436 !important;
    padding: 20px !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #ff7675;
  }
  li {
    font-size: 30px;
  }

</style>
<!--

Welcome everyone to my talk on memoization

-->

# Memoization

---

<!--
Give some background on what I do and what I have been working on.

Explain why I came across memoization.
-->

### Shawn Leberknight

_Software Engineer_

---

<!--

So what exactly is memoization?

- A technique to optimize a function in order to reduce function calls
- Usually used with expensive function calls... i.e. calls that take a long time
  and/or use a lot of computing power
- There are plenty of libraries you can use like memoizee
  (https://www.npmjs.com/package/memoizee)

-->

### So what is it?

**Memoization** is an optimization technique used in many programming languages to reduce the number of redundant, expensive function calls.

---

### How does it work?

- Caching the values that the function returns after its initial execution.
- If the input values remain the same, the memoized function returns the cached response.
- The program does not have to recalculate anything.

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
function sum(a, b) {
  console.log('add')
  return a + b
}
console.log(sum(1, 2))
console.log(sum(1, 2))

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

After memoization

```javascript
function sum(a, b) {
  console.log('add')
  return a + b
}

const memSum = memoize(sum)
console.log(memSum(1, 2))
console.log(memSum(1, 2))

// will output the following:
// add
// 3
// 3
```

---

<!--

Live coding!!!

*Use examples from codeExamples/node/index.example.js*

```
-->

### Some live coding!!!

---

### Some other things to remember

---

<!--

Be careful when memoizing functions that make network calls to other
apis where the data could have changed.
Likewise, be careful with using this technique on DB calls.

-->

### Network & database calls

- Be wary of using memoization for this and know the possible issues
- Expire cache after given period of time
- Clear cache manually if needed

---

<!--

React.memo, useCallback, & useMemo

Resources:
https://reactjs.org/docs/react-api.html#reactmemo
https://reactjs.org/docs/hooks-reference.html#usecallback
https://www.youtube.com/watch?v=3cYtqrNUiVw

-->

### React.memo, useCallback, & useMemo

---

#### Resources

- https://dev.to/nas5w/what-is-memoization-4lod
- https://medium.com/better-programming/react-memo-vs-memoize-71f85eb4e1a
- https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19
- https://reactjs.org/docs/hooks-reference.html#usememo
- https://reactjs.org/docs/react-api.html#reactmemo
- https://www.digitalocean.com/community/tutorials/react-usememo
- https://www.digitalocean.com/community/tutorials/react-learning-react-memo
- https://www.youtube.com/watch?v=3cYtqrNUiVw
