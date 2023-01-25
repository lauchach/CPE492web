// คำสั่งเริ่มให้งาน โดยเรียกจาก file main.js
import Vue from 'vue' // เรียกใช้งาน "vue": "^2.6.10"
import VueRouter from 'vue-router' // เรียกใช้งาน "vue-router"
//
import Home from '../views/Home.vue' // เรียกใช้งานเพจ Home โดยประกาศ Home class ที่ export ไว้
// Admin
import Admin from '../views/Admin.vue' // เรียกใช้งานเพจ Admin โดยประกาศ Admin class ที่ export ไว้
import Transfer from '../views/views_user/Transfer.vue' // เรียกใช้งานเพจ Transfer โดยประกาศ Transfer class ที่ export ไว้
import Overview from '../views/views_admin/Overview.vue' // เรียกใช้งานเพจ Overview โดยประกาศ Overview class ที่ export ไว้
import Subjectmap from '../views/views_admin/Subjectmap.vue' // เรียกใช้งานเพจ Subjectmap โดยประกาศ Subjectmap class ที่ export ไว้
import AllProfile from '../views/views_admin/AllProfile.vue' // เรียกใช้งานเพจ AllProfile โดยประกาศ AllProfile class ที่ export ไว้
import Newrecord from '../views/views_admin/Newrecord.vue' // เรียกใช้งานเพจ Newrecord โดยประกาศ Newrecord class ที่ export ไว้
import Printpage from '../views/views_admin/Printpage.vue' // เรียกใช้งานเพจ Printpage โดยประกาศ Printpage class ที่ export ไว้
import prints from '..//views/views_user/prints.vue' // เรียกใช้งานเพจ prints โดยประกาศ prints class ที่ export ไว้
// User
import Profileviews from '../views/Profileviews.vue' // เรียกใช้งานเพจ Profileviews โดยประกาศ Profileviews class ที่ export ไว้

Vue.use(VueRouter)

const routes = [ // กำหนดตัวแปล routes เป็น Object[] รูปแบบที่นำไปใช้ใน VueRouter
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
    path: '/prints',
    name: 'prints',
    component: prints
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Printpage',
    name: 'Printpage',
    component: Printpage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router 
