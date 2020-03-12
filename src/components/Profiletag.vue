<template>
  <div class= "Profiletag">
    <div class="profiletaggroup">
      <h3>Profiletag Test</h3>
          <label for="validationCustom01">ระหัสประจำตัวนักศึกษา</label>
          <input v-model="rsuid" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required>
        <div class="valid-feedback">
          Looks good!
        </div>
          <div class="mb-1">
      <label for="validationCustom03">Name</label>
      <input v-model="name" class="form-control" id="validationCustom03" placeholder="City" required>
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
          </div>
      <div class="col-md-19">
        <label for="validationCustom02">Email</label>
        <input v-model="email" class="form-control" id="validationCustom02" required>
      </div>
      ทำงานใน
    </div>
      </div>
</template>

<script>
export default {
  name: 'Profiletag',
  props: {
    msg: String
  },
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
  }
}
</script>
