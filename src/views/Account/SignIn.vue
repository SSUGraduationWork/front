<template>
    <div class = "background">
        <div class = "logo-box">
            <h1 class = "logo">Co<span>Work</span></h1>
            <p>CoWork는 학생들이 팀프로젝트를 하는 과정을 투명하게 공개하여</p>
            <p>교수님이 보다 객관적인 평가를 할 수 있게 도와줍니다.</p>
        </div>
        <div class = "login-button">
            <GoogleLoginButton @click="googleLogin"></GoogleLoginButton>
        </div>
        
    </div>
</template>
<script setup>
import axios from 'axios';
import GoogleLoginButton from './components/GoogleLoginButton.vue'
import {useRoute} from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const redirectURL = route.query.redirectURI;  //로그인 후 redirect할 uri
if (redirectURL){
    const uriArr = redirectURL.split("/");
    console.log(uriArr);
    if(redirectURL != "/alarmList/view" && uriArr[1] != 'dashboard' && uriArr[1] != 'user-info'){
        store.commit('setRedirectURL', redirectURL );
    } else if(uriArr[2] == "teamsByPro"){
        store.commit('setRedirectURL', `/dashboard/professor/teams/${uriArr[3]}`)
    }
    else {
        store.commit('setRedirectURL', null);
    }   
}

const google_uri = process.env.VUE_APP_GOOGLE_URI;
const client_id = process.env.VUE_APP_GOOGLE_CLIENT_ID;
const redirect_uri = process.env.VUE_APP_GOOGLE_REDIRECT_URI
const scope = process.env.VUE_APP_GOOGLE_SCOPE;

const uri = `${google_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`

const googleLogin = () => { 
    window.open(uri,"_self")
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=REM:ital,wght@1,800&display=swap');
.logo{
  margin-top: 150px;
  font-family: 'REM', sans-serif;
  font-size: 80px;

}
.logo span{
  color: #3772FF;
}

.logo-box{
    text-align: left;
    margin-left: 150px;
}
p{
    margin-left: 5px;
}
.login-button{
    margin-top: 50px;
    text-align: left;
    margin-left: 155px;
}
.background{
    width: 100%;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0px;
    background-color: #F5F6FA;
    background-image: url('../../assets/LoginPage.png')
}
</style>