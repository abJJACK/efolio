import { createApp } from 'vue';
import App from './App.vue';  // 使用 App.vue 作为主组件
import router from './router'; // 导入路由器
import 'bootstrap/dist/css/bootstrap.min.css'; // 导入 Bootstrap 样式
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Aura from '@primevue/themes/aura';
import { initializeApp } from "firebase/app"; // 导入 Firebase 初始化函数

// 创建应用实例，使用 App.vue 作为主组件
const app = createApp(App);

// 使用 PrimeVue 插件，并配置主题
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

// 全局注册 PrimeVue 组件
app.component('DataTable', DataTable);
app.component('Column', Column);

// 使用路由器
app.use(router);

// 挂载应用到 #app 元素
app.mount('#app');

// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyDGgtD3MjhuhBjBa8zHYl8INWftKsRbJcE",
    authDomain: "week7-taimin.firebaseapp.com",
    projectId: "week7-taimin",
    storageBucket: "week7-taimin.appspot.com",
    messagingSenderId: "734508010628",
    appId: "1:734508010628:web:c3a18addb5f58eaee506d1"
  };

// 初始化 Firebase
initializeApp(firebaseConfig);