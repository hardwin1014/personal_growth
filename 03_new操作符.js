function objectFactory(){
    let newObject = null
    // shift() 方法用于把数组的第一个元素从其中删除,并返回第 一个元素的值。
    let constructor = Array.prototype.shift.call(arguments)

    let result = null

    // 判断参数是否是一个函数
    if(typeof constructor !== "function"){
        console.log("type error")
        return;
    }

    // 新建一个空对象。对象的原型为构造函数的prototype对象
    newObject = Object.create(constructor.prototype)

    // 将this指向新建对象，并执行函数
    result = constructor.apply(newObject, arguments)
    // 判断返回对象
    let flag = result && (typeof result === "object" || typeof result === "function")
    return flag? result : newObject
}

// objectFactory(构造函数,初始化参数)

/*
* 调用new的过程中会发生四件事情
* 1. 首先创建了一个新的空对象
* 2. 设置原型，将对象的原型设置为函数的prototype对象
* 3. 让函数的this指向这个对象,执行构造函数的代码（为这个新对象添加属性）
* 4. 判断函数的返回值类型, 如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
* */
