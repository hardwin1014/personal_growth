/*
* 给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组
* */

// ES6 方法 ( 使用数据结构集合 )
const array = [1,2,3,4,5,6,1,2,3,8]
const res = Array.from(new Set(array))
console.log(res)


// ES5方法： 使用map存储不重复的数字
function uniqueArray(array) {
    let map = {}
    let res = []
    for(let i = 0;i < array.length; i++){
        if(!map.hasOwnProperty(array[i])){
            map[array[i]] = 1
            res.push(array[i])
        }
    }
    return res
}
const res2 = uniqueArray(array)
console.log(res2)
