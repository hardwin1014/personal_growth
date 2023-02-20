/*
* 1. 递归实现
* 普通的递归思路很容易理解，就是通过循环递归的方式，一项一项地去遍历，如果每一项还是一个数组，
* 那么就继续往下遍历，利用递归程序的方法，来实现数组的每一项连接
* */

let arr = [1,[2,[3,4,5]]]
function flatten (arr) {
    let result = []
    for(let i = 0; i < arr.length; i++){
        // 如果是数组就递归合并
        if(Array.isArray(arr[i])){
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result
}

flatten(arr)


/*
* 2. reduce函数迭代
*    从上面普通的递归函数中可以看出，其实就是对数组的每一项进行处理，那么其实也可以使用reduce来实现数组的拼接
*    从而简化第一种方法的代码，改造后的代码
* */
let arr2 = [1,[2,[3,4]]]
function flatten2(arr){
    return arr.reduce(function (prev, next){
       return prev.concat(Array.isArray(next)? flatten2(next):next)
    },[])
}

console.log(flatten(arr)) // [1,2,3,4,5]

/*
* 3. 扩展运算符
* 这个方法实现，采用扩展运算符和some的方法，两者共同使用，达到数组扁平化的目的
* */
function flatten3(arr) {
    while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}

console.log(flatten3(arr))

/*
* 4. split和toString
* 可以通过split和toString两个方法来共同实现数组扁平化，由于数组会默认带一个toString方法
* 所以可以把数组直接转换成逗号分隔符的字符串，然后再使用split方法把字符串重新转换为数组
*
* 通过这两个方法可以将多维数组直接转换成逗号连接的字符串，然后再重新分割成数组
* */
let arr3 = [1,[2,[4,3]]]
function flatten4(arr) {
    return arr.toString().split(',')
}

console.log(flatten4(arr3))


/*
*  5. ES6的flat
*  也可以直接调用ES6的flat方法，来实现数组扁平化，flat方法的语法：arr.flat([depth])
*
*  其中depth是flat的参数。depth是可以传递数组的展开深度（默认不填、数值是1），即展开一层数组。
*  如果层数不确定，参数可以传进去infinity，代表不论多少层都要展开。
* */
function flatten5(arr) {
    return arr.flat(Infinity)
}

console.log(flatten5(arr)) // [1,2,3,4 ]


/*
* 6. 使用正则和JSON方法
*   采用JSON.stringify的方法先转换成字符串，然后通过正则表达式过滤掉字符串中的数组的方括号，最后使用JSON.parse把它转换成数组
* */
function flatten6(arr) {
    let str = JSON.stringify(arr)
    str = str.replace(/\[|\]/g,'')
    str = '[' + str +']'
    return JSON.parse(str)
}

console.log(flatten6(arr))
