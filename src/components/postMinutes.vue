<template>
  <div>
    <!-- 글쓰기 버튼 -->
    <el-button type="danger" @click="openPopup = true">글쓰기</el-button>
    
    <div>
    <!-- 팝업 내용: 모달창 -->
    <el-dialog title="글쓰기" :visible="openPopup" width="30%" center>
      <!-- 본문 영역 -->
      <el-input placeholder="teamId" v-model="teamId"></el-input>
      <el-input placeholder="userId" v-model="userId"></el-input>
      <el-input placeholder="date" v-model="date"></el-input>
      <el-input placeholder="제목을 입력해 주세요" v-model="title"></el-input>
      <el-input
        style="margin-top:30px;"
        type="textarea"
        :rows="30"
        placeholder="내용을 입력해 주세요."
        v-model="content"
      >
      </el-input>
      <!-- dialog footer 영역 -->
      <!-- <template v-slot:footer> -->
        <div><!--2-->
        <span class="dialog-footer">
            <el-button type="primary" @click="registboard()">확인</el-button>
            <el-button @click="openPopup = false">취소</el-button>
        </span>
        </div><!--2 지우기-->
      <!-- </template> -->
    </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";


const url = "http://localhost:80";

export default {
    name: 'postMinutes',
    data() {
        return {
            openPopup: false,
            title: null,
            content: null,
            date: null,
            userId: null,
            teamId: null
        };
    },
    
    computed: {
        setParams() {
            const params = {
                teamId: this.teamId,
                userId: this.userId,
                date: this.date,
                title: this.title,
                content: this.content                
            }
            return params;
        }
    },

    methods: {

        registboard() {
            axios
            .post(url + '/calendars/minutes', this.setParams)
            .then((response) => {
                if (response.data.message == "Success") {
                    console.log("post", response);
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
    }

}


</script>

<style scoped>

</style>