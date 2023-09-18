// 循环引用对象本来没有什么问题，但是序列化的时候就会发生问题
// 比如调用JSON.stringify()对该对象进行序列化就会保存：Converting circular structure to JSON

// 判断一个对象中是否已存在循环引用：
const isCycleObject2 = (obj, parent = []) => {
    for (let i in obj) {
        if (typeof obj[i] === 'object') {
            if (parent.includes(obj[i])) {
                return true;
            }
            if (isCycleObject(obj[i], [...parent, obj[i]])) {
                return true;
            }
        }
    }
    return false;
};

const a = 1
const b = { a }
const c = { b }
const o = { d: { a:3 }, c }
o.c.b.aa = a

console.log(isCycleObject(o))
