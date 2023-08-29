// <template>
//   <div>
//     <el-table border :data="minutes">
//         <el-table-column prop="teamId" label="teamId"></el-table-column>
//         <el-table-column prop="userId" label="userId"></el-table-column>
//         <el-table-column prop="date" label="date"></el-table-column>
//         <el-table-column prop="title" label="title"></el-table-column>
//         <el-table-column prop="content" label="content"></el-table-column>
//     </el-table>
//   </div>
// </template>

// <script>
// import axios from "axios";


// const url = "http://localhost:80";

// export default {
//     name: 'getAllMinutes',
//     data() {
//         return {
//             teamId: null,
//             userId: null,
//             minutes: []
//         };
//     },

//     methods: {

//         getAllMinutes() {
//             axios
//             .get(url + `/calendars/minutes/all/${teamId}/${userId}`)
//             .then((response) => {
//                 if (response.data.message == "Success") {
//                     console.log(response.data.data);
//                     this.minutes = response.data.data;
//                 }
//             })            
//             .catch((e) => {
//                 console.log(e);
//             });

//         }
//     }

// }


// </script>

// <style scoped>

// </style>