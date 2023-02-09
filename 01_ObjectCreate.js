// 思路：将传入的对象做为原型

function create(obj){
    function F(){}
    F.prototype = obj
    return new F()
}

/*
* Object.create(proto, [propertiesObject])
方法创建一个新对象，使用现有的对象来提供新创建的对象的proto。
参数：
proto : 必须。表示新建对象的原型对象，即该参数会被赋值到目标对象(即新对象，或说是最后返回的对象)的原型上。该参数可以是null， 对象， 函数的prototype属性 （创建空的对象时需传null , 否则会抛出TypeError异常）。
propertiesObject : 可选。 添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
3 返回值：
在指定原型对象上添加新属性后的对象。
* */


/*
* 个人分析思考：
* Object.create既然是让调用的对象继承指定的原型，那么传入的对象指定要挂载到原型上了
*
* */
