import {createRouter, createWebHistory} from 'vue-router';
import Calendar from '../components/mainCalendar.vue';
import main from '../components/mainPage.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'main',
        component: main
    }, {
        path: '/calendar',
        component: Calendar
    }]
})