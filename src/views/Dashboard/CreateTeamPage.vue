<template>
    <div v-if="loading" class = "loading-container">
        <Loader></Loader>
    </div>
    <div v-else>
    <div class = "black-bg" :style="{display:postModalDisplay}">
        <div class = "white-bg">
            <div class ="icon-box">
                <div class = "icon-circle"><i class="fa fa-users" aria-hidden="true"></i></div>
            </div>
            <div class="update-modal-overlay">
                <input placeholder="팀명을 입력해 주세요"
                    style="margin-top:10px;"
                    v-model="postTeamName"
                    class="custom-input-style"
                >
                        <!-- dialog footer 영역 -->
                        <!-- <template v-slot:footer> -->
            </div>
            <div class="footer"><!--2-->
                <span class="dialog-footer">
                    <button @click="close()" class="cancel">취소</button>
                    <button type="primary" @click="postTeams()" class = "ok">생성</button>
                </span>
            </div>
        </div>  
    </div>
        <div class="content">
            <div class="top">
                <div class="watchProjectName">{{this.projectName}}</div>
                <el-button type="primary" class="new" @click="generate()"><i class="fi fi-br-plus"></i>팀 생성</el-button>
            </div>
    
            <div class="teams">
                <router-link
                v-for="team in teams"
                :key="team.teamId"
                :to="{ name: 'Work', params: { teamId: team.teamId } }"
                class="team"
                >
    
                <div class="container1">            
                    <div class="teamName">{{team.teamName}}</div>
                    <div class = "more-button" v-on:click.prevent @click="modButtonControl(team.teamId)">
                        <i class="fi fi-rs-menu-dots-vertical"></i>
                        <TeamDeleteButton :moreButtonOpen = "moreButtonOpen[(team.teamId).toString()]" 
                            @deleteProject="deleteGenerate(team.teamId)" 
                            @updateProject="updateGenerate(team)">
                        </TeamDeleteButton>
                    </div>
                </div>
                <div class="semester"> </div>
                <div class= "participant">
                    <Avatar :number="team.teamNumber"></Avatar>
                    <div class="teamNumber">{{team.teamNumber}}명 참여</div>
                </div>
                </router-link>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import axios from "axios";
    import {axiosInstance} from '@/axios';
    import TeamDeleteButton from './components/TeamDeleteButton.vue';
    import Avatar from './components/Avatar.vue';
    import Loader from '../../components/Loader.vue'
    const url = "http://localhost:3210";
    
    export default {
        props: ['teams', 'studentId'],
        components: {TeamDeleteButton, Avatar, Loader},
        computed: {
            projectId() {
                return this.$route.params.projectId; // route.params에서 professorId를 가져옴
            },
    
            postSetParams() {
                const params = {
                    teamName: this.postTeamName,
                }
                console.log("params: ",params)
                return params;      
            },
    
            updateSetParams() {
                const params = {
                    teamName: this.updateTeamName,
                }
            console.log("params: ",params)
            return params;
            }
        },
    
        mounted() {
            this.showTeams(); // 컴포넌트가 마운트되면 초기 데이터 표시
        },
    
        data() {
            return {
                teams: null,
                projectName: null,
                //생성
                postTeam: null,
                studentId: 7,
                postTeamName: null, //생성할 프로젝트 객체
                postModalDisplay: "none",
    
                //수정
                updateTeam: null,
                updateTeamName: null,
                updateProjectId: null,
                updateTeamId: null,
                updateModalDisplay: "none",
    
                deleteTeamId : null,
    
                //삭제
                deleteModalDisplay: "none",
                moreButtonOpen: {},
                loading : true,
                owner: false,
            }
    
        },
    
        methods: {
            generate() {
                this.postModalDisplay = "flex";
            },
            //생성
            postTeams() {
            this.loading = true;
            axiosInstance
                .post(`/dashboard/teams/${this.projectId}/${this.studentId}`, this.postSetParams)
                .then((response) => {
                if (response.data.message == "Success") {
                    this.postTeam = response;
                    console.log("postProject: ", this.postTeam)
                    this.loading = false;
                    } 
                this.$router.go(0)  //실행된 후 처음 화면으로
                })
                .catch((e) => {
                console.log(e);
                });
            },
            
            close() {
                this.postModalDisplay = "none";
                this.postTeam = null;
                this.postTeamName = null;
            },
            
    
            async getTeams() {
                try {
                    const response = await axiosInstance.get(`/dashboard/teamsByPro/${this.projectId}`);
                    if (response.data.message === "Success") {
                        this.teams = response.data.data.object1;
                        this.projectName = response.data.data.string;
                        if(response.data.data.owner){
                            this.owner = response.data.data.owner;
                        }
                        console.log(response.data.data);
                    }
                    this.loading = false;
                } catch (error) {
                    console.log(error);
                }
            },
    
            async showTeams() {
                await this.getTeams();
    
                // this.modalDisplay = "flex";
            },
    
            updateGenerate(team) {
                this.updateModalDisplay = "flex";
                this.updateTeam = team;
                this.updateTeamId = team.teamId;
                this.updateTeamName = team.teamName;
                this.updateProjectId = team.projectId;
            },
    
            //수정
        
            updateTeams() {
            axios
                .post(url + '/dashboard/teams/${this.updateTeamId}', this.updateSetParams)
                .then((response) => {
                if (response.data.message == "Success") {
                    this.postTeam = response.data.data;
                    } 
                this.$router.go(0)  //실행된 후 처음 화면으로
                })
                .catch((e) => {
                console.log(e);
                });
            },
            
            updateClose() {
                this.updateModalDisplay = "none";
                this.updateProject = null;
                this.updateTeamName = null;
            },
    
            deleteClose() {
                this.deleteModalDisplay = "none";
            },
    
            deleteTeams() {
            console.log(this.deleteTeamId);
            axios
                .delete(url + `/dashboard/teams/${this.deleteTeamId}`)
                .then((response) => {
                if (response.data.message == "Success") {
                    console.log("Completely Delete");
                    } 
                this.$router.go(0)  //실행된 후 처음 화면으로
                })
                .catch((e) => {
                console.log(e);
                });
            },
    
            deleteConfirm() {
                this.deleteModalDisplay = "flex";
            },
            modButtonControl(id){
                const teamId = id.toString();
                if(this.moreButtonOpen[teamId] == true){
                    this.moreButtonOpen[teamId]=false;
                }else{
                    this.moreButtonOpen[teamId] = true;
                }
            },
            deleteGenerate(id) {
                this.deleteModalDisplay='flex'
                this.deleteTeamId = id;
            }
    
        }
    }
    </script>
    
    <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
    
    * {
      font-family: 'Red Hat Display', sans-serif;
    }
    .loading-container {
      height: 100%;
    }
    .top {
        display: flex;
        justify-content: space-between;
    }
    
    .watchProjectName {
        text-align: left;
        width: 200px;
        font-size: 20px;
        outline: none;
        font-weight: 700;
        margin-top: 15px;
        margin-left: 5px;
    }
    
    
    .container1 {
        display: flex;
        justify-content: space-between; /* 왼쪽과 오른쪽에 정렬되도록 설정 */
        align-items: center; /* 수직 가운데 정렬 */
        padding: 30px; /* 여백을 설정 (원하는 여백으로 조절) */
        padding-right: 20px;
        padding-top: 20px;
    }
    
    .fi fi-rs-menu-dots-vertical::before {
        text-align: right;
    }
    
    .new {
        text-align: right;
        width: 160px;
        padding: 10px;
        font-size: 15px;
        border-radius: 10px;
        outline: none;
        height: 40px;
        font-weight: 600;
        background-color: #3772ff;
        border: none;
        margin-right: 0.9%;
        margin-top: 12px;
    }
    .fi-br-plus{
        font-size: 13px;
        margin-right: 15px;
    }
    
    .content {
        width: 85%;
        margin: 0 auto;
        margin-top: 95px;
        min-width: 900px;
    }
    
    .teams {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        color: inherit;
        padding-top: 30px;
        gap: 3%;
        width: 100%;
    }
    
    
    .team {
        width: 31.199999999999%;
        background-color: #ffffff;
        border-radius: 13px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        transition: transform 0.2s;
        cursor: pointer;
        text-decoration: none; /* 링크에 밑줄 제거 */
        color: inherit; /*색변하지 않도록 */
        height: 180px;
        margin-bottom: 30px;
    }
    
    .team:hover {
        transform: translateY(-5px);
    }
    
    .teamName {
        font-size: 18px;
        font-weight: bold;
        text-align: left;
    
    }
    
    .teamNumber {
        margin-top: 8px;
        font-size: 13px;
        color: #777777;
        text-align: left;
    }
    
    .custom-input-style {
        width: 300px;
        font-size: 15px;
        outline: none;
        padding: 10px;
        border-width: 0 0 1px;
        background-color: white;
        border-bottom: 1px solid #ccc;
        margin-bottom: 23px;
        text-align: center;
    }
    
    
    .post-modal-window2 {
        background-color: white;
        width: 500px;
        height: 100px;
        padding: 20px;
        border-radius: 8px;
        padding-bottom: 30px;
    }
    
    .update-modal-window2 {
        background-color: white;
        width: 500px;
        height: 100px;
        padding: 20px;
        border-radius: 8px;
    }
    
    .delete-modal-window {
        background-color: white;
        width: 300px;
        height: 100px;
        padding: 20px;
        padding-top: 30px;
        border-radius: 8px;
    }
    
    el-input {
        width: 100px;
    }
    
    .footer {
        padding: 10px;
    }
    
    .dialog-footer {
        margin-top: 40px;
        padding-top: 30px;
        padding: 20px;
        padding-top: 10px;
        text-align: right;
    }
    
    .delete-footer {
        margin-top: 20px;
    }
    
    /* Button Styles */
    .el-button {
        margin-left: 10px;
    }
    
    .more-button{
        margin-top: 4px;
        cursor: pointer;
        width: 35px;
        height: 35px;
        border-radius: 100%;
        line-height: 40px;
        position: relative;
    }
    .more-button:hover{
        background-color: var(--sidebar-bg-color);
    }
    input:focus::placeholder{
        color: transparent;
    }
    .projectName {
        margin-top: 9px;
        font-size: 18px;
        font-weight: 700;
        text-align: left;
    }
    
    .semester {
        font-size: 14px;
        color: #777777;
        text-align: left;
        padding-left: 30px;
    }
    
    .projectNumber {
        margin-top: 8px;
        font-size: 13px;
        color: #777777;
        text-align: left;
    }
    .participant{
        display: flex;
        height: 40px;
        line-height: 40px;
        margin-top: 20px;
    }
    .black-bg{
      z-index: 15;
      margin: 0 auto;
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
      width: 520px; background: white;
      box-sizing: border-box;
      border-radius: 15px;
      padding: 30px;
      margin: 0 auto;
      margin-top: 10em;
      height: 250px;
      overflow: scroll;
    }
    .icon-circle{
        width: 55px;
        height: 55px;
        background-color: #3772FF;
        border-radius: 100%;
        color: white;
        line-height: 60px;
        font-size: 25px;
        margin: 0 auto;
    }
    .icon-box{
        margin: 0 auto;
        margin-bottom: 20px;
    
    }
    .ok{
        background-color: #3772FF;
        border: none;
        font-weight: 500;
        width: 150px;
        border-radius: 30px;
        height: 37px;
        cursor:pointer;
        color: white;
    }
    .cancel{
        background-color: #e1e1e1;
        border: none;
        font-weight: 500;
        width: 150px;
        border-radius: 30px;
        height: 37px;
        margin-right:20px;
        cursor: pointer;
        color: #777777;
    }
    .cancel:hover{
        background-color: #CCC;
    }
    .ok:hover{
        background-color: #215DEB;
    }
    .delete{
        background-color: #e53535;
        border: none;
        font-weight: 500;
        width: 150px;
        border-radius: 30px;
        height: 37px;
        cursor:pointer;
        color: white;
        margin-right: 20px;
    }
    .delete-icon-circle{
        color: #e53535;
        background-color: #ffebeb;
    }
    .large{
        font-size: 20px;
        font-weight: 600;
    }
    .small{
        font-size: 14px;
        margin-top: 5px;
        color: #87898e;
    }
    .delete:hover{
        background-color: #D02323;
    }
    .white-bg-delete{
        position: fixed;
        left: 0;
        right: 0;
        z-index: 20;
        width: 500px; background: white;
        box-sizing: border-box;
        border-radius: 15px;
        padding: 30px;
        margin: 0 auto;
        margin-top: 10em;
        height: 235px;
        overflow: scroll;
    }
    </style>