import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Messages from"@/views/Messages.vue";

const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: Profile, 
    props:true 
  },

{
  name:'messages',
  path:'/messages',
  component: Messages,
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;