<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user" />
                <UserProfileWrite v-if="isMe" @submitPost="submitPost" />
            </div>
            <div class="col-9">
                <UserProfilePosts :user="user" :posts="posts" @deletePost="deletePost" />
            </div>
        </div>
    </ContentBase>
</template>
  
<script>
import UserProfileInfo from '../components/UserProfileInfo';
// import UserProfileInfoVue from '@/components/UserProfileInfo.vue';
import ContentBase from '../components/ContentBase';
import UserProfilePosts from '../components/UserProfilePosts';
import UserProfileWrite from '@/components/UserProfileWrite';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
    name: 'UserProfile',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite,
    },
    setup: () => {
        const store = useStore();
        const route = useRoute();
        // const userId = parseInt(route.params.userId);
        const userId = route.params.userId;
        const user = reactive({});
        const posts = reactive({});

        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
            type: 'GET',
            data: {
                user_id: userId,
            },
            headers: {
                'Authorization': 'Bearer ' + store.state.user.access,
            },
            success(resp) {
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followerCount = resp.followerCount;
                user.isFollowed = resp.is_followed;// 命名规范问题：拿到的接口中的变量名称
            }
        });

        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
            type: 'GET',
            data: {
                user_id: userId,
            },
            headers: {
                'Authorization': 'Bearer ' + store.state.user.access,
            },
            success(resp) {
                posts.count = resp.length;
                posts.posts = resp;
            }
        });
        const follow = () => {
            if (user.isFollowed) return;
            user.isFollowed = true;
            user.followerCount++;
        };
        const unfollow = () => {
            if (!user.isFollowed) return;
            user.isFollowed = false;
            user.followerCount--;
        };

        const submitPost = (content) => {
            posts.count++;
            posts.posts.unshift({
                id: posts.count,
                userId: 1,
                content: content,
            });
        };

        const deletePost = postId => {
            posts.posts = posts.posts.filter(post => post.id !== postId);
            posts.count = posts.posts.length;
        };

        const isMe = computed(() => userId == store.state.user.id);
        return {
            user,
            follow,
            unfollow,
            posts,
            submitPost,
            deletePost,
            userId,
            isMe,
        }
    }
}
</script>
  
<style scoped>

</style>