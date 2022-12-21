<template>
    <div class="card">
        <div class="card-body">
            <div v-for="post in posts.posts" :key="post.id">
                <div class="card single-post">
                    <div class="card-body">
                        {{ post.content }}
                        <button @click="deletePost(post.id)" v-if="isMe" class="btn btn-danger btn-sm">
                            删除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';
export default {
    name: 'UserProfilePosts',
    props: {
        posts: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        }
    },
    setup(props, context) {
        const store = useStore();
        let isMe = computed(() => store.state.user.id === props.user.id);
        const deletePost = postId => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
                type: 'DELETE',
                data: {
                    post_id: postId,
                },
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === 'success') {
                        context.emit('deletePost', postId);
                    }
                },
            });
        };
        return {
            deletePost,
            isMe,
        }
    },

}
</script>

<style scoped>
.single-post {
    margin-bottom: 10px;
}

button {
    float: right;
}
</style>