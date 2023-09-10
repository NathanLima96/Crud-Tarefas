import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import register from '../views/registerView.vue'
import login from '../views/LoginView.vue'
import TarefaView from '../views/TarefaView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/register',
    name: 'registerView',
    component: register
  },
  {
    path: '/login',
    name: 'LoginView',
    component: login
  },
  {
    path: '/tarefa',
    name: 'TarefaView',
    component: TarefaView
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
