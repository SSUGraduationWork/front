
<template>
  <div id="app">
  <!--라우터 예제-->
    <!-- <div>
      <router-link to="/">main</router-link>
      <div></div>
      <router-link to="/calendar">Calendar</router-link>
      <div></div>
      <router-link to="/post">회의록 생성</router-link>
      <router-view></router-view> --router 화면이 보여지는 곳-->
    <!-- <-- </div> --> 

    <Calendar></Calendar>
<!-- 
    <Main></Main> -->

    <!-- <post-minutes></post-minutes> -->
    <!-- <el-button type="danger">Post Minutes</el-button>
    <div>postOne</div>
    <div>{{postOne}}</div> -->

    <!-- <get-all-minutes></get-all-minutes> -->
<!-- 
    <el-button>Watch All</el-button>
    <div>GetAll</div>
    <div>{{ getAll }}</div>

    <el-button>Watch One</el-button>
    <div>GetOne</div>
    <div>{{ getOne }}</div>

    <el-button>Edit</el-button>
    <div>Update</div>
    <div>{{update}}</div>

    <el-button>Delete</el-button>
    <div>{{deleteMsg}}</div> -->
  </div>
</template>

<script>
import Calendar from './components/mainCalendar.vue';
// import Main from './components/mainPage.vue';
// import axios from 'axios';
// // import apiBoard from '@/testminutes';
// import postMinutes from './components/postMinutes.vue';
// import getAllMinutes from './components/getAllMinutes.vue';

export default {
  components: { Calendar },
  mounted() {
    // // 1. 회의록 생성
    // apiBoard.postArticle(28,7, '2023-12-25', "titleNew", "contentNew")
    // .then((response) => {
    //   console.log("post", response);
    //   this.postOne = response.data.data;
    // })
    // .catch((e) => {
    //   console.log(e);
    // });

    // //2-1. 팀내 회의록 전체 조회
    // apiBoard.getAllArticle(28, 7)
    // .then((response) => { // '=>'는 arrow 바인딩 
    //   console.log("getAllArticle", response);
    //   this.getAll = response.data.data;
    // })
    // .catch((e) => {
    //   console.log(e);
    // });

    // //2-2. 해당 날짜 회의록 조회
    // apiBoard.getArticle(28, 7 ,"2023-09-01")
    // .then((response) => {
    //   console.log("getArticle", response);
    //   this.getOne = response.data.data;
    // })
    // .catch((e) => {
    //   console.log(e);
    // });

    // //3. 수정
    // apiBoard.updateArticle(29,9, '2023-10-01', "titleNew111", "contentNew")
    // .then((response) => {
    //   console.log("updateArticle", response);
    //   this.update = response.data.data;
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
    
  //   // 4. 삭제
  //   apiBoard.deleteArticle(28,7,"2023-10-11")
  //   .then((response) => {
  //     console.log("deleteArticle", response);
  //     this.deleteMsg = response.data.message;
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // },

  // data() {
  //   return {
  //     postOne: null,
  //     getAll: null,
  //     getOne: null,
  //     update: null,
  //     deleteMsg: "not yet"
  //   };
  // }
  // methods: {
  //   fetchDataFromSpringBootAPI() {
  //     axios.get("http://localhost:80/calendars/minutes/all/28/7")
  //       .then(response => {
  //         // API 호출 성공 시 데이터 처리
  //         this.responseData = response.data;
  //         console.log("information:", this.responseData)
  //       })
  //       .catch(error => {
  //         // API 호출 실패 시 에러 처리
  //         console.error('API 호출 실패:', error);
  //       }); // 스프링 부트 API 엔드포인트 URL
  //   }
  }
};
</script>

<!--style: CSS 코드 작성-->
<style>

</style>


