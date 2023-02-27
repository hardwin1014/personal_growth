// 使用reduce求和
let arr = [1,2,3,4,5,6,7,8,9,10]
let res = arr.reduce((prev, cur) => {
    return prev + cur
}, 0)
console.log(res)



//
let arr2 = [1,2,3,4,5,6,7,8,9,10]
arr2.flat(Infinity).reduce((prev,cur) => {
    return prev + cur
}, 0)


let arr3 = [{a: 9, b: 3},{a: 2, b: 3, c: 4},{a:3}]
const res3 = arr3.reduce((prev, cur) => {
    return prev + cur['a']
}, 0)
console.log(res3)


// ES5 求和
function sum() {
    let sum = 0;
    Array.prototype.forEach.call(arguments, function (item){
        sum += item * 1
    })
    return sum
}

// ES6
function sum(...nums) {
    let sum = 0
    nums.forEach(item => {
        sum += item * 1
    })
    return sum
}




// 将js对象转换为树形结构
// 转换前：
let source = [{
    id: 1,
    pid: 0,
    name: 'body'
}, {
    id: 2,
    pid: 1,
    name: 'title'
}, {
    id: 3,
    pid: 2,
    name: 'div'
}]

// 转换为:
let tree = [{
    id: 1,
    pid: 0,
    name: 'body',
    children: [{
        id: 2,
        pid: 1,
        name: 'title',
        children: [{
            id: 3,
            pid: 1,
            name: 'div'
        }]
    }]
}]


function jsonToTree(data){
    let result = []
    if(!Array.isArray(data)){
        return result
    }

    let map = {}
    data.forEach(item => {
        map[item.id] = item
    })

    data.forEach(item => {
        let parent = map[item.pid]
        if(parent){
            (parent.children || (parent.children = [])).push(item)
        } else{
            result.push(item)
        }
    })
    console.log(result)
    return result
}
const res4 = jsonToTree(source)
