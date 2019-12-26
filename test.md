### new
* 创建了一个空对象，并用this变量引用该对象
* 让自己的__proto__指向了对象的prototype(原型)，继承了该对象
* 属性和方法加入了this锁引用的对象中，并执行了该函数
* 隐士的返回了this，如果在上一步执行函数返回了对象类型或者是函数类型，则返回对象和函数
```js
function selfNew(func) {
    const newObj = {}
    newObj.__proto__ = func.prototype
    const res = func.call(newObj)
    if(typeof res === 'object' || typeof res === 'Function') {
        return res
    }
    return newObj
}
```

### call
* 使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
