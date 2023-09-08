<template>

  <button :class="['toggle-button', { 'sidebar-open1': !isOpen }]" @click="toggleSidebar">{{ '<<' }}</button>
  <div :class="['sidebar', { 'sidebar-open': !isOpen }]">
    <!-- 사이드바 내용 -->


    <!-- Display feedback comments -->
    <div v-for="feedback in feedbackList" :key="feedback.feedbackId" class="feedback-item">
      <div class="feedback-comment">
        <img :src="feedback.pictureUrl" alt="이미지" style="max-width: 25px; max-height: 25px;" class="spaced">
        <span class="small-text spaced1">{{ feedback.studentNumber }}</span>
        <span class="small-text  spaced2">{{ feedback.userName }}</span>
        <span class="small-text">{{ formatDate( feedback.createdAt) }}</span>

        <br>
        <!--modReq==0인 경우 거부한 것임. 파란색으로 표현-->
        <div :class="['feedback-comment-box', { 'blue-background': feedback.modReq==2}]">
          {{ feedback.comment }}
        </div>
      </div>
    </div>

    <br>
    <div v-for="feedback in addComments" :key="feedback" class="feedback-item">
      <div class="feedback-comment">
      <img :src="addPictureUrl" alt="이미지" style="max-width: 25px; max-height: 25px;" class="spaced">
        <span class="small-text spaced1">{{ addStudentNumber }}</span>
        <span class="small-text  spaced2">{{ addUserName}}</span>
        <span class="small-text">{{ formatDate2( feedback.date )}}</span>

        <br>
        <!--modReq==0인 경우 거부한 것임. 파란색으로 표현-->
        <div :class="['feedback-comment-box', { 'blue-background': addApproved==2 }]">
          {{ feedback.comment }}
        </div>

      </div>
    </div>
    <!-- You can display other feedback information here -->
  </div>
  <div :class="['comment-box', { 'sidebar-open2': !isOpen }]">
    <div class="approve-mod-container">
      <button @click="toggleApproval" class="approve-toggle">
        <div  v-show="isApproved" class="approve-icon approve-false"><i class="fa-regular fa-square-check"></i></div>
        <div v-show="!isApproved"  class="approve-icon approve-true"  ><i class="fa-solid fa-square-check"></i></div>
      </button>

      <div class="mod_request">수정 요청</div>
    </div>
    <!-- 코멘트 입력 메시지 창 추가 -->
    <textarea v-model="comment" class="comment-input" placeholder="  Add a comment.."></textarea>
    <button @click="submitComment" class="comment-summit">저장</button>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['boardId','memberId'],
  name: 'Sidebar',
  data() {
    return {
      isOpen: false,
      comment: '', // 코멘트를 저장할 데이터
      addComments: [],
      isApproved: 0, // 승인 여부를 저장할 데이터
      feedbackList: [], // To store the feedback comments
      saveApproved:0,
      addApproved:0,
      addPictureUrl:[],
      addUserName:[],
      addStudentNumber:[],
    };

  },
  created() {
    this.fetchFeedbackComments();
  },
  methods: {
    formatDate(dateArray) {
      // 주어진 배열에서 연, 월, 일, 시, 분, 초를 추출합니다.
      const [year, month, day, hours, minutes, seconds] = dateArray;

      // 월(month)은 0부터 시작하므로 1을 더해줍니다.
      const formattedMonth = (month < 9 ? '0' : '') + (month + 1);

      // 오전(AM) 또는 오후(PM) 여부를 판단합니다.
      const ampm = hours < 12 ? '오전' : '오후';

      // 시간을 12시간 형식으로 변환합니다.
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

      // 나머지 정보를 형식에 맞게 조합합니다.
      const formattedDate = `${year}.${formattedMonth}.${day} ${ampm} ${formattedHours}:${minutes}`;

      return formattedDate;
    }
    ,
    formatDate2(inputDate) {
      const date = new Date(inputDate);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const ampm = hours < 12 ? '오전' : '오후';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes.toString().padStart(2, '0');

      const formattedDate = `${year}.${month}.${day} ${ampm} ${formattedHours}:${formattedMinutes}`;

      return formattedDate;
    },
    async fetchFeedbackComments() {
      try {
        const response = await axios.get(`http://localhost:3210/comment/${this.boardId}/${this.memberId}`);
        this.feedbackList = response.data.content;
        this.addApproved=response.data.feedbackYn;
        this.addPictureUrl=response.data.pictureUrl;
        this.addUserName=response.data.userName;
        this.addStudentNumber=response.data.studentNumber;
      } catch (error) {
        console.error('Error fetching feedback comments:', error);
      }
    },
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    toggleApproval() {
      this.isApproved = !this.isApproved;
    },
    async submitComment() {
      try {
        const date = new Date();
        this.addComments.push({comment: this.comment, date: date, isApproved: this.isApproved});
        let approvalStatus = this.isApproved ? 1 : 2;

        const formData = new FormData(); // FormData 객체 생성
        formData.append('comment', this.comment); // 코멘트 데이터 추가

        const response = await axios.post(
            `http://localhost:3210/comment/${this.boardId}/${this.memberId}/${approvalStatus}`,
            formData, // FormData 객체를 전송
            {
              headers: {
                'Content-Type': 'multipart/form-data', // 필수! FormData를 전송할 때는 이 헤더가 필요합니다.
              },
            }

        );
        // API 호출 결과에 따른 처리
        // ...
        alert('피드백 제출 성공');
      } catch (error) {
        console.error('코멘트 제출 오류:', error);
        alert('피드백 제출 오류');
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0px; /* 초기에는 사이드바가 숨겨져 있도록 위치 설정 */
  width: 400px;
  height: 57.5%;
  background-color: #f0f0f0;
  padding: 10px;
  transition: right 0.2s ease-in-out;
  top: 65px; /* 아래로 이동하는 값 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 세로 스크롤바 추가 */
  z-index: 3; /* 내용 위로 올라오도록 설정 */
}
.sidebar-open {
  right: -420px; /* 토글로 열 때의 위치 설정 */
}


.toggle-button {

  top: 73px; /* 수정: 초기 위치 */
  right: 420px; /* 수정: 초기 위치 */
  border: none;
  color: #3772FF;
  transition: right 0.2s ease-in-out, top 0.2s ease-in-out; /* 애니메이션 설정 */
  position: fixed;
}
.sidebar-open1 {
  right: -0px; /* 토글로 열 때의 위치 설정 */
}


.comment-box {
  margin-top: 469px;
  padding: 3px;
  border: 1px solid #ccc;
  background-color: white;
  height: 194px;
  top: 0;
  right: 13px; /* 초기에는 사이드바가 숨겨져 있도록 위치 설정 */
  width: 430px;
  margin-right: -30px;
  position: fixed;
  transition: right 0.2s ease-in-out, top 0.2s ease-in-out; /* 애니메이션 설정 */
  z-index: 4; /* 내용 위로 올라오도록 설정 */
}
.sidebar-open2 {
  right: -420px; /* 토글로 열 때의 위치 설정 */
}
.comment-input{
  width: 90%;
  height: 70%;
  border: none;
}

.approve-toggle{

  border: #f0f0f0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.comment-summit{
  margin-left: 270px;
  border: none;
  background-color: #3772FF;
  color: white;
  border-radius: 5px;
}

.approve-icon {
  display: inline-block;
}

.approve-true {
  color: #3772FF;
}

.approve-false {
  color: #3772FF;
}
.mod_request{
  margin-left: 10px;
  color: white;
  background-color: #3772FF;
  border-radius: 5px;
  font-size: 14px;
  width: 70px;
}

.approve-mod-container {
  display: flex;
  align-items: center;

}

.small-text {
  font-size: 10px; /* 작은 텍스트 크기를 설정합니다. */
}
.spaced{
  margin-right: 10px;
}
.spaced1{
  margin-right: 5px;
}
.spaced2{
  margin-right: 110px;
}

.feedback-item{
  margin-top: 20px;
  margin-bottom: 10px;
}

.feedback-comment-box {
  background-color: white; /* 박스 배경색을 하얀색으로 설정 */
  padding: 10px; /* 내부 여백 설정 */
  border: 1px solid #ccc; /* 테두리 설정 */
  font-size: 13px;
  width: 80%;
  margin-top: 5px;
  border-radius: 8px;
  margin-left: 55px;
  overflow: auto; /* 내용이 넘칠 경우 스크롤바 추가 */
  white-space: normal; /* 줄 바꿈과 공백 처리 */
  word-wrap: break-word; /* 단어 끊김 처리 */
  max-height: 500px; /* 최대 높이 설정 */

}

.blue-background {
  background-color: #3772FF; /* 원하는 배경색으로 변경하세요 */
  color: #f0f0f0;
}
</style>
