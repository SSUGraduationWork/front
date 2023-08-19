<template>
    <div v-if ="workDetail" class="black-bg">
        <div class = "white-bg">
            <div class="header">
                <h2>{{workDetail.work_name}}</h2>
                <div class="close-icon" @click="$emit('closeDetail')"><i class="fi fi-sr-cross"></i></div>
            </div>
            <div class = "content">
                <div class = "options option-status">
                    <div class = "icon"><i class="fi fi-rr-loading"></i></div>
                    <div class = "option-name">상태</div>
                    <div class = "status" :style="{background: statusColor[statuses[workDetail.status-1].code], color: statusTextColor[statuses[workDetail.status-1].code]}">
                        {{ statuses[workDetail.status-1].name }}
                    </div>
                </div>
                <div class = "options option-worker">
                    <div class= "icon"><i class="fi fi-sr-users"></i></div>
                    <div class = "option-name">담당자</div>
                    <div class = "workers">
                        <div v-for="(id, idx) in workers" :key="idx" class="worker">
                            <img class = "user-img" :src="teamMembers[id].picture_url" />
                            <span class = "user-name">{{ teamMembers[id].user_name }}</span>
                        </div>
                    </div>
                </div>
                <div class = "options option-end-date">
                    <div class = "icon"><i class="fi fi-br-time-past"></i></div>
                    <div class = "option-name">마감일</div>
                    <div v-if="workDetail.end_date != null" class = "end-date">
                        <span class = "ymd">{{dateFormat.year}}년 {{dateFormat.month}}월 {{dateFormat.day}}일 </span>
                        <span v-if="ampm" class = "hm">오전 {{dateFormat.hour}}시 {{dateFormat.minute}}분</span>
                        <span v-else class = "hm">오후 {{dateFormat.hour}}시 {{dateFormat.minute}}분</span>
                    </div>
                </div>
                <div class = "options">
                    <div class="icon"><i class="fa fa-star"></i></div>
                    <div class = "option-name">중요도</div>
                    <div class = "importance">
                        <Rating v-model="importance" :cancel=false readonly />
                    </div>
                </div>
                <div class="line"></div>
                <div class = "options">
                    <div class="icon"><i class="fi fi-br-clip"></i></div>
                    <div class = "option-name">게시글</div>
                </div>
                <div class = "board">
                    <div v-for="(post, i) in board" :key="i" class = "posts">
                        <i class="fi fi-sr-document"></i>
                        <span class="title">{{ post.title }}</span>
                        <span class="uploaded-by">uploaded by</span>
                        <img class = "profile-img" :src="teamMembers[post.user_id].picture_url" />
                        <span class="poster">{{ teamMembers[post.user_id].user_name }}</span>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, computed, onBeforeMount } from 'vue';
import axios from 'axios';

const props = defineProps({
    workId : {
        type: Number,
        default: 0
    },
    teamMembers : {
        type: Object,
        default: {}
    },
})
const workDetail = ref();
let workers = [];
let date = ref();
const board = ref();
const importance = ref();

if (props.workId > 0) {
    axios.get(`http://localhost:3000/work/detail/${props.workId}`)
    .then((res) => {
        workDetail.value = res.data.result;
        if(workDetail.value.worker){
            workers = ref(workDetail.value.worker.split(';'));
        }
        date.value = new Date(workDetail.value.end_date);
        board.value = res.data.result.boards;
        importance.value = workDetail.value.importance;
    })
}
const statuses = ref([
    { name: '시작 전', code: 1 },
    { name: '진행 중', code: 2 },
    { name: '피드백 중', code: 3 },
    { name: '완료', code: 4 },
]);
const statusColor = ['#DFDFDF', '#DFDFDF', '#5D96DA', '#FF7171', '#99CC8C'];
const statusTextColor = ['black', 'black', 'white', 'white', 'white'];

const dateFormat = {
    year: "",
    month: "",
    day: "",
    hour: "",
    minute : ""
}
let ampm = 0;
ampm = computed(() => 12 <= date.value.getHours() ? 0 : 1) //오후이면 0, 오전이면 1

dateFormat.year = computed(() => date.value.getFullYear());
dateFormat.month = computed(() => date.value.getMonth() + 1);
dateFormat.day = computed(() => date.value.getDate());
dateFormat.hour = computed(() => date.value.getHours());
dateFormat.minute = computed(() => date.value.getMinutes());
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
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
  padding: 60px;
  margin: 0 auto;
  margin-top: 4em;
  height: 40em;
  overflow: scroll;
}
.header{
    height: 80px;
    margin-bottom: 10px;
}
.header h2{
    float: left;
    margin-top: 4px;
}
.close-icon{
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    line-height: 40px;
    font-size: 15px;
    float: right;

}
.close-icon:hover{
    background-color:#F5F6FA;
}
img{
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 70%;
    overflow: hidden;
    background : #F5F6FA; 
}
.options{
    min-height: 30px;
    margin-bottom:20px;
    overflow: auto;
    font-size: 15px;
}
.icon, .option-name{
    color:  #2F3545;
    float: left;
}
.option-name{
    font-weight: 600;
}
.icon{
    margin-left: 5px;
    text-align: left;
    width: 50px;
}
.option-name{
    text-align: left;
    width: 50px;
    margin-left: 10px;
}
.option-status .icon{
    margin-top: 10px;
}
.option-status{
    margin-bottom: 25px;
}
.option-status .option-name{
    margin-top: 8px;
}
.option-worker .option-name{
    margin-top: 5px;
}
.option-worker .icon{
    margin-top: 7px;
}
.option-end-date .icon{
    margin-top: 2px;
}
.status, .importance, .workers, .end-date{
    margin-left: 60px;
    float: left;
}
.importance{
    margin-top: 2px;
}
.status{
    min-width: 110px;
    border-radius: 20px;
    height: 38px;
    width: 25%;
    line-height: 37px;
    font-weight: 600;
}
.workers{
    display: inline-block;
    min-height: 60px;
    width: 70%;
}
.worker{
    float: left;
    height: 40px;
    width: 200px;
}
.user-name{
    float: left;
    margin-top: 5px;
    margin-left: 20px;
}
.line{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
    border-bottom: 0.1px solid #BABABA;
}
.posts{
    cursor: pointer;
    width: 100%;
    height: 70px;
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    margin-bottom: 15px;
    line-height: 70px;
    transition: all 0.5s;
}
.posts:hover{
    margin-top: -2px;
    margin-left: 0px;
    transform: scale(1.1,1.1);
    -ms-transform: scale(1.1,1.1);
    -webkit-transform: scale(1.1,1.1);
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
}
.fi-sr-document, .title, .uploaded-by, .profile-img, .poster{
    float: left;
    margin-left: 30px;
    font-size: 15px;
}
.title{
    width: 15em;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.uploaded-by{
    font-size: 13px;
    color: #BABABA;
}
.profile-img{
    margin-left: 20px;
    margin-top: 20px;
}
.poster{
    margin-left: 10px;
}
.fi-sr-document{
    margin-top: 2px;
    color: #3772FF;
}

</style>