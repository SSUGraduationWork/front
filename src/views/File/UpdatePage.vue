<template>
  <div v-if="loading" class="loading-container">
    <i class="fa-solid fa-spinner"></i> 로딩 중...
  </div>

  <div v-else class="write-page">
    <!-- ... -->
    <!-- ... -->
    <!-- dropdown-->

    <dropdown :options="formData.dropdownOptions" class="search-dropdown" :initialWorkName="boardContent.workName" @selected="updateSelectedWorkId" />
    <sidebar :board-id="boardId" :member-id="memberId"/>
    <!-- ... -->

    <div>
      <input type="text" id="title" v-model="formData.title" required :placeholder="boardContent.title" />
    </div>
    <!-- 파일 업로드 부분 생략 -->

    <div
        v-for="(fileDir, index) in boardContent.fileDirs"
        :key="index"
        style="cursor: pointer"
    >

      <div class="file-delete">
        <button @click="toggleApproval(index)" class="approve-toggle">
          <div
              v-show="!isSelectedFile(index)"
              class="approve-icon approve-false"
          >
            <i class="fa-regular fa-square-minus minus-image"></i>
          </div>
          <div
              v-show="isSelectedFile(index)"
              class="approve-icon approve-true"
          >
            <i class="fa-solid fa-square-minus minus-image"></i>
          </div>
        </button>
        <div :class="{ 'file-box1': !isSelectedFile(index), 'file-box2': isSelectedFile(index) }">
          <div class="filename-text-style">
          {{ extractFileName(fileDir) }}
          </div>
        </div>
      </div>
    </div>

    <div>
      <div v-for="(file, index) in formData.files" :key="index" class="file-input-container-update">
        <label :for="'file-input-' + index" class="custom-file-label">
          <div class="custom-icon-container">
            <i class="fa-solid fa-file-arrow-up custom-icon"></i> <span class="label-text">{{ file ? file.name : '파일 선택' }}</span>
          </div>
        </label>
        <input :id="'file-input-' + index" type="file" ref="fileInput" @change="handleFileChange(index)" class="custom-file-input" style="display: none;"/>
        <button type="button" class="custom-file-input" @click="openFileInput(index)" style="position: absolute;  width: 100%; height: 100%;"></button>
      </div>
    </div>
    <button type="button" @click="addFileInput" class="add-file-button">
      <i class="fa-solid fa-plus"></i>
    </button>
    <div>
      <textarea id="content" v-model="formData.content" required :placeholder="boardContent.content"></textarea>
    </div>
    <div class="button-container">
      <button type="button" class="cancel-button" @click="goToHomeView">취소</button>
      <button type="submit" class="submit-button" @click="submitForm">수정</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import Sidebar from './SideBarPage.vue';
import UpdatePage from "@/views/File/UpdatePage";
import Dropdown from "@/views/File/components/Dropdown";
export default {
  props: ['boardId','memberId','teamId'],
  components: {
    Sidebar,
    Dropdown,
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
        files: [], // 여러 파일을 저장하는 배열
        fileInputs: [], // 각 파일 선택 요소의 ref를 저장할 배열 추가
        dropdownOptions: [],
        selectedWorkId: null,
      },
      loading: true,
    };
  },

  loading: false, // 로딩 상태 초기값


  async created() {
    this.loadDropdownOptions(this.memberId,this.teamId);

    const boardId = this.$route.params.boardId;
    const memberId = this.$route.params.memberId;
    const teamId = this.$route.params.teamId;

    try {
      const response = await axios.get(`http://localhost:3210/board/view/${boardId}/${memberId}/${teamId}`);
      if (response.data.status.code === 200) {
        this.boardContent = response.data.content;
        this.formData.title = this.boardContent.title;
        this.formData.content = this.boardContent.content;
        this.allFileIds = this.boardContent.fileId; // fileId 배열 저장
        this.formData.selectedWorkId=this.boardContent.workId;
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
    async loadDropdownOptions(memberId,teamId) {
      try {
        const response = await axios.get(`http://localhost:3210/work/list/${memberId}/${teamId}`);
        this.formData.dropdownOptions = response.data.content;
      } catch (error) {
        console.error('Dropdown options load error:', error);
      }
    },
    updateSelectedWorkId(workId) {
      this.formData.selectedWorkId = workId; // 선택한 작업의 workId 업데이트
    },
    goToHomeView() {
      this.$router.push({ name: 'HomeView' }); // WritePage의 name을 사용하여 페이지 이동
    },

    async submitForm() {
      this.loading = true; // 로딩 상태를 true로 설정
      const { title, content, files, selectedFileIds,selectedWorkId } = this.formData;
      const boardId = this.boardId; // props로 전달된 값 사용
      const memberId = this.memberId; // props로 전달된 값 사용
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
        await axios.delete('http://localhost:3210/files/delete', {
          data: selectedFileIdsJson, // 선택된 파일 ID들을 요청의 본문(body)로 보냄
          headers: {
            'Content-Type': 'application/json' // JSON 형식으로 요청을 보내기 위해 헤더 설정
          }
        });



        const response = await axios.post(
            `http://localhost:3210/multiboard/update/${boardId}/${memberId}/${teamId}/${selectedWorkId}`,
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


        alert("수정 성공");
        this.$router.push({ name: 'HomeView' });
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
      const input = this.$refs.fileInput[index];
      this.formData.files.splice(index, 1, input.files[0]);
      input.value = null; // 리셋하여 같은 파일을 다시 선택할 수 있도록 함
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
      this.$router.push({ name: 'UpdatePage' }); // WritePage의 name을 사용하여 페이지 이동
    },
    goToSideBarPage() {
      this.$router.push({ name: 'SideBarPage', params: { memberId: this.memberId } });
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
.write-page{
  margin-top: 100px;
  width: 85%;
  min-width: 80vh;
  padding-left: 10px;
}
.file-input-container-update {
   display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px 0 0 44px;
  width: 86%;
  height: 70px;
  border: 1px dashed darkgrey; /* 변경된 부분: 테두리를 점선으로 설정 */
  border-width: 2px; /* 변경된 부분: 테두리 두께 설정 */
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
}

.custom-file-input {
  background-color: white;
  border-radius: 10px;
  border: 1px dashed #ccc; /* 회색 점선 테두리 추가 */
  width: 90%;
  height: 100%;
  /* height: 100%;*/
  /* opacity: 0;

   */
  margin-top: 100px;
}
.file-delete{
  display: flex;
  margin-left: 50px;
}
.file-box1 {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px 0 0 0;
  width: 90%;
  height: 70px;
  box-shadow: 3px 3px 2px 3px darkgrey; /* 그림자 설정 */
  border-width: 2px; /* 변경된 부분: 테두리 두께 설정 */
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
}

.file-box2 {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px 0 0 0;
  width: 90%;
  height: 70px;
  border-width: 2px; /* 변경된 부분: 테두리 두께 설정 */
  cursor: pointer; /* 커서를 손가락 모양으로 변경 */
  background: rgba(255, 0, 0, 0.1); /* 투명한 빨간색 (배경색의 알파 값이 0.5로 설정됨) */
}
.filename-text-style{
  margin-top: 30px;
}

.minus-image{
  margin-right: 20px;
  font-size: 20px;
  color: firebrick;
}

.approve-toggle{

  border: #f0f0f0;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.file-input-container{
  width: 57%;
}

.add-file-button{
  margin-left: 50px;
  margin-top: 15px;
}
#content {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background-size: auto 100%;
  margin: 0px 0 0 50px;
  height: 370px; /* 원하는 높이로 조정 */
}


</style>