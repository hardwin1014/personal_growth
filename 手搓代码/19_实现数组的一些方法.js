// 1. 实现数组的flat方法
// flat() 方法会按照一个可指定的深度递归遍历数组，
// 并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
function _flat(arr, depth) {
    // 如果下一层不是数组，那就直接返回原数组
    if(!Array.isArray(arr) || depth <= 0){
        return arr
    }

    // 如果深层是数组，那就把深层的合并，如果里面还有数组，就递归。
    return arr.reduce((prev, cur) => {
        if(Array.isArray(cur)){
            return prev.concat(_flat(cur,depth-1))
        } else{
            return prev.concat(cur)
        }
    }, [])
}

// 2. 实现数组的push方法
let arr = []
Array.prototype.push = function () {
    for(let i = 0; i < arguments.length; i++){
        this[this.length] = arguments[i]
    }
    return this.length
}

console.log(arr.push[{a:1}])


// 3. 实现数组的filter方法
Array.prototype._filter = function (fn) {
    if(typeof fn !== "function"){
        throw Error("参数必须是一个函数")
    }

    const res = []
    for(let i = 0, len = this.length;i < len; i++){
        console.log(this)
        fn(this[i]) && res.push(this[i])
    }
    return res
}
arr._filter((item) => {
    console.log(item)
})


// 4. 实现数组的map方法
Array.prototype._map = function (fn) {
    if(typeof fn !== "function"){
        throw Error("参数必须是一个函数")
    }

    const res = []
    for (let i = 0, len = this.length; i < len;i++){
        res.push(fn(this[i]))
    }
    return res
}

// 5. 实现字符串的repeat方法
// 输入字符串s，以及其重复的次数，输入重复的结果，例如输入abc，2，输出abcabc

// 迭代
function repeat(s, n) {
    return (new Array(n + 1)).join(s)
}

arr3 = []
console.log(repeat('abc',2)) // abcabc


// 递归
function repeat2(s,n) {
    return (n > 0) ? s.concat(repeat2(s,--n)) : ""
}


// 6. 实现字符串翻转
// 在字符串的原型链上添加一个方法，实现字符串翻转
// 必须通过实例化对象之后再去调用定义的方法，不然找不到该方法
String.prototype._reverse = function (a){
    return a.split("").reverse().join("")
}
let obj = new String()
let res = obj._reverse("hello")
console.log(res)
