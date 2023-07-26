<template>
  <div class = "work">
    <div class = "view-type">
      <ul>
        <li><i class="fas fa-list" /></li>
        <li><i class ="fas fa-table" color = "#BEBEBE"/></li>
      </ul>
    </div>
    <div class = "options">
      <ul>
        <li v-for="op in options" :key = "op">{{op}}</li>
      </ul>
    </div>
    <div class = "work-table">
      <!--<input class = "work-name">
      <input class = "worker">
      <input class = "end-date">
      <input class = "importance">
      <input class = "status"> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['teamId'],
  setup() {
    
  },
  data() {
    return {
      options : ["작업명", "담당자", "마감일", "중요도", "상태"],
    }
  },
  methods : {
  },
}
</script>
<style scoped>
ul{
  list-style : none;
}
.view-type li {
  float: left;
  margin-left: 22px;
  margin-top : 30px;
}
.options li {
  margin-right : 10em;
  padding: 0.7em;
  display : inline-block;
  margin-top: 90px;
}
.work-table {
  margin-right : 20px;
  width: 76em;
}
.importance {
  width : 10em;
}
.work-name{
  width : 20em;
  border-right: ;
}
input {
  width : 15.5em;
  height: 2em;
  border:none;
  border-top : 1px solid black;
  border-bottom: 1px solid black;
}
.work-name {
  border-left: 1px solid black;
  border-radius: 10px 0 0 10px;
}
.status {
  border-right: 1px solid blacks;
  border-radius: 0 10px 10px 0;
}
</style>
