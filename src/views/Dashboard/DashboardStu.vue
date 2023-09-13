<template>
    <div class="content">
        <div class="top">
            <div class="choose">
                <form>
                <select name="watchBySemester2" v-model="watchBySemester2" @change="this.showTeams()">
                    <option value="All">All</option>
                    <option value="2022-1">2022-1</option>
                    <option value="2022-2">2022-2</option>
                    <option value="2023-1">2023-1</option>
                    <option value="2023-2">2023-2</option>
                </select>
                </form>
            </div>
        </div>

        <!-- <ul class="teams">
            <li v-for="team in teams" :key="team.id" class="team">
                <div class="container1">
                    <div class="projectName">{{team.projectId}}</div>
                    <i class="fi fi-rs-menu-dots-vertical" v-on:click.prevent @click="updateGenerate(team)"></i>
                </div>
                <div class="teamName">{{team.teamName}}</div>
                <div class="teamNumber">{{team.teamNumber}}명 참여</div>
            </li>
        </ul> -->
        <ul class="teams">
            <router-link
            v-for="(team, index) in teams" :key="team.teamId" class="team"
            :to="{ name: 'Work', params: { teamId: team.teamId } }">
        
            <!-- <li v-for="(team, index) in teams" :key="team.teamId" class="team"> -->
                <div class="container1">
                    <!-- index를 사용하여 projects 배열에서 관련된 데이터를 가져옴 -->
                    <div class="projectName">{{ projects[index].projectName }}</div>
                    <i class="fi fi-rs-menu-dots-vertical" v-on:click.prevent @click="updateGenerate(team)"></i>
                </div>
                <div class="teamName">{{ team.teamName }}</div>
                <div class="teamNumber">{{ team.teamNumber }}명 참여</div>
            <!-- </li> -->
            </router-link>
        </ul>
    </div>

<!--update/delete 모달창-->
    <div id="modal" class="update-modal-overlay3" :style="{display:updateModalDisplay}">
        <div class="update-modal-window3">
            <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
            <el-input placeholder="팀명을 입력해 주세요" v-model="updateTeamName" class="custom-input-style"></el-input>

                <!-- dialog footer 영역 -->
            <div class="footer">
                <span class="dialog-footer">
                    <el-button type="primary" @click="updateTeams()">수정</el-button>
                    <el-button @click="updateClose()">취소</el-button>
                </span>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";
const url = "http://localhost:3210";

export default {
    pops: ['teams'],

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
        this.showTeams(); // 컴포넌트가 마운트되면 초기 데이터 표시
    },

    data() {
        return {
            //semester 별로 
            watchBySemester2: 'All',

            teams: null,
            projects: null,


            //수정
            updateModalDisplay: "none",
            updateTeam: null,
            updateProjectId: null,
            updateTeamId: null,
            updateTeamName: null,
            updateTeamNumber: null
        }

    },

    methods: {
        async showTeams() {
            console.log("studentOd: ", this.studentId);
            console.log("semester: ", this.watchBySemester2);
            if (this.watchBySemester2 == 'All') {
                console.log("겟팀")
                await this.getTeams();
            }
            else {
                await this.getTeamsBySemester();
            }

            // this.modalDisplay = "flex";
        },

        async getTeamsBySemester() {
            console.log("getTeamsBySemester", this.watchBySemester2);
            try {
                const response = await axios.get(url + `/dashboard/teams/${this.studentId}/${this.watchBySemester2}`);
                console.log("response: ",response)
                if (response.data.message == null) {
                    this.teams = null;
                    this.projects = null;
                }
                if (response.data.message === "Success") {
                    this.teams = response.data.data.object1;
                    this.projects = response.data.data.object2;
                }
            } catch (error) {
                console.log(error);
            }
        },
        
        async getTeams() {
            console.log("getTeams", this.watchBySemester2);
            try {
                const response = await axios.get(url + `/dashboard/teamsByStu/${this.studentId}`);
                if (response.data.message === "Success") {
                    this.teams = response.data.data.object1;
                    this.projects = response.data.data.object2;
                }
            } catch (error) {
                console.log(error);
            }
        },

        //수정
        updateGenerate(team) {
            console.log("team", team)
            this.updateModalDisplay = "flex";            
            this.updateTeam = team;
            this.updateProjectId = team.projectId;
            console.log("updateProjectId: ", this.updateProjectId);
            this.updateTeamId = team.teamId;
            console.log("updateTeamId: ", this.updateTeamId);
            this.updateTeamName = team.teamName;
            console.log("updateTeamName: ", this.updateTeamName);
            this.updateTeamNumber = team.teamNumber;
            console.log("teamNumber: ", this.updateTeamNumber)
        },

        updateTeams() {
            axios
                .patch(url + '/dashboard/teams', this.updateSetParams)
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

.container1 {
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽에 정렬되도록 설정 */
    align-items: center; /* 수직 가운데 정렬 */
    padding: 30px; /* 여백을 설정 (원하는 여백으로 조절) */
}

.teamName {
    font-size: 14px;
    color: #777777;
    text-align: left;
    padding: 30px;
}

.projectName {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
}

.teamNumber {
    margin-top: 8px;
    font-size: 14px;
    color: #777777;
    text-align: left;
    padding: 30px
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
    padding-top: 20px;
}

.footer {
    padding: 10px;
}

/* Button Styles */
.el-button {
    margin-left: 10px;
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

</style>