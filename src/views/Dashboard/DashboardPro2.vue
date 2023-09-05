<template>
    <div class="content">
        <div class="top">
            <div class="choose">{{this.projectName}}</div>
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
                <div class="teamName">{{team.teamName}}</div>
                <div class="teamNumber">{{team.teamNumber}}명 참여</div>
            </router-link>
        </ul>
    </div>

<!--post 모달창-->
    <div id="modal" class="modal-overlay" :style="{display:modalDisplay}">
        <div class="modal_window">
            <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
            <el-input placeholder="팀명을 입력해 주세요" v-model="postTeamName"></el-input>

                <!-- dialog footer 영역 -->
                <!-- <template v-slot:footer> -->
            <div><!--2-->
                <span class="dialog-footer">
                    <el-button type="primary" @click="postTeams()">생성</el-button>
                    <el-button @click="close()">취소</el-button>
                </span>
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
            modalDisplay: "none"
        }

    },

    methods: {
        generate() {
            this.modalDisplay = "flex";
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
            this.modalDisplay = "none";
            this.postTeam = null;
            this.postTeamName = null;
        },
        

        async getTeams() {
            try {
                const response = await axios.get(url + `/dashboard/teamsByPro/${this.projectId}`);
                if (response.data.message === "Success") {
                    console.log("response", response.data.data);
                    this.teams = response.data.data.project;
                    console.log("teams: ", teams )
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
    }
}
</script>

<style>

.top {
    display: flex;
    justify-content: space-between;
}

.choose {
    text-align: left;
}

.new {
    text-align: right;
}

.content {
    padding: 100px;
}

.teams {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* 옆으로 정렬할 때 간격 설정 */
    list-style: none;
    color: inherit; /*클릭해도 글자색변하지않도록*/
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

    padding: 25px;
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

.modal_window {
    background-color: white;
    width: 40%;
    height: 10%;
    padding: 20px;
    border-radius: 8px;
}

.dialog-footer {
    margin-top: 20px;
    padding: 20px;
    text-align: right;
}

/* Button Styles */
.el-button {
    margin-left: 10px;
}


</style>