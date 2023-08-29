import { createApp } from 'vue'
import App from './App.vue'
//router
import router from './router/index.js'
//element-plus(=element-ui)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//라우터


//index.html의 app에 App(즉 ./App.vue) 들어감
const app = createApp(App)

app.use(ElementPlus)
app.use(router);
app.mount('#app');