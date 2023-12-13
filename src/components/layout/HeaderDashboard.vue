<template>
  <div class ="header">
    <div class = "header-info">
      <ul>
        <div class = "header-right-div">
          <li class = "header-right profile">
            <div class = "circle-profile" @click="goToMyPage">
              <img :src = "userInfo.pictureUrl" class = "profile-user-img">
            </div>
          </li>
          <li class = "header-right">
            <div class = "user-info">
              <h4>{{userInfo.studentNumber}}&nbsp;&nbsp;{{userInfo.name}}</h4>
              <h5>{{userInfo.department}}</h5>
            </div>
          </li>
          <li class = "header-right" v-click-outside="closeAlarm">
            <div @click="controlAlarm" class = "circle-notification alarm" :class="{'alarm-clicked': isModalOpen }">
              <div class = "icon">
                <div  class="button-style"><i class="fa-solid fa-bell icon-style"></i></div>
              </div>
            </div>
            <Alarm :isClicked = "isModalOpen" @close-alarm = "controlAlarm"></Alarm>
          </li>
        </div>
        <div class = "header-left-div">
          <li class = "header-left">
            <h3>{{teamInfo.projectName}} {{teamInfo.teamName}}</h3>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref, onBeforeMount} from 'vue'
import {axiosInstance} from '@/axios';
import {useRouter, useRoute} from 'vue-router'
import { useStore } from 'vuex';
import Alarm from './Alarm.vue';
import vClickOutside from 'click-outside-vue3'

export default {
  props: {
    teamId : {
      type: String,
    },
  },
  components : { Alarm },
  directives : {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      isModalOpen: false,
      content: [],
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userInfo = ref({});
    const teamInfo = ref({});
    const store = useStore();
    const userId = ref(store.state.userStore.user_id);
    const role = ref(store.state.userStore.role);
    const teamId = ref(0);
    onBeforeMount(async () => {
      await router.isReady();
      teamId.value = route.params.teamId;

      axiosInstance.get(`/user-service/user-info/${userId.value}`)
          .then((res) => {
            userInfo.value = res.data;
            if(userInfo.value.studentNumber == 0){
              userInfo.value.studentNumber = "";
            }
          })
      if(teamId.value){
        axiosInstance.get(`/dashboard-service/team-info/${teamId.value}`)
          .then((res)=> {
            teamInfo.value = res.data;
          })
      }
    })
    return { userInfo, teamInfo, teamId, userId, role }
  },
  methods: {
    controlAlarm() {
      this.isModalOpen = !this.isModalOpen;
    },
    closeAlarm() {
      this.isModalOpen = false;
    },
    goToMyPage() {
      this.$router.push(`/dashboard/${this.role}/${this.userId}`);
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
@import "~@flaticon/flaticon-uicons/css/all/all";

* {
  font-family: 'Red Hat Display', sans-serif;
}
.header {
  border-bottom: 1.5px solid #F0EFEF;
  height: 8.5vh;
  background-color: white;
  z-index: 2;
  position: fixed;
  top: 0px;
  width: 100%;
}
.header ul {
  list-style-type: none;
}
.header-left {
  float: left;
  font-weight: 700;
}
.header-right{
  float: right;
  margin-right: 30px;
}
.header-left-div{
  float: left;
  width: 500px;
  height: 50px;
  position: fixed;
}
.header-right-div{
  float: right;
  width: 400px;
  height: 50px;
  position: fixed;
  right: 10px;
  z-index: 10;
}
h3 {
  font-weight: 700;
  margin-top: 5px;
}
h4 {
  margin-top: -3px;
  font-weight: 600;
}
h5 {
  margin-top: -20px;
  margin-bottom: 0px;
  font-weight: 500;
}
.circle-profile,
.circle-notification {
  cursor: pointer;
  margin-top: -3px;
  width: 40px;
  height: 40px;
  border-radius: 70%;
  overflow: hidden;
  position: relative;
  background : #F5F6FA;
  border:none;
}
.profile-user-img{
  width: 100%;
  object-fit: cover;
}

.circle-notification:hover{
  background-color : #3772FF;
  color: white;
}
.icon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
}
.alarm-clicked{
  background-color : #3772FF;
  color: white;
}
.circle-profile:hover{
  border: 1.5px solid #ccc;
}
</style>