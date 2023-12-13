<template>
    <div class="container">
        <Loader></Loader>
    </div>
</template>
<script setup>
import { axiosInstance } from '../../axios';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';
import Loader from '../../components/Loader.vue'

const route = useRoute();
const router = useRouter();
const store  = useStore();

const registerStore = 'registerStore';
const userStore = 'userStore';
const redirectURL = ref(store.state.redirectURL);  //로그인 후 redirect할 uri
console.log("진입")
axiosInstance.get(`/user-service/accounts/oauth2/google/callback?code=${route.query.code}`)
    .then((res) => {

        if(res.data) {
            if (res.data.user_id == null) {
                //signup 페이지로 이동 (user_email, picture_url 값 전송해야함)
                store.commit(`${registerStore}/setUserEmail`, res.data.user_email);
                store.commit(`${registerStore}/setPictureUrl`, res.data.picture_url);
                
                router.push('/accounts/signup');
            } else {
                store.commit(`${userStore}/setUserId`, res.data.user_id );
                store.commit(`${userStore}/setJwtToken`, res.data.jwtToken);
                store.commit(`${userStore}/setRole`, res.data.role);
                
                if (redirectURL.value != null){
                    store.commit('setRedirectURL', null);
                    router.push(`${redirectURL.value}`);
                
                    //window.open(`http://192.168.23.111:80/${redirectURL.value}`,"_self")
                } else{
                    router.push(`/dashboard/${res.data.role}/${res.data.user_id}`);
                    //window.open(`http://192.168.23.111:80/dashboard/${res.data.role}/${res.data.user_id}`,"_self")
                }
            }
        }
       
    })

</script>
