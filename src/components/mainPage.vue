<template>
    <button @click="postProject = display">Project 생성</button>


</template>

<script>
// import axios from "axios";
// const url = "http://localhost:80";

export default {
    data() {
        return {
        };
    },

    computed: {
        setParams() {
            const params = {
                userId: this.userId,

            }
    return params;
    }
},

    methods: {
        postProject() {

        }
    }
};
</script>

<style>

</style>