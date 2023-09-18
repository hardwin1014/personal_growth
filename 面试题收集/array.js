// 字节外包

// 给一个数组元素算出出现次数最多的元素
// 使用对象
function findMostFrequentElement(arr) {
    let count = {};
    let maxCount = 0;
    let mostFrequentElement;

    for (let i = 0; i < arr.length; i++) {
        if (count[arr[i]]) {
            count[arr[i]]++;
        } else {
            count[arr[i]] = 1;
        }

        if (count[arr[i]] > maxCount) {
            maxCount = count[arr[i]];
            mostFrequentElement = arr[i];
        }
    }

    return mostFrequentElement;
}

// 使用map
function findMostFrequentElement2(arr) {
    let count = new Map();
    let maxCount = 0;
    let mostFrequentElement;

    for (let i = 0; i < arr.length; i++) {
        if (count.has(arr[i])) {
            count.set(arr[i], count.get(arr[i]) + 1);
        } else {
            count.set(arr[i], 1);
        }

        if (count.get(arr[i]) > maxCount) {
            maxCount = count.get(arr[i]);
            mostFrequentElement = arr[i];
        }
    }

    return mostFrequentElement;
}

const arr = [1, 2, 3, 2, 1, 2, 3, 3, 3];
const mostFrequent = findMostFrequentElement2(arr);
console.log(mostFrequent); // 输出 3



// 笔试题
// 实现一个方法,传入一组函数,让他们依次执行,并将上一个函数的执行结果传递给下一个函数
// 传入的可能是同步也可能是异步函数，异步函数返回promise
// 如果是异步函数，执行错误终止执行，否则返回最后结果

async function executeFunctions(functions) {
    let result;
    for (const func of functions) {
        try {
            if (typeof func === 'function') {
                // 进一步判断上一个函数的执行结果是否为 Promise。
                // 如果是 Promise，我们使用  await  关键字等待 Promise 解析为最终结果。
                if (result instanceof Promise) {
                    result = await result;
                }
                result = func(result);
                // 无论同步还是异步，都会包装成promise函数传下去
                if (result instanceof Promise) {
                    result = await result;
                }
            } else {
                throw new Error('传入的函数不是一个有效的函数');
            }
        } catch (error) {
            throw new Error('执行函数时发生错误');
        }
    }
    return result;
}



// 手写flat无限递归包括指定层级
function flatNestedArray(arr, depth) {
    let result = [];

    function flatten(arr, currentDepth) {
        for (let item of arr) {
            if (Array.isArray(item) && currentDepth < depth) {
                flatten(item, currentDepth + 1);
            } else {
                result.push(item);
            }
        }
    }

    flatten(arr, 1);
    return result;
}

// 示例用法
const nestedArray = [1, [2, [3, [4, [5]]]]];
const flattenedArray = flatNestedArray(nestedArray, 3);
console.log(flattenedArray); // [1, 2, 3, 4, 5]
