<template>
  <div v-if="loading" class="loading-container">
    <i class="fa-solid fa-spinner"></i> 로딩 중...
  </div>

  <div v-else class="write-page">
    <!-- ... -->
    <!-- ... -->

    <sidebar :board-id="boardId" :member-id="memberId"/>

    <!-- ... -->
    <form @submit.prevent="submitForm">



      <div class="title-style">
        <div class="workName-box-style">{{boardContent.workName}}</div>
        <input type="text" id="title" v-model="formData.title" required :placeholder="boardContent.title" />
      </div>

      <!-- 파일 업로드 부분 생략 -->
      <div
          v-for="(fileDir, index) in boardContent.fileDirs"
          :key="index"
          @click="downloadFile(boardContent.fileId[index], fileDir)"
          style="cursor: pointer"
          class="file-box"
      >
        {{ extractFileName(fileDir) }}
      </div>

      <div class="update-content-box">
        <textarea id="content" v-model="formData.content" required :placeholder="boardContent.content"></textarea>
      </div>
      <div class="button-container">
        <button type="button" class="cancel-button" @click="goToHomeView">취소</button>
        <button type="submit" class="submit-button" @click="goToUpdatePage(memberId, boardId,teamId)">수정</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

import Sidebar from './SideBarPage.vue';
import UpdatePage from "@/views/File/UpdatePage";
export default {
  props: ['boardId','memberId','teamId'],
  components: {
    Sidebar,
  },
  data() {
    return {
      boardContent: {},
      formData: {
        title: '',
        content: '',
        // Other form data properties here...
        boardId: null,
      },
      loading: true,
    };
  },
  async created() {
    const boardId = this.$route.params.boardId;
    const memberId = this.$route.params.memberId;
    const teamId = this.$route.params.teamId;
    try {
      const response = await axios.get(`http://localhost:3210/board/view/${boardId}/${memberId}/${teamId}`);
      if (response.data.status.code === 200) {
        this.boardContent = response.data.content;
        this.formData.title = this.boardContent.title;
        this.formData.content = this.boardContent.content;
        this.loading = false;

        // 조회수 증가 로직 실행
        this.increaseViewCount(boardId);
      } else {
        console.error('올바르지 않은 요청입니다.');
        alert('올바르지 않은 요청입니다.');
      }
    } catch (error) {
      console.error('게시글 조회 오류:', error);
      alert('게시글 조회 오류');
    }
  },
  methods: {
    goToHomeView() {
      this.$router.push({ name: 'HomeView' }); // WritePage의 name을 사용하여 페이지 이동
    },
    // 조회수 증가 로직
    increaseViewCount(boardId) {
      try {
        // 조회수를 서버에 증가시키는 API 호출
        const response = axios.post(`http://localhost:3210/board/upcount/${boardId}`);

        // 요청 성공 시 처리
        console.log('조회수 증가 성공:');
      } catch (error) {
        // 에러 처리
        console.error('조회수 증가 오류:', error);
      }
    },
    goToUpdatePage() {
      this.$router.push({ name: 'UpdatePage', params: { memberId: this.memberId, boardId: this.boardId ,teamId: this.teamId} });
    },
    goToSideBarPage() {
      this.$router.push({ name: 'SideBarPage', params: { memberId: this.memberId } });
    },
    submitForm() {
      // Form submission logic here...
    },
    cancel() {
      // Handle cancel logic here...
    },
    // Function to check if the file path has an extension
    // 확장자가 있는 경우에만 이름 추출
    hasExtension(filePath) {
      const extensionPattern = /\.[0-9a-z]+$/i;
      return extensionPattern.test(filePath);
    },

    // Function to extract file name from the path
    extractFileName(filePath) {
      const fileNameWithoutExtension = filePath.split('_')[1]; // Extract after the first underscore
      return fileNameWithoutExtension;
    },
    async downloadFile(fileId, fileDir) {
      try {
        const response = await axios.get(`http://localhost:3210/downloadFile/${fileId}`, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', this.extractFileName(fileDir));
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    },
  }
};
</script>

<style>
body {
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.file-box {
  display: flex; /* Flexbox 레이아웃 사용 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
 /* display: inline-block;

  */
  padding: 8px;
  cursor: pointer;
  margin: 20px 0 0 80px;
  width: 1000px;
  height: 70px;
  border-radius: 5px;
  border: 1px dashed darkgrey; /* 변경된 부분: 테두리를 점선으로 설정 */
  border-width: 2px; /* 변경된 부분: 테두리 두께 설정 */
}

.title-style{
  width: 1110px;
  margin-right:100px;
}

.workName-box-style{
  justify-content: center; /* 수평 가운데 정렬 */
  display: inline-flex; /* 수직 가운데 정렬을 위해 Flexbox 사용 */
  border-radius: 7px;
  width: 120px;
  height: 30px;
  background-color: #F5F6FA;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  align-items: center; /* 수직 가운데 정렬 */
  margin-left: 900px;
  text-align: center; /* 텍스트 수평 가운데 정렬 */
  margin-top:100px;
  position:absolute;
}


</style>