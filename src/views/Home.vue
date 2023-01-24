<template>
  <div class="home">
    <Navbar></Navbar>
      <Hero/>
      <!-- <products-list></products-list> -->

      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/3.png" alt="" width="400">
          </div>
          <div class="col-md-6">
            <!-- <h3>ระบบเทียบโอนรายวิชาสำหรับนักศึกษา ปวส.</h3> -->
            <p>
            </p>
          </div>
        </div>
      </div>
      <login></login>
      <!-- <mini-cart></mini-cart> -->

  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue'
import Login from '@/components/Login.vue'
export default {
  name: 'home',
  components: {
    Hero, Login
  }
}
</script>
