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

  code {
    background: pink;
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
- Usually used with expensive function calls... i.e. calls that take a long time
  and/or use a lot of computing power
- There are plenty of libraries you can use like memoizee
  (https://www.npmjs.com/package/memoizee)

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

# Step 1:

```javascript
const squareNum = num => num * num

const start = new Date()
const result1 = squareNum(40000)
console.log('result 1:', result1)
console.log('process time:', new Date() - start)

const start2 = new Date()
const result2 = squareNum(40000)
console.log('result 2:', result2)
console.log('process time:', new Date() - start2)
```

---------------------------------------------------

# Step 2:

```javascript
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
```

---------------------------------------------------

# Step 3:

NOTE: We are using JSON.stringify to create the key
but would not want to use it outside of an example.
As is, it will not serialize certain inputs like functions or Symbols
or anything that you would not find in JSON.
// Simple memoization function example
// Sourced from: https://dev.to/nas5w/what-is-memoization-4lod

```javascript
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
```

---------------------------------------------------

# Step 4:

With our current memoize function, the order of the parameters matters
if we want it to be able to return a cached value.

What if we had the following function we wanted to memoize? The output value
will be correct but it will not use the cache the second time.

```javascript
const sum = (a, b) => {
  console.log('adding numbers')
  return a + b
}
const memoizedSum = memoize(sum)

const addResult1 = memoizedSum(1, 2)
console.log('addResult1', addResult1)
const addResult2 = memoizedSum(2, 1)
console.log('addResult2', addResult2)
```

---------------------------------------------------

# Step 5:

What if we wanted to memoize a function that takes in a function as an argument?

```javascript
const functionArgument = (fn, num1, num2) => fn(num1, num2)
const memoizeFunctionArgument = memoize(functionArgument)

const addResult = memoizeFunctionArgument(sum, 2, 2)
console.log('addResult', addResult)
const addResult2 = memoizeFunctionArgument(sum, 2, 2)
console.log('addResult2', addResult2)


const subtract = (a, b) => {
  return a - b
}
const subtractResult = memoizeFunctionArgument(subtract, 2, 2)
console.log('subtractResult', subtractResult)
```

The first time it runs, our cache key gets set as '[null,2,2]' b/c JSON.stringify sets
our function argument as `null`.

---------------------------------------------------

# Step 6:

A fundamental rule when using memoization is you should only use them with pure
functions. There should be no side effects in the function and given a set of
argument params to the function, we should always expect the same result.

Since the variable c is outside of the scoped function, it is not pure. The final
result should be 5 but the memoization library does not know the variable c has
been updated and sees the inputs are the same so it returns the wrong result of 4.

```javascript
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

* Be wary of using memoization for this and know the possible issues
* Expire cache after given period of time
* Clear cache manually if needed

---

### React.memo & useMemo

---
<!--

React.memo is a higher order component. It’s similar to React.PureComponent but
for function components instead of classes.

If your function component renders the same result given the same props, you
can wrap it in a call to React.memo for a performance boost in some cases by
memoizing the result. This means that React will skip rendering the component,
and reuse the last rendered result.

React.memo only checks for prop changes. If your function component wrapped in
React.memo has a useState or useContext Hook in its implementation, it will still
re-render when state or context change.

By default it will only shallowly compare complex objects in the props object.
If you want control over the comparison, you can also provide a custom comparison
function as the second argument.

-->

### React.memo

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
})
```

---

#### React.memo example

```javascript
class CounterComponent extends Component {
  state = { buttonPressedCount: 0 };
  render() {
    const { buttonPressedCount } = this.state;
    return (
      <div className="new-component">
        <h4>Button Pressed Count: {buttonPressedCount}</h4>
        <button
          onClick={() =>
            this.setState({ buttonPressedCount: buttonPressedCount + 1 })
          }
        >
          Increase Count
        </button>
        <Banner type="info" />
      </div>
    );
  }
}
```

<!--
In our CounterComponent, every time we click the button we
increase the buttonPressedCount variable which causes a re-render
which is what you would expect. The problem with this is that the
Banner component also re-renders even though the props being passed
to it haven’t changed.
-->

---

#### Banner component

```javascript
const Banner = props => {
  const { type } = props;

  if (type === "info") {
    return <div className="info-banner">I am an info banner</div>;
  }
}
```

---

<!--
To circumvent this, we use memo which acts like PureComponent
in the fact that it will stop re-renders when the props haven’t
changed. Our code updated looks like
-->

#### Banner component with memo

```javascript
const Banner = React.memo(props => {
  const { type } = props

  if (type === "info") {
    return <div className="info-banner">I am an info banner</div>
  }
})
```

---

<!--

# useMemo

Returns a memoized value.

Pass a “create” function and an array of dependencies. useMemo will only
recompute the memoized value when one of the dependencies has changed. This
optimization helps to avoid expensive calculations on every render.

Remember that the function passed to useMemo runs during rendering. Don’t
do anything there that you wouldn’t normally do while rendering. For example,
side effects belong in useEffect, not useMemo.

If no array is provided, a new value will be computed on every render.

You may rely on useMemo as a performance optimization, not as a semantic
guarantee. In the future, React may choose to “forget” some previously
memoized values and recalculate them on next render, e.g. to free memory
for offscreen components. Write your code so that it still works without
useMemo — and then add it to optimize performance.

-->

### useMemo

```javascript
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b), [a, b]
})
```

---

<!--
In this example, the useMemo function would run on the first render.
It would block the thread until the expensive functions complete, as
useMemo runs in the render.

The expensive functions would never fire off again if listOfItems never
changed and we would still get the return value from them. It would make
these expensive functions seem instantaneous.
This is ideal of you have an expensive, synchronous function or two.
-->

#### useMemo example

```javascript
const List = useMemo(
  () =>
  listOfItems.map(item => ({
    ...item,
    itemProp1: expensiveFunction(props.first),
    itemProp2: anotherPriceyFunction(props.second)
  })),
  [listOfItems]
)
```

---

### Resources

* https://dev.to/nas5w/what-is-memoization-4lod
* https://medium.com/better-programming/react-memo-vs-memoize-71f85eb4e1a
* https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19
* https://reactjs.org/docs/hooks-reference.html#usememo
* https://reactjs.org/docs/react-api.html#reactmemo
* https://www.digitalocean.com/community/tutorials/react-usememo
* https://www.digitalocean.com/community/tutorials/react-learning-react-memo
