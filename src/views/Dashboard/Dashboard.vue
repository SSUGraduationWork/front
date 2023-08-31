<template>
    <div class="content">
        <div class="top">
            <div class="choose">Semester</div>
            <el-button type="primary" class="new" @click="generate()">새 프로젝트</el-button>
        </div>

        <ul class="projects">
            <li v-for="project in projects" :key="project.id" class="project">
                <div class="projectName">{{project.projectName}}</div>
                <div class="semester">{{project.semester}}</div>
                <div class="projectNumber">{{project.projectNumber}}명 참여</div>
            </li>
        </ul>
    </div>

<!--post 모달창-->
    <div id="modal" class="modal-overlay" :style="{display:modalDisplay}">
        <div class="modal_window">
            <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
            <el-input placeholder="학기를 입력해 주세요" v-model="postSemester"></el-input>

            <el-input
                style="margin-top:10px;"
                placeholder="프로젝트명을 입력해 주세요."
                v-model="postProjectName"
            >
            </el-input>
                <!-- dialog footer 영역 -->
                <!-- <template v-slot:footer> -->
            <div><!--2-->
                <span class="dialog-footer">
                    <el-button type="primary" @click="postProjects()">생성</el-button>
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
    computed: {
        professorId() {
            return this.$route.params.professorId; // route.params에서 professorId를 가져옴
        },

        postSetParams() {
            const params = {
                professorId: this.professorId,
                projectName: this.postProjectName,
                semester: this.postSemester,
                projectNumber: 1         
            }
            console.log("params: ",params)
            return params;      
        }
    },

    mounted() {
        this.showProjects(); // 컴포넌트가 마운트되면 초기 데이터 표시
    },

    data() {
        return {
            projects: null,

            //생성
            postProject: null, //생성할 프로젝트 객체
            postSemester: null,
            postProjectName: null,
            modalDisplay: "none"
        }

    },

    methods: {
        generate() {
            this.modalDisplay = "flex";
        },
        //생성
        postProjects() {
        axios
            .post(url + '/dashboard/projects', this.postSetParams)
            .then((response) => {
            if (response.data.message == "Success") {
                this.postProject = response.data.data;
                console.log("postProject: ", this.postProject)
                } 
            this.$router.go(0)  //실행된 후 처음 화면으로
            })
            .catch((e) => {
            console.log(e);
            });
        },
        
        close() {
            this.modalDisplay = "none";
            this.postProject = null;
            this.postSemester = null;
            this.postProjectName = null;
        },
        
        async getProjects() {
            try {
                const response = await axios.get(url + `/dashboard/projects/${this.professorId}`);
                if (response.data.message === "Success") {
                    this.projects = response.data.data;
                    console.log("0" ,this.minutes)
                }
            } catch (error) {
                console.log(error);
            }
        },

        async showProjects() {
            await this.getProjects();

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

.projects {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* 옆으로 정렬할 때 간격 설정 */
    list-style: none;
}


.project {
    width: 380px;
    background-color: #ffffff;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    cursor: pointer;
}

.project:hover {
    transform: translateY(-5px);
}

.projectName {
    font-size: 18px;
    font-weight: bold;
    text-align: left;

    padding: 25px;
}

.semester {
    margin-top: 8px;
    font-size: 14px;
    color: #777777;
    text-align: left;
    padding: 20px
}

.projectNumber {
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