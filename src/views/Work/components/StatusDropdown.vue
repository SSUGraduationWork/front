<template>
    <div class="card flex justify-content-center">
        <Dropdown v-model="selectedStatus" :options="statuses" optionLabel="name" v-on:change="change" class="w-full md:w-14rem" dropdownIcon=" ">
            <template #value>
                <div v-if="selectedStatus && selectedStatus.code != 1" class = "current-status" :style="{background: statusColor[selectedStatus.code]}">
                    <div class="current-status-name">{{ selectedStatus.name }}</div>
                </div>
                <div v-else class = "not-started">
                    <div class="not-started-name">시작 전</div>
                </div>
            </template>
            <template #option="slotProps">
                <div class="options">
                    <div class = "status">
                        <i class="fas fa-tag" :style="{color: statusColor[slotProps.option.code]}"></i>
                        <div class = "status-name">{{ slotProps.option.name }}</div>
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>

<script setup>
import { axiosInstance } from "../../../axios";
import { ref } from "vue";

const props = defineProps({
    status : {
        type: Number,
        defaule: 1
    },
    workId : {
        type: Number,
        default: 0
    },
    teamId : {
        type: Number,
        default: 0
    }
    
})
const currentStatus = props.status
const statuses = ref([
    { name: '시작 전', code: 1 },
    { name: '진행 중', code: 2 },
    { name: '피드백 중', code: 3 },
    { name: '완료', code: 4 },
]);

const selectedStatus = ref(statuses.value[currentStatus-1]);

const statusColor = ['#DFDFDF', '#DFDFDF', '#5D96DA', '#FF7171', '#99CC8C'];

const change = () => {
    axiosInstance.post(`work/${props.teamId}/${props.workId}/status`, {status: selectedStatus.value.code})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {

        });
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
* {
    --dp-font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    font-size: 15px;
}

.status {
    display: flex;
    padding: 7px;
}
.status-name{
    margin-top: 4px;
    margin-left: 35px;
}
.fa-tag{
    margin-left: 10px;
    color: #5D96DA;
    font-size: 25px;
    transform: rotate(135deg);
}
.not-started,
.current-status{
    min-width: 110px;
    width: 90%;
    border-radius: 20px;
    height: 38px;
    margin: 0 auto;
}
.not-started{
    background-color: #DFDFDF;
    color: #2C2C2C;
}
.current-status{
    background-color: #5D96DA;
    color: white;
}
.not-started-name,
.current-status-name{
    font-weight: 600;
    padding: 8px;
    justify-content: center;
}

</style>