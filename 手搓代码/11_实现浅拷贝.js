/*
* 浅拷贝是指，一个新的对象对原始类型的属性值进行精确地拷贝
*   1. 拷贝对象是基本数据类型, 拷贝的就是基本数据类型的值
*   2. 拷贝的对象是引用数据类型, 拷贝的就是内存地址
*   如果其中一个对象的引用内存地址发生改变，另外一个对象也会发生变化
* */

/*
* 1. Object.assign()
* Object.assign()是ES6对象的拷贝方法，第一个参数是目标对象，其余参数是源对象
* 用法：Object.assign(target, source_1,...)
* 改方法可以实现浅拷贝，也可以实现一维对象的深拷贝。
* */

/*
* 注意：
*     如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性
*     如果该函数只有一个参数，当参数为对象时，直接返回该对象;当参数不是对象时,会先将参数转为对象然后返回。
*     因为null和undefined 不能转换为对象，所以第一个参数不能为null和undefined，会报错
*
*     拷贝的对象中，string类型和symbol类型的属性都会被拷贝，而且不会跳过那些值为null或undefined的源对象。
* */

let target = { a: 1 }
let object2 = { b: 2,d: undefined,e:null,f: Symbol("hello") }
let object3 = { c: 3 }
Object.assign(target, object2, object3)

console.log(target) // { a: 1, b: 2, c: 3 }



/*
* 2. 扩展运算符
* 使用扩展运算符可以在构造字面量对象的时候，进行属性的拷贝
* 语法： let cloneObj = { ...obj }
* */
let obj1 = { a: 1, b: { c: 1 } }
let obj2 = { ...obj1 }
console.log(obj2) // { a: 1, b: { c: 1 } }

obj1.a = 2
console.log( obj1 ) // { a: 2, b: { c: 1 } }
console.log( obj2 ) // { a: 1, b: { c: 1 } }

obj1.b.c = 2
console.log(obj1) // { a: 2, b: { c: 2 } }
console.log(obj2) // { a: 1, b: { c: 2 } }


/*
* 3. 数组方法实现数组浅拷贝
*     3.1 Array.prototype.slice
*         slice()数组的一个方法，这个方法可以从已有的数组中返回选定的元素
*         用法：array.slice(start, end) 该方法不会改变原始数组，会返回一个新数组
*         该方法有两个参数，两个参数都可选，如果两个参数都不写，就可以实现一个数组的浅拷贝
* */
let arr = [1,2,3,4]
console.log(arr.slice()) // [1,2,3,4]
console.log(arr.slice() === arr) // false


/*
* 3.2 Array.prototype.concat
*     concat()方法用于合并两个或多个数组，吃饭饭不会更改现有数组，而是返回一个新的数组
*     该方法有两个参数，两个参数都可选，如果两个参数都不写，就可以实现一个数组的浅拷贝。
* */
let arr2 = [1,2,3,4]
console.log(arr2.concat()) // [1,2,3,4]
console.log(arr.concat() === arr) // false


/*
* 3.3 手写浅拷贝
* 浅拷贝的实现：
* */
function shallowCopy(object) {
    // 只拷贝对象
    if(!object || typeof object !== "object") return

    // 根据object的类型判断是新建一个数组还是对象
    let newObject = Array.isArray(Object)? [] : {}

    // 遍历object，并且判断是object的属性才拷贝
    for(let key in object){
        // 指示对象自身属性中是否具有指定的属性
        if(object.hasOwnProperty(key)){
            newObject[key] = object[key]
        }
    }
    return newObject
}
