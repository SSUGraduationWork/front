<template>
  <div class="calendar">
    <div class="calendar_header">
      <!-- <el-button class="btn" icon="fi fi-rr-angle-left" @click="previousMonth()"></el-button> -->
      <i class="fi fi-bs-angle-left" @click="previousMonth()"></i>
      <div class="currentMonth">{{currentMonth}}</div>
      <i class="fi fi-bs-angle-right" @click="nextMonth()"></i>
      <!-- <el-button class="btn" icon="fi fi-rr-angle-right" @click="nextMonth()"></el-button> -->
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in calendar" :key="week">
          <td v-for="date in week" :key="date">
            <button v-if="date.classes !== 'notCurrentMonth' && !isToday(currentMonth, date.day)" @click="clickDate(currentMonth, date.day)" class="day">{{ date.day }}</button>
            <button v-if="date.classes == 'notCurrentMonth'" class="notCurrentDay">{{ date.day }}</button>
            <button v-if="isToday(currentMonth, date.day)" @click="clickDate(currentMonth, date.day)" class="today">{{date.day}}</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!--모달-->
    <!--v-click 추가!!!!!!!!1-->
  <div id="modal" class="modal-overlay" :style="{display:modalDisplay}">
    <div class="modal_window" v-click-outside="hello">

      <!--이미 회의록 존재할 경우: getMinutes()-->    
      <div v-if="minutes !== null && update == false"> 
        <container class="date1">{{targetDate}}
          <i class="fi fi-rr-trash" @click="deleteConfirm()"></i>
        </container>
        <div class="title2">
          <textarea type="textarea" @input="resize($event.target)" placeholder="제목을 입력해 주세요" 
          v-model="minutes.title" wrap="soft" style="min-height: 1.2em; width: 100%; height: 'auto'; line-height: 1;"
          ></textarea></div>
        <div class="content2">
          <textarea 
            @input="resize($event.target)"
              style="margin-top:10px; width: 100%; height: 'auto'"
              type="textarea"
              placeholder="내용을 입력해 주세요."
              v-model="minutes.content"
            ></textarea>
        </div>
        <div class="footer1">
          <span class="dialog-footer1">
            <el-button type="primary" @click="updateMinutes()">수정</el-button>
            <el-button @click="close()">취소</el-button>
            <!-- <el-button type="danger" @click="deleteConfirm()">삭제</el-button> -->
          </span>
        </div>
      </div>

      <!--존재하지 않을 경우-->
      <!--회의록이 아직 존재하지 않을 경우: postMinutes()-->

      <div v-if="minutes == null">
        <div class="date1">{{targetDate}}</div>
        <div class="title2">
          <textarea type="textarea" @input="resize($event.target)" placeholder="제목을 입력해 주세요" 
          v-model="title" wrap="soft" style="min-height: 1.2em; width: 100%; height: 'auto'; line-height: 1;"
          ></textarea>
        </div>
        <div class="content2">
          <textarea
            @input="resize($event.target)"
              style="margin-top:10px; width: 100%; height: 'auto'"
              type="textarea"
              placeholder="내용을 입력해 주세요."
              v-model="content"
            ></textarea>
        </div>
              <!-- dialog footer 영역 -->
              <!-- <template v-slot:footer> -->
          <div class="footer1"><!--2-->
            <span class="dialog-footer1">
              <el-button type="primary" @click="postMinutes()">생성</el-button>
              <el-button @click="close()">취소</el-button>
            </span>
          </div><!--2 지우기-->          
        </div>


        <!--회의록 수정하는 경우: updateMinutes()-->

      <!-- <div v-if="update == true">
        <div class="update">
          <div class="date1">{{targetDate}}</div>
          <el-input v-model="minutes.title" class="title1" style="height: 40px;"></el-input>
          <el-input
              style="margin-top:10px;"
              type="textarea"
              :rows="22"
              v-model="minutes.content"
              class="content1"
          >
          </el-input>
          <div class="footer1">
            <span class="dialog-footer1">
              <el-button type="primary" @click="updateFunction()">수정</el-button>
              <el-button @click="close()">취소</el-button>
            </span>         
          </div>
        </div>
    </div> -->
              <!--delete 확인-->
  <div id="modal" class="deleteModal" :style="{display:deleteModalDisplay}">
    <div class="delete-modal-window">
        <div>해당 회의록 삭제 후에는 다시 복구할 수 없습니다.</div>
          <div class="delete-footer">
              <el-button type="danger" @click="deleteMinutes()">삭제</el-button>
              <el-button type="primary" @click="deleteClose()">취소</el-button>
            </div>
        </div>
      </div>      
    </div>
  </div>

  </div>
</template>

<script>
import axios from "axios";
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
      userId: 7,
      teamId: this.$route.params.teamId,

      //회의록 수정
      update: false,
      //모달
      modalDisplay: "none",
      //회의록 삭제 경고창
      deleteModalDisplay: "none"

      //css
    

    };
  },

  //회의록 생성
  computed: {
    postSetParams() {
      const params = {
        teamId: this.teamId,
        userId: this.userId,
        date: this.targetDate,
        title: this.title,
        content: this.content,           
      }
      console.log("params: ",params)
      return params;      
    },

    updateSetParams() {
      const params = {
        teamId: this.teamId,
        userId: this.userId,
        date: this.targetDate,
        title: this.minutes.title,
        content: this.minutes.content,           
      }
      console.log("params: ",params)
      return params;
    }
  },

  mounted() {
    this.updateCalendar();
  },

  methods: {
    hello() {
      console.log("hihi");
    },

    //1. 현재 년/월을 기준으로 달력 데이터를 업데이트
    updateCalendar() {
      const currentDate = new Date();
      //현재 year, month, daysInMonth(한달일수)
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();   
      this.daysInMonth = daysInMonth;

      this.currentMonth = `${year}-${month + 1}`;
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
        //이전달 다음달의 날짜 구분 X 경우
        // week.push(day.getDate());
        // if (week.length === 7) {
        //   calendar.push(week);
        //   week = [];
        // }        
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
        console.log("week", week)
        // console.log("전체 day",day);
      }
      this.calendar = calendar;

    },

    //3. 이전 달, 다음 달 기준으로 넘기는 함수
    previousMonth() {
      this.currentMonth = this.getPreviousMonth(this.currentMonth);
      this.updateCalendarWithCustomMonth(this.currentMonth);
    },
    nextMonth() {
      this.currentMonth = this.getNextMonth(this.currentMonth);
      this.updateCalendarWithCustomMonth(this.currentMonth);
    },
    getPreviousMonth(month) {
      const [year, currentMonth] = month.split('-').map(Number);
      return currentMonth === 1 ? `${year - 1}-12` : `${year}-${currentMonth - 1}`;
    },
    getNextMonth(month) {
      const [year, currentMonth] = month.split('-').map(Number);
      return currentMonth === 12 ? `${year + 1}-1` : `${year}-${currentMonth + 1}`;
    },

    //4. 이전달, 다음달 색상 변경
    // isPrevOrNextMonth(calendar, week, date) {
    //   for (week in calendar) {
    //     console.log("week",week,"date", date);
    //   }
    // },

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
    postMinutes() {
      console.log("postSetParams: ", this.postSetParams)
      axios
        .post(url + '/calendars/minutes', this.postSetParams)
        .then((response) => {
          if (response.data.message == "Success") {
            this.minutes = response.data.data;
            console.log("postMinutes minute", this.minutes)
            } 
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //조회
    async getMinutes() {
      try {
        const response = await axios.get(url + `/calendars/minutes/${this.teamId}/${this.targetDate}/${this.userId}`);
        console.log("teamId:", this.teamId,"targetDate:",this.targetDate,"userId: ",this.userId);
        if (response.data.message === "Success") {
          this.minutes = response.data.data;
          console.log("getMinutes minutes: ", this.minutes);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async clickDate(currentMonth, date) {
      console.log("clickDate");

      const clickedDate = new Date(currentMonth);
      clickedDate.setDate(date + 1);
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

      this.title = null;
      this.content= null;
    },
    //수정
    async updateMinutes() {
      axios
        .patch(url + '/calendars/minutes', this.updateSetParams)
        .then((response) => {
          if (response.data.message == "Success") {
            this.minutes = response.data.data;
            console.log("update minuste", this.minutes)
            } 
        })
        .catch((e) => {
          console.log(e);
        });

    },

    async updateFunction() {
      await this.updateMinutes();

      this.update = false;
    },

    //삭제
    deleteMinutes() {
      this.deleteModalDisplay = "none";
      console.log(this.teamId, this.userId, this.targetDate);
      axios
        .delete(url + `/calendars/minutes/${this.teamId}/${this.userId}/${this.targetDate}`)
        .then((response) => {
          if (response.data.message == "Success") {
            this.close();
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
    axios
      .delete(url + `/dashboard/projects/${this.updateProjectId}`)
      .then((response) => {
      if (response.data.message == "Success") {
        console.log("Completely Delete");
      } 
      this.$router.go(0)  //실행된 후 처음 화면으로
      })
      .catch((e) => {
      console.log(e);
      });
    },

    deleteConfirm() {
      console.log("deleteConfirm");
      this.deleteModalDisplay = "flex";
    },

    //css
    resize(textarea) {
      textarea.style.height = "0.5px";
      textarea.style.height = textarea.scrollHeight + "px";
    },


  }
}

    
</script>

<style scoped>
.currentMonth {
  font-size: 25px;
  margin-right: 40px;
  margin-left: 40px;
}

.calendar {
  margin-top: 150px;
  text-align: center;
  font-family: Arial, sans-serif;
  margin-left: 70px;
  margin-right: 70px;
}

.calendar_header {
  display: flex;
  height: 30px;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  text-align: center;
  padding-bottom: 10px;
}


table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  width: 30px;
  height: 80px;
}

.day {
  border: none;
  background: white;
  border-radius: 50px;
  font-size: 20px;
}

.day:hover {
  border: 2px solid orange;
}


.notCurrentDay {
  border: None;
  border-radius: 50px;
  background: white;
  color: lightgrey;
  /* background-color: white; */
  font-size: 20px;
}

.today {
  border: None;
  border-radius: 50px;
  color: white;
  background-color: red;
  font-size: 20px;
}

.today:hover {
  background-color: orange;
  color: white;
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
  margin: 50px;
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
    margin-top: 20px;
}

textarea {
    outline: none;
    border: none;
    resize: none;
}

.title2 {
  font-size: 15px;
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


</style>
