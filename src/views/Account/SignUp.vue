<template>
    <div class = "background">
        <div class="input-box">
            <div class = "role">
                <RadioButton @selectedRole="selectedRole"></RadioButton>
            </div>
            <div v-if="role == 'student'" class = "student-number">
                <input v-model="studentNumber" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '')" maxlength="8" required>
                <label>학번 :</label>
                <span></span>
            </div>
            <div class = "name">
                <input v-model="name" type="text" required>
                <label>이름 :</label>
            </div>
            <div class = "school">
                <input v-model="univ" type="text" required>
                <label>학교 :</label>
            </div>
            <div class = "department">
                <input v-model="department" type="text" required>
                <label>학과 :</label>
            </div>
            <div class="register">
                <button @click="register">회원가입</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import RadioButton from "./components/RadioButton";
import { ref, computed } from "vue";
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const role = ref('');
const studentNumber = ref();
const univ = ref('');
const department = ref('');
const name = ref('');
const userEmail = ref(store.state.registerStore.user_email);
const pictureUrl = ref(store.state.registerStore.picture_url);

const userStore = 'userStore';

const selectedRole = (r) => {
    role.value = r;
}
const register = () => {
    axios.post('http://localhost:3210/accounts/signup', 
        {   user_email : userEmail.value,
            user_name: name.value, 
            role: role.value, 
            student_number: studentNumber.value, 
            university: univ.value, 
            department: department.value,
            picture_url : pictureUrl.value
        })
        .then((res) => {
            if(res.data.code == 200){
                store.commit(`${userStore}/setUserId`, res.data.result.user_id );
                store.commit(`${userStore}/setJwtToken`, res.data.result.jwtToken);

                router.push(`/dashboard/${res.data.result.user_id}`);
            }
        })
}
</script>
<style scoped>
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
    background-image: url('../../assets/RegisterPage.png')
}
.input-box{
    width: 60vh;
    float: right;
    margin-right: 100px;
    margin-top: 7em;
    height: 70vh;
    background-color: #F5F6FA;
    border-radius: 15px;
}
.role,
.student-number,
.school,
.department,
.register,
.name{
  position: relative;
  width: 300px;
  margin-left: 50px;
  margin-top: 35px;
}
input {
  background-color: #DBE6FF;
  border: none;
  font-size: 15px;
  width: 280px;
  height: 42px;
  border-radius : 10px;
  position: relative;
  z-index: 5;
  padding-left: 20px;
}

label {
  position: absolute;
  left: 3px;
  font-size: 16px;
  bottom: 47px;
  font-weight: 600;
  transition: all .2s;
}
button{
    font-size: 15px;
    position: relative;
    border: 1px solid #3772FF;
    width: 303px;
    height: 45px;
    border-radius : 10px;
    background-color: #3772FF;
    color: white;
    font-weight: 600;
    cursor: pointer;
}
</style>