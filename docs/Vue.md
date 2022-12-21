# Vue3
---
## 配置环境
+ 终端
Linux和Mac上可以用自带的终端。
Windows上推荐用powershell或者cmd。Git Bash有些指令不兼容。

+ 安装Nodejs

+ 安装@vue/cli
打开Git Bash，执行：
```
npm i -g @vue/cli
```
如果执行后面的操作有bug，可能是最新版有问题，可以尝试安装早期版本，比如：
```
npm i -g @vue/cli@4
```

+ 启动vue自带的图形化项目管理界面
vue ui
常见问题1：Windows上运行vue，提示无法加载文件，表示用户权限不足。
解决方案：用管理员身份打开终端，输入
```
set-ExecutionPolicy RemoteSigned
```
然后输入y

+ script部分
```js
export 
// default对象的属性：

name
// 组件的名称

components
// 存储<template>中用到的所有组件

props
// 存储父组件传递给子组件的数据

watch()
// 当某个数据发生变化时触发

computed
// 动态计算某个数据

setup(props, context)
// 初始化变量、函数

ref
// 定义变量，可以用.value属性重新赋值

reactive
// 定义对象，不可重新赋值

props
// 存储父组件传递过来的数据

context.emit()
// 触发父组件绑定的函数
```

+ template部分
```html
<slot></slot>：存放父组件传过来的children。
v-on:click或@click属性：绑定事件
v-if、v-else、v-else-if属性：判断
v-for属性：循环，:key循环的每个元素需要有唯一的key
v-bind:或:：绑定属性
```

+ style部分

```
<style>标签添加scope属性后，不同组件间的css不会相互影响。
```

+ 第三方组件
view-router包：实现路由功能。
vuex：存储全局状态，全局唯一。
state: 存储所有数据，可以用modules属性划分成若干模块
getters：根据state中的值计算新的值
mutations：所有对state的修改操作都需要定义在这里，不支持异步，可以通过\$store.commit()触发
actions：定义对state的复杂修改操作，支持异步，可以通过$store.dispatch()触发。注意不能直接修改state，只能通过mutations修改state。
modules：定义state的子模块


+ 面试题：react、vue中的key有什么作用？（key的内部原理）
+ 虚拟DOM中key的作用：
key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】
随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
+ 对比规则：
(1) 旧虚拟DOM中找到了与新虚拟DOM相同的key：
若虚拟DOM中内容没变, 直接使用之前的真实DOM！
若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
用index作为key可能会引发的问题：
若对数据进行：逆序添加、逆序删除等破坏顺序操作:
会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
如果结构中还包含输入类的DOM（例如input框）：
会产生错误DOM更新 ==> 界面有问题
+ 开发中如何选择key?:
最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。（不对数据进行修改）

```
课上项目的API
1. 获取Json Web Token（JWT）
地址：https://app165.acapp.acwing.com.cn/api/token/
方法：POST
是否验证jwt：否
输入参数：
username: 用户名
password: 密码
返回结果：
access: 访问令牌，有效期5分钟
refresh: 刷新令牌，有效期14天

2. 刷新JWT令牌
地址：https://app165.acapp.acwing.com.cn/api/token/refresh/
方法：POST
是否验证jwt：否
输入参数：
refresh: 刷新令牌
返回结果：
access: 访问令牌，有效期5分钟

3. 获取用户列表
地址：https://app165.acapp.acwing.com.cn/myspace/userlist/
方法：GET
是否验证jwt：否
输入参数：无
返回结果：返回10个用户的信息

4. 获取某个用户的信息
地址：https://app165.acapp.acwing.com.cn/myspace/getinfo/
方法：GET
是否验证jwt：是
输入参数：
user_id：用户的ID
返回结果：该用户的信息

5. 获取某个用户的所有帖子
地址：https://app165.acapp.acwing.com.cn/myspace/post/
方法：GET
是否验证jwt：是
输入参数：
user_id：用户的ID
返回结果：该用户的所有帖子

6. 创建一个帖子
地址：https://app165.acapp.acwing.com.cn/myspace/post/
方法：POST
是否验证jwt：是
输入参数：
content：帖子的内容
返回结果：result: success

7. 删除一个帖子
地址：https://app165.acapp.acwing.com.cn/myspace/post/
方法：DELETE
是否验证jwt：是
输入参数：
post_id：被删除帖子的ID
返回结果：result: success

8. 更改关注状态
如果未关注，则关注；如果已关注，则取消关注。
地址：https://app165.acapp.acwing.com.cn/myspace/follow/
方法：POST
是否验证jwt：是
输入参数：
target_id: 被关注的用户ID
返回结果：result: success

9. 注册账号
地址：https://app165.acapp.acwing.com.cn/myspace/user/
方法：POST
是否验证jwt：否
输入参数：
username: 用户名
password：密码
password_confirm：确认密码
返回结果：
result: success
result: 用户名和密码不能为空
result: 两个密码不一致
result: 用户名已存在
```