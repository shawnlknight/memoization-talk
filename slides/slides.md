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
