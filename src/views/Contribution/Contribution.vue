<template>
  <div class="contribution">
    <Explanation v-if="ex==true" @close-ex="closeEx" @open-ex="openEx"></Explanation>
    <Progress v-if="progress" :progress="progress"></Progress>
    <div class = "margin-space"></div>
    <div class="contribution-graph">
      <Graph v-if="contribution" :contribution="contribution" @open-ex="openEx"></Graph>
    </div>
    <div class = "margin-space"></div>
  </div>
</template>
<script setup>
import Progress from './components/Progress'
import Graph from './components/Graph'
import Explanation from './components/Explanation.vue'
import { axiosInstance } from '@/axios'
import {useRoute} from 'vue-router'
import {ref} from 'vue'

const route = useRoute();
const {teamId} = route.params;
const progress = ref();
const contribution = ref();
let ex = ref(false);

axiosInstance.get(`/dashboard-service/contributions/${teamId}`)
    .then((res) => {
        console.log(res);
        progress.value = res.data.progress;
        contribution.value = res.data.contribution;
    })

const openEx = () => {
  ex.value = true;
}

const closeEx = () => {
  ex.value = false;
}
</script>
<style scoped>
.contribution{
  margin-top: 7em;
  width: 100%;
}
.contribution-graph{
  width: 78%;
  margin: 0 auto;
  border-radius: 12px;
}
.margin-space {
  height: 30px;
}
</style>
