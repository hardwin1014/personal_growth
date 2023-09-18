function customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Promises must be an array'));
        }

        const results = [];
        let completedCount = 0;

        function checkCompletion() {
            if (completedCount === promises.length) {
                resolve(results);
            }
        }

        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then((result) => {
                    results[i] = result;
                    completedCount++;
                    checkCompletion();
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}

// 示例用法：
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

customPromiseAll([promise1, promise2, promise3])
    .then((results) => {
        console.log(results); // 输出 [1, 2, 3]
    })
    .catch((error) => {
        console.error(error);
    });
