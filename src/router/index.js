import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// Admin
import Admin from '../views/Admin.vue'
import Transfer from '../views/views_user/Transfer.vue'
import Overview from '../views/views_admin/Overview.vue'
import Subjectmap from '../views/views_admin/Subjectmap.vue'
import AllProfile from '../views/views_admin/AllProfile.vue'
import Newrecord from '../views/views_admin/Newrecord.vue'
// User
import Profileviews from '../views/Profileviews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: [
      {
        path: 'Overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'Subjectmap',
        name: 'Subjectmap',
        component: Subjectmap
      },
      {
        path: 'AllProfile',
        name: 'AllProfile',
        component: AllProfile
      },
      {
        path: 'Newrecord',
        name: 'Newrecord',
        component: Newrecord
      }
    ]
  },
  {
    path: '/Profileviews',
    name: 'Profileviews',
    component: Profileviews
  },
  {
    path: '/Transfer',
    name: 'Transfer',
    component: Transfer
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
