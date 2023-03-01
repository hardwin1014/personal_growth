// 1. 利用数组splice、split、join方法
let tel = 18877776666;
tel = "" + tel;
let ary = tel.split('')
ary.splice(3, 4, "****")
let tel1 = ary.join("")
console.log(tel1)


// 利用字符串的substr方法
tel = "" + tel
let tel2 = tel.replace(tel.substring(3,7),"****")
console.log(tel2)


// 利用字符串substring方法
// substr 和 substring 的第一个参数表示子字符串起始位置的索引。第二个参数分别是子字符串的长度和结束位置。
tel = "" + tel
let tel3 = tel.replace(tel.substring(3,7),"****")
console.log(tel3)

// 利用正则
tel = "" + tel
const reg = /(\d{3})\d{4}(\d{4})/;
let tel4 = tel.replace(reg,"$1****$2")
console.log(tel4)
