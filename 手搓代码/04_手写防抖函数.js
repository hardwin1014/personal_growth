/*
* 函数防抖是指在事件被触发n秒后再执行回调, 如果在这n秒内事件又被触发，则重新计时
* 这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求
**/

// 利用定时器, 如果定时器存在就清除定时器
function debounce(fn, wait){
    let timer = null

    return function (){
        let context = this
        let args = arguments

        // 如果此时存在定时器的话，则取消之前的定时器重新记时
        if(timer){
            clearTimeout(timer)
            timer = null
        }

        // 设置定时器。使事件间隔指定事件后执行
        timer = setTimeout(() => {
            fn.apply(context, args)
        },wait)
    }
}
