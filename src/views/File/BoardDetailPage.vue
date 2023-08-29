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
      <div>
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

      <div>
        <textarea id="content" v-model="formData.content" required :placeholder="boardContent.content"></textarea>
      </div>
      <div class="button-container">
        <button type="button" class="cancel-button" @click="cancel">취소</button>
        <button type="submit" class="submit-button" @click="goToUpdatePage(memberId, boardId)">수정</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

import Sidebar from './SideBarPage.vue';
import UpdatePage from "@/views/File/UpdatePage";
export default {
  props: ['boardId','memberId'],
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

    try {
      const response = await axios.get(`http://localhost:8080/board/view/${boardId}/${memberId}`);
      if (response.data.status.code === 200) {
        this.boardContent = response.data.content;
        this.formData.title = this.boardContent.title;
        this.formData.content = this.boardContent.content;
        this.loading = false;
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
    goToUpdatePage() {
      this.$router.push({ name: 'UpdatePage', params: { memberId: this.memberId, boardId: this.boardId } });
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
        const response = await axios.get(`http://localhost:8080/downloadFile/${fileId}`, {
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
  width: 70%;
  cursor: pointer;
  margin: 20px 0 0 435px;
  width: 850px;
  height: 70px;
  border-radius: 5px;
  border: 1px dashed darkgrey; /* 변경된 부분: 테두리를 점선으로 설정 */
  border-width: 2px; /* 변경된 부분: 테두리 두께 설정 */
}

</style>