/*
* 实现数组的乱序输出
* 实现思路：
*   取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换
*   第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与该索引值对应的元素进行交换
*   按照上面的规律执行，直到遍历完成
* */

let arr = [1,2,3,4,5,6,7,8,9,10]
for(let i = 0; i < arr.length; i++){
    // Math.random()是令系统随机选取大于等于 0.0 且小于 1.0 的伪随机 double 值
    // Math.round方法会对参数进行舍入操作，并返回一个整数。
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    // 交换一下
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
}

console.log(arr)


// 方法2
let length = arr.length, randomIndex,temp;
while (length){
    randomIndex = Math.floor(Math.random() * length--)
    temp = arr[length]
    arr[length] = arr[randomIndex]
    arr[randomIndex] = temp
}
console.log(arr)
