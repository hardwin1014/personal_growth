/**
 * setInterval的作用是每隔一段指定时间执行一个函数，但是这个执行不是真的到了时间才执行，它真正的作用是
 * 每隔一段时间将事件加入事件队列中，只有当当前的执行栈为空的时候，才能去从事件队列中取出事件执行
 * 所以可能会出现这种情况，就是当前执行栈执行的时间很长，导致事件队列里边积累多个定时器加入的事件，当执行栈结束的时候
 * 这些事件会依次执行，因此就不能到间隔一段时间执行的效果
 *
 * 实现思路是使用递归函数，不断去执行setTimeout从而达到setInterval的效果
 * */

function mySetInterval(fn, timeout) {
    // 控制器，控制定时器是否继续执行
    const timer = {
        flag: true
    }

    // 设置递归函数，模拟定时器执行
    function interval() {
        if(timer.flag){
            fn()
            setTimeout(interval,timeout)
        }
    }

    // 启动定时器
    setTimeout(interval, timeout)

    // 返回控制器
    return timer
}
