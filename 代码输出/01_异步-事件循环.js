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


// 8. 代码输出结果
Promise.resolve(1)
  .then(res => {
      console.log(res)
      return 2
  })
  .catch(err => {
      return 3
  })
  .then(res => {
      console.log(res)
  })

// 1
// 2

// Promise是可以链式调用的，由于每次调用.then或者.catch都会返回一个新的promise，从而实现了链式调用
// 它并不像一般任务的链式调用一样return this

// 上面输出的结果之所以依次打印1 和 2，是因为resolve(1) 之后走的第一个then方法，并没有进catch里
// 所以第二个then中的res得到的实际上是第一个then的返回值，并且return2会被包装成resolve(2) 被最后的then打印输出2


// 9. 代码输出结果
Promise.resolve().then(() => {
    return new Error("error!!!")
}).then(res => {
    console.log('then: ',res)
}).catch(err => {
    console.log('catch', err)
})

// "then: "  "Error: error!!!"
// 返回任意一个非promise的值都会被包裹成promise对象，因此这里的return new Error('error!!!')
// 也被包裹成了return Promise.resolve(new Error('error!!!')),因此它会被then捕获而不是catch


// 10. 代码输出结果
const promise10 = Promise.resolve().then(() => {
    return promise10
})

promise10.catch(console.err)

// 输出结果如下：
// Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
// 这里其实是一个坑，.then或 .catch返回值不能是promise本身，否则会造成死循环。


// 11. 代码输出结果
Promise.resolve(1)
    .then(2)
    .then(Promise.resolve(3))
    .then(console.log)

// 1
// 好多then，记住一个原则：.then  .catch 的参数期望是函数，传入非函数值则会发生值透传。
// 第一个then和第二个then中传入的都不是函数，一个是数字，一个是对象，因此发生了透传，将resolve(1)的值直接传到最后一个then里


// 12. 代码输出
Promise.reject("err!!!")
  .then(res => {
      console.log('success', res)
  },err => {
      console.log('error', err)
  }).catch(err => {
    console.log('catch', err)
})

// error err!!!
// then函数中的两个参数：
//   第一个参数是用来处理Promise成功的函数
//   第二个则是处理失败的函数
// 也就是说Promise.resolve('1')的值会进入成功的函数，Promise.reject('2')的值会进入失败的函数
// 在这道题中，错误直接被then的第二个参数捕获了，所以就不会被catch捕获了，输出结果 error err！！！

// 但是如果是下面这样
// 在then的第一个参数中抛出了错误，那么他就不会被第二个参数捕获，而是直接被后面的catch捕获到
Promise.resolve()
  .then(function success(res){
      throw new Error('error!!!')
  },function fail1(err) {
      console.log('fail', err)
  }).catch(function fail2(err) {
    console.log('fail2', err)
})


// 13. 代码输出结果
Promise.resolve('1')
    .then(res => {
        console.log(res)
    })
    .finally(() => {
        console.log('finally')
    })

Promise.resolve('2')
  .finally(() => {
      console.log('finally2')
      return "我是finally2返回的值"
  })
  .then(res => {
      console.log('finally后面的then函数', res)
  })

// 1  finally2  finally  finally2后面的then函数 2

// .finally()一般用的很少，只要记住以下几点
/*
*   .finally() 方法不管Promise对象最后的状态如何都会执行
*   .finally() 方法的回调函数不接受任何的参数，也就是说你在.finally() 函数中是无法知道Promise最终的状态是resolved还是rejected的
*   .它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象
*   .finally本质上是then方法的特例
* */

// .finally() 的错误捕获：
Promise.resolve('1')
  .finally(() => {
      console.log('finally1')
      throw new Error('我是finally中抛出的异常')
  }).then(res => {
    console.log('finally后面的then函数', res)
}).catch(err => {
    console.log('捕获错误', err)
})

// 'finally1'        '捕获错误' Error： 我是finally中抛出的异常


// 14. 代码输出结果

function runAsync(x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)),1000))
    return p
}

Promise.all([runAsync(1),runAsync(2),runAsync(3)]).then(res => {
    console.log(res)
})
// 1   2   3   [1,2,3]
// 首先定义了一个Promise，来异步执行函数，runAsync,该函数传入一个值x,然后间隔一秒后打印出这个x
// 之后再使用Promise.all来执行这个函数，执行的时候，看到一秒之后输出了1,2，3，同时输出了数组[1,2,3]
// 三个函数是同步执行的，并且在一个回调函数中返回了所有的结果，并且结果和函数的执行顺序是一致的


// 15. 代码输出结果
function runAsync(x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)),1000))
    return p
}
function runReject(x) {
    const p = new Promise((res,rej) => setTimeout(() => rej(`Error:${x}`,console.log(x)),1000 * x))
    return p
}
Promise.all([runAsync(1),runReject(4),runAsync(3),runReject(2)])
    .then(res => console.log(res))
    .then(err => console.log(err))

// 1s后输出
// 1
// 3

// 2s后输出
// 2
// Error: 2

// 4s后输出
// 4

// 可以看到。catch捕获到了第一个错误，在这道题目中最先的错误就是runReject(2)的结果，
// 如果一组异步操作中有一个异常都不会进入.then()d的第一个回调函数参数中。会被.then()的第二个回调函数捕获。


// 16. 代码输出结果
function runAsync(x) {
    const p = new Promise(r => setTimeout(() => r(x, console.log(x)),1000))
    return p
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
    .then(res => console.log('result',res))
    .then(err => console.log(err))

// 1   "result: 1"   2   3
// then只会捕获第一个成功的方法，其他的函数虽然还会继续执行，但是不是被then捕获了


// 17. 代码输出结果
function runAsync(x) {
    const p = new Promise(r =>
        setTimeout(() => r(x, console.log(x)),1000)
    )
    return p
}

function runReject(x) {
    const p = new Promise((res,rej) =>
        setTimeout(() => rej(`Error: ${x}`, console.log(x)),1000 * x)
    )
    return p
}

Promise.race([runReject(0),runAsync(1),runAsync(2),runAsync(3)])
    .then(res => console.log("result: ", res))
    .catch(err => console.log(err))

// 输出结果如下：
// 0    Error: 0    1    2    3

// 可以看到在catch捕获到第一个错误之后，后面的代码还在执行，不过不会再被捕获了

// 注意： all和race传入的数组中，如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获
// 但并不会影响数组中其他的异步任务的执行


// 18. 代码输出结果
async function async1(){
    console.log("async1 start")
    await async2()
    console.log("async1 end")
}

async function async2(){
    console.log("async2")
}

async1()
console.log("start")

// async1 start
// async2
// start
// async1 end

/*
* 代码的执行过程如下：
* 1. 首先执行函数中的同步代码 async1 start， 之后遇到了await，它会阻塞async1后面代码的执行，因此会先执行async2中的同步代码async2，然后跳出async1
* 2. 跳出async1 函数后，执行同步代码start
* 3. 在一轮宏任务全部执行完之后，再来执行await后面的内容async1 end
*
* 这里可以理解为await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then
* */


// 19. 代码输出结果
async function async19(){
    console.log("async start")   // 1
    await async20()
    console.log("async1 end")
    setTimeout(() => {
        console.log("timer1")
    },0)
}

async function async20(){
    setTimeout(() => {
        console.log("timer2")
    },0)
    console.log("async2")  // 2
}

async19()

setTimeout(() => {
    console.log("timer3")
},0)

console.log("start")  //  3

// "async start"     "async2"        "start"      "async1 end"        "timer2"        "timer3"          "timer1"

/*
*  1. 首先进入 async1 打印出async1 start
*  2. 之后遇到 async2 进入async2，遇到定时器timer2,加入宏任务队列，之后打印async2
*  3. 由于async阻塞了后面代码的执行，所以执行后面的定时器timer3，将其加入宏任务队列，之后打印start
*  4. 然后执行async2后面的代码，打印出async1 end  遇到定时器timer1，将其加入宏任务队列
*  5. 最后，宏任务队列有三个任务，先后顺序为timer2  timer3  timer1 没有微任务，所以直接所有的宏任务按照先进先出的原则执行
* */

// 20. 代码输出结果
async function async20(){
    console.log("async1 start")
    await new Promise((resolve) => {
        console.log("promise1")
    })

    console.log("async1 success") // 为什么没执行呢，是因为 await后的promise没有返回值，状态一直在pending状态，所以await之后的内容是不会执行的，包括async1后面的.then
    return "async1 end"
}

console.log("script start")
async20().then(res => console.log(res))
console.log("script end")

// script start
// async1 start
// promise1
// script end

// 注意是在async1中的await后面的promise是没有返回值的，也就是它的状态始终是pending状态，所以在await之后的内容是不会执行的，包括async1后面的.then

// 21. 代码输出结果
async function async21(){
    console.log("async1 start")  // 2
    await new Promise(resolve => {
        console.log("promise1")   // 3
        resolve("promise1 resolve")
    }).then(res => console.log(res))  // 5
    console.log("async1 success")  // 6
    return "async1 end"  // 7
}

console.log("script start")  // 1
async21().then(res => console.log(res))
console.log("script end")

// 这里是对上面一题进行改造，加上resolve
// script start       async1 start      promise1       script end        promise1 resolve       async1 success        async1 end
