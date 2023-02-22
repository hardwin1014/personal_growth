// 数字有小数版本
let format = n => {
    let num = n.toString() // 转为字符串
    let decimals = ""
    num.indexOf('.') > -1 ? decimals = num.split('.')[1] : decimals
    let len = num.length
    if(len < 3){
        return num
    } else{
        let temp = ''
        let remainder = len % 3
        decimals ? temp = '.' + decimals : temp
        if(remainder > 0){ // 不是3的整数倍
            return num.slice(0,remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',') + temp
        } else {
            return num.slice(0, len).match(/\d{3}/g).join(',') + temp
        }
    }
}

let res = format(12323.33)
console.log(res)



// 数字无小数版本
let format2 = n => {
    let num = n.toString();
    let len = num.length
    if(len <= 3){
        return num
    } else {
        let remainder = len % 3
        if(remainder > 0){ // 不是3的整数倍
            return num.slice(0, remainder) + ',' + num.slice(remainder, len).match(/\d{3}/g).join(',')
        } else {
            return num.slice(0, len).match(/\d{3}/g).join(',')
        }
    }
}
let res2 = format2(123232)
console.log(res2)
