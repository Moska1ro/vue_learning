import { createStore } from 'vuex';
import moduleUser from './user';

export default createStore({
  // 全局数据信息
  state: {
  },
  // 通过计算得到的信息一般放入getters，只读
  getters: {
  },
  // 所有对state直接修改的操作放入mutations
  // 不能执行异步操作
  mutations: {
  },
  // 定义对state的各种更新，不能对state进行修改
  actions: {
  },
  // 将state进行分割，放入modules中再进入state
  // 如user.js
  // 同样具有getters,mutations,actions属性
  modules: {
    user: moduleUser,
  }
});
