// import axios from "axios";

// const url = "http://localhost:80";

// export default {
//     //1. 회의록 생성
//     postArticle: function(teamId, userId, date, title, content) {
//         const data =
//         {
//             teamId: teamId,
//             userId: userId,
//             date: date,
//             title: title,
//             content: content
//         };
//         return axios.post(url + '/calendars/minutes', data);
//     },

//     //2-1. 팀 내 회의록 전체 조회
//     getAllArticle: function(teamId, userId) {
//         return axios.get(url + `/calendars/minutes/all/${teamId}/${userId}`);
//     },

//     //2-2. 해당 날짜에 해당하는 회의록 전체 조회
//     getArticle: function(teamId, userId, date) {
//         return axios.get(url + `/calendars/minutes/${teamId}/${date}/${userId}`);
//     },

//     //3. 회의록 수정
//     updateArticle: function(teamId, userId, date, title, content) {
//         const data =
//         {
//             teamId: teamId,
//             userId: userId,
//             date: date,
//             title: title,
//             content: content
//         };
//         return axios.patch(url + '/calendars/minutes', data);
//     },

//     //4. 회의록 삭제
//     deleteArticle: function(teamId, userId, date) {
//         return axios.delete(url + `/calendars/minutes/${teamId}/${userId}/${date}`)
//     }

// }
