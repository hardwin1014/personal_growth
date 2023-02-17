// 实现sleep函数，使用promise封装setTimeout
function timeout(delay){
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

/*
* 实现Object.assign思路
*   1、判断原生的Object是否支持assign这个函数，如果不存在的话就会创建一个assign函数
*      并使用Object.defineProperty将函数绑定到Object
*   2、判断参数是否正确( 目标参数不能为空，可以直接设置{}传递进去，但是必须有值 )
*   3、使用Object()转成对象,并保存为to, 最后返回这个对象to
*   4、使用for in 循环遍历出所有的可枚举的自由属性，并复制给新的目标对象（使用hasOwnProperty获取自有属性，即非原型链上的属性）
**/

Object.myAssign = function (target, ...source){
    if(target === null){
        throw new Error("cannot convert undefined or null to object")
    }
    // 转成目标对象
    let ret = Object(target)

    source.forEach(item => {
        if(item !== null){
            for(let key in item){
                if(item.hasOwnProperty(key)){
                    ret[key] = item[key]
                }
            }
        }
    })
    return ret
}

/**
 * 使用in和hasOwnProperty方法区别：
 * in 操作符会检查属性是否在对象以及[[propertype]]原型链中
 * hasOwnProperty(...)只会检查是否在myObject对象中，不会检查[[prototype]]原型链中
 * Object.assign方法肯定是不会拷贝原型链上的属性，所以模拟实现时需要用hasOwnProperty(...)判断处理
 * 但是直接使用myObject.hasOwnProperty是有问题的，因为有的对象可能没有连接到Object.prototype上（通过Object.create(null)来创建）
 * 这种情况下，使用myObject.hasOwnProperty(...)就会失败！
 * */
// saucxs
const myObject = Object.create( null );
myObject.b = 2;

// ("b" in myObject);
// true

// myObject.hasOwnProperty( "b" );
// TypeError: myObject.hasOwnProperty is not a function

/**
 * 解决办法：使用call就可以了
 */
// saucxs
const myObject2 = Object.create( null );
myObject2.b = 2;

Object.prototype.hasOwnProperty.call(myObject2, "b");
// true


