import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/notes',
    name: 'notes',
    component: () => import('components/list_notes'),
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('src/components/create_note'),
  },
  {
    path: '/:id/update',
    name: 'update',
    props: true,
    component: () => import('src/components/update_note'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('src/components/404'),
  },
]

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: 'history',
})

export { routes, router }
