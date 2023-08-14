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
        <tr>
          <td>
            <textarea ref = "textArea" @input="resize" class = "work-name-input">로그인 구현</textarea>
          </td>
          <td>
            <MultiSelect></MultiSelect>
          </td>
          <td>
            <DatePicker :date = "date" id = "end-date"></DatePicker>
          </td>
          <td>
            <div class = "importance">
            </div>
          </td>
          <td>
            <div class = "status">

            </div>
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
import {ref, onBeforeMount} from 'vue';
import {useRouter, useRoute} from 'vue-router'

export default {
  props: ['teamId'],
  components: { DatePicker, MultiSelect },
  
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const workInfo = ref({});

    onBeforeMount(async () => {
        await router.isReady();
        const {teamId} = route.params;

        axios.get(`http://localhost:3000/work/${teamId}`)
        .then((res) => {
            workInfo.value = {...res.data.result};
            console.log(workInfo);
        })
    })
    return { workInfo }
    
  },
  data() {
    return {
      options : ["작업명", "담당자", "마감일", "중요도", "상태"],
      date : "",
    }
  },
  methods : {
    resize() {
      this.$refs.textArea.style.height = "0.5px";
      this.$refs.textArea.style.height = this.$refs.textArea.scrollHeight + "px";
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
  margin-top: 6em;
}
table {
  margin : auto;
  border-spacing: 0px;
  border-collapse: collapse;
  width: 90%;
}
td{
  width: 17%;
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
  margin: 20px;
}
.more{
  cursor: pointer;
  width: 5%;
  font-size: 13px;
}
th{
  position: sticky;
}
</style>
