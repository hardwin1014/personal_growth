console.log(Number.MAX_VALUE)  // 1.7976931348623157e+308
console.log(Number.MAX_SAFE_INTEGER)  // 9007199254740991

console.log(Number.MIN_VALUE)  // 5e-324
console.log(Number.MIN_SAFE_INTEGER)  // -9007199254740991


/**
 * 1. 大数相加
 * 如果想要对一个超大的整数（ > Number.MAX_SAFE_INTEGER ）进行加法运算，但是又想输出一般形式，那么使用 + 是无法达到的
 * 一旦数字超过Number.MAX_SAFE_INTEGER 数字会被立即转换为科学计数法，并且数字精度相比之前将会有误差。
 * */

// 实现一个算法进行大数的相加
/*
* 思路:
* 1. 首先用字符串的方式来保存大数，这样数字在数学表示上就不会发生变化
* 2. 初始化res, temp来保存中间的计算结果,并将两个字符串转换为数组，以便进行每一位的加法运算
* 3. 将两个数组的对应的位进行相加，两个数组加的结果可能大于10，所以要进位，对10进行取余操作，将结果保存在当前位
* 4. 判断当前位是否大于9，也就是是否会进位，若是则将temp赋值true，因为在加法运算中，true会自动隐式转换为1，以便于下一次相加
* 5. 重复上述操作，直至计算结束。
*  * */

function sumBigNumber(a,b) {
    let res = "";
    let temp = 0;

    a = a.split('')
    b = b.split('')

    while (a.length || b.length || temp){
        // ~~的作用是去掉小数部分  来保存中间计算结果
        temp += ~~a.pop() + ~~b.pop()
        res = (temp % 10) + res

        // 判断temp是否会大于9，大于的话就进位
        temp = temp > 9
    }
    return res.replace(/^0+/, '')
}


// 大数相乘
// 没整明白~！！！！

function multiplyBigNum(num1, num2) {
    // 判断输入是不是数字
    if(isNaN(num1) || isNaN(num2)) return ""

    num1 = num1 + ""
    num2 = num2 + ""
    let len1 = num1.length,
        len2 = num2.length;
    let pos = []

    // j放外面,先固定被乘数的一位，分别去乘乘数的每一位，更符合竖式演算法
    for(let j = len2 - 1;j >= 0;j--){
        for(let i = len1 - 1;i >= 0;i--){
            // 两个个位数相乘，最多产生两位数，index1代表十位，index2代表个位
            let index1 = i + j,
                index2 = i + j + 1;

            // 两个个位数乘积加上当前位置个位已累积的数字，会产生进位，比如08+7=15，产生了进位1
            let mul = num1[i] * num2[j] + (pos[index2] || 0)

            // mul 包含新计算的十位，加上原有的十位就是最新的十位
            pos[index1] = Math.floor(mul / 10) + (pos[index1] || 0)

            // mul的个位就是最新的个位
            pos[index2] = mul % 10
        }
    }

    // 去掉前置0
    let result = pos.join('').replace(/^0+/, '')
    return result - 0 || '0'
}
