<template>
    <div class = "all">
        <MultiSelect v-model="selectedMembers" :options="teamMembers" filter optionLabel="user_name" display="comma" closeIcon = "false" 
        v-on:before-show="reset" v-on:before-hide = "lastStatus" v-on:update:model-value="change" emptyFilterMessage=" " class="multi-select">
            <template #value>
                <div>
                    <div v-if="selectedMembers && selectedMembers.length >= 2 && status == 1" class = "multi-value">
                        {{selectedMembers.length}}명이 선택되었습니다.
                    </div>
                    <div v-else-if="selectedMembers && selectedMembers.length == 1 && status == 1">
                        <div v-for="(a,i) in selectedMembers" :key="i" class = "values">
                            <img class = "user-img" :src="a.picture_url" />
                            <span class = "user-name">{{ a.user_name }}</span>
                        </div>
                    </div>
                    <div v-else-if="status==1" class = "values"></div>
                    <div v-if="status == -1">
                        <div v-for="(a,i) in selectedMembers" :key="i" class = "values">
                            <img class = "user-img" :src="a.picture_url" />
                            <span class = "user-name">{{ a.user_name }}</span>
                        </div>
                    </div>
                </div>
            </template>
            <template #filtericon>
                <div class = "filter-icon">
                    <i class="fi fi-rr-search"></i>
                </div>
            </template>
            <template #option="slotProps">
                <div class="options">
                    <img class = "option-img" :src="slotProps.option.picture_url" />
                    <div class = "option-name">{{ slotProps.option.user_name }}</div>
                </div>
            </template>
            <template #empty>
                <p></p>
            </template>
        </MultiSelect>
    </div>
</template>

<script setup>
import "primevue/resources/primevue.min.css"; //core CSS
import axios from 'axios';
import { ref, defineProps } from "vue";
import MultiSelect from 'primevue/multiselect';

const props = defineProps({
    teamMembers : {
        type: Object,
        default: {}
    },
    workers : {
        type: String,
        default: null
    },
    workId : {
        type: Number,
        default: 0
    },
});
const teamMembers = Object.values(props.teamMembers);
let workers = []

const selectedMembers = ref([]);

if (props.workers !== null){
    workers = props.workers.split(";");
    for (let id of workers){
        selectedMembers.value.push(props.teamMembers[id]);
    }   
}

let status = -1;
let isChange = false;
const changeValue = [];

const reset = () => {
    console.log("hi")
    status = 1;
}
let lastStatus = () => {
    if (isChange == true) {
        for (let userInfo of selectedMembers.value){
            changeValue.push(userInfo.user_id);
        }
        axios.patch(`http://localhost:3000/work/${props.workId}/worker`, {worker : changeValue})
        .then((res) => {
            console.log(res);
        })
    }
    status = -1;
    isChange = false;
}
const change = () => {
    isChange = true;
}



</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
* {
    --dp-font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    font-size: 15px;
}

img{
    width: 30px;
    height: 30px;
    border-radius: 70%;
    overflow: hidden;
    background : #F5F6FA; 
}
.p-multiselect{
    padding: 10px;
    min-width: 180px;
}
.values{
    min-width: 180px;
    height: 40px;
    padding: 2px;
}
.options{
    width: 100%;
    height: 40px;
}
.option-img{
    float: left;
    margin-top: 5px;
    margin-left: 15px;
}
.option-name{
    float: left;
    margin-top: 11px;
    margin-left: 15px;
}
.user-name{
    float:left;
    margin-left: 14px;
    margin-top: 6px;
}
.user-img{
    float:left;
    margin-left: 14px;
    margin-top: 2px;
}
.filter-icon{
    cursor: pointer;
    margin-left: 2px;
    height: 30px;
    width: 35px;
    border-radius: 5px;;
    display: flex;
    background-color: rgb(62, 62, 62);
}
.filter-icon i{
    color: white;
   justify-content: center;
   margin-top: 8px;
   margin-left: 7px;
   font-size: 13px;
}
</style>
