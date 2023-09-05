import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import '@fortawesome/fontawesome-free/js/all'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

//PrimeVue
import "primevue/resources/primevue.min.css"; //core CSS
import PrimeVue from 'primevue/config';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import PrimeVueCSS from '../public/primevue_style'

//import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 5 CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap 5 JavaScrip

const app = createApp(App)
app.use(router);
app.use(PrimeVue, {
    pt: {
        global: {
            css: PrimeVueCSS
        }
    }
});
app.use(store);

app.component('VueDatePicker', VueDatePicker);
app.component('MultiSelect', MultiSelect);
app.component('Dropdown', Dropdown);
app.component('Rating', Rating);
app.component('RadioButton', RadioButton);

app.mount('#app')
