<template>
  <div class="home">
    <Navbar></Navbar>
      <Hero/>
      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/3.png" alt="" width="400">  <!-- ส่วนเเสดงรูปภาพ -->
          </div>
          <div class="col-md-6">
            <p>
            </p>
          </div>
        </div>
      </div>
      <login></login>
  </div>
</template>

<script>
import Hero from '@/components/Hero.vue' // การนำเข้า components Hero
import Login from '@/components/Login.vue' // การนำเข้า components Login
export default { 
  name: 'home', // export หน้า page เพื่อใช้ใน router
  components: { // components ที่เกี่ยวข้องในหน้าเพจนี้ // components ที่เกี่ยวข้องในหน้าเพจนี้
    Hero, Login
  }
}
</script>
