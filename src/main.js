// คำสั่งเริ่มให้งาน client npm run serve ทำงานผ่าน file package.json
import Vue from 'vue' // เรียกใช้งาน "vue": "^2.6.10"
import App from './App.vue' 
import router from './router' // เรียกใช้งาน "router"
import 'popper.js'
import 'bootstrap'
import './assets/app.scss'
import jQuery from 'jquery'
import '../dist/css/style.css' // เรียกใช้งาน style.css

window.$ = window.jQuery = jQuery

Vue.config.productionTip = false
Vue.component('Navbar', require('./components/Navbar.vue').default) // เรียกใช้งาน Navbar.vue และกำหนด component Navbar
Vue.component('Profiletag', require('./components/Profiletag.vue').default) // เรียกใช้งาน Profiletag.vue และกำหนด component Profiletag
Vue.component('Login', require('./components/Login.vue').default) // เรียกใช้งาน Login.vue และกำหนด component Login
new Vue({
  router, // เรียกใช้งาน file router file ที่เก็บที่อยู่หน้า page ต่างๆ
  render: h => h(App)
}).$mount('#app')
