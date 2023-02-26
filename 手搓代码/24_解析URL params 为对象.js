let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/

function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1] // 将？后面的字符串取出来
    const paramsArr = paramsStr.split('&') // 将字符串以$分割后存到数组里
    let paramsObj = {}
    paramsArr.forEach(param => {
        if(/=/.test(param)){ // 处理有value的参数
            let [key, val] = param.split('='); // 分割key和value
            val = decodeURIComponent(val) // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val // 判断是否转为数字
            if(paramsObj.hasOwnProperty(key)){ // 如果对象有key，则添加一个值
                paramsObj[key] = []
            } else{
                paramsObj[key] = val
            }
        } else{ // 处理没有value的参数
            paramsObj[param] = true
        }
    })
    console.log(paramsObj)
    return paramsObj
}
