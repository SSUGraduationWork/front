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
          <li class = "header-right">
            <button @click="toggleModal"  class = "circle-notification alarm">
              <!--guyujung alarm-->
              <div class = "icon">
                <div  class="button-style"><i class="fa-solid fa-bell icon-style"></i></div>
              </div>
            </button>
          </li>
          <!-- 모달 -->
          <div v-if="isModalOpen" class="modal" @click="closeModalOutside">
            <div class="modal-content" @click.stop>
              <!-- 모달 내용 -->
              <div v-for="item in content" :key="item.alarmId" class="alarm-item">
                <template v-if="(item.alarmKind === 'requestFeedback' ) || item.alarmKind === 'newWrite'||item.alarmKind==='agreeFeedback'||item.alarmKind==='denyFeedback'||(item.alarmKind === 'complUpdate' && item.feedbackYn)">
                  <span class="small-text">{{ formatDateFromArray(item.createdTime) }}</span>
                  <div class="image-container">
                    <i v-if="!item.seen" class="fa-solid fa-circle icon-circle"></i>
                    <img :src="item.pictureUrl" alt="이미지" style="max-width: 35px; max-height: 35px;" class="spaced">
                    <div class="content-font-size" v-html="item.content"></div>
                  </div>
                  <a :href="item.redirectUrl + '/' + $route.params.memberId" @click="handleLinkClick(item.alarmId)" class="direct"><i class="fa-solid fa-arrow-up-right-from-square" style="max-width: 23px; max-height: 23px;"></i>바로가기</a>
                </template>
                <template v-else-if="item.alarmKind === 'complUpdate' && !item.feedbackYn">
                  <span class="small-text">{{ formatDateFromArray(item.createdTime) }}</span>
                  <div class="image-container">
                    <i v-if="!item.seen" class="fa-solid fa-circle icon-circle"></i>
                    <img :src="item.pictureUrl" alt="이미지" style="max-width: 35px; max-height: 35px;" class="spaced">
                    <div class="content-font-size" v-html="item.content"></div>
                  </div>
                  <div class="rebutton-style">
                    <button @click="handleReapprove(item.boardId, item.writerId, true)" class="reagree">재수락</button>
                    <button @click="handleReapprove(item.boardId, item.writerId, false)" class="redeny">거절</button>
                  </div>
                </template>
                <template v-if="item.alarmKind === 'complFeedback'">
                  <span class="small-text">{{ formatDateFromArray(item.createdTime) }}</span>
                  <div class="image-container">
                    <i v-if="!item.seen" class="fa-solid fa-circle icon-circle"></i>
                    <div class="content-font-size" v-html="item.content"></div>
                  </div>
                </template>
                <hr>
              </div>
            </div>
          </div>
          <!--guyujung alarm end-->
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

export default {
  props: {
    teamId : {
      type: String,
    },
  },
  data() {
    return {
      //guyujung alarm
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
    async handleReapprove(boardId, writerId, isApproved) {
      try {
        await axios.post(`http://localhost:3210/recomment/${boardId}/${writerId}/${isApproved}`);
        // 재수락 또는 거절 요청을 보낸 후에, 필요한 업데이트를 수행할 수 있습니다.
      } catch (error) {
        console.error('Error reapproving:', error);
      }
    },
    async handleLinkClick(alarmId) {
      // 1. API 호출
      try {
        const response = await axios.get(`http://localhost:3210/alarm/view/${alarmId}`);
        // 처리할 로직 작성 (예: 상세 정보 표시)
      } catch (error) {
        console.error('Error fetching alarm detail:', error);
      }
    },

    //guyujung alarm
    formatDateFromArray(dateArray) {
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
    },
    toggleModal() {

      this.fetchAndShowAlarms(); // 모달이 열릴 때 알람 내용을 가져와서 표시


      this.isModalOpen = !this.isModalOpen;
    },
    closeModalOutside(event) {
      if (event.target.classList.contains('modal')) {
        this.isModalOpen = false;

        // 모달이 닫힐 때 각 항목의 'seen' 속성을 true로 업데이트하고 서버에 업데이트 요청을 보냄
        this.content.forEach(async item => {
          item.seen = true;

          try {
            // 서버에 업데이트 요청 보내기
            await axios.put(`http://localhost:3210/updateSeenStatus/${item.alarmId}`, {
              seen: true
            });
          } catch (error) {
            console.error('Error updating seen status:', error);
          }
        });
      }
    },
    async fetchAndShowAlarms() {
      try {
        const memberId = this.$route.params.memberId; // 동적 라우트 매개변수 사용
        const response = await axios.get(`http://localhost:3210/alarmList/view/${memberId}`);
        this.content = response.data.content;
        // boardId를 기준으로 내림차순으로 정렬
        this.content.sort((a, b) => b.alarmId - a.alarmId);

        this.isModalOpen = true;
      } catch (error) {
        console.error('Error fetching alarms:', error);
      }
    },

  },
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
  height: 4em;
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
  margin-right: 2em;
  font-weight: 300;

}
.header-left-div{
  float: left;
  width: 250px;
  height: 50px;
  position: fixed;
}
.header-right-div{
  float: right;
  width: 320px;
  height: 50px;
  position: fixed;
  right: 10px;
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
.icon-style{

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  font-size: 25px;
}
.circle-notification:hover{
  background-color : #3772FF;
  color: white;
}

/*guyujung alarm*/

/* 모달 스타일 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  margin-top: 60px;
  margin-left: 1000px;
  overflow-y:  auto;

}

.modal-content {
  background-color: white;
  width: 20%;
  height: 28%;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  overflow-y:  auto;
  padding: 10px;

}

.modal-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
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
.spaced img {
  max-width: 190px;
  max-height: 190px;
}

.spaced{
  font-size: 4px;
  float: left; /* 이미지를 왼쪽으로 옮김 */
  margin-left: 20px; /* 이미지와 텍스트 사이 간격 설정 */
  margin-top: 15px;

}

.alarm-item{
  /* display: flex;

   */
  align-items: center;
  gap: 10px;
}


.small-text{
  font-size: 0.5px;
  margin-left: 100px;
}

.content-font-size{
  font-size: 2px;
  margin-top: 5px;
  margin-left: 20px;
  padding: 10px;
}

.fa-arrow-up-right-from-square{
  margin-right: 10px;
}

.icon-circle {
  font-size: 10px; /* Adjust the size as needed */
  margin-left: 5px; /* Adjust the spacing as needed */
  color: #3772FF; /* Set the color as desired */
}

.image-container {
  display: flex;
  align-items: center;
}
.direct{
  font-size: 8px;
}

.rebutton-style{
  font-size: 3px;
  margin-left:20px ;
}
.reagree{
  width: 90px;
  background-color: #3772FF;
  color: #f0f0f0;
  border-radius: 15px;
  border: none;
}
.redeny{
  width: 90px;
  background-color: #cccccc;
  color: black;
  border-radius: 15px;
  margin-left: 30px;
  border: none;
}



</style>