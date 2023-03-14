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

// 1. 首先promise.resolve().then是一个微任务，加入微任务队列
// 2. 执行timer1，它是一个宏任务，加入宏任务队列，
// 3. 继续执行下面的同步代码，打印出start
// 4. 这样第一轮宏任务就执行完了，开始执行微任务Promise.resolve().then打印出promise1
// 5. 遇到timer2，它是一个宏任务，将其他加入宏任务队列，此时宏任务队列有两个任务。分别是timer1、timer2
// 6. 这样第一轮微任务就执行完了，开始执行第二轮宏任务，首先执行定时器timer1 打印timer1
// 7. 遇到promise.resolve().then(),它是一个微任务，加入微任务队列
// 8. 开始执行微任务队列中的任务，打印promise2
// 9. 最后执行宏任务timer2定时器，打印出timer2


// 5. 代码输出结果
const promise5 = new Promise((resolve, reject) => {
    resolve('success1')
    reject('error')
    resolve('sucess2')
})

promise5.then(res => {
    console.log('then', res)
}).catch(err => {
    console.log('catch', err)
})

// 输出结果如下：
// then: success1

// 题目考察的就是Promise的状态在发生变化之后，就不会再发生变化。开始状态由pending变为resolved,
// 说明状态已经变为已完成状态，下面的两个状态的就不会再执行了，同时下面的catch也不会捕获到错误

// 6. 代码输出结果
Promise.resolve(1)
    .then(2) // then方法接收的是一个函数，如果非函数的话，会解释为 then(null)
    .then(Promise.resolve(3))
    .then(console.log)

// 1
// Promise{ <fulfilled>: undefined }

// Promise.resolve方法的参数如果是一个原始值，或者是一个不具有then方法的对象
// 则Promise.resolve方法返回一个新的Promise对象，状态为resolved,Promise.resolve方法的参数
// 会同时传给回调函数

// then方法接受的参数是函数，而如果传递的并非是一个函数，他实际上会将其解释为 then(null)
// 这就会导致前一个Promise的结果会传递下面


// 7. 代码输出结果
// 处理主任务  ->  微任务  —>  宏任务
const promise7 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000)
})

const promise72 = promise7.then(() => {
    throw new Error("error!!!")  // 3
})

console.log('promise7', promise7)  // 1
console.log('promise72', promise72)  // 2

setTimeout(() => {
    console.log('promise7', promise7) // 4
    console.log('promise72', promise72)  // 5
},2000)
