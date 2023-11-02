<template>
    <div v-if="isClicked" class="modal">
        <div class="modal-content">
            <!-- 모달 내용 -->
            <div v-for="item in content" :key="item.alarmId" class="alarm-item">
                <div class = "alarm" v-if="(item.alarmKind === 'requestFeedback' ) || item.alarmKind === 'newWrite'||item.alarmKind==='agreeFeedback'||item.alarmKind==='denyFeedback'||(item.alarmKind === 'complUpdate' && (item.feedbackYn==1||item.feedbackYn==0))">
                    <div class="small-text">{{ formatDateFromArray(item.createdTime) }}</div>
                    <div class="image-container">
                        <div class = "icon"><i v-if="!item.seen" class="fa-solid fa-circle icon-circle"></i></div>
                        <div class ="user-img"><img :src="item.pictureUrl" alt="이미지" class="spaced"></div>
                        <div class="content-font-size">
                            {{ item.content }}
                            <p class = "direct"><a :href="item.redirectUrl +'/'+$route.params.teamId" @click="handleLinkClick(item.alarmId)"><i class="fa-solid fa-arrow-up-right-from-square"></i>바로가기</a></p>
                        </div>
                    </div>
                </div>
                <div  class = "alarm" v-if="item.alarmKind === 'complUpdate' && item.feedbackYn==2">
                    <div class="small-text">{{ formatDateFromArray(item.createdTime) }}</div>
                    <div class="image-container">
                        <div class = "icon"><i v-if="!item.seen" class="fa-solid fa-circle icon-circle"></i></div>
                        <div class="user-img"><img :src="item.pictureUrl" alt="이미지" class="spaced"></div>
                        <div class="content-font-size">{{ item.content }}</div>
                    </div>
                    <div class="rebutton-style">
                        <button v-if="!check[item.alarmId]" @click="handleReapprove(item.boardId, item.writerId, item.alarmId, 1)" class="reagree">수락</button>
                        <button v-if="!check[item.alarmId]" @click="handleReapprove(item.boardId, item.writerId, item.alarmId, 2)" class="redeny">거절</button>
                        <div v-if = "check[item.alarmId] == 2" class = "no">
                          <div class = "no-icon"><i class="fi fi-sr-cross-circle"></i></div>
                          <div class = "no-content">&nbsp;&nbsp;거절하셨습니다.</div>
                        </div>
                        <div v-if = "check[item.alarmId] == 1" class = "yes">
                          <div class = "yes-icon"><i class="fi fi-ss-check-circle"></i></div>
                          <div class = "yes-content">&nbsp;&nbsp;수락하셨습니다.</div>
                        </div>
                    </div>
                </div>
                <div  class = "alarm" v-if="item.alarmKind === 'complFeedback'">
                    <div class="small-text">{{ formatDateFromArray(item.createdTime) }}</div>
                    <div class="image-container">
                        <div class="icon-3"><i v-if="!item.seen" class="fa-solid fa-circle icon-circle"></i></div>
                        <div class="content-font-size">{{ item.content }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {axiosInstance} from '@/axios';
import axios from 'axios';
import {ref, watchEffect} from 'vue';
import { defineProps } from 'vue';
import {useStore} from 'vuex';

const content = ref([]);
const store = useStore();
const userId = store.state.userStore.user_id;
const check = ref({});
const props = defineProps({
    isClicked : {
        type: Boolean,
    },
});
const fetchAndShowAlarms = async() => {
  try {
      
        const response = await axiosInstance.get(`board-service/alarmList/view/${userId}`);
        content.value = response.data.content;
        console.log(content.value);
        // boardId를 기준으로 내림차순으로 정렬
        content.value.sort((a, b) => b.alarmId - a.alarmId);
      } catch (error) {
        console.error('Error fetching alarms:', error);
      }
      
}
const closeModalOutside = ()  => {
        // 모달이 닫힐 때 각 항목의 'seen' 속성을 true로 업데이트하고 서버에 업데이트 요청을 보냄
        content.value.forEach(async item => {
          item.seen = true;

          try {
            // 서버에 업데이트 요청 보내기
            await axiosInstance.put(`board-service/updateSeenStatus/${item.alarmId}`, {
              seen: true
            });
          } catch (error) {
            console.error('Error updating seen status:', error);
          }
        });
}
watchEffect(() => {
  if (props.isClicked){
    fetchAndShowAlarms();
  } else{
    closeModalOutside();
  }
})
const formatDateFromArray = (dateArray) => {
      // 연도, 월, 일, 시간, 분, 초 추출
      const [year, month, day, hour, minute] = dateArray;

      // 오전 또는 오후 판별
      const amOrPm = hour < 12 ? '오전' : '오후';

      // 12시간 형식으로 시간 변환
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

      // 분과 초를 두 자릿수로 포맷
      const formattedMinute = minute.toString().padStart(2, '0');


      // 날짜 및 시간을 원하는 형식으로 조합
      const formattedDate = `${year}.${month}.${day} ${amOrPm} ${formattedHour}:${formattedMinute}`;

      return formattedDate;
}

const handleReapprove = async (boardId, writerId, alarmId, isApproved) => {
      try {
        check.value[alarmId] = isApproved;
        await axiosInstance.post(`board-service/recomment/${boardId}/${writerId}/${isApproved}`);
        // 재수락 또는 거절 요청을 보낸 후에, 필요한 업데이트를 수행할 수 있습니다.

      } catch (error) {
        console.error('Error reapproving:', error);
      }
}
const handleLinkClick = async (alarmId) => {
      // 1. API 호출
      try {
        const response = await axios.get(`http://localhost:3210/alarm/view/${alarmId}`);
        // 처리할 로직 작성 (예: 상세 정보 표시)
      } catch (error) {
        console.error('Error fetching alarm detail:', error);
      }
} 
</script>
<script>
import axios from 'axios';
import { axiosInstance } from '@/axios';
import vClickOutside from 'click-outside-vue3'

export default {
  data() {
    return {
      //guyujung alarm
      isModalOpen: false,
      content: [],
    }
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');

* {
  font-family: 'Red Hat Display', sans-serif;
}
/* 모달 스타일 */
.modal {
  position: absolute;
  right: 120px;
  top: 50px;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  border-radius: 20px;
  z-index: 15;
  overflow-y: scroll;
}

.modal-content {
  background-color: white;
  width: 330px;
  height: 400px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  overflow-y: scroll;
  z-index: 15;
}

/* 버튼 스타일 */
.button-style {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
}
/*
프로필 이미지
 */

.spaced{
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.small-text{
  text-align: right;
  font-size: 12px;
  width: 94%;
  font-weight: 400;
}

.content-font-size{
  font-size: 13px;
  margin-left: 10px;
  padding: 10px;
  text-align: left;
  font-weight: 500;
}

.fa-arrow-up-right-from-square{
  margin-right: 10px;
}

.icon-circle {
  margin-left: 18px;
  font-size: 10px; /* Adjust the size as needed */
  color: #3772FF; /* Set the color as desired */
}
.icon{
    float: left;
    line-height: 60px;
}
.user-img{
    float: left; /* 이미지를 왼쪽으로 옮김 */
    margin-left: 15px; /* 이미지와 텍스트 사이 간격 설정 */
    margin-top: 12px;
}
.image-container {
  display: flex;
  width: 98%;
  min-height: 55px;
  padding-top: 0px;
}
.direct{
  font-size: 13px;
}
.rebutton-style{
  justify-content: center;
  margin-top: 3px;
  margin-bottom: 15px;
}
.reagree{
  cursor: pointer;
  width: 100px;
  background-color: #3772FF;
  color: #f0f0f0;
  border-radius: 15px;
  border: none;
  font-weight: 600;
  height: 27px;
}
.redeny{
  cursor: pointer;
  width: 100px;
  background-color: #e1e1e1;
  color: black;
  border-radius: 15px;
  margin-left: 30px;
  border: none;
  font-weight: 600;
  height: 27px;
}
.reagree:hover{
    background-color: #215DEB;
}
.redeny:hover{
    background-color: #CCC;
}
.alarm{
    padding-top: 10px;
    border-bottom: 1px solid #e1e1e1;
}
a{
    text-decoration: none;
    color: #3772FF;
    font-weight: 600;
}
.icon-3{
    margin-top: 10px;
}
.no, .yes{
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
}
.no-icon, .yes-icon{
  color: #E53535;
  font-size: 14px;
  margin-top: 1.3px;
}
.no-content, .yes-content{
  margin-bottom: 10px;
}
.yes-icon{
  color: #3772FF;
}
</style>