<template>
    <VueDatePicker v-model="date" :format-locale="ko" :min-date="new Date()" @update:model-value="change" time-picker-inline>
        <template #trigger>
            <div v-if= "isNull == 0" class = "end-date">
                <p class = "ymd">{{dateFormat.year}}년 {{dateFormat.month}}월 {{dateFormat.day}}일</p>
                <p v-if="ampm" class = "hm">오전 {{dateFormat.hour}}시 {{dateFormat.minute}}분</p>
                <p v-else class = "hm">오후 {{dateFormat.hour}}시 {{dateFormat.minute}}분</p>
            </div>
            <div v-else class = "end-date">
                <input disabled>
            </div>
        </template>
    </VueDatePicker>
</template>

<script setup>
import '@vuepic/vue-datepicker/dist/main.css';
import dayjs from 'dayjs';
import axios from 'axios';
import { ref, computed, defineProps } from 'vue';
import { ko } from 'date-fns/locale';

const props = defineProps({
    date : String,
    workId : {
        type: Number,
        default: 0
    }
})
let isNull = 0;
if (props.date == null) {
    isNull = 1
}

const date = ref(new Date(props.date));
const dateFormat = {
    year: "",
    month: "",
    day: "",
    hour: "",
    minute : ""
}
let ampm = 0;
ampm = computed(() => 12 <= date.value.getHours() ? 0 : 1) //오후이면 0, 오전이면 1

isNull = computed(() => date.value.getFullYear() > 1970 ? 0 : 1);

dateFormat.year = computed(() => date.value.getFullYear());
dateFormat.month = computed(() => date.value.getMonth() + 1);
dateFormat.day = computed(() => date.value.getDate());
dateFormat.hour = computed(() => date.value.getHours());
dateFormat.minute = computed(() => date.value.getMinutes());

const change = () => {
    axios.patch(`http://localhost:3000/work/${props.workId}/end_date`, {end_date: dayjs(date.value).format('YYYY-MM-DD HH:mm:ss')})
        .then((res) => {
            console.log(res);
        })

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');

:root {
    --dp-font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    --dp-cell-padding: 10px; /*Padding in the cell*/
}
html, body, table, td, div{
  height: 100%;
}

.hm{
    margin-top: 0px;
}
.ymd{
    margin-bottom: 0px;
}

p{
    line-height: 120%;
    font-size : 15px;
    cursor: pointer;
}

.end-date input{
    cursor: pointer;
    background-color: transparent;
    min-height: 64px;
    border: none;
}
.end-date{
    width: 100%;
    min-width: 110px;
}
</style>