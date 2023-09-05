<template>
  <div v-if="loading" class="loading-container">
    <i class="fa-solid fa-spinner"></i> 로딩 중...
  </div>
  <div v-else class="write-page">

      <!-- dropdown-->
      <dropdown :options="formData.dropdownOptions" class="search-dropdown" @selected="updateSelectedWorkId" />
      <div>
        <input type="text" id="title" v-model="formData.title" required placeholder="제목을 입력하세요"/>
      </div>
      <div>
        <div v-for="(file, index) in formData.files" :key="index" class="file-input-container-write">
          <label :for="'file-input-' + index" class="custom-file-label">
            <div class="custom-icon-container">
              <i class="fa-solid fa-file-arrow-up custom-icon"></i> <span class="label-text">{{ file ? file.name : '파일 선택' }}</span>
            </div>
          </label>
          <input :id="'file-input-' + index" type="file" ref="fileInput" @change="handleFileChange(index)" class="custom-file-input-write" style="display: none;"/>
          <button type="button" class="custom-file-input-write" @click="openFileInput(index)" style="position: absolute;  width: 100%; height: 100%;"></button>
        </div>
      </div>
      <button type="button" @click="addFileInput" class="add-file-button">
        <i class="fa-solid fa-plus"></i>
      </button>
      <div>
        <textarea id="content" v-model="formData.content" required placeholder="본문을 입력하세요"></textarea>
      </div>
      <div class="button-container">
        <button type="button" class="cancel-button" @click="goToHomePage">취소</button>
        <button type="submit" class="submit-button" @click="submitForm">확인</button>
      </div>

  </div>
</template>


<script>
import axios from 'axios';

import Dropdown from './Dropdown.vue';

export default {
  props: ['memberId', 'teamId'], // 프롭스 정의
  data() {
    return {
      workName: 'ValueFromUpdatePage', // 전달할 데이터
      formData: {
        title: '',
        content: '',
        files: [], // 여러 파일을 저장하는 배열
        fileInputs: [], // 각 파일 선택 요소의 ref를 저장할 배열 추가
        dropdownOptions: [],
        selectedWorkId: null,
      },
      loading: false, // 로딩 상태 초기값
    };
  },
  components: {
    Dropdown,
  },
  watch: {
    loading(newValue) {
      if (!newValue) {
        // 로딩 상태가 false로 변경되면 페이지 이동
        this.goToHomePage();
      }
    },
  },
  methods: {

    handleFileChange(index) {
      const input = this.$refs.fileInput[index];
      this.formData.files.splice(index, 1, input.files[0]);
      input.value = null; // 리셋하여 같은 파일을 다시 선택할 수 있도록 함
    },
    openFileInput(index) {
      const input = this.$refs.fileInput[index];
      input.click();
    },
    async submitForm() {
      this.loading = true; // 로딩 상태를 false로 설정
      const { title, content, files, selectedWorkId } = this.formData;
      const memberId = this.memberId; // props로 전달된 값 사용
      const teamId = this.teamId; // props로 전달된 값 사용


      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      try {
        const response = await axios.post(
            `http://localhost:3210/board/multiWrite/${memberId}/${teamId}/${selectedWorkId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
        );

        // 요청 성공 시 처리
      //  console.log('글 작성 성공:', response.data);
        alert("글 작성 성공")
      } catch (error) {
        // 에러 처리
        console.error('글 작성 오류:', error);
        alert("글 작성 오류")
      }finally {
        {
          this.loading = false; // 로딩 상태를 false로 설정
        }
      }
    },

    // 파일 입력 요소 추가
    addFileInput() {
      this.formData.files.push(null); // 새로운 파일 입력칸을 추가
      this.formData.fileInputs.push(null); // 새로운 파일 선택 요소의 ref를 배열에 추가
    },
    goToHomePage() {
      this.$router.push({ name: 'HomeView' }); // WritePage의 name을 사용하여 페이지 이동
    },
    async loadDropdownOptions(teamId) {
      try {
        const response = await axios.get(`http://localhost:3210/work/list/${teamId}`);
        this.formData.dropdownOptions = response.data.content;
      } catch (error) {
        console.error('Dropdown options load error:', error);
      }
    },
    updateSelectedWorkId(workId) {
      this.formData.selectedWorkId = workId; // 선택한 작업의 workId 업데이트
    },
  },
  created() {
    this.addFileInput(); // 페이지 로드 시에 파일 입력 요소 추가
    this.loadDropdownOptions(this.teamId);
  },

};
</script>




<style>
#title {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  background-size: auto 100%;
  margin: 150px 0 0 50px;
}

#content {
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  background-size: auto 100%;
  margin: 0px 0 0 50px;
  height: 300px; /* 원하는 높이로 조정 */
}

.file-input-container-write {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid gray;
  margin: 20px 0 0 50px;
  width: 90%;
  height: 70px;
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
  margin: 10px 0 0 800px;
}
.submit-button,
.cancel-button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 30px;
  width: 130px;
  margin: 0 0 0 30px;
}

.submit-button {
  background-color: dodgerblue;
  color: white;
}

.cancel-button {
  background-color: lightgray;
}


.custom-icon {
  margin-top: 20px ;
  margin-right: 10px; /* 아이콘을 왼쪽으로 약간 이동 */
  font-size: 30px; /* 아이콘 사이즈 키우기 */
  color: dodgerblue;
}

.label-text {
  margin-top: -30px ; /* 텍스트의 상대적인 위치 조정 */
}


.custom-icon-container {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  cursor: pointer;
}




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

</style>