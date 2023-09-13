<template>
  <div class ="header">
    <div class = "header-info">
      <ul>
        <div class = "header-right-div">
          <li class = "header-right">
            <div class = "circle-profile">
              <img :src = "headerInfo.picture_url" class = "profile-user-img">
            </div>
          </li>
          <li class = "header-right">
            <div class = "user-info">
              <h4>{{headerInfo.student_number}} {{headerInfo.user_name}}</h4>
              <h5>{{headerInfo.department}}</h5>
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
            <h3>{{headerInfo.team_name}}</h3>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import {ref, onBeforeMount} from 'vue'
import axios from 'axios';
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
    const headerInfo = ref({});
    const store = useStore();
    const user_id = ref(store.state.userStore.user_id);
    onBeforeMount(async () => {
      await router.isReady();
      const {teamId} = route.params;

      axios.get(`http://44.219.162.63:3000/header`, {
        params : {userId : user_id.value, teamId : teamId}
      })
          .then((res) => {
            headerInfo.value = {...res.data.result};
          })
    })
    return { headerInfo }
  },
  methods: {
    controlAlarm() {
      this.isModalOpen = !this.isModalOpen;
    },
    closeAlarm() {
      this.isModalOpen = false;
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
  width: 250px;
  height: 50px;
  position: fixed;
}
.header-right-div{
  background-color: white;
  float: right;
  width: 320px;
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
</style>