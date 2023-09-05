<template>
    <div class="content">
        <div class="top">
            <div class="choose">Semester</div>
        </div>

        <ul class="teams">
            <li v-for="team in teams" :key="team.id" class="team">
                <div class="teamName">{{team.teamName}}</div>
                <div class="teamNumber">{{team.teamNumber}}명 참여</div>
            </li>
        </ul>
    </div>

</template>

<script>
import axios from "axios";
const url = "http://localhost:3210";

export default {
    computed: {
        studentId() {
            return this.$route.params.studentId; // route.params에서 professorId를 가져옴
        }
    },

    mounted() {
        this.showTeams(); // 컴포넌트가 마운트되면 초기 데이터 표시
    },

    data() {
        return {
            teams: null
        }

    },

    methods: {
        
        async getTeams() {
            try {
                const response = await axios.get(url + `/dashboard/teamsByStu/${this.studentId}`);
                if (response.data.message === "Success") {
                    this.teams = response.data.data;
                    console.log("teams: "+teams)
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

.content {
    padding: 100px;
}

.teams {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* 옆으로 정렬할 때 간격 설정 */
    list-style: none;
}


.team {
    width: 380px;
    background-color: #ffffff;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;
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

/* Button Styles */
.el-button {
    margin-left: 10px;
}


</style>