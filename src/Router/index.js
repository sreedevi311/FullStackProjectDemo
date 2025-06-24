import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import MovieDetail from '../components/MovieDetail.vue'
import Directors from '../components/Directors.vue'
import Actors from '../components/Actors.vue'
import SearchResults from '../components/SearchResults.vue'

const routes = [
  { path: '/',
    component: Main 
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
},
{
  path: '/search-results',
  name: 'SearchResults',
  component: SearchResults
},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
