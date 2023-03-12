// 异步 & 事件循环

// 1, 代码输出1
const promise = new Promise((resolve,reject) => {
    console.log(1)
    console.log(2)
})
promise.then(() => {
    console.log(3)
})
console.log(4)
// 1 2 4
// promise.then是微任务，它会在所有的宏任务执行后才执行
// 同时promise中内部的状态没有发生变化（resolve， reject），一直是pending状态，所以不会输出3



// 2, 代码输出2
const promise1 = new Promise((resolve, reject) => {
    console.log('promise1')
    resolve('resolve1')
})

const promise2 = promise1.then(res => {
    console.log(res)
})

console.log('1', promise1)
console.log('2', promise2)
// promise1
// 1 Promise { 'resolve1' }
// 2 Promise { <pending> }
// resolve1

// 需要注意的是，直接打印promise1，会打印出它的状态值和参数

// 代码执行过程如下：
/**
 *  1. script是一个宏任务，按照顺序执行这些代码：
 *  2. 首先进入Promise，执行该构造函数中的代码，打印promise1
 *  3. 碰到resolve函数，将promise1的状态改变为resolved，并将结果保存下来。
 *  4. 碰到promise.then这个微任务，将它放入微任务队列。
 *  5. promise2是一个新的状态为pending的Promise
 *  6. 执行同步代码1，同时打印出promise1的状态是resolve
 *  7. 执行同步代码2，同时打印出promise2的状态是pending
 *  8. 宏任务执行完毕，查找微任务队列，发现promise1.then这个微任务且状态为resolved，执行它
 *  * */



// 3, 代码执行输出结果
const promise3 = new Promise((resolve, reject) => {
    console.log(1)
    setTimeout(() => {
        console.log("timeStart")
        resolve("success")
        console.log("timerEnd")
    }, 0)
    console.log(2)
})

promise3.then(res => {
    console.log(res)
})

console.log(4)
// 1  2  4  timeStart  timeEnd  success

// 代码执行过程如下：
// 1。 首先遇到Promise构造函数，会先执行里面的内容，打印1
// 2。 遇到定时器setTimeOut，它是一个宏任务，放入宏任务队列
// 3。 继续向下执行，打印出2
// 4。 由于Promise的状态此时还是pending，所以promise.then先不执行
// 5。 继续执行下面的同步任务，打印出4
// 6。 此时微任务队列没有任务，继续执行下一轮宏任务，执行setTimeOut
// 7。 首先执行timerStart，然后遇到了resolve，将promise的状态改为resolved且保存结果并将之前的promise.then推入微任务队列，再执行timeEnd
// 8。 执行完这个宏任务，就去执行微任务promise.then， 打印出resolve的结果。




// 4。 代码输出结果
Promise.resolve().then(() => {
    console.log('promise1')
    const timer2 = setTimeout(() => {
        console.log('timer2')
    }, 0)
})

const timer1 = setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(() => {
        console.log('promise2')
    })
}, 0)

console.log('start')

// start  promise1  timer1   promise2  timer2
