import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import '@fortawesome/fontawesome-free/js/all'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

//PrimeVue
import "primevue/resources/primevue.min.css"; //core CSS
import PrimeVue from 'primevue/config';
import MultiSelect from 'primevue/multiselect';


const app = createApp(App)
app.use(router);
app.use(PrimeVue, {
    pt: {
        global: {
            css: `
                .p-multiselect-header .p-checkbox{
                    display: none;
                }
                .p-checkbox .p-highlight{
                    background-color: #3772FF;
                    width: 17.5px;
                    border-radius : 4px;
                    border: 1px solid #3772FF;
                }
                .p-highlight{
                    background-color: #F5F6FA;
                }
                .p-multiselect-item:hover{
                    background-color: #F5F6FA;
                }
                .p-multiselect-item{
                    padding: 5px;
                }
                .p-checkbox-icon{
                    color: white;
                    width: 13px;
                    margin-left: 1.5px;
                }
                .p-checkbox{
                    width: 22px;
                    height: 20px;
                    border: 1px solid #8F8F8F;
                    border-radius: 5px;
                    margin-left: 10px;
                    display: flex;
                }
                
                .p-multiselect-items{
                    margin-top: 15px;
                    margin-bottom: 10px;
                }
                .p-multiselect-panel{
                    pisition: relative;
                    background-color: white;
                    z-index: 10;
                    box-shadow: 0 0 8px rgba(0,0,0,0.2);
                    border-radius : 15px;
                    margin-top: 12px;
                }
               
                .p-multiselect-filter-container{
                    margin-bottom : 0px;
                    display: flex;
                    padding: 20px;
                    padding-bottom: 0px;
                }
                .p-multiselect-filter-container input{
                    margin-right: 5px;
                    border: 0.2px solid #8F8F8F;
                    box-shadow: 0 0 5px rgba(0,0,0,0.2);
                    border-radius: 5px;
                    height: 30px;
                }
            
            `
        }
    }
});
app.component('VueDatePicker', VueDatePicker);
app.component('MultiSelect', MultiSelect);
app.mount('#app')
