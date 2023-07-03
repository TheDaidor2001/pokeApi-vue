import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon/:id',
      name: 'pokemons',
      component: () => import('../views/PokemonView.vue')
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('../views/FavoritosView.vue')
    },
  ]
})

export default router
