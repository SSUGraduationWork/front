<template>
  <div class="chat">
    <div class ="voice">
      <div class = "voice-chat" @click="enterVoiceChat" :style = "{backgroundColor : backgroundColor}">
        <div class ="voice-icon"><i class="fi fi-sr-volume"></i></div>
        <div class = "voice-info">음성 채팅</div>
        <video ref="localVideo" autoplay style="display: none;"></video>
      </div>
      <div class = "footer-bg">
        <div class = "sound-icon"><i class="fi fi-sr-circle-waveform-lines"></i></div>
        <div class = "connection"></div>
        <div class="mute-icon"><i class="fi fi-ss-circle-microphone"></i></div>
      </div>
    </div>
    <div class ="message">
      <div class = "chatting" ref="chattingContainer">
        <div v-for = "(m, i) in messages" :key="i" class = "chat-message">
          <div v-if="m[0] == userId" class = "my-chat-info">
            <div class = "left-box">
              <div class = "my-user-info">
                <span class = "my-date">&nbsp;&nbsp;&nbsp;{{ m[2] }}&nbsp;&nbsp; {{ m[3] }}</span>
              </div>
              <div class = "my-content">
                <div>
                  {{ m[1] }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class = "chat-info">
            <div class = "user-img" >
              <img v-if ="membersById[m[0]]" :src = "membersById[m[0]].pictureUrl">
            </div>
            <div class = "right-box">
              <div class = "user-info">
                <span v-if ="membersById[m[0]]" class = "user-name">{{membersById[m[0]].name}}</span>
                <span class = "date">&nbsp;&nbsp;&nbsp;{{ m[2] }}&nbsp;&nbsp; {{ m[3] }}</span>
              </div>
              <div class = "content">
                <div>
                  {{ m[1] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class = "footer" >
        <div class = "input-box">
          <textarea :disabled="role == 'professor'" type="text" v-model="message" placeholder="메세지를 입력하세요" ref="remarksTextArea" @keypress="handleKeyDown"></textarea>
          <div :style="{'cursor': role == 'professor' ? 'auto' : 'pointer'}" @click="submitMessage" class = "submit">
              <i class="fa-regular fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//socket.io
import io from 'socket.io-client';
import { ref } from 'vue';
import {useRoute} from 'vue-router'
import { axiosInstance } from '@/axios';
import axios from 'axios';
import { useStore } from 'vuex';
import { onBeforeMount } from 'vue';


const store = useStore();
const route = useRoute();
const moment = require('moment');
const {teamId} = route.params;
const userId = store.state.userStore.user_id;
const role = store.state.userStore.role;

const teamMembers = ref();
const membersById = ref({});

const remarksTextArea = ref(null);
const message = ref('');
const messages = ref([]);

const chattingContainer = ref(null);
const backgroundColor = ref("#F5F6FA")
const localVideo = ref(null);
const localStream = ref(null);
const voiceChatMembers = ref({});
const chatURI = "http://localhost:3001";

const socket = io(chatURI, {
  withCredentials: true,
  extraHeaders: {
    "extra-custom-headers": "localhost"
  }
});



// 컴포넌트가 마운트되기 전에 실행될 로직을 여기에 작성합니다.
onBeforeMount(() => {
  axiosInstance.get(`/dashboard-service/${teamId}/team-members`)
        .then((res) => {
   
            teamMembers.value = res.data.teamMembers;

            //user_id 와 유저 정보 연결
            (teamMembers.value).forEach((val, i, arr) => {
              membersById.value[val.id] = val;
            })
        })
        .catch((error) => {
          console.log(error);
        })
  
});

axios.get(`${chatURI}/chats/${teamId}`)
  .then((res) => {
    const chats = res.data.chats;
    chats.forEach((val, i, arr) => {
      let date = moment(val.createdAt);
      messages.value.push([val.userId, val.content, date.format('YYYY.MM.DD'), date.format('h:mm A')]);
    })
    scrollToBottom();
})

const scrollToBottom = () => {
  if (chattingContainer.value) {
    const container = chattingContainer.value;
    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  }
};

socket.emit("enter_room", teamId, userId, () => {
  console.log(`${teamId}번 방 입장`);
})
socket.on("chat_message", (userId, message) => {
  scrollToBottom();
  messages.value.push([userId, message, moment().format('YYYY.MM.DD'), moment().format('h:mm A')]);
})

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && event.shiftKey) {
    return;

  } else if(event.key === 'Enter'){
    event.preventDefault();
    submitMessage();
  }
}

const submitMessage = () => {

  if (message.value.trim() !== '') {
    console.log("보냄");
    socket.emit("chat", teamId, message.value);
    message.value = '';
  }
}

/*----voice chat----*/
const enterVoiceChat = () => {
  backgroundColor.value = "#F5F6FA"
  const video = localVideo.value;
  console.log(voiceChatMembers.value)
  if(localStream.value){
    const tracks = localStream.value.getTracks();
    tracks.forEach((track) => track.stop());
    localStream.value = null;
    const video = localVideo.value;
    video.srcObject = null; // Remove the video stream
    delete voiceChatMembers.value.userId;
    return 
  }
  navigator.mediaDevices.getUserMedia({audio: true})
        .then((stream) => {
          video.srcObject = stream;
          console.log(stream);
          localStream.value = stream;
        })
        .catch((err) => {
          console.log("Error accessing media devices", err);
        })
  voiceChatMembers.value[userId] = userId;
}


</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=REM:ital,wght@1,800&display=swap');
*{}
.chat{
  width: 100%;
  height: 91vh;
  margin-top: 9vh;
  display: flex;
  flex-direction: row;
  overflow-y:hidden;
}
.voice{
  width: 22%;
  height: 100vh;
  background-color: white;
  border-right: 1.5px solid #F0EFEF;
  min-width: 230px;
  position: relative;
}
.voice-chat{
  display: flex;
  margin-left: 30px;
  margin-top: 20px;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  font-weight: 600;
  width: 80%;
  border-radius: 10px;
  cursor: pointer;
}
.voice-chat:hover{
  background-color: #3772FF;
}
.voice-icon{
  margin-top: 2px;
  margin-right: 13px;
  margin-left: 20px;
}
textarea {
  width: 100%;
  min-height: 39px;
  overflow: scroll;
  border-radius: 15px;
  padding: 9px;
  padding-left: 15px;
  border: none;
  resize: none;
  padding-right: 15px;
  padding-bottom: 5px;
  font-size: 15px;
  
}
textarea:focus {
  outline: none;
}
.message{
  margin-top: 2vh;
  width: 78%;
  float: right;
  right: 0;
  position: relative;
  height: 91vh;
  overflow: hidden;
  min-width: 500px;
}
.chatting{
  width: 100%;
  height: 83%;
  overflow: scroll;
}
.input-box{
  width: 90%;
  position: absolute;
  bottom: 0;
  display: flex;
  padding-bottom: 20px;
  margin-left: 50px;
  margin-bottom: 40px;
  max-height: 37px;
  border-radius: 15px;
  box-shadow: 0 0 8px rgba(0,0,0,0.25);
  background-color: white;
}
.submit{
  cursor: pointer;
  border-radius: 100%;
  width: 42px;
  height: 40px;
  margin-top: 8px;
  margin-right: 20px;
  background-color: #3772FF;
  color: white;
}
.fa-paper-plane{
  line-height: 40px;
  margin-top: 11.5px;
  margin-right: 2px;
  font-size: 18px;
}
.user-img{
  cursor: pointer;
  width: 35px;
  height: 35px;
  border-radius: 70%;
  overflow: hidden;
  position: relative;
  background : #F5F6FA;
  border:none;
}
img{
  width: 100%;
  object-fit: cover;
}
.chat-info{
  display: flex;
  margin-left: 40px;
  margin-top: 13px;
}
.my-chat-info{
  display: flex;
  justify-content: end;
  margin-right: 40px;
}
.chat-message{
  margin-top: 10px;
  width: 100%;
}
.user-name{
  margin-left: 15px;
  font-size: 15px;
  font-weight: 600;
}
.date{
  font-size: 13px;
}
.my-date{
  font-size: 13px;
  margin-right: 10px;
}
.content{
  margin-left: 15px;
  font-size: 15px;
  margin-top: 20px;
}
.content div{
  display: inline-block;
  max-width: 500px;
  padding: 12px;
  width: 100%;
  text-align: left;
  position: relative;
  background-color: #e7e7e7;
  border-radius: 10px;
}
.my-content{
  margin-top: 20px;
  font-size: 15px;
  background-color: #3772FF;
  padding: 12px;
  border-radius: 10px;
}
.my-content div{
  display: inline-block;
  max-width: 500px;
  width: 100%;
  text-align: left;
  color: white;
  position: relative;
}
.user-info{
  float: left;
  display: block;
}
.my-user-info{
  float: right;
  display: flex;
}
.right-box{
  max-width: 80%;
}
.left-box{
  max-width: 80%;
}
.footer-bg{
  position: absolute;
  width: 80%;
  height: 60px;
  bottom: 0;
  margin-bottom: 100px;
  display: flex;
  border-radius: 10px;
  margin-left: 30px;
  background : #F5F6FA;
  line-height: 67px;
  float: right;
}
.sound-icon{
  font-size: 26px;
  float: left;
  margin-left: 20px;
  cursor: pointer;
}
.mute-icon{
  font-size: 26px;
  margin-right: 20px;
  cursor: pointer;
}
.connection{
  width: 57%;
}
</style>
