<template>
  <div class= "Profiletag">
    <div class="profiletaggroup">
      <h3>Profiletag Test</h3>
          <label for="validationCustom01">ระหัสประจำตัวนักศึกษา</label>
          <input v-model="rsuid" class="form-control" id="validationCustom01" placeholder="ยังไม่มีข้อมูล" value="Mark" required>
        <div class="valid-feedback">
          Looks good!
        </div>
          <div class="mb-1">
      <label for="validationCustom03">Name</label>
      <input v-model="name" class="form-control" id="validationCustom03" placeholder="ยังไม่มีข้อมูล" required>
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
          </div>
      <div class="col-md-19">
        <label for="validationCustom02">Email</label>
        <input v-model="email" class="form-control" id="validationCustom02" placeholder="ยังไม่มีข้อมูล" required>
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
      rsuid: '',
      name: '',
      email: JSON.parse(localStorage.getItem('userData')).student_mail
    }
  },
  created () {
    console.log('---> ', JSON.parse(localStorage.getItem('userData')))
    this.setData()
  },
  methods: {
    setData () {
      if (JSON.parse(localStorage.getItem('userData')).rsuid !== '' &&
          JSON.parse(localStorage.getItem('userData')).studentData.student_name !== '') {
        this.rsuid = JSON.parse(localStorage.getItem('userData')).rsuid
        this.name = JSON.parse(localStorage.getItem('userData')).studentData.student_name
      }
    }
  }
}
</script>
