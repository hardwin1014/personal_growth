/*
* 实现深拷贝
*   1. 浅拷贝：浅拷贝是指的是将一个对象的属性值复制到另外一个对象，如果有的属性的值为引用类型的话
*       那么会将这个引用的地址复制给对象。因此两个对象会有同一个引用类型的引用。浅拷贝可以使用Object.assignh和展开运算符
*
*   2. 深拷贝：深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，他新建一个引用类型并将对应的值复制给他
*      因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用JSON的两个函数来实现，
*      但是由于JSON的对象格式化比JS的对象格式化更加严格，所以如果属性值里边出现函数或者Symbol类型的值时，会转换失败！
* */


/**
 * 1. JSON.stringify()
 *    JSON.parse(JSON.stringify(obj)) 是目前比较常用的深拷贝方法之一，它的原理就是利用JSON.stringify将js对象序列化
 *    （JSON字符串）再使用JSON.parse来反序列化js对象，
 *    这个方法可以简单粗暴的实现深拷贝，但是还存在问题，拷贝的对象中如果有函数、undefined、symbol、当使用JSON.stringify（）进行处理之后。都会消失
 * */

let obj1 = {
    a: 0,
    b: {
        c: 0
    }
}

let obj2 = JSON.parse(JSON.stringify(obj1))
console.log(obj2)

obj1.a = 1
obj1.b.c = 1
console.log(obj1)
console.log(obj2)



/**
 * 2. 函数库的lodash的_.cloneDeep方法
 * 该函数库也有提供_.cloneDeep 用来做Deep Copy
 * */
const _ = require("lodash")
let obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1,2,3]
}

const obj2 = _.cloneDeep(obj1)
console.log(obj1.b.f === obj2.b.f)


/**
 * 3. 手写实现深拷贝函数
 * */
function deepCopy(object){
    if(!object || typeof object !== "object") return;

    let newObject = Array.isArray(object)? [] : {}

    for(let key in object){
        if(object.hasOwnProperty(key)){
            newObject[key] = typeof object[key] === "object"? deepCopy(object[key]): object[key]
        }
    }
    return newObject
}
