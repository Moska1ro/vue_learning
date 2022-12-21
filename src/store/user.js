import $ from 'jquery';
import jwtDecode from 'jwt-decode';

const moduleUser = {
    // 全局数据信息
    state: {
        username: '',
        id: '',
        photo: '',
        followerCount: 0,
        access: '',
        refresh: '',
        isLogin: false,
    },
    // 通过计算得到的信息一般放入getters，只读
    getters: {
    },
    // 所有对state直接修改的操作放入mutations
    // 不能执行异步操作
    mutations: {
        updateUser(state, user) {
            // 原来：state.id = user;
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.isLogin = user.isLogin;
        },
        updateAccess(state, access) {
            state.access = access;
        },
        logout(state) {
            state.id = '';
            state.username = '';
            state.photo = '';
            state.followerCount = 0;
            state.access = '';
            state.refresh = '';
            state.isLogin = false;
        },
    },
    // 定义对state的各种更新，不能对state进行修改
    // 支持异步
    // 同步写到mutations和actions里都行，异步写到actions中。
    actions: {
        login: (context, data) => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/api/token/',
                type: 'POST',
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    const { access, refresh } = resp;
                    const accessObj = jwtDecode(access);

                    setInterval(() => {
                        $.ajax({
                            url: 'https://app165.acapp.acwing.com.cn/api/token/refresh/',
                            type: 'POST',
                            data: {
                                refresh,
                            },
                            success(resp) {
                                context.commit('updateAccess', resp.access);
                            },
                        });
                    }, 4.5 * 60 * 1000);// 简易的刷新access的方法；
                    $.ajax({
                        url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
                        type: 'GET',
                        data: {
                            user_id: accessObj.user_id,
                        },
                        headers: {
                            // Bearer后面一定要加空格
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            context.commit('updateUser', {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                isLogin: true,
                            });
                            data.success();
                        },
                    });
                },
                error() {
                    data.error();
                }
            });
        },
    },
    // 将state进行分割，放入modules中再进入state
    // 同样具有getters,mutations,actions属性
    modules: {
    },
};

export default moduleUser;