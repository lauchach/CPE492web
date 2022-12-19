<template>
  <div class="admin">
<div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <!-- <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#"> -->
        <a id="show-sidebar" class="btn btn-sm btn-dark" href="#">
            <i class="fas fa-bars"></i>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">Admin ระบบเทียบโอน</a>
                    <!-- <div id="close-sidebar" @click="closeMenu"> -->
                     <div id="close-sidebar">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header">
                    <div class="user-pic">
                        <img class="img-responsive img-rounded" src="/img/user.png" alt="User picture">
                    </div>
                    <div class="user-info">
                        <span class="user-name">Name
                            <input v-model="name" class="form-control">
                            <strong>EnRSU</strong>
                        </span>
                        <span class="user-role"> <input v-model="email" class="form-control"> </span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>

                        <li>
                            <router-link to="/admin/overview">
                            <!-- <router-link :to="{path: '/admin/overview'}"> -->
                                <i class="fa fa-chart-line"></i>
                                <span>รายการเทียบโอนทั้งหมด</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/subjectmap">
                                <i class="fab fa-amazon"></i>
                                <span>แผนรายวิชาเทียบโอน</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/newrecord">
                                <i class="fa fa-shopping-cart"></i>
                                <span>คำรองขอการเทียบโอนใหม่</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/admin/Allprofile">
                                <i class="fa fa-user"></i>
                                <span>จัดการบัญชีผู้ใช้</span>
                            </router-link>
                        </li>
                        <li>
                            <button class="btn btn-outline-danger my-2 my-sm-0" @click="logout">logout</button>
                            <!-- <a href="#" @click="logout">
                                <i class="fa fa-power-off"></i>
                                <span>Logout</span>
                            </a> -->
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
        </nav>
        <!-- sidebar-content  -->
        <main class="page-content">
            <router-view/>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
export default {
  name: 'admin',
  components: {
  },
  data () {
    return {
      email: JSON.parse(localStorage.getItem('userData')).student_mail,
      name: JSON.parse(localStorage.getItem('userData')).student_name,
      rsuid: JSON.parse(localStorage.getItem('userData')).rsuid
    }
  },
  created () {
    console.log('---> ', JSON.parse(localStorage.getItem('userData')))
  },
  methods: {
    logout () {
      console.log('log logout')
      localStorage.clear()
      this.$router.replace('/')
    }
  }
}
</script>
