// 精确加法
function preciseAddition(a, b) {
    const maxLength = Math.max(a.length, b.length);
    const paddedA = a.padStart(maxLength, '0');
    const paddedB = b.padStart(maxLength, '0');
    let carry = 0;
    let result = '';

    for (let i = maxLength - 1; i >= 0; i--) {
        const sum = parseInt(paddedA[i]) + parseInt(paddedB[i]) + carry;
        carry = Math.floor(sum / 10);
        result = (sum % 10) + result;
    }

    if (carry > 0) {
        result = carry + result;
    }

    return result;
}

// 精确减法
function preciseSubtraction(a, b) {
    // 假设 a >= b，否则你需要在这里处理交换操作
    const maxLength = Math.max(a.length, b.length);
    const paddedA = a.padStart(maxLength, '0');
    const paddedB = b.padStart(maxLength, '0');
    let borrow = 0;
    let result = '';

    for (let i = maxLength - 1; i >= 0; i--) {
        const digitA = parseInt(paddedA[i]);
        const digitB = parseInt(paddedB[i]) + borrow;

        if (digitA < digitB) {
            borrow = 1;
            result = (10 + digitA - digitB) + result;
        } else {
            borrow = 0;
            result = (digitA - digitB) + result;
        }
    }

    return result.replace(/^0+/, '') || '0';
}

// 精确乘法
function preciseMultiplication(a, b) {
    let result = '0';

    for (let i = 0; i < a.length; i++) {
        const digitA = parseInt(a[a.length - 1 - i]);
        let carry = 0;
        let tempResult = '';

        for (let j = 0; j < b.length; j++) {
            const digitB = parseInt(b[b.length - 1 - j]);
            const product = digitA * digitB + carry;
            carry = Math.floor(product / 10);
            tempResult = (product % 10) + tempResult;
        }

        if (carry > 0) {
            tempResult = carry + tempResult;
        }

        tempResult = tempResult + '0'.repeat(i); // 将结果向左移动
        result = preciseAddition(result, tempResult); // 累积结果
    }

    return result;
}

// 示例用法
const num1 = '123.456';
const num2 = '789.012';

const sum = preciseAddition(num1, num2);
console.log('加法结果:', sum.toString());

// const difference = preciseSubtraction(num1, num2);
// console.log('减法结果:', difference);
//
// const product = preciseMultiplication(num1, num2);
// console.log('乘法结果:', product);
