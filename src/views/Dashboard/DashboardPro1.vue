<template>
<div>
<div class = "black-bg" :style="{display:updateModalDisplay}">
    <div class = "white-bg">
        <div class ="icon-box">
            <div class = "icon-circle"><i class="fi fi-sr-briefcase"></i></div>
        </div>
        <div class="update-modal-overlay">
                <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
                <!-- <el-input placeholder="학기를 입력해 주세요" v-model="postSemester"></el-input> -->
            <UpdateModalDropdown v-if="updateSemester!=''" :updateSemester = "updateSemester"></UpdateModalDropdown>
            <input
                style="margin-top:10px;"
                v-model="updateProjectName"
                class="custom-input-style"
            >
                    <!-- dialog footer 영역 -->
                    <!-- <template v-slot:footer> -->
        </div>
        <div class="footer"><!--2-->
            <span class="dialog-footer">
                <button @click="updateClose()" class="cancel">취소</button>
                <button type="primary" @click="updateProjects()" class = "ok">수정</button>
            </span>
        </div>
    </div>
</div>
<div class = "black-bg" :style="{display:postModalDisplay}">
    <div class = "white-bg">
        <!--post 모달창-->
        <div class ="icon-box">
            <div class = "icon-circle"><i class="fi fi-sr-briefcase"></i></div>
        </div>
        <div class="post-modal-overlay">
                <!--v-model 사용해야 입력된 값이 화면에 보임. v-model 사용하기 위해 해당 변수를 data에 정의해야함-->
                <!-- <el-input placeholder="학기를 입력해 주세요" v-model="postSemester"></el-input> -->
                <UpdateModalDropdown :updateSemester = "postSemester"></UpdateModalDropdown>
                <input
                    style="margin-top:10px;"
                    placeholder="프로젝트명을 입력해 주세요."
                    v-model="postProjectName"
                    class="custom-input-style"
                >
            </div>
                <!-- dialog footer 영역 -->
                <!-- <template v-slot:footer> -->
            <div class="footer"><!--2-->
                <span class="dialog-footer">
                    <button class="cancel" @click="postClose()">취소</button>
                    <button class="ok" type="primary" @click="postProjects()">생성</button>
                </span>
            </div>
    </div>
</div>
<div class = "black-bg" :style="{display:deleteModalDisplay}">
    <div class = "white-bg-delete">
            <div class ="icon-box">
                <div class = "icon-circle delete-icon-circle"><i class="fi fi-rs-trash"></i></div>
            </div>
            <div class="delete-text">
                <div class="large">이 프로젝트를 삭제하시겠습니까?</div>
                <div class="small">삭제 후에는 다시 복구할 수 없습니다.</div>
            </div>
            <div class="delete-footer">
                <button type="danger" @click="deleteProjects()" class="delete">삭제</button>
                <button type="primary" @click="deleteClose()" class="cancel">취소</button>
            </div>
    </div>
</div>
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
                <div  class = "more-button" v-on:click.prevent @click="modButtonControl(project.projectId)">
                    <i class="fi fi-rs-menu-dots-vertical"></i>
                    <ModButton :moreButtonOpen = "moreButtonOpen[(project.projectId).toString()]" 
                        @deleteProject="deleteModalDisplay='flex'" 
                        @updateProject="updateGenerate(project)">
                    </ModButton>
                </div>
                
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
                <div class="more-button" v-on:click.prevent @click="modButtonControl(project.projectId)">
                    <i class="fi fi-rs-menu-dots-vertical"></i>
                    <ModButton :moreButtonOpen = "moreButtonOpen[(project.projectId).toString()]" 
                        @deleteProject="deleteModalDisplay='flex'" 
                        @updateProject="updateGenerate(project)">
                    </ModButton>
                </div>
            </div>
            <div class="semester">{{project.semester}}학기</div>
            <div class ="participant">
                <Avatar :number="project.projectNumber"></Avatar>
                <div class="projectNumber">{{project.projectNumber}}명 참여</div>
            </div>
        </router-link>
    </div>
</div>
</div>
</template>

<script>
import axios from "axios";
import Avatar from './components/Avatar.vue';
import Dropdown from './components/Dropdown.vue';
import UpdateModalDropdown from './components/UpdateModalDropdown.vue';
import CreateModalDropdown from './components/CreateModalDropdown.vue';
import ModButton from "./components/ModButton.vue";
import {ref} from 'vue';
const url = "http://localhost:3210";

export default {
    pops: ['projects'],
    components: {Avatar, Dropdown, UpdateModalDropdown, CreateModalDropdown, ModButton},
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
            moreButtonOpen: ref({}),
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
            this.updateProject = project;
            this.updateProjectId = project.projectId;
            this.updateProjectName = project.projectName;
            this.updateSemester = project.semester;
            this.updateModalDisplay = "flex";
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
            this.updateSemester = "";
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
        },
        modButtonControl(id){
            const projectId = id.toString();
            if(this.moreButtonOpen[projectId] == true){
                this.moreButtonOpen[projectId]=false;
            }else{
                this.moreButtonOpen[projectId] = true;
            }
        },
        closeModButton(id){
            console.log(this.moreButtonOpen[(id).toString()])
            this.moreButtonOpen[(id).toString()]=false
            console.log(this.moreButtonOpen[(id).toString()])
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
    padding-right: 20px;
    padding-top: 20px;
}

.fi fi-rs-menu-dots-vertical::before {
    text-align: right;
}

.project:hover {
    transform: translateY(-5px);
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
    width: 350px;
    font-size: 15px;
    outline: none;
    padding: 10px;
    border-width: 0 0 1px;
    background-color: white;
    border-bottom: 1px solid #ccc;
    margin-bottom: 23px;
    text-align: center;
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
  height: 280px;
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
.new:hover{
    background-color: #215DEB;
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
</style>