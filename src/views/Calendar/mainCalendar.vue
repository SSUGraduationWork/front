<template>
  <div class="calendar">
    <div class="calendar_header">
      <button class="btn" @click="previousMonth()">Previous</button>
      <h2>{{ currentMonth }}</h2>
      <button class="btn" @click="nextMonth()">Next</button>
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
  <div id="modal" class="modal-overlay" :style="{display:modalDisplay}">
    <div class="modal_window">

      <!--이미 회의록 존재할 경우: getMinutes()-->    
      <div v-if="minutes !== null && update == false"> 
        <div class="date">{{targetDate}}</div>
        <div class="title">{{minutes.title}}</div>
        <div class="content">
          <p>{{minutes.content}}</p>
        </div>
        <div>
          <span class="dialog-footer">
            <el-button type="primary" @click="update=true">수정</el-button>
            <el-button @click="close()">취소</el-button>
            <el-button type="danger" @click="deleteMinutes()">삭제</el-button>
          </span>
        </div>
      </div>
      <!--존재하지 않을 경우-->
      <!--회의록이 아직 존재하지 않을 경우: postMinutes()-->

      <div v-if="minutes == null">
        <div class="date">{{targetDate}}</div>
        <el-input placeholder="제목을 입력해 주세요" v-model="title"></el-input>

        <el-input
            style="margin-top:30px;"
            type="textarea"
            :rows="20"
            placeholder="내용을 입력해 주세요."
            v-model="content"
          >
        </el-input>
            <!-- dialog footer 영역 -->
            <!-- <template v-slot:footer> -->
        <div><!--2-->
          <span class="dialog-footer">
            <el-button type="primary" @click="postMinutes()">생성</el-button>
            <el-button @click="close()">취소</el-button>
          </span>
        </div><!--2 지우기-->          
      </div>

        <!--회의록 수정하는 경우: updateMinutes()-->
      <div v-if="update == true">
        <div class="date">{{targetDate}}</div>
        <el-input v-model="minutes.title" class="title"></el-input>
        <el-input
            style="margin-top:30px;"
            type="textarea"
            :rows="20"
            v-model="minutes.content"
            class="content"
        >
        </el-input>
        <div>
          <span class="dialog-footer">
            <el-button type="primary" @click="updateFunction()">수정</el-button>
            <el-button @click="close()">취소</el-button>
          </span>         
        </div>

      
      </div>      
    </div>
  </div>

  </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3210";

export default {
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
      teamId: 28,

      //회의록 수정
      update: false,
      //모달
      modalDisplay: "none"
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
      axios
        .post(url + '/calendars/minutes', this.postSetParams)
        .then((response) => {
          if (response.data.message == "Success") {
            this.minutes = response.data.data;
            console.log("postMinutes minuste", this.minutes)
            } 
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //조회
    async getMinutes() {
      try {
        const response = await axios.get(url + `/calendars/minutes/28/` + this.targetDate + `/7`);
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
      axios
        .delete(url + `/calendars/minutes/28/7/` + this.targetDate)
        .then((response) => {
          if (response.data.message == "Success") {
            this.close();
            } 
        })
        .catch((e) => {
            console.log(e);
          });
    }
  }
}

    
</script>

<style>
.prev-or-next-month {
  color: grey;
}

.calendar {
  margin-top: 150px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.calendar_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
}

.day {
  border: None;
  border-radius: 50px;
}

.day:hover {
  box-shadow: 20px 20px 20px 20px darkgrey inset;
  color: white;
}

.notCurrentDay {
  border: None;
  border-radius: 50px;
  color: grey;
  background-color: white;
}

.today {
  border: None;
  border-radius: 50px;
  color: white;
  background-color: red;
}

.today:hover {
  background: darkgray;
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
  background-color: white;
  width: 40%;
  height: 80%;
  padding: 20px;
  border-radius: 8px;
}

/* Modal Content */
.date {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  padding: 20px;
}

.title {
  text-align: left;
  font-size: 20px;
  height: 35px;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  border: 1px solid grey;
  border-radius: 10px;

  white-space: pre-line;
  word-wrap: break-word; 
  overflow: auto;
}

.content {
  text-align: left;
  font-size: 18px;
  height: 550px;
  margin-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border: 1px solid grey;
  border-radius: 10px;

  white-space: pre-line;
  word-wrap: break-word; 
  overflow: auto;
}

.dialog-footer {
  margin-top: 20px;
  padding: 20px;
  text-align: right;
}

/* Button Styles */
.el-button {
  margin-left: 10px;
}

</style>
