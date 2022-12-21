```js

Array.prototype.map()
// map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

Array.prototype.indexOf()
// indexOf() 方法返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回 -1。

Array.unshift()
// 在数组最前面加元素

// 更多Array操作：查阅MDN
```
+ 传统通过cookie验证方式与通过jwt(json web token)验证方式的不同
+ 私钥和公钥问题
  信息 + 私钥 => 公钥


```js
// 使用bind()函数绑定this取值
// 在JavaScript中，函数里的this指向的是执行时的调用者，而非定义时所在的对象。
// 例如：
const person = {
  name: "yxc",
  talk: function() {
    console.log(this);
  }
}
person.talk();
const talk = person.talk;
talk();
// 运行结果：
// {name: 'yxc', talk: ƒ}
// Window


// bind()函数，可以绑定this的取值。例如：
const talk = person.talk.bind(person);


// 箭头函数的简写方式
const f = (x) => {
  return x * x;
};
// 可以简写为：
const f = x => x * x;
// 箭头函数不重新绑定this的取值
// 例如：
const person = {
  talk: function() {
    setTimeout(function() {
      console.log(this);
    }, 1000);
  }
};
person.talk();  // 输出Window
const person = {
  talk: function() {
    setTimeout(() => {
      console.log(this);
    }, 1000);
  }
};
person.talk();  // 输出 {talk: f}


// 对象的解构
// 例如：
const person = {
  name: "yxc",
  age: 18,
  height: 180,
};
const {name : nm, age} = person;  // nm是name的别名


// 数组和对象的展开
// 例如：
let a = [1, 2, 3];
let b = [...a];  // b是a的复制
let c = [...a, 4, 5, 6];
const a = {name: "yxc"};
const b = {age: 18};
const c = {...a, ...b, height: 180};
// Named 与 Default exports
// Named Export：可以export多个，import的时候需要加大括号，名称需要匹配
// Default Export：最多export一个，import的时候不需要加大括号，可以直接定义别名
```