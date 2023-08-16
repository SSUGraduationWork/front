<template>
  <div class = "work">
    <table>
      <thead class = "work-info">
        <tr>
          <th v-for = "(opt,i) in options" :key = "i">{{opt}}</th>
        </tr>
      </thead>
      <div class = "margin-space">
      </div>
      <tbody>
        <tr v-for="(work, i) in workInfo" :key="i" :id = "work.work_id">
          <td class = "work-name">
            <textarea v-model="work.work_name" @input="resize($event.target)" v-on:change="textChange(work.work_id, $event.target.value)" class="work-name-input">{{ work.work_name }}</textarea>
          </td>
          <td class = "team-members">
            <MultiSelect v-if="membersById !== null" :teamMembers="membersById" :workers="work.worker" :workId = "work.work_id"></MultiSelect>
          </td>
          <td class = "end-date">
            <DatePicker :date="work.end_date" :workId = "work.work_id"></DatePicker>
          </td>
          <td class = "importance">
            <Rating :importance="work.importance" :workId = "work.work_id"></Rating>
          </td>
          <td class = "status">
            <StatusDropdown :status="work.status" :workId = "work.work_id"></StatusDropdown>
          </td>
          <td class = "more">
            <i class="fi fi-rr-menu-dots-vertical"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from './DatePicker';
import MultiSelect from './MultiSelect';
import StatusDropdown from './StatusDropdown';
import textareaAutosize from 'vue-textarea-autosize';
import Rating from './Rating';

import {ref, onBeforeMount, onMounted} from 'vue';
import {useRouter, useRoute} from 'vue-router'

export default {
  components: { DatePicker, MultiSelect, StatusDropdown, Rating, textareaAutosize },
  
  setup() {
    const route = useRoute()
    const router = useRouter()
    const teamMembers = ref();
    const workInfo = ref();
    const membersById = {};  // key : user_id, val : 유저 정보 (유저 pk, 이름, 프로필 사진 url)
    
    onBeforeMount(async () => {
        await router.isReady();
        const {teamId} = route.params;

        axios.get(`http://localhost:3000/work/${teamId}`)
        .then((res) => {
            teamMembers.value = res.data.result.teamMembers;
            workInfo.value = res.data.result.works;

            //user_id 와 유저 정보 연결
            (teamMembers.value).forEach((val, i, arr) => {
              membersById[val.user_id] = val;
            })
        })
    })
    return { workInfo, teamMembers, membersById }
    
  },
  data() {
    return {
      options : ["작업명", "담당자", "마감일", "중요도", "상태"],
    }
  },
  methods : {
    resize(textarea) {
      textarea.style.height = "0.5px";
      textarea.style.height = textarea.scrollHeight + "px";
    },
    textChange(workId, value){
      console.log(value);
      axios.patch(`http://localhost:3000/work/${workId}/work_name`, {work_name : value})
        .then((res) => {
            console.log(res);
        })
    }
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
}
.work{
  margin-top: 5em;
}
table {
  margin : auto;
  width: 90%;
  border-collapse: separate;
  border-spacing: 0 13px;
}
td{
  width: 17%;
}
td:hover{
  background-color: #F5F6FA;
}
tbody tr{
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  border-radius : 15px;
}
.work-name-input{
  height: 23px;
  margin-top: 13.2px;
  text-align: center;
  border: none;
  background-color: transparent;
  resize: none;
  font-weight: 400;
  font-size: 15px;
  line-height: 120%;
}
.work-name-input:focus{
  outline: none;
}
.margin-space{
  margin: 5px;
}
.more{
  cursor: pointer;
  width: 5%;
  font-size: 13px;
  min-width: 30px;
}
th{
  position: sticky;
}

</style>
<style global>
.team-members:hover .p-multiselect-trigger {
  color: #8F8F8F;
}
</style>
