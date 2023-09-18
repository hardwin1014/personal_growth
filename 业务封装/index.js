function convertToFourDecimalPlaces(number) {
  // 将数字转换为字符串
  let str = number.toString();

  // 检查是否为小数
  if (str.indexOf('.') !== -1) {
    // 获取小数点后的数字
    let decimalPart = str.split('.')[1];

    // 如果小数位数不足四位，则用0填充
    while (decimalPart.length < 4) {
      decimalPart += '0';
    }

    // 返回转换后的结果
    return parseFloat(str.split('.')[0] + '.' + decimalPart).toFixed(4);
  } else {
    // 如果是整数，则在后面添加四个0
    return parseFloat(str + '.0000').toFixed(4);
  }
}

// 示例用法
let number1 = 10.5;
let number2 = 7;
console.log(convertToFourDecimalPlaces(number1)); // 输出: 10.5000
console.log(convertToFourDecimalPlaces(number2)); // 输出: 7.0000