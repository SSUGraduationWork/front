<template>
  <div v-if="loading" class="loading-container">
    <i class="fa-solid fa-spinner"></i> 로딩 중...
  </div>

  <div v-else class="container">
    <div class="feedback-status">
      <div class="feedback-completed">
        <span class="icon-blue"><i class="fa-solid fa-square-check"></i></span>
        <p class="feedback-count-label">피드백 완료</p>

        <p class="feedback-count">{{ feedbackCompletedCount }}</p>
      </div>
      <div class="feedback-incomplete">
        <span class="icon-blue"><i class="fa-solid fa-comment-dots"></i></span>
        <p class="feedback-count-label">미완료</p>

        <p class="feedback-count">{{ feedbackIncompleteCount }}</p>
      </div>
    </div>
    <div class="table-container">

      <!-- 검색 입력창 -->
      <div class="search-container">
        <p class="file-letter">파일</p>
        <button class="write-button" @click="goToWritePage">글쓰기</button> <!-- "글쓰기" 버튼 추가 -->
        <div class="search-input-container">

          <i class="fa-solid fa-magnifying-glass"></i>
          <input
              v-model="searchKeyword"
              @keyup.enter="search"
              placeholder="  검색"
              class="search-input"
          />
        </div>
        <!-- dropdown-->
        <dropdown :options="dropdownOptions" class="search-dropdown" />
      </div>
      <table class="table custom-table">

        <thead>
        <tr>
          <th>번호</th>
          <th>작업 이름</th>
          <th>제목</th>
          <th> 작성자</th>
          <th>작성일</th>
          <th>피드백 여부</th>
          <th>조회수</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="board in visibleBoardData" :key="board.boardId">
          <td>{{ board.boardId }}</td>
          <td>{{ board.workName }}</td>
          <td>
          <router-link
              :to="{ name: 'BoardDetailPage', params: { boardId: board.boardId ,memberId: memberId } }"
          >{{ board.title }}
          </router-link></td>
          <td>{{ board.writerName }}</td>
          <td>{{ board.createdTime.slice(0, 10) }}</td>
          <td><i :class="{'fa-solid fa-circle text-green': board.feedbackYn, 'fa-solid fa-circle text-red': !board.feedbackYn}"></i></td>
          <td>{{ board.viewCount }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- 페이지 버튼 표시 -->
    <div class="pagination">
      <button @click="showPreviousPages" > ◀</button>
      <button v-for="page in visiblePageRange" :key="page" @click="goToPage(page - 1)">
        {{ page }}
      </button>
      <button @click="showNextPages" >▶</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Dropdown from './Dropdown.vue';

import WritePage from './WritePage.vue';


export default {
  props: ['memberId', 'teamId'], // props로 받을 파라미터 이름을 선언

  data() {
    return {
      boardList: [],
      currentPage: 0, // 현재 페이지 번호
      visibleBoardData: [], // 보여줄 데이터 배열 추가
      totalPages: 0, // 전체 페이지 수
      visiblePagesStart: 1, // 현재 보이는 페이지 숫자 범위 시작
      visiblePagesEnd: 3,   // 현재 보이는 페이지 숫자 범위 끝
      dropdownOptions: ['Option 1', 'Option 2', 'Option 3'],
      itemsPerPage: 6, // 한 페이지에 보여줄 항목 수 추가
      loading: true, // 초기 로딩 상태를 true로 설정
    };
  },
  components: {
    Dropdown,
    WritePage,
  },
  mounted() {
    this.fetchBoardList(this.memberId, this.teamId);
  },
  computed: {
    visiblePageRange() {
      const maxVisiblePages = 3;
      const middlePage = Math.floor((this.visiblePagesStart + this.visiblePagesEnd) / 2);
      const startPage = Math.max(1, middlePage - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    },
    feedbackCompletedCount() {
      return this.boardList.filter(board => board.feedbackYn && board.userId !== this.memberId).length;
    },
    feedbackIncompleteCount() {
      return this.boardList.filter(board => !board.feedbackYn || (board.userId === this.memberId && !board.feedbackYn)).length;
    },
  },
  watch: {
    currentPage() {
      this.updateVisibleBoardData(); // 페이지 변경 시 보여줄 데이터 업데이트
    },
    boardList() {
      this.updateVisibleBoardData(); // boardList 업데이트 시 보여줄 데이터 업데이트
    },
  },
  methods: {
    async fetchBoardList(memberId, teamId) {
      try {
        const url = `http://localhost:8080/board/list/${memberId}/${teamId}`;
        const response = await axios.get(url);

        if (response.data && response.data.content && Array.isArray(response.data.content)) {
          // 서버에서 받아온 데이터를 boardList에 저장
          this.boardList = response.data.content;

          // 전체 페이지 수 계산
          this.totalPages = Math.ceil(this.boardList.length / this.itemsPerPage);

          // 초기 visibleBoardData 설정
          this.updateVisibleBoardData();
        } else {
          console.error('Error fetching board list: Invalid response structure');
        }
      } catch (error) {
        console.error('Error fetching board list:', error);
      }finally {
        this.loading = false; // 로딩 상태를 false로 설정
      }
    },

    updateVisibleBoardData() {
      const startIndex = this.currentPage * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.visibleBoardData = this.boardList.slice(startIndex, endIndex);
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
    },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 150px 0 0 0px;
}

.table {

  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

}

.table-container {
  width: 70%;
  margin: -100px 0 0 300px;
  overflow-x: auto; /* 가로 스크롤 사용 가능하도록 */

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
  display: flex;
  justify-content: center;
  margin: 50px 0 0 250px;
}
.pagination button {
  margin: -10px 5px;
}

.text-green {
  color: green; /* 초록색으로 설정 */
}

.text-red {
  color: red; /* 빨간색으로 설정 */
}

/* 검색창 */
.search-container {
  display: flex;
  margin: 130px 0 0 5px;
}

.search-input-container {
  display: flex;
  align-items: center;
  background-color: #f0f0f0; /* 검색창과 이모티콘 부분만 회색 배경색 */
  border-radius: 5px;
  height: 30px;
  width: 200px; /* 검색 입력창 너비 조절 */
  margin: 0px 0 0 230px;
}


.search-input {
  border: none;
  background: none;
  font-size: 14px;
  width: 100%;
  outline: none;
}
/* 드롭다운 */
.search-dropdown {
  margin-left: 50px; /* 드롭다운과의 간격을 설정 */
}



/* ... (스타일 설정) ... */

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
}

.fa-spinner {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


.feedback-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  color: #cccccc;
  margin: 0 10px 0 190px; /* 남은 피드백, 완료 간격 조정 */
}

.feedback-completed,
.feedback-incomplete {
  display: flex;
  align-items: center;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  width: 280px;
  height: 50px;
  background-color: #f0f0f0;
  color: darkgrey;
  margin: 0 10px 0 100px; /* 남은 피드백, 완료 간격 조정 */
}

.icon-blue {
  color: dodgerblue;
  margin-right: 5px; /* 아이콘과 텍스트 간격 조정 */
}

.feedback-count-label {
  font-weight: bold;
  margin-left: 28px;
  margin-top: 15px; /* 여기에 margin-top 값을 조정 */
}

.feedback-count {
  font-size: 24px;
  margin-top: 15px;
  flex: 1;
}

.file-letter{
  margin-right: 20px;
  margin-top: 5px;
  width: 100px;
  height: 30px;
}
.write-button{
  margin-right: 70px;
  margin-top: 2px;
  width: 100px;
  height: 30px;
  background-color: dodgerblue; /* 배경색을 파란색으로 설정 */
  border: 1px solid dodgerblue; /* 테두리를 파란색으로 설정 */
  color: white; /* 글자색을 흰색으로 설정 */
  font-weight: bold; /* 글자를 두껍게 설정 */
  border-radius: 5px; /* 테두리를 둥글게 만들기 */
}
</style>