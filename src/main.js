import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import '@fortawesome/fontawesome-free/js/all'
import TextareaAutosize from 'vue-textarea-autosize';

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

//PrimeVue
import "primevue/resources/primevue.min.css"; //core CSS
import PrimeVue from 'primevue/config';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Rating from 'primevue/rating';

import PrimeVueCSS from '../public/primevue_style'


const app = createApp(App)
app.use(router);
app.use(PrimeVue, {
    pt: {
        global: {
            css: PrimeVueCSS
        }
    }
});
app.use(TextareaAutosize);
app.component('VueDatePicker', VueDatePicker);
app.component('MultiSelect', MultiSelect);
app.component('Dropdown', Dropdown);
app.component('InputNumber', InputNumber);
app.component('Rating', Rating);

app.mount('#app')
