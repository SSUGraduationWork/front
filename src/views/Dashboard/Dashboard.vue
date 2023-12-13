<template>
<div v-if="loading" class = "loading-container">
    <Loader></Loader>
</div>
</template>
<script setup>
import Loader from '../../components/Loader.vue'
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
import { ref } from "vue";

var loading = true;
const store = useStore();
const router = useRouter();

const userId = ref(store.state.userStore.user_id);
const role = ref(store.state.userStore.role);

if (Number.isInteger(userId.value) && (role.value == "student" || role.value == "professor" )) {
    router.push(`/dashboard/${role.value}/${userId.value}`);
}
else{
    router.push('/accounts/signin');
}

</script>