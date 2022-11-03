import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
// import vue3videoPlay from 'vue3-video-play'
import App from './App.vue'
import router from './router'
import "@/utils/extend"
import './assets/index.scss'
import './assets/theme.scss'
import 'element-plus/es/components/message/style/css'
// import 'vue3-video-play/dist/style.css' // 引入css
const app = createApp(App);

declare global {
  interface Window {
    require: any;
  }
}
const electron = window.require('electron')


app.config.globalProperties.$electron = electron
const pinia = createPinia();
//添加持久化插件
pinia.use(piniaPersist)
app.use(pinia);
app.use(router);
// app.use(vue3videoPlay)

app.mount('#app');
