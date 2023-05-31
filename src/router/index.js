import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
      path:'/todo-list',
      name:'todolist',
      component: () => import('../views/TodoList.vue')
  },
  {
      path:'/issue-list',
      name:'IssueList',
      component: () => import('../views/IssueList.vue')
  },
  {
      path:'/todos-issues',
      name:'TodosIssues',
      component:() => import('../views/TodosIssues.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
