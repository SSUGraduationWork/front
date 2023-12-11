<template>
    <div class="progress">
        <div class = "content">
            <span class = "title">전체 작업 </span>
            <div class = "circle circle-all"><span>{{ progress.totalWorks }}</span></div>
        </div>    
        <div class = "content">
            <span class = "title">진행 중 </span>
            <div class = "circle circle-inprogress"><span>{{ progress.inProgress }}</span></div>
        </div>
        <div class = "content">
            <span class = "title">완료 </span>
            <div class = "circle circle-done"><span>{{ progress.done }}</span></div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    progress : {
        type: Object,
        default: {"totalWorks": 0, "notStarted": 0, "inProgress": 0, "done": 0}
    },
})

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
  font-size:15px;
}
.progress{
    display: flex;
    width: 80%;
    height: 90px;
    margin: 0 auto;
}
.content{
    display: flex;
    border-radius : 12px;
    margin: 0 auto;
    background: #F5F6FA;
    margin-right: 10px;
    margin-left: 10px;
    display: inline;
    width : 33.3333%;
    height: 90px;
    min-width: 18em;
}
.title{
    float: left;
    margin-left: 50px;
    line-height: 90px;
    text-align: center;
    color: #2F3545;
    font-size: 17px;
    font-weight: 700;
}
.circle{
    float: right;
    margin-right: 40px;
    border-radius: 30px;
    width: 60px;
    height: 60px;
    margin-top: 15px;
    background-color: #3772FF;
    color: white;
    font-weight: 700;
    box-shadow: 0 19px 38px rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.08);
}
.circle span{
    line-height: 60px;
    font-size: 20px;
}
i{
    margin-left: 20px;
}
.circle-all{
    background-color: #5D96DA;
}
.circle-inprogress{
    background-color: #5D96DA;
}
.circle-done{
    background-color: #5D96DA;
}
</style>