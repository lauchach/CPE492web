<template>
    <div class="hero">
        <div class="container h-100">
          <div class="row h-100 justify-content align-items-center">
            <div class="col-md-5">
              <div class="hero-content">
                <h1 class="hero-title">
                  ระบบเทียบโอนรายวิชา
                </h1>
                <h4>(สำหรับนักศึกษา ปวส.)</h4>
                <div class="hero-btn mt-5">
                    <button class="btn custom-btn btn-info mr-4">Explore</button>
                    <button class="btn custom-btn btn-outline-secondary">Products</button>
                </div>
              </div>
            </div>
            <div class="col-md-7">
                <div class="graphic">
                    <img src="/img/svg/1.jpg" alt="" width="133%" >
                </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    msg: String
  }
}
</script>
<style scoped lang="scss">
  .hero{
    padding-top: 0rem;
    padding-bottom: 0px;
    margin-bottom: 8%;
    width: 100%;
    height: 500px;
    text-align: left;
  }

</style>
