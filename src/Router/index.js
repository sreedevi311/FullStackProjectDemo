import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import MovieDetail from '../components/MovieDetail.vue'
import Directors from '../components/Directors.vue'
import Actors from '../components/Actors.vue'

const routes = [
  { path: '/',
    component: Home 
  },
  {
  path: '/movies/:id',
  name: 'MovieDetail',
  component: MovieDetail
  },
  {
  path: '/directors',
  component: Directors
},{
  path:'/actors',
  component: Actors
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
