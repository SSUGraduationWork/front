<template>
    <div class="content">
        <div class="top">
            <div class="watchProjectName">{{this.projectName}}</div>
            <el-button type="primary" class="new" @click="generate()">팀 생성</el-button>
        </div>

        <!-- <ul class="teams">
            <li v-for="team in teams" :key="team.id" class="team">
                <div class="teamName">{{team.teamName}}</div>
                <div class="teamNumber">{{team.teamNumber}}명 참여</div>
            </li>
        </ul> -->

        <ul class="teams">
            <router-link
            v-for="team in teams"
            :key="team.teamId"
            :to="{ name: 'Work', params: { teamId: team.teamId } }"
            class="team"
            >

            <h1>{{team.id}}</h1>
            <div class="container1">            
                <div class="teamName">{{team.teamName}}</div>
                <i class="fi fi-rs-menu-dots-vertical" v-on:click.prevent @click="updateGenerate(team)"></i>
            </div>
                <div class="teamNumber">{{team.teamNumber}}명 참여</div>
            </router-link>
        </ul>
    </div>

<!--post 모달창-->
    <div id="modal" class="modal-overlay" :style="{display:postModalDisplay}">
        <div class="post-modal-window2">
            <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
            <el-input placeholder="팀명을 입력해 주세요" v-model="postTeamName" class="custom-input-style"></el-input>

                <!-- dialog footer 영역 -->
                <!-- <template v-slot:footer> -->
            <div class="footer"><!--2-->
                <span class="dialog-footer">
                    <el-button type="primary" @click="postTeams()">생성</el-button>
                    <el-button @click="close()">취소</el-button>
                </span>
            </div>
        </div>
    </div>

<!--update/delete 모달창-->
    <div id="modal" class="update-modal-overlay2" :style="{display:updateModalDisplay}">
        <div class="update-modal-window2">
            <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
            <el-input placeholder="팀명을 입력해 주세요" v-model="updateTeamName" class="custom-input-style"></el-input>

                <!-- dialog footer 영역 -->
            <div class="footer">
                <span class="dialog-footer">
                    <el-button type="primary" @click="updateTeams()">수정</el-button>
                    <el-button @click="updateClose()">취소</el-button>
                    <el-button type="danger" @click="deleteConfirm()">삭제</el-button>
                </span>
            </div>
        </div>
    </div>

    <div id="modal" class="deleteModal" :style="{display:deleteModalDisplay}">
        <div class="delete-modal-window">
            <div>해당 team 삭제 후에는 다시 복구할 수 없습니다.</div>
            <div class="delete-footer">
                <el-button type="danger" @click="deleteTeams()">삭제</el-button>
                <el-button type="primary" @click="deleteClose()">취소</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
const url = "http://localhost:3210";

export default {
    props: ['teams'],

    computed: {
        projectId() {
            return this.$route.params.projectId; // route.params에서 professorId를 가져옴
        },

        postSetParams() {
            const params = {
                projectId: this.projectId,
                teamName: this.postTeamName,
                teamNumber: 0 //백엔드에서 카운트해줌
            }
            console.log("params: ",params)
            return params;      
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

            //삭제
            deleteModalDisplay: "none"
        }

    },

    methods: {
        generate() {
            this.postModalDisplay = "flex";
        },
        //생성
        postTeams() {
        axios
            .post(url + `/dashboard/teams/${this.studentId}`, this.postSetParams)
            .then((response) => {
            if (response.data.message == "Success") {
                this.postTeam = response;
                console.log("postProject: ", this.postTeam)
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
                const response = await axios.get(url + `/dashboard/teamsByPro/${this.projectId}`);
                if (response.data.message === "Success") {
                    this.teams = response.data.data.object1;
                    this.projectName = response.data.data.string;
                }
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
            .patch(url + '/dashboard/teams', this.updateSetParams)
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
        axios
            .delete(url + `/dashboard/teams/${this.updateTeamId}`)
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
        }



    }
}
</script>

<style scoped>

.top {
    display: flex;
    justify-content: space-between;
}

.watchProjectName {
    text-align: left;
    width: 200px;
    padding: 10px;
    font-size: 20px;
    /* border: 1px solid #ccc;
    border-radius: 5px; */
    outline: none;
    font-weight: bold;
}

.container1 {
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽에 정렬되도록 설정 */
    align-items: center; /* 수직 가운데 정렬 */
    padding: 30px; /* 여백을 설정 (원하는 여백으로 조절) */
}


.new {
    text-align: right;
    width: 160px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    height: 40px;
}

.content {
    padding: 100px;
}

.teams {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* 옆으로 정렬할 때 간격 설정 */
    list-style: none;
    color: inherit;
    padding-top: 30px;
}


.team {
    width: 380px;
    background-color: #ffffff;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
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
    font-size: 14px;
    color: #777777;
    text-align: left;
    padding: 20px
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


</style>