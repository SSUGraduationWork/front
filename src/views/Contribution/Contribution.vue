<template>
  <div class="contribution">
    <Progress2 v-if="progress" :progress="progress"></Progress2>
    <div class = "margin-space"></div>
    <div class="contribution-graph">
      <Graph v-if="contribution" :contribution="contribution"></Graph>
    </div>
    <div class = "margin-space"></div>
  </div>
</template>
<script setup>
import Progress from './Progress'
import Progress2 from './Progress2'
import Graph from './Graph'
import axios from 'axios'
import {useRoute} from 'vue-router'
import {ref} from 'vue'

const route = useRoute();
const {teamId} = route.params;
const progress = ref();
const contribution = ref();

axios.get(`http://localhost:3000/contribution/${teamId}`)
    .then((res) => {
        progress.value = res.data.result.progress;
        contribution.value = res.data.result.contribution;
    })

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