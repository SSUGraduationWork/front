<template>
    <div class="content">
        <div class="top">
            <div class="choose">
                <Dropdown @selected="viewProjects"></Dropdown>
            </div>
            <el-button type="primary" class="new" @click="postGenerate()"><i class="fi fi-br-plus"></i>새 프로젝트</el-button>
        </div>
        <div v-if="option == '전체'" class="projects">
            <router-link
            v-for="project in projects"
            :key="project.projectId"
            :to="{ name: 'DashboardPro2', params: { projectId: project.projectId } }"
            class="project"
            >
                <div class="container1">
                    <div class="projectName">{{project.projectName}}</div>
                    <!-- <div @click="updateGenerate(project)"><i class="fi fi-rs-menu-dots-vertical"></i></div> -->
                    <i class="fi fi-rs-menu-dots-vertical" v-on:click.prevent @click="updateGenerate(project)"></i>
                </div>
                <div class="semester">{{project.semester}}학기</div>
                <div class ="participant">
                    <Avatar :number="project.projectNumber"></Avatar>
                    <div class="projectNumber">{{project.projectNumber}}명 참여</div>
                </div>
            </router-link>
        </div>

        <div v-else class="projects">
            <router-link
            v-for="project in projects.filter((p) => p.semester==option)"
            :key="project.projectId"
            :to="{ name: 'DashboardPro2', params: { projectId: project.projectId } }"
            class="project"
            >
                <div class="container1">
                    <div class="projectName">{{project.projectName}}</div>
                    <!-- <div @click="updateGenerate(project)"><i class="fi fi-rs-menu-dots-vertical"></i></div> -->
                    <i class="fi fi-rs-menu-dots-vertical" v-on:click.prevent @click="updateGenerate(project)"></i>
                </div>
                <div class="semester">{{project.semester}}학기</div>
                <div class ="participant">
                    <Avatar :number="project.projectNumber"></Avatar>
                    <div class="projectNumber">{{project.projectNumber}}명 참여</div>
                </div>
            </router-link>
        </div>
    </div>

<!--post 모달창-->
    <div id="modal" class="post-modal-overlay" :style="{display:postModalDisplay}">
        <div class="post-modal-window">
            <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
            <!-- <el-input placeholder="학기를 입력해 주세요" v-model="postSemester"></el-input> -->
            <form>
            <select name="selectSemester" v-model="postSemester" required>
                <option value="2022-1">2022-1</option>
                <option value="2022-2">2022-2</option>
                <option value="2023-1">2023-1</option>
                <option value="2023-2">2023-2</option>
            </select>
            </form>
            <el-input
                style="margin-top:10px;"
                placeholder="프로젝트명을 입력해 주세요."
                v-model="postProjectName"
                class="custom-input-style"
            >
            </el-input>
                <!-- dialog footer 영역 -->
                <!-- <template v-slot:footer> -->
            <div class="footer"><!--2-->
                <span class="dialog-footer">
                    <el-button type="primary" @click="postProjects()">생성</el-button>
                    <el-button @click="postClose()">취소</el-button>
                </span>
            </div>
        </div>
    </div>

<!--update/delete 모달창-->
    <div id="modal" class="update-modal-overlay" :style="{display:updateModalDisplay}">
        <div class="post-modal-window">
            <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
            <!-- <el-input placeholder="학기를 입력해 주세요" v-model="postSemester"></el-input> -->
            <form>
            <select name="selectSemester" v-model="updateSemester" required>
                <option value="2022-1">2022-1</option>
                <option value="2022-2">2022-2</option>
                <option value="2023-1">2023-1</option>
                <option value="2023-2">2023-2</option>
            </select>
            </form>
            <el-input
                style="margin-top:10px;"
                v-model="updateProjectName"
                class="custom-input-style"
            >
            </el-input>
                <!-- dialog footer 영역 -->
                <!-- <template v-slot:footer> -->
            <div class="footer"><!--2-->
                <span class="dialog-footer">
                    <el-button type="primary" @click="updateProjects()">수정</el-button>
                    <el-button @click="updateClose()">취소</el-button>
                    <el-button type="danger" @click="deleteConfirm()">삭제</el-button>
                </span>
            </div>
        </div>
    </div>

    <div id="modal" class="deleteModal" :style="{display:deleteModalDisplay}">
        <div class="delete-modal-window">
            <div>해당 project 삭제 후에는 다시 복구할 수 없습니다.</div>
            <div class="delete-footer">
                <el-button type="danger" @click="deleteProjects()">삭제</el-button>
                <el-button type="primary" @click="deleteClose()">취소</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Avatar from './components/Avatar.vue';
import Dropdown from './components/Dropdown.vue';
const url = "http://localhost:3210";

export default {
    pops: ['projects'],
    components: {Avatar, Dropdown},
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
        },

        updateSetParams() {
            const params = {
                projectId: this.updateProjectId, 
                professorId: this.professorId,
                projectName: this.updateProjectName,
                semester: this.updateSemester,
                projectNumber: this.updateProject.projectNumber
            }
        console.log("params: ",params)
        return params;
        }
    },

    created() {
        this.showProjects(); // 컴포넌트가 마운트되면 초기 데이터 표시
    },

    data() {
        return {
            projects: [],
            watchBySemester: 'All',
            //생성
            postProject: null, //생성할 프로젝트 객체
            postSemester: "2023-2",
            postProjectName: null,
            postModalDisplay: "none",

            //수정
            updateProject: null,
            updateProjectId: null,
            updateModalDisplay: "none",
            updateProjectName: null,
            updateSemester: "",
            //삭제
            deleteModalDisplay: "none",
            option: "전체",
        }

    },

    methods: {
        postGenerate() {
            this.postModalDisplay = "flex";
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
        
        postClose() {
            this.postModalDisplay = "none";
            this.postProject = null;
            this.postSemester = "2023-2";
            this.postProjectName = null;
        },
        
        async getProjects() {
            try {
                const response = await axios.get(url + `/dashboard/projects/${this.professorId}`);
                if (response.data.message === "Success") {
                    this.projects = response.data.data;

                }
            } catch (error) {
                console.log(error);
            }
        },

        async getProjectsBySemester() {
            try {
                const response = await axios.get(url + `/dashboard/projects/${this.professorId}/${this.watchBySemester}`);
                if (response.data.message == null) {
                    this.projects = null
                }
                if (response.data.message === "Success") {
                    this.projects = response.data.data;
                }
            } catch (error) {
                console.log(error);
            }
        },

        async showProjects() {
            if (this.watchBySemester == 'All') {
                await this.getProjects();
            }
            else {
                await this.getProjectsBySemester();
            }

            // this.modalDisplay = "flex";
        },

        // handleIconClick(projectId, event) {
        //     console.log("handleIconClick")
        //     event.stopPropagation();
        // },

        updateGenerate(project) {
            this.updateModalDisplay = "flex";
            this.updateProject = project;
            this.updateProjectId = project.projectId;
            this.updateProjectName = project.projectName;
            this.updateSemester = project.semester;
        },
        //수정
        updateProjects() {
        axios
            .patch(url + '/dashboard/projects', this.updateSetParams)
            .then((response) => {
            if (response.data.message == "Success") {
                this.updateProject = response.data.data;
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
            this.updateProjectId = null,
            this.updateSemester = "2023-2";
            this.updateProjectName = null;
        },

        deleteClose() {
            this.deleteModalDisplay = "none";
        },

        deleteProjects() {
        axios
            .delete(url + `/dashboard/projects/${this.updateProjectId}`)
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
        viewProjects(option){
            this.option = option
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');

* {
  font-family: 'Red Hat Display', sans-serif;
}
.top {
    display: flex;
    justify-content: space-between;

}

.choose {
    text-align: left;
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

.content {
    width: 85%;
    margin: 0 auto;
    margin-top: 95px;
    min-width: 900px;
}

.projects {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    color: inherit;
    padding-top: 30px;
    gap: 3%;
    width: 100%;
}


.project {
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

.container1 {
    display: flex;
    justify-content: space-between; /* 왼쪽과 오른쪽에 정렬되도록 설정 */
    align-items: center; /* 수직 가운데 정렬 */
    padding: 30px; /* 여백을 설정 (원하는 여백으로 조절) */
}

.fi fi-rs-menu-dots-vertical::before {
    text-align: right;
}

.project:hover {
    transform: translateY(-5px);
}

.projectName {
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

.post-modal-window {
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

.dialog-footer {
    margin-top: 40px;
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
        
form {
    text-align: center;
}

select {
    width: 200px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

.custom-input-style {
    width: 400px; /* 너비 조절 */
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    outline: none;
    height: 65px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.fi-br-plus{
    font-size: 13px;
    margin-right: 15px;
}
.participant{
    display: flex;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
}

</style>