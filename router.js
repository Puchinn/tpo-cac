import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './index.html'
import JugarView from './Jugar.vue'
import AcercaView from './Acerca.vue'
import FeedbackView from './Feedback.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/jugar',
    name: 'Jugar',
    component: JugarView
  },
  {
    path: '/acerca',
    name: 'AAcerca',
    component: AcercaView
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: FeedbackView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router