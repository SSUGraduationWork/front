import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 5 CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap 5 JavaScrip

import '@fortawesome/fontawesome-free/js/all'

const app = createApp(App)
app.use(router)
app.mount('#app')