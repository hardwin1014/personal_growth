let arr = [1,2,3,4,5,6,7,8,9,10]
let sum = arr.reduce((total,i )=> total += i, 0)
console.log(sum)

let arr1 = [1,2,3,[[4,5],6],7,8,9]
let arrRes = arr1.toString().split(',').reduce((total, i) => {
    return total += Number(i)
}, 0)

console.log(arrRes)


let arr2 = [1,2,3,4,5,6,7]
let arrRes2 = arr2.toString().split(",").reduce((total,i) => {
    return total += Number(i)
},0)
console.log(arrRes2)


let arr3 = [1,2,3,4,5,6]
function add(arr){
    if(arr.length === 1){
        return arr[0]
    }
    return arr[0] + add(arr.slice(1))
}

console.log(add(arr3))
