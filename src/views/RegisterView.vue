<template>
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="username" class="form-control" id="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="mb-3">
                        <label for="passwordConfirm" class="form-label">确认密码</label>
                        <input v-model="passwordConfirm" type="password" class="form-control" id="passwordConfirm">
                    </div>
                    <div class="error-message">{{ errorMessage }}</div>
                    <button type="submit" class="btn btn-primary">登录</button>
                </form>
            </div>
        </div>
    </ContentBase>
</template>
  
<script>
import ContentBase from '../components/ContentBase';
import { ref } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';
import router from '@/router/index';
export default {
    name: 'RegisterView',
    components: {
        ContentBase,
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let passwordConfirm = ref('');
        let errorMessage = ref('');

        const register = () => {
            errorMessage.value = '';
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/user/',
                type: 'POST',
                data: {
                    username: username.value,
                    password: password.value,
                    password_confirm: passwordConfirm.value,
                },
                success(resp) {
                    if (resp.result === 'success') {
                        store.dispatch('login', {
                            username: username.value,
                            password: password.value,
                            success() {
                                router.push({
                                    name: 'userlist',
                                });
                            },
                            error() {
                                errorMessage.value = '系统异常，请稍后重试';
                            },
                        });
                    } else {
                        errorMessage.value = resp.result;
                    }
                },
            });
        };
        return {
            username,
            password,
            errorMessage,
            register,
            passwordConfirm,
        }
    }
}
</script>
  
<style scoped>
button {
    width: 100%;
}

.error-message {
    color: red;
}
</style>