/**
 * call 函数的实现步骤
 * 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用call等方式调用的情况
 * 2. 判断传入上下文对象是否存在，如果不存在，则设置为window
 * 3. 处理传入的参数，截取第一个参数后的所有参数
 * 4. 将函数作为上下文对象的一个属性
 * 5. 使用上下文对象来调用这个方法，并保存返回结果
 * 6. 删除刚才新增的属性
 * 7. 返回结果
 * */

// function.call(thisArg, arg1, arg2, ...)
// thisArg其实就是执行的时候，this的值
// call和apply：函数调动call()方法在执行的时候，函数的里面的this会指向第一个参数值，
// 除第一个参数值后面的若干支都是传进该函数，简而言之就是改变函数运行时的this指向。

// fn.call(obj)执行的时候，可以看作在obj对象里面有个fn函数执行。那么fn函数里面的this指向就是obj
// call函数实现
Function.prototype.myCall = function (context){
    // 判断调用对象
    if(typeof this !== "function"){
        console.log("type error")
    }

    // 获取参数
    // 返回了一个新的数组，就是除了第一位，其他剩余的参数数组
    let args = [...arguments].splice(1)
    let result = null

    // 判断context是否传入，如果未传入则设置为window
    context = context || window

    // 给对象中绑定一个方法
    // 将调用函数设为对象的方法，可以看做context中有fn函数，此时this就指向了context
    context.fn = this

    // 调用函数
    result = context.fn(...args)

    // 将对象中的属性删除
    delete context.fn
    return result
}
