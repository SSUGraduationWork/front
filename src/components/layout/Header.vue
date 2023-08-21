<template>
    <div class ="header">
        <div>
            <h2>팀이름</h2>
        </div>
    </div>
</template>

<script>
import {reactive} from 'vue'
import axios from 'axios';

export default {
    setup() {
        const state = reactive({
            data: "",
        });
        const add = () => {

        };
        axios.get('http://localhost:3000/work/1')
        .then((res) => {
            state.data = res;
            console.log(state.data);
        })
        return {state};
    },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@700&display=swap');
.header {
    top:0;
    right: 0;
    border-bottom: 1.5px solid #F0EFEF;
    height: 4.5em;
    display: flex;
    flex-direction: column;
}
.header h2{
    color: black;
    margin-right:30em;
    width: 300px;
    font-family: 'Gothic A1', sans-serif;
}
</style>