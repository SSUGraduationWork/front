<template>
<div v-if="loading" class="loading-container">
    <Loader></Loader>
</div>
<div v-else>
<div class = "black-bg" :style="{display:updateModalDisplay}">
    <div class = "white-bg">
        <div class ="icon-box">
            <div class = "icon-circle"><i class="fa fa-users" aria-hidden="true"></i></div>
        </div>
        <div class="update-modal-overlay">
            <input
                style="margin-top:10px;"
                v-model="updateTeamName"
                class="custom-input-style"
            >
                    <!-- dialog footer 영역 -->
                    <!-- <template v-slot:footer> -->
        </div>
        <div class="footer"><!--2-->
            <span class="dialog-footer">
                <button @click="updateClose()" class="cancel">취소</button>
                <button type="primary" @click="updateTeams()" class = "ok">수정</button>
            </span>
        </div>
    </div>  
</div>
    <div class="content">
        <div class="top">
            <div class="choose">
                <Dropdown @selected="watchBySemester2"></Dropdown>
            </div>
        </div>
        <div v-if="option == '전체'" class="teams">
            <router-link
            v-for="team in teams" :key="team.teamId" class="team"
            :to="{ name: 'Work', params: { teamId: team.teamId } }">

            <!-- <li v-for="(team, index) in teams" :key="team.teamId" class="team"> -->
                <div class="container1">
                    <!-- index를 사용하여 projects 배열에서 관련된 데이터를 가져옴 -->
                    <div class="projectName">{{ team.projectName }}</div>
                    <div class="more-button" v-on:click.prevent @click="modButtonControl(team.teamId)">
                        <i class="fi fi-rs-menu-dots-vertical"></i>
                        <StudentModButton :moreButtonOpen = "moreButtonOpen[(team.teamId).toString()]" 
                            @updateProject="updateGenerate(team)"
                        ></StudentModButton>
                    </div>
                </div>
                <div class="teamName">{{ team.teamName }}</div>
                <div class="participant">
                    <Avatar :number="team.teamNumber"></Avatar>
                    <div class="teamNumber">{{ team.teamNumber }}명 참여</div>
                </div>
            </router-link>
        </div>
        <div v-else class="teams">
            <router-link
            v-for="team in teams.filter((t) => t.semester == option)" :key="team.teamId" class="team"
            :to="{ name: 'Work', params: { teamId: team.teamId } }">
        
            <!-- <li v-for="(team, index) in teams" :key="team.teamId" class="team"> -->
                <div class="container1">
                    <!-- index를 사용하여 projects 배열에서 관련된 데이터를 가져옴 -->
                    <div class="projectName">{{ team.projectName }}</div>
                    <div class="more-button" v-on:click.prevent @click="modButtonControl(team.teamId)">
                        <i class="fi fi-rs-menu-dots-vertical"></i>
                        <StudentModButton :moreButtonOpen = "moreButtonOpen[(team.teamId).toString()]" 
                            @updateProject="updateGenerate(team)"
                        ></StudentModButton>
                    </div>
                </div>
                <div class="teamName">{{ team.teamName }}</div>
                <div class="participant">
                    <Avatar :number="team.teamNumber"></Avatar>
                    <div class="teamNumber">{{ team.teamNumber }}명 참여</div>
                </div>
            </router-link>
        </div>
    </div>
    
</div>
</template>

<script>
import axios from "axios";
import { axiosInstance } from '@/axios';
import Avatar from './components/Avatar.vue';
import Dropdown from './components/Dropdown.vue';
import StudentModButton from './components/StudentModButton';
import Loader from '../../components/Loader.vue'

export default {
    pops: ['teams'],
    components: {Dropdown, StudentModButton, Avatar, Loader},
    computed: {
        studentId() {
            return this.$route.params.studentId; // route.params에서 professorId를 가져옴
        },

        updateSetParams() {
            const params = {
                projectId: this.updateProjectId, 
                teamId: this.updateTeamId,
                teamName: this.updateTeamName,
                teamNumber: this.updateTeam.teamNumber
            }
        console.log("params: ",params)
        return params;
        }
    },

    mounted() {
        this.getTeams(); // 컴포넌트가 마운트되면 초기 데이터 표시
    },

    data() {
        return {

            teams: null,
            projects: null,


            //수정
            updateModalDisplay: "none",
            updateTeam: null,
            updateProjectId: null,
            updateTeamId: null,
            updateTeamName: null,
            updateTeamNumber: null,

            moreButtonOpen: {},
            option: "전체",
            loading: true,
        }

    },

    methods: {

        async getTeams() {
            try {
                const response = await axiosInstance.get(`/dashboard-service/dashboard/student/${this.studentId}`);
                if (response.data.message === "Success") {
                    console.log(response);
                    this.teams = response.data.data;
                }
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },

        //수정
        updateGenerate(team) {
        
            this.updateModalDisplay = "flex";            
            this.updateTeam = team;
            this.updateProjectId = team.projectId;
            this.updateTeamId = team.teamId;
            this.updateTeamName = team.teamName;
            this.updateTeamNumber = team.teamNumber;
        },

        updateTeams() {
            axiosInstance
                .post(`/dashboard-service/dashboard/teams/${this.updateTeamId}`, this.updateSetParams)
                .then((response) => {
                if (response.data.message == "Success") {
                    this.updateTeam = response.data.data;
                } 
                this.$router.go(0)  //실행된 후 처음 화면으로
                })
                .catch((e) => {
                console.log(e);
                });
        },

        updateClose() {
            this.updateModalDisplay = "none";
            this.updateTeam = null;
            this.updateProjectId = null;
            this.updateTeamId = null;
            this.updateTeamName = null;
            this.updateTeamNumber = null;
        },
        modButtonControl(id){
            const projectId = id.toString();
            if(this.moreButtonOpen[projectId] == true){
                this.moreButtonOpen[projectId]=false;
            }else{
                this.moreButtonOpen[projectId] = true;
            }
        },
        watchBySemester2(option){
            console.log(option);
            this.option = option;
        }

    }
}
</script>

<style scoped>
.top {
    display: flex;
    justify-content: space-between;
}

.choose {
    text-align: left;
}
.loading-container {
    height: 100%;
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
.teamName {
    font-size: 14px;
    color: #777777;
    text-align: left;
    padding-left: 30px;
}

.teamNumber {
    margin-top: 8px;
    font-size: 13px;
    color: #777777;
    text-align: left;
}

#modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.update-modal-window3 {
    background-color: white;
    width: 500px;
    height: 100px;
    padding: 20px;
    border-radius: 8px;
    padding-top: 10px;
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
.dialog-footer {
    margin-top: 40px;
    padding: 20px;
    padding-top: 10px;
    text-align: right;
}
.footer {
    padding: 10px;
}


select {
    width: 200px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

        /* 선택된 옵션의 스타일 */
select:focus {
    border-color: #007bff; /* 포커스 시 파란색 테두리 */
}

.projectName {
    margin-top: 9px;
    font-size: 18px;
    font-weight: 700;
    text-align: left;
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
.participant{
    display: flex;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
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
input:focus::placeholder{
    color: transparent;
}
</style>