<template>
<div>
  <div v-if="loading" class="loading-container">
    <Loader></Loader>
  </div>

  <div v-else class="write-page">
    <!-- ... -->
    <!-- ... -->
    <!-- dropdown-->
    <div class ="search-dropdown">
        <dropdown :options="formData.dropdownOptions" :initialWorkName="boardContent.workName" @selected="updateSelectedWorkId" />
      </div>
      <div class = "title">
        <input type="text" id="title" v-model="formData.title" required :placeholder="boardContent.title"/>
      </div>
        <div>
            <div v-for="(fileDir, index) in boardContent.fileDirs" :key="index" style="cursor: pointer">
              <div class="file-delete">
                <div @click="toggleApproval(index)" class="approve-toggle">
                  <div v-show="!isSelectedFile(index)" class="approve-icon approve-false">
                    <i class="fi fi-rr-minus-circle minus"></i>
                  </div>
                  <div v-show="isSelectedFile(index)" class="approve-icon approve-true">
                    <i class="fi fi-sr-minus-circle minus"></i>
                  </div>
                </div>
                <div class = file-box :class="{'file-box-selected' : isSelectedFile(index)}">
                  <div class = "file-icon"><i class="fi fi-sr-document"></i></div>
                  <div class = "file-name">{{ extractFileName(fileDir) }}</div>
                </div>
              </div>
            </div>
          <div v-for="(file, index) in formData.files" :key="index" :class="{'file-input-container-write' : !file}">
            <div v-if="file" class ="file-delete">
              <div class="approve-toggle">
                  <div class="approve-icon approve-false">
                    <i class="fi fi-rr-cross-circle" @click="deleteFile(index)"></i>
                  </div>
              </div>
              <label :for="'file-input-' + index" class="custom-file-label">
                <div class = file-box>
                  <div class = "file-icon"><i class="fi fi-sr-document"></i></div>
                  <div class = "file-name">{{ file.name }}</div>
                </div>
              </label>
            </div>
            <label v-else :for="'file-input-' + index" class="custom-file-label">
              <div class="custom-icon-container">
                <i class="fi fi-sr-file-upload custom-icon"></i><span class="label-text">{{ file ? file.name : '파일 선택' }}</span>
              </div>
            </label>
            <input :id="'file-input-' + index" type="file" ref="fileInput" @change="handleFileChange(index)" class="custom-file-input-write" style="display: none;"/>
            <button type="button" class="custom-file-input-write" @click="openFileInput(index)" style="display: none"></button>
          </div>
      </div>
      <div @click="addFileInput" class="add-file-button">
        <i class="fi fi-sr-add-document"></i>
      </div>
      <div>
        <textarea id="content" class="content" @input="resize($event.target)" v-model="formData.content" required></textarea>
      </div>
      <div class="button-container">
        <button type="button" class="cancel-button" @click="goToHomePage">취소</button>
        <button type="submit" class="submit-button" @click="submitForm">수정</button>
      </div>

  </div>
</div>
</template>

<script>
import axios from 'axios';
import { axiosInstance } from '@/axios';
import Sidebar from './SideBarPage.vue';
import Loader from '../../components/Loader.vue';
import Dropdown from "@/views/File/components/Dropdown";
import { useStore } from 'vuex';
import {ref} from 'vue';

export default {
  props: ['boardId','memberId','teamId'],
  components: {
    Sidebar,
    Dropdown,
    Loader
  },
  data() {
    return {
      allFileIds: [],
      selectedFileIndexes: [], // selectedFileIndexes 배열 초기화
      selectedFileIds: [], // selectedFileIds 배열 추가
      isApproved: true, // 승인 여부를 저장할 데이터
      boardContent: {},
      formData: {
        title: '',
        content: '',
        // Other form data properties here...
        boardId: null,
        files: [null], // 여러 파일을 저장하는 배열
        fileInputs: [null], // 각 파일 선택 요소의 ref를 저장할 배열 추가
        dropdownOptions: [],
        selectedWorkId: null,
      },
      loading: true,
      fileUploaded : {},
    };
  },

  async created() {
    this.loadDropdownOptions(22,this.teamId);

    const boardId = this.$route.params.boardId;
    //const memberId = this.$route.params.memberId;
    const teamId = this.$route.params.teamId;
    const userId = this.$store.state.userStore.user_id;

    try {
      const response = await axiosInstance.get(`/board-service/board/view/${boardId}/${userId}/${teamId}`);
      if (response.data.status.code === 200) {
        this.boardContent = response.data.content;
        this.formData.title = this.boardContent.title;
        this.formData.content = this.boardContent.content;
        this.allFileIds = this.boardContent.fileId; // fileId 배열 저장
        this.formData.selectedWorkId=this.boardContent.workId;
        this.loading = false;
      } else {
        console.error('올바르지 않은 요청입니다.');
      }
    } catch (error) {
      console.error('게시글 조회 오류:', error);
    }
  },
  methods: {
    async loadDropdownOptions(memberId,teamId) {
      try {
        const response = await axiosInstance.get(`/work-service/works/${teamId}/${memberId}`);  //`http://localhost:3210/work/list/${memberId}/${teamId}
        this.formData.dropdownOptions = response.data.content;
      } catch (error) {
        console.error('Dropdown options load error:', error);
      }
    },
    updateSelectedWorkId(workId) {
      this.formData.selectedWorkId = workId; // 선택한 작업의 workId 업데이트
    },

    async submitForm() {
      this.loading = true; // 로딩 상태를 true로 설정
      const userId = this.$store.state.userStore.user_id;
      console.log(this.formData);
      const { title, content, files, selectedFileIds,selectedWorkId } = this.formData;
      const boardId = this.boardId; // props로 전달된 값 사용
      //const memberId = this.memberId; // props로 전달된 값 사용
      const teamId = this.teamId; // props로 전달된 값 사용

      const request = {
        title,
        content,
        // Other properties from the request object...
      };

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      try {
        const selectedFileIdsJson = JSON.stringify(this.selectedFileIds);
        console.log('Selected File IDs:', selectedFileIdsJson);
        // 서버에 선택된 파일 ID들을 보내고 파일을 삭제하는 API 호출
        if(selectedFileIdsJson != "[]"){
            await axiosInstance.delete(`/board-service/files/delete`, {
              data: selectedFileIdsJson, // 선택된 파일 ID들을 요청의 본문(body)로 보냄
              headers: {
                'Content-Type': 'application/json' // JSON 형식으로 요청을 보내기 위해 헤더 설정
              }
          });
        }

        const response = await axiosInstance.post(
            `board-service/multiboard/update/${boardId}/${userId}/${teamId}/${selectedWorkId}`,
            formData,
            {
              params: { files: selectedFileIds }, // 선택된 파일 IDs를 전달
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
        );



        // 요청 성공 시 처리
        console.log('수정 성공:', response.data);

        this.$router.push({ name: 'BoardDetailPage',params: { boardId: this.boardId } });
      } catch (error) {
        // 에러 처리,//예외처리에 문제 있음-->추후에 수정해야함
        console.error('수정 오류:', error);
      } finally {
        this.loading = false; // 로딩 상태를 false로 설정
      }
    },
    toggleApproval(index) {
      this.selectedFileIndexes[index] = !this.selectedFileIndexes[index];
      const fileId = this.allFileIds[index];

      if (this.selectedFileIndexes[index]) {
        this.selectedFileIds.push(fileId);
      } else {
        const fileIdIndex = this.selectedFileIds.indexOf(fileId);
        if (fileIdIndex !== -1) {
          this.selectedFileIds.splice(fileIdIndex, 1);
        }
      }
    },
    isSelectedFile(index) {
      return this.selectedFileIndexes[index];
    },
    handleFileChange(index) {
      this.fileUploaded[index] = true;
      const input = this.$refs.fileInput[index];
      this.formData.files.splice(index, 1, input.files[0]);
      input.value = null; // 리셋하여 같은 파일을 다시 선택할 수 있도록 함
    },
    deleteFile(index){
      this.formData.files.splice(index,1);
    },
    openFileInput(index) {
      const input = this.$refs.fileInput[index];
      input.click();
    },
    // 파일 입력 요소 추가
    addFileInput() {
      this.formData.files.push(null); // 새로운 파일 입력칸을 추가
      this.formData.fileInputs.push(null); // 새로운 파일 선택 요소의 ref를 배열에 추가
    },
    goToUpdatePage() {
      this.$router.push({ name: 'BoardDetailPage' ,params: { boardId: this.boardId }}); // WritePage의 name을 사용하여 페이지 이동
    },
    goToSideBarPage() {
      this.$router.push({ name: 'SideBarPage', params: { memberId: this.memberId } });
    },
    goToBoardDetailPage() {
      this.$router.push({ name: 'BoardDetailPage',params: { boardId: this.boardId } }); // WritePage의 name을 사용하여 페이지 이동
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
        
        const response = await axiosInstance.get(`board-service/downloadFile/${fileId}`, {
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
    resize(textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + "px";
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
  font-size: 15px;
}
.loading-container{
  height: 100%;
  margin: 0 auto;
}
.write-page{
  width: 85%;
  margin: 0 auto;
}
.title {
  margin-top: 11em;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  outline: none;
  display: flex;
  margin-bottom: 30px;
}
.title input{
  width: 90%;
  padding: 10px;
  float: left;
  outline: none;
  border: none;
  font-weight: 600;
  font-size: 27px;
}
.content {
  width: 98.5%;
  resize: none;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 15px;
  outline: none;
  background-size: auto 100%;
  min-height: 350px; /* 원하는 높이로 조정 */
  border: none;
}

.file-input-container-write {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 70px;
  line-height: 70px;
  border: 1px dashed #ccc; /* 회색 점선 테두리 추가 */
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
}

.custom-file-input-write {
  background-color: white;
  border-radius: 10px;
  border: 1px dashed #ccc; /* 회색 점선 테두리 추가 */
  width: 100%;
  height: 100%;
  /* height: 100%;*/
  /* opacity: 0;

   */
  margin-top: 100px;
}


/*버튼*/
.button-container{
  display: flex;
  float: right;
  margin-top: 30px;
}
.submit-button,
.cancel-button {
  border: none;
  cursor: pointer;
  height: 35px;
  border-radius: 20px;
  width: 135px;
  font-weight: 600;
  margin-bottom: 50px;
}

.submit-button {
  background-color: #3772FF;
  color: white;
}

.cancel-button {
  background-color: #e1e1e1;
  margin-right: 30px;
}


.custom-icon {
  font-size: 17px; /* 아이콘 사이즈 키우기 */
  line-height: 70px;
  color: #3772FF;
  display: inline-block;
  float: left;
}

.custom-icon-container {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  cursor: pointer;
  width: 90%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.custom-icon-container span{
  float: left;
  margin-left: 30px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.search-dropdown{
  float: right;
  margin-top: 7em;
}
.add-file-button{
  border: 1px solid #3772FF;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin: 0 auto;
  line-height: 43px;
  background-color: #3772FF;
  color: white;
  cursor: pointer;
}
.minus-image{
  margin-right: 20px;
  font-size: 20px;
  color: firebrick;
}

.approve-toggle{
  cursor: poninter;
  float: left;
  background-color: white;
  align-items: center;
  margin-right: 20px;
}
.minus{
  font-size: 18px;
}
.file-delete{
  display: flex;
  width: 100%;
  height: 70px;
  line-height: 70px;
  margin-bottom: 20px;
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
.fi-sr-minus-circle{
  color: #F15454;
}
.fi-rr-minus-circle,
.fi-rr-cross-circle{
  color: #ccc;
  font-size: 18px;
  cursor: pointer;
}
.fi-sr-minus-circle:hover{
  color: #E74343;
}
.fi-rr-minus-circle:hover,
.fi-rr-cross-circle:hover{
  color: #F15454;
}
.file-box-selected{
  background-color: #FF8282;
  color: white;
}
.file-box-selected i{
  color: white;
}
.custom-file-label{
  width: 100%;
}
</style>