const dateFormat = (dateInput, format) => {
    let day = dateInput.getDate()
    let month = dateInput.getMonth() + 1
    let year = dateInput.getFullYear()

    format = format.replace(/yyyy/,year)
    format = format.replace(/MM/,month)
    format = format.replace(/dd/,day)
    return format
}

const res = dateFormat(new Date('2023-02-17'),'yyyy/MM/dd')
console.log(res)
dateFormat(new Date('2023-02-16'),'yyyy/MM/dd')
dateFormat(new Date('2023-04-01'),'yyyy年MM月dd日')


// 交换ab的值，不能使用临时变量
a = a + b
b = a - b
a = a - b
