function myInstanceof(left, right){
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left)

    // 获取构造函数的prototype对象
    let prototype = right.prototype;

    // 判断构造函数的prototype对象是否在对象的原型链上
    while (true){
        // 找到或找不到的条件(终止的条件)
        if(!proto) return false
        if(proto === prototype) return true

        // 一直向下查找
        proto = Object.getPrototypeOf(proto)
    }
}


/*
* 思路：instanceof
*   判断构造函数的prototype属性是否出现在对象的原型链中的任何位置
*
* 例如：
*   function Person(){};
*   var p =new Person();
*   console.log(p instanceof Person);//true
* */
