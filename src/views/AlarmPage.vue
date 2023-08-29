<template>
  <div>
    <button @click="toggleModal" class="button-style"><i class="fa-solid fa-bell icon-style"></i></button>
    <!-- 모달 -->
    <div v-if="isModalOpen" class="modal" @click="closeModalOutside">
      <div class="modal-content" @click.stop>
        <!-- 모달 내용 -->
        <div v-for="item in content" :key="item.alarmId" class="alarm-item">
          <template v-if="(item.alarmKind === 'requestFeedback' ) || item.alarmKind === 'newWrite'||item.alarmKind==='agreeFeedback'||item.alarmKind==='denyFeedback'">
            <span class="small-text">{{ formatDateTime(item.createdTime) }}</span>
            <div class="image-container">
              <i v-if="!item.seen" class="fa-solid fa-circle icon-circle"></i>
              <img :src="item.pictureUrl" alt="이미지" style="max-width: 35px; max-height: 35px;" class="spaced">
              <div class="content-font-size" v-html="item.content"></div>
            </div>
            <a :href="item.redirectUrl + '/' + $route.params.memberId" @click="handleLinkClick(item.alarmId)" class="direct"><i class="fa-solid fa-arrow-up-right-from-square" style="max-width: 23px; max-height: 23px;"></i>바로가기</a>
          </template>
          <template v-else-if="item.alarmKind === 'complUpdate' && !item.feedbackYn">
            <span class="small-text">{{ formatDateTime(item.createdTime) }}</span>
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
            <span class="small-text">{{ formatDateTime(item.createdTime) }}</span>
            <div class="image-container">
              <i v-if="!item.seen" class="fa-solid fa-circle icon-circle"></i>
              <div class="content-font-size" v-html="item.content"></div>
            </div>
          </template>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      isModalOpen: false,
      content: [],
    };
  },

  methods: {
    async handleReapprove(boardId, writerId, isApproved) {
      try {
        await axios.post(`http://localhost:8080/recomment/${boardId}/${writerId}/${isApproved}`);
        // 재수락 또는 거절 요청을 보낸 후에, 필요한 업데이트를 수행할 수 있습니다.
      } catch (error) {
        console.error('Error reapproving:', error);
      }
    },
    async handleLinkClick(alarmId) {
      // 1. API 호출
      try {
        const response = await axios.get(`http://localhost:8080/alarm/view/${alarmId}`);
        // 처리할 로직 작성 (예: 상세 정보 표시)
      } catch (error) {
        console.error('Error fetching alarm detail:', error);
      }
      },
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };

      return date.toLocaleString('en-US', options);
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
            await axios.put(`http://localhost:8080/updateSeenStatus/${item.alarmId}`, {
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
        const response = await axios.get(`http://localhost:8080/alarmList/view/${memberId}`);
        this.content = response.data.content;
        this.isModalOpen = true;
      } catch (error) {
        console.error('Error fetching alarms:', error);
      }
    },

  },

};
</script>

<style scoped>
/* 모달 스타일 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  margin-top: 30px;
  margin-left: 580px;
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
  background-color: white;
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