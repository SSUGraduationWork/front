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

axiosInstance.get(`/accounts/oauth2/google/callback?code=${route.query.code}`)
    .then((res) => {
        if(res.data.result) {
            if (res.data.result.user_id == null) {
                //signup 페이지로 이동 (user_email, picture_url 값 전송해야함)
                store.commit(`${registerStore}/setUserEmail`, res.data.result.user_email);
                store.commit(`${registerStore}/setPictureUrl`, res.data.result.picture_url);
                
                router.push('/accounts/signup');
            } else {
                store.commit(`${userStore}/setUserId`, res.data.result.user_id );
                store.commit(`${userStore}/setJwtToken`, res.data.result.jwtToken);
                
                if (redirectURL.value != null && redirectURL.value != "/dashboard"){
                    store.commit('setRedirectURL', null);
                    router.push(`${redirectURL.value}`);
                } else{
                    router.push(`/dashboard/${res.data.result.role}/${res.data.result.user_id}`);
                }
            }
        }
       
    })

</script>
