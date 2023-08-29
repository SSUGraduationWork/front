<template>
    <div class = "account">
        <div>{{ $route.params.id }}</div>
        <router-view></router-view>
    </div>
</template>
<script setup>
import axios from 'axios';
import GoogleLoginButton from './components/GoogleLoginButton.vue'


const googleLogin = () => {
    window.open("http://localhost:3210/accounts/oauth2/google","_self")
}
</script>
<style scoped>

</style>