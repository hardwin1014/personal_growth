// 实现sleep函数，使用promise封装setTimeout
function timeout(delay){
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

// 实现Object.assign
Object.myAssign = function (target, ...source){
    if(target === null){
        throw new Error("cannot convert undefined or null to object")
    }
    let ret = Object(target)
    source.forEach(item => {
        if(obj !== null){
            for(let key in item){
                if(item.hasOwnProperty(key)){
                    ret[key] = item[key]
                }
            }
        }
    })
    return ret
}
