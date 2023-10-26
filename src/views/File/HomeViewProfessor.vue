<!--
[board.feedbackYn에 대한 설명]
0->피드백을 아예 안한 경우
1->피드백을 하고 승인한 경우
2->피드백을 하고 거절한 경우
3->게시판 작성자 본인일 경우
-->

<template>
  <div v-if="loading" class="loading-container">
    <Loader></Loader>
  </div>
<div v-else>
  <div  class="container">

    <div class="table-container">

      <!-- 검색 입력창 -->
      <div class="search-container">
        <div class="file-letter">파일</div>
        <div v-if="role=='student'" class="write-button-container"><button class="write-button" @click="goToWritePage">글쓰기</button></div> <!-- "글쓰기" 버튼 추가 -->



        <div class="search-input-container">

          <i class="fi fi-br-search"></i>
          <input
              v-model="searchKeyword"
              @keyup.enter="search"
              placeholder="  검색"
              class="search-input"
          />
        </div>
      </div>
      <table class="table custom-table">

        <thead>
          <tr>
            <th>번호</th>
            <th>작업 이름</th>
            <th>제목</th>
            <th> 작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <div class = "margin-space"></div>


          <tbody>
          <tr v-for="(board, index) in visibleBoardData" :key="index">
            <td>{{ this.boardList.length-index - currentPage * itemsPerPage }}</td>
            <td class="work-name-container">
              <div class = "work-name" :style="{ backgroundColor: getBackgroundColor(board.workId) }">
                <i class="fa-solid fa-tag"></i><span>{{ works[board.workId].workName  }}</span>
              </div>
            </td>
            <td class = "title">
              <router-link
                  :to="{ name: 'BoardDetailPage', params: { boardId: board.boardId ,teamId:teamId} }"
              >{{ board.title }}
              </router-link></td>
            <td class = "writer">
              <img :src="members[board.userId].pictureUrl" alt="사용자 이미지" style="max-width: 28px; max-height: 28px;" class="spaced">
              <span>{{members[board.userId].studentNumber }} &nbsp;{{ members[board.userId].name }}</span>
            </td>
            <td>{{  formatDateFromArray(board.createdTime) }}</td>

            <td>{{ board.viewCount }}</td>
          </tr>
          </tbody>

      </table>
    </div>


  </div>
  <!-- 페이지 버튼 표시 -->

  <template v-if="selectedIndex === 1">
    <div class="pagination">
      <button @click="showPreviousPages" > <i class= "fi fi-rr-angle-small-left"></i></button>
      <button v-for="page in visiblePageRange1" :key="page" @click="goToPage(page - 1)" :class="{ 'active-page': page - 1 === currentPage }">
        {{ page }}
      </button>
      <button @click="showNextPages" ><i class= "fi fi-rr-angle-small-right"></i></button>
    </div>
  </template>
  <template v-else-if="selectedIndex === 2">
    <div class="pagination">
      <button @click="showPreviousPages" > <i class= "fi fi-rr-angle-small-left"></i></button>
      <button v-for="page in visiblePageRange2" :key="page" @click="goToPage(page - 1)" :class="{ 'active-page': page - 1 === currentPage }">
        {{ page }}
      </button>
      <button @click="showNextPages" ><i class= "fi fi-rr-angle-small-right"></i></button>
    </div>
  </template>
  <template v-else-if="selectedIndex === 3">
    <div class="pagination">
      <button @click="showPreviousPages" > <i class= "fi fi-rr-angle-small-left"></i></button>
      <button v-for="page in visiblePageRange3" :key="page" @click="goToPage(page - 1)" :class="{ 'active-page': page - 1 === currentPage }">
        {{ page }}
      </button>
      <button @click="showNextPages" ><i class= "fi fi-rr-angle-small-right"></i></button>
    </div>
  </template>
  <template v-else>
    <div class="pagination">
      <button @click="showPreviousPages" > <i class= "fi fi-rr-angle-small-left"></i></button>
      <button v-for="page in visiblePageRange0" :key="page" @click="goToPage(page - 1)" :class="{ 'active-page': page - 1 === currentPage }">
        {{ page }}
      </button>
      <button @click="showNextPages" ><i class= "fi fi-rr-angle-small-right"></i></button>
    </div>
  </template>
</div>
</template>

<script>
import { axiosInstance } from '@/axios';

import BoardDropdown from './components/BoardDropdown.vue';
import WritePage from './WritePage.vue';
import Loader from '../../components/Loader.vue';
import bgColors from '../../../public/color';
import { useStore } from 'vuex';

export default {
  props: ['teamId'], // props로 받을 파라미터 이름을 선언

  data() {
    return {
      boardList: [],
      workList: [],
      memberList: [],
      mergeList:[],
      totalList:[],
      currentPage: 0, // 현재 페이지 번호
      visibleBoardData: [], // 보여줄 데이터 배열 추가
      totalPages: 0, // 전체 페이지 수
      feedbackTrueItemCount:0,
      feedbackFalseItemCount:0,
      visiblePagesStart: 1, // 현재 보이는 페이지 숫자 범위 시작
      visiblePagesEnd: 3,   // 현재 보이는 페이지 숫자 범위 끝
      dropdownOptions: ['Option 1', 'Option 2', 'Option 3'],
      itemsPerPage: 10, // 한 페이지에 보여줄 항목 수 추가
      loading: true, // 초기 로딩 상태를 true로 설정
      selectedIndex: null, // 선택된 인덱스를 저장할 데이터
      colors: {}, //작업 이름 bg 색상
      i: 0, //색상 지정 인덱스
      bgColors,
      members: {},
      works : {},
      role: "",
    };
  },
  components: {
    BoardDropdown,
    WritePage,
    Loader
  },
  mounted() {
    this.fetchBoardList(this.memberId, this.teamId);
  },
  computed: {
    visiblePageRange0() {
      const maxVisiblePages = 3;
      const middlePage = Math.floor((this.visiblePagesStart + this.visiblePagesEnd) / 2);
      const startPage = Math.max(1, middlePage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },

    feedbackCompletedCount() {
      //board.feedbackYn===4는 게시판 작성자가 본인이 쓴 글이면 4
      //board.feedbackYn===1는 게시판 작성자가 피드백을한 경우(수락)
      return this.boardList.filter(board => (board.feedbackYn===1)).length;
    },
    feedbackIncompleteCount() {

      //피드백 수정요청을 한 사람도 피드백 완료 개수에 세야할지 정해야함
      //board.feedbackYn===0는 게시판 작성자가 피드백을 아예 안한 경우
      //board.feedbackYn===2는 게시판 작성자가 피드백을 했는데 거절한 경우(거절)
      return this.boardList.filter((board => (board.feedbackYn===0||board.feedbackYn===2))).length;
    },
    myBoardWriteCount() {
      //board.feedbackYn===3은 게시판 작성자 본인이 쓴 경우
      return this.boardList.filter((board => (board.feedbackYn===3))).length;
    },
  },
  watch: {
    currentPage() {
      this.updateVisibleBoardData(); // 페이지 변경 시 보여줄 데이터 업데이트
    },
    boardList() {
      this.updateVisibleBoardData(); // boardList 업데이트 시 보여줄 데이터 업데이트
    },

      selectedIndex(newValue, oldValue) {
        if (newValue !== oldValue) {
          // selectedIndex가 변경될 때 currentPage를 0으로 초기화합니다.
          this.currentPage = 0;
        }
      },
  },
  methods: {
    updateSelectedIndex(index) {
      this.selectedIndex = index;
    },
    handleDropdownSelect(index) {
      // BoardDropdown 컴포넌트로부터 선택된 인덱스를 받아서 처리
      this.selectedIndex = index;
      this.currentPage = 0;
    },

    formatDateFromArray(dateArray) {
      // 배열에서 연도, 월, 일 요소 추출
      const [year, month, day] = dateArray.slice(0, 3);

      // 월과 일이 한 자릿수인 경우 앞에 0을 추가하여 두 자리로 만듭니다.
      const formattedMonth = month.toString().padStart(2, '0');
      const formattedDay = day.toString().padStart(2, '0');

      // YYYY-MM-DD 형식으로 날짜 문자열 생성
      const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

      return formattedDate;
    },


    async fetchBoardList(teamId) {
      try {
        const store = useStore();
        this.role = store.state.userStore.role;
        const url = `/board-service/professor/board/list/${teamId}`
        const response = await axiosInstance.get(url);


          // 서버에서 받아온 데이터를 boardList에 저장
          this.boardList = response.data.content.reverse();
          console.log(response.data);
          this.workList=response.data.work;
          this.memberList=response.data.member;

          for (const member of this.memberList){
            this.members[member.id] = member;
          }
        for (const work of this.workList){
          this.works[work.workId] = work;
        }


          // boardId를 기준으로 내림차순으로 정렬
          this.totalList.sort((a, b) => b.boardId - a.boardId);

          // 전체 페이지 수 계산
          this.totalPages = Math.ceil(this.boardList.length / this.itemsPerPage);
          // 초기 visibleBoardData 설정

        this.updateVisibleBoardData();

      } catch (error) {
        console.error('Error fetching board list:', error);
      }finally {
        this.loading = false; // 로딩 상태를 false로 설정
      }
    },

    updateVisibleBoardData() {
      const startIndex = this.currentPage * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      ////////
      this.visibleBoardData = this.boardList.slice(startIndex, endIndex);
      // 피드백이 true인 항목과 false인 항목을 분류
      this.feedbackTrueItems = this.boardList.filter(board => board.feedbackYn === 1).slice(startIndex, endIndex);
      this.feedbackFalseItems = this.boardList.filter(board => (board.feedbackYn === 2||board.feedbackYn===0)).slice(startIndex, endIndex);
      this.myfeedbackItems = this.boardList.filter(board => (board.feedbackYn ===3)).slice(startIndex, endIndex);
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.updateVisibleBoardData(); // 페이지 변경 시 보여줄 데이터 업데이트
      // 추가: 페이지 변경 시 페이지 범위도 업데이트
      const maxVisiblePages = 3;
      const middlePage = Math.floor((this.currentPage + this.visiblePagesEnd) / 2);
      const startPage = Math.max(1, middlePage - Math.floor(maxVisiblePages / 2));
      this.visiblePagesStart = startPage;
      this.visiblePagesEnd = startPage + maxVisiblePages - 1;
    },
    showPreviousPages() {
      if (this.visiblePagesStart > 1) {
        this.visiblePagesStart -= 3;
        this.visiblePagesEnd -= 3;
      }
    },
    showNextPages() {
      if (this.visiblePagesEnd < this.totalPages) {
        this.visiblePagesStart += 3;
        this.visiblePagesEnd += 3;
      }
    },
    goToWritePage() {
      this.$router.push({ name: 'WritePage' }); // WritePage의 name을 사용하여 페이지 이동
    },
    getBackgroundColor(workName) {
      // work_id에 대한 배경 색상 가져오기
      if (!this.colors[workName]) {
        // work_id에 대한 색상이 아직 설정되지 않았다면 랜덤한 색상 생성
        this.colors[workName] = this.bgColors[this.i];
        if (this.i >= this.bgColors.length-1){
          this.i = 0;
        } else{
          this.i = this.i + 1;
        }
      }
      return this.colors[workName];
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
@import "~@flaticon/flaticon-uicons/css/all/all";
*{
  font-family: 'Red Hat Display', sans-serif;
  font-size: 14.5px;
}
.container {
  margin: 0 auto;
  min-width: 78em;
  width: 90%;
  height: 80vh;
  margin-top: 6.5em;
}
thead tr{
  border-bottom: 1px solid #3e3e3e;
  height: 40px;
}
tr{
  height: 45px;
}
.margin-space{
  height: 11px;
}
.table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}
.table-container {
  margin: 0 auto;
  width: 90%;
}
.custom-table th,
.custom-table td {
  font-size: 15px;
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pagination {
  position: relative;
  margin-bottom: 100px;
}
.pagination button {
  cursor: pointer;
  margin: -10px 5px;
  background-color: #F5F6FA;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  line-height: 30px;
}

.text-green {
  color: #99CC8C; /* 초록색으로 설정 */
}

.text-red {
  color: #EE6C6C; /* 빨간색으로 설정 */
}
.text-gray{
  color: #BABABA;
}
/* 검색창 */
.search-container {
  margin-top: 30px;
  width: 100%;
  height: 50px;
}

.search-input-container {
  float: right;
  display: flex;
  align-items: center;
  background-color: #F5F6FA; /* 검색창과 이모티콘 부분만 회색 배경색 */
  border-radius: 7px;
  height: 37px;
  width: 280px; /* 검색 입력창 너비 조절 */
  margin-right: 55px;
}
.fi-br-search{
  color: #3e3e3e;
  margin-left: 15px;
  font-size: 15px;
  margin-top: 2px;
  margin-right: 3px;
}

.search-input {
  margin-left: 3px;
  border: none;
  background: none;
  font-size: 14px;
  width: 100%;
  outline: none;
}
/* 드롭다운 */
.search-dropdown {
  float: right;
  margin-right: 165px;
}

/* ... (스타일 설정) ... */

.loading-container {
  height: 100%;
}

.fa-spinner {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


.feedback-status {
  height: 100px;
  margin: 0 auto;
}
.feedback-completed{
  margin-right: 100px;
  float: right;
}
.feedback-incomplete{
  float: left;
  margin-left: 100px;
}
.feedback-completed,
.feedback-incomplete {
  cursor: pointer;
  align-items: center;
  border-radius: 10px;
  text-align: center;
  width: 380px;
  height: 85px;
  background-color: #F5F6FA;
  color: #BFBFBF;
}

.icon-blue {
  margin-left: 40px;
  float: left;
  width: 50px;
  height: 50px;
  border-radius: 45px;
  position: relative;
  margin-top: 17px;
  background-color: #3772ff;
  color: white;
  transform: scaleX(-1);
}
.i-completed{
  transform: none;
}
.icon-blue i{
  line-height: 54px;
  font-size: 17px;
}
.feedback-count-label {
  font-size: 18px;
  margin-left: 30px;
  line-height: 85px;
  float: left;
  font-weight: 600;
}
.fi-bs-menu-dots{
  font-size: 15px;
  margin-left: 20px;
}

.feedback-count {
  line-height: 85px;
  font-weight: 700;
  color: black;
  font-size: 24px;
  float: right;
  margin-right: 55px;
}

.file-letter{
  float: left;
  font-weight: 700;
  margin-right: 20px;
  margin-top: 7px;
  width: 100px;
  height: 30px;
  font-size: 17px;
}
.write-button-container{
  float: left;
}
.write-button{
  cursor: pointer;
  width: 100px;
  height: 36px;
  background-color: #3772ff;
  border: none;
  color: white; /* 글자색을 흰색으로 설정 */
  font-weight: 600;
  border-radius: 10px; /* 테두리를 둥글게 만들기 */
}

.pagination button.active-page {
  background-color: #3e3e3e; /* 원하는 찐 회색 색상으로 변경 */
  color: white; /* 글자색을 흰색으로 설정 */
  font-weight: bold; /* 폰트 굵기 설정 (원하는 스타일로 변경) */
}
td{
  height: 30px;
}
.writer{
  text-align: left;
  width: 200px;
}
.writer span{
  line-height: 30px;
  text-overflow: ellipsis;
}
.writer img{
  margin-left: 20px;
  line-height: 30px;
  vertical-align:middle;
  margin-right: 13px;
  width: 30px;
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
  background : #F5F6FA; 
}
a{
  text-decoration: none;
  color: black;
}
a:hover{
  text-decoration: underline;
}
.fa-tag{
  transform: rotate(135deg);
  margin-right: 12px;
  font-size: 18px;
  margin-left: 15px;
}
.work-name{
  color: white;
  text-align: left;
  width: 140px;
  height: 34px;
  border-radius: 10px;
  line-height: 35px;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 10px;
  white-space:nowrap;
}
.work-name-container{
  width: 140px;
}
.title{
  min-width: 150px;
  max-width: 230px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space:nowrap;
}
img{
 
}
</style>