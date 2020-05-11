---
marp: true
paginate: true
theme: uncover
---
# **Memoization**

---

### **Shawn Leberknight** #
*Software Engineer* - **Somo Global**

---

### **So what is it?**

**Memoization** is an optimization technique used in many programming languages to reduce the number of redundant, expensive function calls.

---

### **Simple Example**

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
