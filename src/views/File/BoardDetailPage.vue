<template>
<div>
<div v-if="loading" class="loading-container">
  <Loader></Loader>
</div>
<div :style="{ 'margin-right': sidebarWidth }">
  <div v-if="!loading" class="write-page">
    <!-- ... -->
    <!-- ... -->

    <Sidebar :board-id="boardId" :member-id="memberId"/>

    <!-- ... -->
    <form @submit.prevent="submitForm">



      <div class="title-style">
        <div class = "title">{{ boardContent.title }}</div>
        <div class = "info">
          <div><img :src="boardContent.pictureURL"></div>
          <div class = "writer">{{boardContent.studentNumber}} &nbsp;{{ boardContent.writer }}</div> 
          <div class ="more-icon" @mousedown="openMod" @mouseleave="closeMod">
            <ModButton v-if="mod" @close-mod="closeMod"></ModButton>
            <i class="fi fi-br-menu-dots-vertical"></i>
          </div>
          <div class = "workName-box-style" :style="{ backgroundColor: color }">
                <i class="fa-solid fa-tag"></i><span>{{ boardContent.workName }}</span>
          </div>
          <div class = "created-at">{{ boardContent.createdAt[0] }}년 &nbsp{{ boardContent.createdAt[1] }}월 &nbsp{{ boardContent.createdAt[2] }}일
                {{ boardContent.createdAt[3] }}:{{ boardContent.createdAt[4] }}:{{ boardContent.createdAt[5] }}
          </div>
        </div>
      </div>

      <!-- 파일 업로드 부분 생략 -->
      <div class = "file-container">
        <div
          v-for="(fileDir, index) in boardContent.fileDirs"
          :key="index"
          @click="downloadFile(boardContent.fileId[index], fileDir)"
          class="file-box"
      >
          <div class = "file-icon"><i class="fi fi-sr-document"></i></div>
          <div class = "file-name">{{ extractFileName(fileDir) }}</div>
        </div>
      </div>

      <div class="update-content-box">
        <textarea id="content2" v-model="formData.content" required :placeholder="boardContent.content"></textarea>
      </div>
    </form>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';

import Sidebar from './SideBarPage.vue';
import UpdatePage from "@/views/File/UpdatePage";
import Loader from '../../components/Loader.vue';
import ModButton from './components/ModButton.vue';
import { sidebarWidth } from './components/state';

export default {
  props: ['boardId','memberId','teamId'],
  components: {
    Sidebar,
    Loader,
    ModButton,
  },
  setup() {
    return { sidebarWidth };
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
      color: this.$route.params.color,
      mod: false,
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
    openMod() {
      this.mod = true;
    },
    closeMod() {
      this.mod = false;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
  font-size: 15px;
  font-weight: 500;
}
.write-page{
  width: 85%;
  min-width: 80vh;
  margin: 0 auto;
  padding-left: 10px;
}
.loading-container{
  height: 100%;
}

.file-box {
  cursor: pointer;
  height: 70px;
  width: 100%;
  margin-bottom: 12px;
  border-radius: 12px;
  line-height: 70px;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
}
.file-container{
  width: 100%;
  margin-top: 25px;
  margin-bottom: 20px;
}

.workName-box-style{
  float: right;
  border-radius: 10px;
  width: 140px;
  height: 35px;
  color: white;
  background-color:  #EA8EEC;
  border: none;
  font-weight: 700;
  font-size: 15px;
  text-align: left;
  line-height: 35px;
  margin-right: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space:nowrap;
  padding-right: 10px;
}
.workName-box-style span{
  font-weight: 600;
}

#content2 {
  width: 100%;
  font-size: 16px;
  resize: none;
  outline: none;
  background-size: auto 100%;
  min-height: 400px; /* 원하는 높이로 조정 */
  border-top: 1px solid #BABABA;
  margin-top: 10px;
  padding-top: 25px;
  border-left: none;
  border-right: none;
  border-bottom: none;
  padding-left: 5px;
}

.title-style{
  margin-top: 7em;
  width: 100%;
  margin-left: 4px;
}
.title{
  font-weight: 700;
  font-size: 30px;
  text-align: left;
  height: 50px;
  margin-bottom: 10px;
  padding-right: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.info{
  height: 40px;
  line-height: 40px;
}
.info img{
  float: left;
  margin-top: 2px;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  overflow: hidden;
}
.writer{
  float: left;
  margin-left: 10px;
}
.more-icon{
  float: right;
  cursor: pointer;
  position: relative;
}
.created-at{
  float: right;
  margin-right: 40px;
}
.fa-tag{
  transform: rotate(135deg);
  font-size: 18px;
  margin-left: 15px;
  margin-right: 15px;
  text-align: left;
}
.file-icon{
  margin-top: 2px;
  margin-left: 50px;
}
.file-icon i{
  font-size: 17px;
  color: #3772ff;
}
.file-name{
  margin-left: 50px;
  width: 100%;
  padding-right: 40px;
  text-align: left;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
}
.file-box:hover{
  background-color: #F5F6FA;

}
</style>