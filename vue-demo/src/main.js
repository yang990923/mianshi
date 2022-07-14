import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/font_3521227_f8ud6lmstxt/iconfont.css'
createApp(App).use(router).use(ElementPlus).mount('#app')
