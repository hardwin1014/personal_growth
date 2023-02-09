/*
* 调用new的过程中会发生四件事情
* 1. 首先创建了一个新的空对象
* 2. 设置原型，将对象的原型设置为函数的prototype对象
* 3. 让函数的this指向这个对象,执行构造函数的代码（为这个新对象添加属性）
* 4. 判断函数的返回值类型, 如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
* */

//Fun为构造函数, args表示传参
function createNew(Fn,...args) {
    // 创建空对象
    let newObj = null
    // 获取Fn构造函数
    // 这里由于argumens虽然是类数组类型，但并没有数组中的方法，因此使用call将数组的shift()方法绑定给arguments
    // 这里constructor为Fn，arguments为...args,即需传入构造函数中的参数。
    let constructor = Array.prototype.shift.call(arguments)
    let result = null
    // 判断构造函数的函数类型
    if(typeof constructor !== 'function')  {
        console.log('type error')
        return
    }
    // 原型链链接
    newObj = Object.create(constructor.prototype)
    // 绑定this，执行构造函数，接收构造函数返回值
    result = constructor.apply(newObj, args)
    // 若result为引用类型，返回；否则返回newObj;
    return result instanceof Object ? result : newObj;
}

// new关键字的作用就是创建一个构造函数的实例对象。 new关键字创建实例对象完成后，会产生以下影响：
// 1. 会执行构造函数中的代码。
// 2. 会生成一个该构造函数的实例对象。
// 3. this指向创建后的实例对象。
