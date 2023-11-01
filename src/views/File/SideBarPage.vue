<template>
<div>
    <div class="sidebar" :style="{ width: sidebarWidth, height: sidebarHeight }">
        <span v-if="collapsed" 
            class="collapse-icon"
            @click="toggleSidebar">
            <i class="fi fi-rr-angle-double-small-left"></i>
        </span>
        <span v-else class="collapse-icon" @click="toggleSidebar">
            <i class="fi fi-rr-angle-double-small-right"></i>
        </span>

        <div v-if="!collapsed" class = "comment-container">
            <div v-for="feedback in feedbackList" :key="feedback.feedbackId" class="feedback-item">
                <div class="feedback-comment">
                    <div class = "profile"><img :src="writers[feedback.userId].pictureUrl" alt="이미지" class="spaced"></div>
                    <div class = "student-info"><span class="spaced1">{{ writers[feedback.userId].studentNumber}}&nbsp; {{ writers[feedback.userId].name }}</span></div>
                    <div class = "created-at"><span class="small-text">{{ formatDate( feedback.createdAt) }}</span></div>
                </div>
                <div class = "content">
                    <!--modReq==0인 경우 거부한 것임. 파란색으로 표현-->
                    <div :class="['feedback-comment-box', { 'blue-background': feedbackStatuses[feedback.userId].feedbackYn==2}]">
                    {{ feedback.comment }}
                    </div>
                </div>
            </div>
            <div v-for="feedback in addComments" :key="feedback" class="feedback-item">
                <div class="feedback-comment">
                    <div class = "profile"><img :src="writers[memberId].pictureUrl" alt="이미지"  class="spaced"></div>
                    <div class = "student-info"><span class="spaced1">{{ writers[memberId].studentNumber }}&nbsp; {{ writers[memberId].name }}</span></div>
                    <div class = "created-at"><span class="small-text">{{ formatDate2( feedback.date )}}</span></div>

                    <!--modReq==0인 경우 거부한 것임. 파란색으로 표현-->
                    <div class = "content">
                    <!--modReq==0인 경우 거부한 것임. 파란색으로 표현-->
                        <div :class="['feedback-comment-box', { 'blue-background': (feedbackStatuses[memberId].feedbackYn==2)||(feedbackStatuses[memberId].feedbackYn==0 &&newApproved==1)}]">
                        {{ feedback.comment }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!collapsed" class="comment-box" :style="{ width: sidebarWidth }">
            <div v-if = "role == 'student'" class="approve-mod-container">
                <button @click="toggleApproval" class="approve-toggle">
                    <div v-show="isApproved" class="approve-icon approve-true"><i class="fi fi-sr-checkbox"></i></div>
                    <div v-show="!isApproved"  class="approve-icon approve-false"  ><i class="fi fi-rr-checkbox"></i></div>
                </button>

                <div class="mod_request" @click="toggleApproval">수정 요청</div>
            </div>
            <!-- 코멘트 입력 메시지 창 추가 -->
            <textarea :disabled="role == 'professor'" 
              :style="{'background-color': role == 'professor' ? 'white' : 'initial'}"
               v-model="comment" class="comment-input" placeholder="Add a comment..."></textarea>
            <button :disabled="role == 'professor'" @click="submitComment" class="comment-summit">저장</button>

        </div>
    </div>
</div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth, sidebarHeight } from './components/state'
import { axiosInstance } from '@/axios';
import {useStore} from 'vuex';

export default {
    props: ['boardId','teamId', 'role'],
    name: 'Sidebar',
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth, sidebarHeight }
    },
    data() {
        return {
        isOpen: false,
        comment: '', // 코멘트를 저장할 데이터
        isCommentVisible: true, // 입력 메시지 란의 가시성 상태를 저장하는 데이터 추가
        addComments: [],
        isApproved: 0, // 승인 여부를 저장할 데이터
        feedbackList: [], // To store the feedback comments
        feedbackStatusList:[],
        writerList:[],
        feedbackStatuses:{},
        writers:{},
        saveApproved:0,
        newApproved:0,
        count: 0,
        memberId : this.$store.state.userStore.user_id
        };
    },
    beforeCreate() {
      try {
        const response = axiosInstance.get(`board-service/comment/${this.boardId}/${this.teamId}`)
          .then((response) => {
            console.log(response);
            this.feedbackList = response.data.feedback;
            this.feedbackStatusList=response.data.feedbackStatus;
            this.writerList=response.data.writer;

            for (const feedbackStatus of this.feedbackStatusList){
              this.feedbackStatuses[feedbackStatus.userId] = feedbackStatus;
            }
            for (const writer of this.writerList){
              this.writers[writer.id] = writer;
              console.log(this.writers);
            }
          })

      } catch (error) {
        console.error('Error fetching feedback comments:', error);
      }
    //this.fetchFeedbackComments();
  },
  methods: {
    formatDate(dateArray) {
      // 주어진 배열에서 연, 월, 일, 시, 분, 초를 추출합니다.
      const [year, month, day, hours, minutes] = dateArray;

      // 월(month)은 0부터 시작하므로 1을 더해줍니다.
      const formattedMonth = (month < 9 ? '0' : '') + (month + 1);

      // 오전(AM) 또는 오후(PM) 여부를 판단합니다.
      const ampm = hours < 12 ? '오전' : '오후';

      // 시간을 12시간 형식으로 변환합니다.
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

      // 나머지 정보를 형식에 맞게 조합합니다.
      const formattedDate = `${year}.${formattedMonth}.${day} ${ampm} ${formattedHours}:${formattedMinutes}`;

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
    toggleApproval() {
      this.isApproved = !this.isApproved;
    },
    async submitComment() {
      try {

        // API 호출 결과에 따른 처리
        // ...
        //addComment의 색깔을 처리하기 위함
        if(this.isApproved==true&&this.count==0){//피드백을 수정 요청한 경우
          this.newApproved=1;  //한번 피드백 했을경우 feedbackYn 다시 못바꿈
          this.count=1;
        }
        else if(this.isApproved==false&&this.count==0)//피드백을 수정요청하지 않은경우
        {
          this.newApproved==2;
          this.count=1;
        }
        const date = new Date();
        this.addComments.push({comment: this.comment, date: date, isApproved: this.isApproved});
        let approvalStatus = this.isApproved ? 2 : 1;

        //const formData = new FormData(); // FormData 객체 생성
        //formData.append('comment', this.comment); // 코멘트 데이터 추가
        const data = {comment : this.comment};
        // comment를 초기화
        this.comment = '';
        // 입력 메시지 란을 숨김
        this.isCommentVisible = false;
        const userId = this.$store.state.userStore.user_id;
        const response = await axiosInstance.post(`/board-service/comment/${this.boardId}/${userId}/${approvalStatus}`, data);

      } catch (error) {
        console.error('코멘트 제출 오류:', error);
        alert('피드백 제출 오류');
      }
    },
  },
}
</script>
  
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=REM:ital,wght@1,800&display=swap');
*{
    font-size: 15px;
    font-family: 'Red Hat Display', sans-serif;
}

.sidebar {
margin-top: 8.5vh;
background-color: var(--sidebar-bg-color);
float: right;
position: fixed;
z-index: 1;
top: 0;
right: 0;
bottom: 0;
transition: 0.3s ease;
display: flex;
flex-direction: column;
border-left: 1px solid var(--sidebar-bg-color);
height: 61.5vh;
overflow: scroll;
}
.collapse-icon i{
  font-size: 20px;
}
.collapse-icon {
display: flex;
align-items: center;

cursor: pointer;
position: relative;
font-weight: 400;
user-select: none;
margin: 0.3em 0;
padding: 1em;
height: 1.5em;

text-decoration: none;
padding: 1.3em;
color: rgb(47, 47, 47);
transition: 0.2s linear;

}
.list{
margin-left: 20px;

}
i{
margin-top: 6px;
font-size : 18px;
}
.comment-box {
  background-color: white;
  height: 30vh;
  bottom: 0;
  right: 0; /* 초기에는 사이드바가 숨겨져 있도록 위치 설정 */
  position: fixed;
  z-index: 2; /* 내용 위로 올라오도록 설정 */
  border-left: 1px solid var(--sidebar-bg-color);
}
.comment-input{
  margin-top: 10px;
  padding: 12px;
  width: 90%;
  height: 15vh;
  outline: none;
  box-sizing: border-box;
  border: none;
  resize: none;
}

.approve-toggle{

  border: #f0f0f0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.comment-summit{
  cursor: pointer;
  float: right;
  margin-right: 15px;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 5px;
  border: none;
  height: 33px;
  width: 60px;
  background-color: #3772FF;
  color: white;
}

.approve-icon {
  cursor: pointer;
  display: inline-block;
  margin-top: 5px;
  margin-left: 10px;
}

.approve-true {
  color: #3772FF;
}

.approve-false {
  color: #BABABA;
}
.mod_request{
  cursor:pointer;
  margin-left: 15px;
  color: white;
  background-color: #3772FF;
  border-radius: 5px;
  font-size: 14px;
  width: 77px;
  height: 27px;
  line-height: 25px;
}

.approve-mod-container {
  display: flex;
  align-items: center;
  border: 1px solid var(--sidebar-bg-color);
  height: 40px;
}

.small-text {
  font-size: 12px; /* 작은 텍스트 크기를 설정합니다. */
}

.feedback-item{
  width: 100%;
  margin-bottom: 20px;
  display: inline-block;
}

.feedback-comment-box {
  background-color: white; /* 박스 배경색을 하얀색으로 설정 */
  min-height: 24px;
  font-size: 15px;
  text-align: left;
  padding: 12px;
  width: 280px;
  border-radius: 8px;
  margin-top: 10px;
  float: right;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  word-break:break-all;
}
.blue-background {
  background-color: #3772FF; /* 원하는 배경색으로 변경하세요 */
  color: #f0f0f0;
}

.comment-container{
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20px;
}
.feedback-comment{
    width: 100%;
}
.profile{
    float: left;
    margin-left: 5px;
}
.profile img{
    width: 35px;
    height: 35px;
    border-radius: 100%;
}
.student-info{
    float: left;
    margin-left: 15px;
}
.created-at{
    float: right;
    margin-right: 3px;
}
</style>
