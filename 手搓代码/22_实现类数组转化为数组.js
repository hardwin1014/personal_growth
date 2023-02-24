// 类数组转换为数组的方法有这样几种
// 1. 通过call调用数组的slice方法来实现转换
const arrayLike = []
Array.prototype.slice.call(arrayLike)

// 通过call调用数组的splice方法来实现转换
Array.prototype.splice.call(arrayLike, 0)

// 通过apply调用数组的concat方法来实现转换
Array.prototype.concat.apply([], arrayLike)

// 通过Array.from方法来实现转换
Array.from(arrayLike)
