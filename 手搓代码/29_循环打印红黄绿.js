// 通过这个问题来对比几种异步编程方法：红灯3s亮一次，绿灯1s亮一次，黄灯2s亮一次。如何让三个灯不断交替重复亮灯？

// 三个灯的函数
function red() {
    console.log('red')
}

function green() {
    console.log('green')
}

function yellow() {
    console.log('yellow')
}

// 复杂度：需要“交替重复”亮灯，而不是 "亮完一次"就结束了

//1. 使用回调递归实现
// const task = (timer, light, callback) => {
//     setTimeout(() => {
//         if( light === 'red'){
//             red()
//         }else if(light==='green'){
//             green()
//         } else if(light==='yellow'){
//             yellow()
//         }
//         callback()
//     },timer)
// }
// 代码只是完成一次流程，执行后红黄绿灯分别只亮一次。该如何重复执行呢
// task(3000, 'red', () => {
//     task(2000,'green',() => {
//         task(1000,'yellow', Function.prototype)
//     })
// })

// 使用递归
// const step = () => {
//     task(3000, 'red', () => {
//         task(2000,'green',() => {
//             task(1000,'yellow', step)
//         })
//     })
// }
// step()


// 2. 使用promise实现
const task = (timer, light) =>
    new Promise((resolve, reject) => {
       setTimeout(() => {
           if(light === 'red'){
               red()
           } else if(light=== 'green'){
               green()
           } else if(light==='yellow'){
               yellow()
           }
           resolve()
       }, timer)
    })


// 在一次亮灯结束后，resolve当前promise,并依然使用递归进行
const step = () => {
    task(3000,'red')
        .then(() => task(2000,'green'))
        .then(() => task(2100, 'yellow'))
        .then(step)
}
step()


// 3. 用async和await实现
// 执行完一遍后，也是进行递归
const taskRunner = async () => {
    await task(3000,'red')
    await task(2000,'green')
    await task(2100, 'yellow')
    await taskRunner()
}
taskRunner()


// 实现每隔一秒打印1 2 3 4
for(var i = 0; i < 5; i++){
    (function (i){
        setTimeout(() => {
            console.log(i)
        },i * 1000)
    })(i)
}

// 使用let块级作用域
for(let i = 0; i < 5; i++){
    setTimeout(function () {
        console.log(i)
    },i * 1000)
}
