<template>
    <div class="black-bg">
        <div class = "white-bg">
            <div class="header">
                <h2>기여도 측정 방식</h2>
                <div class="close-icon" @click="$emit('close')"><i class="fi fi-sr-cross"></i></div>
            </div>
            <div class = "content">
                <h3>기여도 = 작업점수 + </h3>
            </div>
        
        </div>
    </div>
</template>
<script setup>
import { ref, defineProps, computed } from 'vue';
import axios from 'axios';


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
  padding: 65px;
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
    margin-top: 6px;
}
.close-icon{
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    line-height: 42px;
    font-size: 15px;
    float: right;
}
.close-icon:hover{
    background-color:#F5F6FA;
}
</style>