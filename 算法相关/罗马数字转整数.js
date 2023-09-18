const myPromiseAll = (promiseArr) => {

    return new Promise((resolve, reject) => {
        if(!Array.isArray(promiseArr)){
            return reject(new TypeError("参数需要一个数组"))
        }

        const result = [];
        let count = 0;

        let n = promiseArr.length;
        for (let i = 0; i < n;i++){
            promiseArr[i].then(res => {
                result[i] = res
                count++;
                if(count === n){
                    return resolve(result)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}
