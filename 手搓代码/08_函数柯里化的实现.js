// 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术
function curry(fn, args) {
    // 获取函数需要的参数长度
    let length = fn.length;

    args = args || [];

    return function() {
        let subArgs = args.slice(0);

        // 拼接得到现有的所有参数
        for (let i = 0; i < arguments.length; i++) {
            subArgs.push(arguments[i]);
        }

        // 判断参数的长度是否已经满足函数所需参数的长度
        if (subArgs.length >= length) {
            // 如果满足，执行函数
            return fn.apply(this, subArgs);
        } else {
            // 如果不满足，递归返回科里化的函数，等待参数的传入
            return curry.call(this, fn, subArgs);
        }
    };
}

// es6 实现
function curry(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

/*
使用柯里化函数，离不开闭包、arguments、递归。

创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上；
存取arguments对象通常要比存取命名参数要慢一点，一些老版本的浏览器在arguments.length的实现上是相当慢的；
使用fn.apply( … ) 和 fn.call( … )通常比直接调用fn( … ) 稍微慢点
*/



// 五、扩展一道面试题
// 实现下面这个方法：

add(2)(1, 3, 4)(2, 3)(3)(4, 6)(7, 98)() // 133
// 上面这个函数当参数为空的时候执行了内部参数所有值的相加，所以我们应该考虑当参数不为空的时候将缓存起来，在为空的时候再相加，这样的思路会用闭包的方式来实现。实现方法：

function add () {
    // 用来缓存所有的arguments值
    let args = [].slice.call(arguments);
    // 新建currying函数实现柯里化，
    // 下面currying函数中的arguments是currying中的参数，不能使用箭头函数，如果使用箭头函数，需要改成传参的方式
    let currying = function () {
        // 如果参数为空，那么递归停止，将所有值相加，返回执行结果
        if (arguments.length === 0) {
            return args.reduce((a, b) => a + b);
        } else {
            // 否则将参数保存到args里面，返回currying方法
            args.push(...arguments);
            return currying
        }
    }
    return currying
}


// 上面有需要注意的一点，因为currying函数里面使用arguments，所以currying不能使用箭头函数，
// 箭头函数内部的arguments的用法与箭头函数内部的this差不多，它取的是上一级函数的arguments值。如果想用箭头函数，currying函数可以这样改动：
let currying = (...rest) => {
    // 如果参数为空，那么递归停止，返回执行结果
    if (rest.length === 0) {
        return args.reduce((a, b) => a + b);
    } else {
        // 否则将参数保存到args里面，返回currying方法
        args.push(...rest);
        return currying
    }
}
