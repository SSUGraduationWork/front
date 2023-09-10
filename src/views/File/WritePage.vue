<template>
  <div v-if="loading" class="loading-container">
    <Loader></Loader>
  </div>
  <div v-else class="write-page">
      <div class ="search-dropdown">
        <dropdown :options="formData.dropdownOptions" @selected="updateSelectedWorkId" />
      </div>
      <div class = "title">
        <input type="text" id="title" v-model="formData.title" required placeholder="제목을 입력하세요"/>
      </div>
      <div>
        <div v-for="(file, index) in formData.files" :key="index" class="file-input-container-write">
          <label :for="'file-input-' + index" class="custom-file-label">
            <div class="custom-icon-container">
              <i class="fi fi-sr-file-upload custom-icon"></i><span class="label-text">{{ file ? file.name : '파일 선택' }}</span>
            </div>
          </label>
          <input :id="'file-input-' + index" type="file" ref="fileInput" @change="handleFileChange(index)" class="custom-file-input-write" style="display: none;"/>
          <button type="button" class="custom-file-input-write" @click="openFileInput(index)" style="position: absolute;  width: 100%; height: 100%;"></button>
        </div>
      </div>
      <div @click="addFileInput" class="add-file-button">
        <i class="fi fi-sr-add-document"></i>
      </div>
      <div>
        <textarea id="content" @input="resize($event.target)" v-model="formData.content" required placeholder="본문을 입력하세요"></textarea>
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
      } catch (error ) {
        // 에러 처리
          // 예외가 발생한 경우 처리
        console.error(error.message);

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
    resize(textarea) {
      textarea.style.height = "350px";
      textarea.style.height = textarea.scrollHeight + "px";
    },
  },
  created() {
    this.addFileInput(); // 페이지 로드 시에 파일 입력 요소 추가
    this.loadDropdownOptions(this.memberId,this.teamId);
  },

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
#content {
  width: 98.5%;
  resize: none;
  margin: 0 auto;
  margin-top: 13px;
  font-size: 15px;
  outline: none;
  background-size: auto 100%;
  min-height: 150px; /* 원하는 높이로 조정 */
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
  font-size: 21px; /* 아이콘 사이즈 키우기 */
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
</style>