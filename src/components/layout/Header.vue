<template>
    <div class ="header">
        <div class = "header-info">
            <ul>
                <div class = "header-right-div">
                    <li class = "header-right">
                        <div class = "circle-profile">
                            <img :src = "headerInfo.picture_url" class = "profile-user-img">
                        </div>
                    </li>
                    <li class = "header-right">
                        <div class = "user-info">
                            <h4>{{headerInfo.student_number}} {{headerInfo.user_name}}</h4>
                            <h5>{{headerInfo.department}}</h5>
                        </div>
                    </li>
                    <li class = "header-right">
                        <div class = "circle-notification">
                            <div class = "icon">
                                <i class="fi fi-ss-bell"></i>
                            </div>
                        </div>
                    </li>
                </div>
                <div class = "header-left-div">
                    <li class = "header-left">
                        <h3>{{headerInfo.team_name}}</h3>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
import {ref, onBeforeMount} from 'vue'
import axios from 'axios';
import {useRouter, useRoute} from 'vue-router'

export default {
    props: {
        teamId : {
            type: String,
        },
    },
    data() {
        return {
        
        }
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const headerInfo = ref({});

        onBeforeMount(async () => {
            await router.isReady();
            const {teamId} = route.params;

            axios.get(`http://localhost:3000/header`, {
                params : {userId : 10, teamId : teamId}
            })
            .then((res) => {
                headerInfo.value = {...res.data.result};
            })
        })
        return { headerInfo }
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;600;700&display=swap');
@import "~@flaticon/flaticon-uicons/css/all/all";
* {
    font-family: 'Red Hat Display', sans-serif;
}
.header {
    border-bottom: 1.5px solid #F0EFEF;
    height: 3em;
    background-color: white;

}
.header ul {
    list-style-type: none;
}
.header-left {
    float: left;
    font-weight: 700;
}
.header-right{
    float: right;
    margin-right: 2em;
    font-weight: 300;
}
.header-left-div{
    float: left;
    width: 250px;
    height: 50px;
    position: fixed;
}
.header-right-div{
    float: right;
    width: 320px;
    height: 50px;
}
h3 {
    font-weight: 700;
    margin-top: 5px;
}
h4 {
    margin-top: -3px;
    font-weight: 600;
}
h5 {
    margin-top: -20px;
    margin-bottom: 0px;
    font-weight: 500;
}
.circle-profile,
.circle-notification {
    cursor: pointer;
    margin-top: -3px;
    width: 40px;
    height: 40px;
    border-radius: 70%;
    overflow: hidden;
    position: relative;
    background : #F5F6FA; 
}
.profile-user-img{
    width: 100%;
    object-fit: cover;
}
.icon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    font-size: 20px;
}
.circle-notification:hover{
    background-color : #3772FF;
    color: white;
}
</style>