<template>
    <div class="contribution-graph">
        <div class = "explanation">
            <h3>기여도 그래프</h3>
            <i class="fi fi-ss-interrogation" @click="$emit('openEx')"></i>
        </div>
        <div class="contribution">
            <div v-for="(m, i) in contribution" :key="i" class="member">
                <img class = "user-img" :src="m.pictureUrl" />
                <div class = "user-info">
                    <p class = "student-number">{{ m.studentNumber }}</p>
                    <p class = "user-name">{{ m.name }}</p>
                </div>
                <div class = "graph-space">
                    <div class = "stick" :style = "{ '--graph-width' : contributions[i]}"></div>
                    <span class = "c-number">{{ m.contribution }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps,ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    contribution : {
        type: Array,
        default: []
    },
});

const totalContribution = props.contribution.reduce((pv, cv, idx, val) => {
    return pv + cv.contribution;
}, 0)

const contributions = [];
for (let c of props.contribution) {
    contributions.push(c.contribution/totalContribution * 160 + '%');
}

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
*{
  font-family: 'Red Hat Display', sans-serif;
}
.contribution-graph{
    width: 100%;
    display: inline;
}
.explanation{
    margin-left: 10px;
    height: 66px;
    text-align: left;
    width: 10em;
}
h3{
    float: left;
}
i{
    line-height: 66px;
    float: left;
    margin-left: 20px;
    font-size: 20px;
    cursor: pointer;
}
.contribution{
    margin-top: 20px;
}
img{
    width: 50px;
    height: 50px;
    border-radius: 70%;
    overflow: hidden;
    background : #F5F6FA; 
}
.member{
    height: 50px;
    min-width: 50em;
    font-size: 15px;
    display: flex;
    margin-bottom: 30px;
    margin-left: 10px;
}
.user-info{
    margin-left: 20px;
    line-height: 20%;
    text-align: left;
    width: 100px;
}
.graph-space{
    width: 75%;
    margin-left: 20px;
}
.stick{margin-top: 3px;
    width: 0px;
    float: left;
    height: 45px;
    max-width: 90%;
    animation: moving-bars 1.5s forwards;
    background-color: #3772FF;
    box-shadow: 0 19px 38px rgba(0,0,0,0.08), 0 8px 12px rgba(0,0,0,0.1);
}
.c-number{
    float: left;
    margin-left: 30px;
    line-height: 50px;
}
@keyframes moving-bars {
  0%   { width: 0; }
  100%  { width: var(--graph-width); }
}
</style>