<template>
  <div class="container mt-3">
    <h1 class="display-1 text-center">사용자 목록</h1>
    <div class="btn-group">
      <router-link to="/user/save" class="btn btn-primary">사용자 추가</router-link>
    </div>
    <table class="table table-hover mt-3">
      <thead class="table-dark">
      <tr>
        <th>이름</th>
        <th>이메일</th>
        <th>가입날짜</th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer"
          v-for="(row,no) in result"
          v-bind:key="no"
          onclick="location.href='/board/List';">
        <td> {{row.title}}</td>
        <td> {{row.content}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import  axios from 'axios'
export  default {
  name: 'ListView',
  methods: {
    getData(){
      axios
          .post('http://localhost:8080/board/list')
          .then((response)=>{
            console.log(response)
            this.result=response.data.result
          })
          .catch((error)=>{
            console.log(error)})

      }
    }
}
</script>