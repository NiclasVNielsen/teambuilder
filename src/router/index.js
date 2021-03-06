import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import ('../views/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import ('../views/Profile.vue')
  },
  {
    path: '/player/:username',
    name: 'Player',
    component: () => import ('../views/Player.vue')
  },
  {
    path: '/team/:teamname',
    name: 'Team',
    component: () => import ('../views/Team.vue')
  },
  {
    path: '/createteam/',
    name: 'CreateTeam',
    component: () => import ('../views/CreateTeam.vue')
  },
  {
    path: '/tournaments',
    name: 'Tournaments',
    component: () => import ('../views/Tournaments.vue')
  },
  {
    path: '/createTournament',
    name: 'CreateTournament',
    component: () => import ('../views/CreateTournament.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
