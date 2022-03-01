<template>
   <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light">
     <div class="container">
        <router-link class="navbar-brand" to="/">ระบบเทียบโอน</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link" href="#">รายละเอียดวิชา</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" href="#">ติดต่อ</router-link>
            </li>
          <li class="nav-item">
              <router-link to="/Transfer" class="nav-link" href="#">ระบบเทียบโอน</router-link>
            </li>
          </ul>
          <form v-if="!rsuid" class="form-inline my-2 my-lg-0">
            <a class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#login">Login</a>
            <a class="btn btn-outline-info border-0 mx-2 my-2 my-sm-0" data-toggle="modal" data-target="#miniCart">
              <i class="fas fa-cart-plus"></i>
            </a>
          </form>
            <form v-else class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-danger my-2 my-sm-0" @click="logout">logout</button>
          </form>
        </div>
     </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  components: {},
  data () {
    return {
      data: [],
      counter: 1,
      rsuid: JSON.parse(localStorage.getItem('userData')).rsuid
    }
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @media (min-width: 992px)
  {.navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background-color: #fff !important;
    }
   }

</style>
