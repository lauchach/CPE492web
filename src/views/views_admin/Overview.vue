<template>
  <div class="Overviwe">
    <div class="container">
      <h3>Overview Tast</h3>
    </div>
     <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      <th scope="col">Handle</th>
    </tr>
    <button class="btn btn-primary" @click="login">Login</button>
  </thead>
      </table>
  </div>
</template>

<script>

</script>
<script>
export default {
  name: 'Overview',
  props: {
    msg: String
  }
}
</script>
