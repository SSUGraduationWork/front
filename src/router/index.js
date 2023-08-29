import {createRouter, createWebHistory} from 'vue-router';
import Calendar from '../components/mainCalendar.vue';
import main from '../components/mainPage.vue';
import postMinutes from '../components/postMinutes.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'main',
        component: main
    }, {
        path: '/calendar',
        component: Calendar
    }, {
        path: '/post',
        component: postMinutes
    }
    ]
})