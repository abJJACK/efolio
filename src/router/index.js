import { createRouter, createWebHistory } from 'vue-router';
import Form from '../components/Form.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '../views/LoginView.vue';
import AccessDenied from '../views/AccessDenied.vue';
import FirebaseSigninView from '../views/FirebaseSigninView.vue';
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'; // 导入注册页面组件
import AddBookView from '../views/AddBookView.vue'; 
import GetBookCountView from '../views/GetBookCountView.vue'; 
import WeatherView from '@/views/WeatherView.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Form,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }, // 受限页面
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied,
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path: '/register',  // 注册页面的路由
    name: 'Register',
    component: FirebaseRegisterView,  // 对应的注册组件
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView,
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'AccessDenied' });
  } else {
    next();
  }
});

export default router;