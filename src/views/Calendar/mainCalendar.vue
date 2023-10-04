<template>

  <div class="calendar" v-if="this.checkExist == true">
    <div class="calendar_header">
      <!-- <el-button class="btn" icon="fi fi-rr-angle-left" @click="previousMonth()"></el-button> -->
      <div class="move"><i class="fi fi-bs-angle-left" @click="previousMonth()"></i></div>
      <div class="currentMonth">{{currentMonth}}</div>
      <div class="move"><i class="fi fi-bs-angle-right" @click="nextMonth()"></i></div>
      <!-- <el-button class="btn" icon="fi fi-rr-angle-right" @click="nextMonth()"></el-button> -->
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="week in calendar" :key="week" class="tr">
            <td v-for="date in week" :key="date" class="td">
              <div v-if="date.classes !== 'notCurrentMonth' && !isToday(currentMonth, date.day)"><button @click="clickDate(currentMonth, date.day)" class="day">{{ date.day }}</button></div>
              <div><button v-if="date.classes == 'notCurrentMonth'" class="notCurrentDay">{{ date.day }}</button></div>
              <div v-if="isToday(currentMonth, date.day)"><button class="today" @click="clickDate(currentMonth, date.day)">{{date.day}}</button></div>
              <div class="dot" v-if="date.classes != 'notCurrentMonth' && checkDay(date.day)"><i class="fi fi-ss-circle-small"></i></div>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
    <!--모달-->
  <!-- <div class="modal"> -->
  <div class="black-bg" :style="{display:modalDisplay}">
  <div id="modal" class="modal-overlay">
    <div class="modal_window" v-click-outside="updateFunction" v-if="minutes != null">
      <!--이미 회의록 존재할 경우: getMinutes()-->    
      <container class="date1">
        <div class="container1">
          <div class="targetDate">{{targetDate}}</div>
          <div class="icons">
          <i class="fi fi-rs-menu-dots-vertical" @click="showButton()"></i>
          <div class="trashBtn" v-if="onButton"><i class="fi fi-rr-trash" @click="deleteConfirm()"></i></div>          
          </div>
        </div>

      </container>
      <div class="title2">
        <textarea type="textarea" class="inputTitle" @input="resize($event.target), changeInput()" placeholder="제목을 입력해 주세요" 
        v-model="minutes.title" wrap="soft" style="min-height: 1.2em; width: 100%; height: 'auto'; line-height: 1;"
        ></textarea></div>
      <div class="content2">
        <textarea 
          @input="resize($event.target), changeInput()"
            style="margin-top:10px; width: 100%; height: 'auto'"
            type="textarea"
            placeholder="내용을 입력해 주세요."
            v-model="minutes.content" @change="isModified=true"
          ></textarea>
      </div>

      <!--모두 입력하라는 알림창-->
      <div id="modal" class="deleteModal" :style="{display: inputModalDisplay}">
        <div class="delete-modal-window">
          <div>title과 input 모두 입력하시오</div>
          <div class="delete-footer">
            <button class="document" @click="inputClose()">확인</button>
          </div>
        </div>
      </div>

      <!--delete 확인-->
      <div id="modal" class="deleteModal" :style="{display:deleteModalDisplay}">
        <div class="delete-modal-window">
          <div>해당 회의록 삭제 후에는 다시 복구할 수 없습니다.</div>
            <div class="delete-footer">
              <button class="danger" @click="deleteFunction()">삭제</button>
              <button class="document" @click="closeButton()">취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>        
    
      <!--존재하지 않을 경우-->
      <!--회의록이 아직 존재하지 않을 경우: postMinutes()-->
    <div class="modal_window" v-click-outside="postFunction" v-if="minutes == null && modalDisplay == 'flex'">
      <div class="date1">{{targetDate}}</div>
      <div class="title2">
        <textarea type="textarea" class="inputTitle" @input="resize($event.target)" placeholder="제목을 입력해 주세요" 
        v-model="title" wrap="soft" style="min-height: 1.2em; width: 100%; height: 'auto'; line-height: 1;"
        ></textarea>
      </div>
      <div class="content2">
        <textarea 
          @input="resize($event.target), changeInput()"
            style="margin-top:10px; width: 100%; height: 'auto'"
            type="textarea"
            placeholder="내용을 입력해 주세요."
            v-model="content" @change="isModified=true"
        ></textarea>
      </div>

            <!--모두 입력하라는 알림창-->
      <div id="modal" class="deleteModal" :style="{display: inputModalDisplay}">
        <div class="delete-modal-window">
          <div>title과 input 모두 입력하시오</div>
          <div class="delete-footer">
            <button class="document" @click="inputClose()">확인</button>
          </div>
        </div>
      </div>
      
  </div>

</template>
<script>

import axios from "axios";
import {axiosInstance} from "@/axios"
import vClickOutside from 'click-outside-vue3'
const url = "http://localhost:3210";

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      //기본 캘린더
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      currentMonth: '',
      calendar: [],

      //회의록 조회
      minutes: null,      
      targetDate: null,

      //회의록 생성
      title: null,
      content: null,
      userId: 2,
      teamId: this.$route.params.teamId,

      //회의록 수정
      update: false,
      //모달
      modalDisplay: "none",
      //회의록 삭제 경고창
      deleteModalDisplay: "none",

      //modal 체크
      check: "none",
      isModified: false,
      inputModalDisplay: "none",
      onButton: false,

      //캘린더에 회의록이 존재하는 날짜 마킹
      existMinutesList: null,
      checkCurrentMonth: null,
      once: false,  //false일 경우 한번이미됨. true일 경우 첫 한 번
      checkday: '',
      dayExist: false,
      checkExist: false,
    };
  },

  //회의록 생성
  computed: {
    postSetParams() {
      const params = {
        date: this.targetDate,
        title: this.title,
        content: this.content,           
      }
      return params;      
    },

    updateSetParams() {
      const params = {
        date: this.targetDate,
        title: this.minutes.title,
        content: this.minutes.content,           
      }
      return params;
    }
  },


  mounted() {
    this.initialFunction();
  },

  methods: {
    checkDay(day) {
      if (this.existMinutesList.includes(day)) {
        return true;
      } else {
        return false;
      }
    },

    changeInput() {
      this.isModified = true;
    },

    showButton() {
      console.log(this.onButton)
      if (this.onButton == false) {
        this.onButton = true;
      }
      else {
        this.onButton = false;
      }
    },

    closeButton() {
      this.onButton = false;
      this.deleteClose();
    },

    async initialFunction() {
      this.checkExist = false;
      await this.updateCalendar();
      this.getExistMinuteList(this.teamId, this.currentMonth);
    },

    async secondFunction(selectedMonth) {
      this.checkExist = false;
      await this.updateCalendarWithCustomMonth(selectedMonth);
      this.getExistMinuteList(this.teamId, this.currentMonth);
    },

    //0. 해당 팀이 해당 달에 가지고 있는 회의록 날짜 리스트로 받기
    async getExistMinuteList(teamID, currentMonth) {
      // console.log("exitstCurrentMonth: ",this.currentMonth);
      axiosInstance
      .get(`/calendar-service/calendars/getExistMinutes/${this.teamId}/${this.currentMonth}`)
      .then((response) => {
        if (response.data.message == "Success") {
          this.checkCurrentMonth = this.currentMonth;
          this.existMinutesList = response.data.data;
          // console.log("this.currentMonth:", this.currentMonth);
          this.checkExist = true;
          console.log("this.existMinutesList: ", this.existMinutesList);
        } 
        })
        .catch((e) => {
        console.log(e);
        });
    },

    //1. 현재 년/월을 기준으로 달력 데이터를 업데이트
    updateCalendar() {
      
      const currentDate = new Date();
      //현재 year, month, daysInMonth(한달일수)
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();   
      this.daysInMonth = daysInMonth;

      if (month+1 <10) {
        this.currentMonth = `${year}-0${month + 1}`;
      }
      else {
        this.currentMonth = `${year}-${month + 1}`;
      }
      console.log("updateCurrentMOnth1: ", this.currentMonth);
      //첫번째 날과 마지막 날의 요일
      const firstDay = new Date(year, month, 1).getDay();
      const lastDay = new Date(year, month, daysInMonth).getDay();

      const prevMonthDays = firstDay;
      const nextMonthDays = 6 - lastDay;

      const prevMonth = new Date(year, month, -prevMonthDays + 1);
      const nextMonth = new Date(year, month + 1, nextMonthDays);

      const calendar = [];
      let week = [];
      for (let day = prevMonth; day <= nextMonth; day.setDate(day.getDate() + 1)) {

        const dayOfMonth = day.getDate();
        const isPrevMonth = day < new Date(year, month, 1);
        const isNextMonth = day > new Date(year, month, daysInMonth);
        const dayClasses = [];

        if (isPrevMonth || isNextMonth) {
          dayClasses.push('notCurrentMonth');
        }

        week.push({
          day: dayOfMonth,
          classes: dayClasses.join(' ')
        });

        if (week.length === 7) {
          calendar.push(week);
          week = [];
        } 
      }
      this.calendar = calendar;
    },

    //2. 지정한 년도와 월을 기준으로 캘린더 업데이트
    updateCalendarWithCustomMonth(selectedMonth) {
      const [year, month] = selectedMonth.split('-').map(Number);
      const daysInMonth = new Date(year, month, 0).getDate();
      this.daysInMonth = daysInMonth;
      const firstDay = new Date(year, month-1, 1).getDay(); //시작 요일
      const lastDay = new Date(year, month-1, daysInMonth).getDay();  //마지막 요일

      const prevMonthDays = firstDay;
      this.prevMonthDays = prevMonthDays;
      const nextMonthDays = 6 - lastDay;

      const prevMonth = new Date(year, month-1, -prevMonthDays + 1);
      const nextMonth = new Date(year, month, nextMonthDays);
  
      const calendar = [];
      let week = [];
      for (let day = prevMonth; day <= nextMonth; day.setDate(day.getDate() + 1)) {
        const dayOfMonth = day.getDate();
        const isPrevMonth = day < new Date(year, month-1, 1);
        const isNextMonth = day > new Date(year, month-1, daysInMonth);
        const dayClasses = [];

        if (isPrevMonth || isNextMonth) {
          dayClasses.push('notCurrentMonth');
        }

        week.push({
          day: dayOfMonth,
          classes: dayClasses.join(' ')
        });

        if (week.length === 7) {
          calendar.push(week);
          week = [];
        }
        // console.log("week", week)
        // console.log("전체 day",day);
      }
      console.log("updateCurrentMonth: ", this.currentMonth);
      this.calendar = calendar;

    },

    //3. 이전 달, 다음 달 기준으로 넘기는 함수
    previousMonth() {
      this.currentMonth = this.getPreviousMonth(this.currentMonth);
      this.secondFunction(this.currentMonth);
    },
    nextMonth() {
      this.currentMonth = this.getNextMonth(this.currentMonth);
      this.secondFunction(this.currentMonth);
    },
    getPreviousMonth(month) {
      const [year, currentMonth] = month.split('-').map(Number);

      if (currentMonth === 1) {
        return `${year - 1}-12`;
      } else {
        if (currentMonth-1 < 10) {
          return `${year}-0${currentMonth - 1}`
        }
        return `${year}-${currentMonth - 1}`;
      }
      
    },
    getNextMonth(month) {
      const [year, currentMonth] = month.split('-').map(Number);
      if (currentMonth === 12) {
        return `${year + 1}-01`;
      } else {
        if (currentMonth+1 < 10) {
          return `${year}-0${currentMonth + 1}`;
        } else {
          return `${year}-${currentMonth + 1}`;
        }
      }
    },

    //5. 오늘 색상 변경
    isToday(currentMonth, day) {
      const [year, month] = currentMonth.split('-').map(Number);

      const today = new Date();
      const today_year = today.getFullYear();
      const today_month = today.getMonth();
      const today_day = today.getDate();

      if(year == today_year && month == today_month+1 && day == today_day) {
        return true;
      }
    },

    //생성
    async postMinutes() {
      axiosInstance
        .post(`/calendar-service/calendars/minutes/${this.teamId}`, this.postSetParams)
        .then((response) => {
          this.checkExist = false;
          if (response.data.message == "Success") {
            this.minutes = response.data.data;
            console.log("post success. minutes: ", this.minutes);
            this.getExistMinuteList(this.teamId, this.currentMonth);
            this.close();
            } 
        })
        .catch((e) => {
          console.log(e);
        });  
    },

    async postFunction() {
      console.log("postfunction")

      if (this.modalDisplay != "none" && (this.postSetParams.title != null && this.postSetParams.title.trim() != "") && (this.postSetParams.content != null && this.postSetParams.content.trim() != "")) {
        await this.postMinutes();
      }

      else if (this.modalDisplay != "none" && (this.postSetParams.title == null|| this.postSetParams.title.trim() == "") && (this.postSetParams.content == null || this.postSetParams.content.trim() == "")) {
        this.close();
      }
      else {
        this.inputModalDisplay = "flex";

      }
      
    },

    //조회
    async getMinutes() {
      try {
        const response = await axiosInstance.get( `/calendar-service/calendars/minutes/${this.teamId}/${this.targetDate}`);
        if (response.data.message === "Success") {
          this.minutes = response.data.data;
          console.log("getMinutes minutes: ", this.minutes);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async clickDate(currentMonth, date) {
      console.log("clickDate", date);

      const clickedDate = new Date(currentMonth);
      clickedDate.setDate(date);
      const formattedDate = clickedDate.toISOString().substring(0, 10);
      this.targetDate = formattedDate;
      await this.getMinutes();
      this.modalDisplay = "flex";
    },

    close() {
      this.modalDisplay = "none";
      this.minutes = null;
      this.targetDate = null;
      this.update = false;

      this.deleteModalDisplay = "none";
      this.title = null;
      this.content= null;
      this.onButton = false;
    },

    //수정
    async updateMinutes() {
      axiosInstance
        .patch(`/calendar-service/calendars/minutes/${this.teamId}`, this.updateSetParams)
        .then((response) => {
          this.checkExist = false;
          if (response.data.message == "Success") {
            this.minutes = response.data.data;
            console.log("update success. minutes:", this.minutes);
            this.close();
            this.isModified = false;
            this.getExistMinuteList(this.teamId, this.currentMonth);
            }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async updateFunction() {
      console.log("updateFunction");
      if (this.modalDisplay != "none" && (this.updateSetParams.title != null && this.updateSetParams.title.trim() != "") && (this.updateSetParams.content != null && this.updateSetParams.content.trim() != "") && this.isModified == true) {
        await this.updateMinutes();
      }
      else if (this.modalDisplay != "none" && this.updateSetParams.title != null && this.updateSetParams.content != null && this.isModified == false) {
        this.close();
      }
      else if (this.modalDisplay != "none" && (this.updateSetParams.title.trim() == "" || this.updateSetParams.title == null) && (this.updateSetParams.content.trim() == "" || this.updateSetParams.content == null)) {
        await this.deleteMinutes();
        this.getExistMinuteList(this.teamId, this.currentMonth);
      }
      else {
        this.inputModalDisplay = "flex";
      }
    },

    async deleteFunction() {
      await this.deleteMinutes();
    },

    //삭제
    async deleteMinutes() {
      this.deleteModalDisplay = "none";
      axiosInstance
        .delete(`/calendar-service/calendars/minutes/${this.teamId}/${this.targetDate}`)
        .then((response) => {
          this.checkExist = false;
          if (response.data.message == "Success") {
            this.close();
            this.getExistMinuteList(this.teamId, this.currentMonth);
            console.log("completely delete")
            } 
        })
        .catch((e) => {
            console.log(e);
          });
    },
    
    deleteClose() {
      
      this.deleteModalDisplay = "none";
    },

    deleteProjects() {
    console.log("modalDisplay: ", this.modalDisplay);
    axiosInstance
      .delete(`/calendar-service/dashboard/projects/${this.updateProjectId}`)
      .then((response) => {
      if (response.data.message == "Success") {
        this.close();
        console.log("Completely Delete");
      } 
      this.$router.go(0)  //실행된 후 처음 화면으로
      })
      .catch((e) => {
      console.log(e);
      });
    },

    deleteConfirm() {
      this.deleteModalDisplay = "flex";
    },

    //css
    resize(textarea) {
      textarea.style.height = "0.5px";
      textarea.style.height = textarea.scrollHeight + "px";
    },

    inputClose() {
      this.inputModalDisplay = "none";
    }
  }
}

    
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
}

.move{
  cursor: pointer;
}


.currentMonth {
  font-size: 25px;
  margin-right: 40px;
  margin-left: 40px;
  font-weight: 700;
}

.calendar {
  margin-top: 150px;
  text-align: center;
  font-family: Arial, sans-serif;
  margin-left: 70px;
  margin-right: 70px;

  min-width: 500px;
}

.calendar_header {
  display: flex;
  height: 30px;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
}


table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  width: 30px;
  height: 80px;
  margin-top: 30px;
}

td {
  text-align: center;
  vertical-align: top;
  padding-top: 25px;
}

.day {
  border-radius: 100%;
  border: none;
  background: white;
  font-size: 20px;
  width: 40px;
  height: 40px;

  cursor: pointer;
}

.day:hover {
  border-radius: 100%;
  background: #3772FF;
  color: white;
}


.notCurrentDay {
  border: none;
  border-radius: 100%;
  background: white;
  color: lightgrey;
  /* background-color: white; */
  font-size: 20px;
  width: 40px;
  height: 40px;
}

.today {
  font-size: 20px;
  border: none;
  border-radius: 100%;
  color: black;
  background-color: #e5e5e5;

  width: 40px;
  height: 40px;
  margin: 0 auto;

  cursor: pointer;
}

.today:hover {
  background-color: #3772FF;
  color: white;
}

.todayBtn {
  border: none;
  background: #FF7171;
}

.todayBtn:hover {
    background: orange;
}

#modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal_window {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 20;
  top: 0;
  margin: 0 auto;
  margin-top: 70px;

  background-color: white;
  width: 600px;
  height: 720px;
  padding: 20px;
  border-radius: 8px;
  overflow: auto;
}

/* Modal Content */
.date {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  
  margin-bottom: 5px;
  padding: 20px;
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
}

.title {
  text-align: left;
  font-weight: bold;
  font-size: 18px ;
  margin-top: 15px;
  /* padding-top: 5px; */
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  /* border: 1px solid skyblue;
  border-radius: 5px; */

  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(187, 187, 187);
  border: 1px solid black;

  /* white-space: pre-line;
  word-wrap: break-word; 
  overflow: auto; */
}

.fi fi-rr-trash {
  display: inline-block;
}

.content {
  text-align: left;
  font-size: 15px;

  white-space: pre-line;
  word-wrap: break-word; 
  overflow: auto;
}

.footer {
  padding-top: 8px; 
}
.dialog-footer {

  padding: 20px;
  text-align: right;
}

.el-button {
  margin-left: 10px;
}

.date1 {
  display: flex;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  
  margin-bottom: 5px;
  padding: 20px;
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;

}

.footer1 {
  padding-top: 10px; 
}

.dialog-footer1 {
  /* padding-top: 10px; */
  text-align: right;
}

.delete-modal-window {
    background-color: white;
    width: 300px;
    height: 100px;
    padding: 20px;
    padding-top: 30px;
    border-radius: 8px;
}

.delete-footer {
    margin-top: 15px;
}

textarea {
    outline: none;
    border: none;
    resize: none;
}

.title2 {
  text-align: left;

  height: 'auto';
  border-bottom: 1px solid grey;
  margin-right: 30px;
  margin-left: 30px;
}

.content2 {
  font-size: 15px;
  text-align: left;
  padding-left: 30px;
  padding-right: 30px;
  height: 'auto';
}

.scrollable-conainer {
  width: 300px;
  height: 200px;
  overflow: auto;
  border: 1px solid red;
  padding: 10px;
}

.container1 {
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽에 정렬되도록 설정 */
    align-items: center; /* 수직 가운데 정렬 */
    /* padding: 30px; 여백을 설정 (원하는 여백으로 조절) */
    width: 100%;
}

.targetDate {
    font-weight: bold;
    text-align: left;
}

.fi-rs-menu-dots-vertical {
  /* display: inline; */
  text-align: right;
  /* align-items: right;
  justify-content: right; */
}

.trashBtn {
  text-align: center;
  position: absolute;
  border-radius: 100%;
  background-color: #ffebeb;
  color: #e53535;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  line-height: 42px;

  top: 35px;
  left: -9px;
  cursor: pointer;
}

.trashBtn i {
  margin: 0 auto;
  line-height: 42px;
  font-size: 18px;
}

.trashBtn:hover {
  background-color: #e53535;
  color: white;
}

.icons {
  position: relative;
  height: 20px;
  /* display: flex; */
}

.danger,
.document {
  margin: 5px;
  margin-bottom: 5px;
  border: none;
  border-radius: 20px;
  width: 110px;
  height: 40px;
}

.danger {
  color:#ffebeb;
  background-color: #e53535;
}

.danger:hover {
  color:  #ffebeb;
  background: #b42929;
  cursor: pointer;
}

.document {
  color:white;
  background-color: #a5a5a5;
}

.document:hover {
  color: white;
  background-color: #777777;
  cursor: pointer;
}
.dot {
  /* padding-top: 20px; */
  font-size: 1px;
  color: #ff3f3f;
}

.inputTitle {
  font-size: 20px;
  font-weight: 700;
}

.black-bg{
  z-index: 15;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.3);
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
}

.white-bg{
  position: fixed;
  left: 0;
  right: 0;
  z-index: 20;
  width: 45em; background: white;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 65px;
  margin: 0 auto;
  margin-top: 4em;
  height: 40em;
  overflow: scroll;
}
</style>
