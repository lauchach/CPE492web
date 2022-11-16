<template>
  <div class= "Profiletag">
    <div class="profiletaggroup">
          <label for="validationCustom01">ระหัสประจำตัวนักศึกษา</label>
          <input v-model="rsuId" class="form-control" id="validationCustom01" placeholder="ยังไม่มีข้อมูล" value="Mark" required>
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
    </div>
      </div>
</template>

<script>
import { Config } from '../config'
import axios from 'axios'
export default {
  name: 'Profiletag',
  props: {
    msg: String
  },
  components: {
  },
  data () {
    return {
      rsuId: '',
      name: '',
      email: JSON.parse(localStorage.getItem('userData')).student_mail
    }
  },
  created () {
    console.log('--Profiletag-> ', JSON.parse(localStorage.getItem('userData')))
    this.setData()
  },
  methods: {
    // setData () {
    //   this.rsuid = JSON.parse(localStorage.getItem('userData')).detail.rsuId || ''
    //   this.name = JSON.parse(localStorage.getItem('userData')).studentData.student_name
    // },
    async setData () {
      let uri = `${Config.APIURL}${Config.PART.GETPROFILE}`
      axios.post(uri, {
        email: JSON.parse(localStorage.getItem('userData')).email || ''
      }).then(responseLogin => {
        console.log('RESPONSE API setData', responseLogin)
        if (responseLogin.data.status.code === 0) {
          // localStorage.setItem('userData', JSON.stringify(responseLogin.data.data))
          let res = responseLogin.data.data
          console.log('auth pass res', res)
          if (res) {
            this.email = res.email
            this.nname = res.detail.nname || ''
            this.name = `${res.detail.name} ${res.detail.lastname}` || ''
            this.lastname = res.detail.lastname || ''
            this.rsuId = res.detail.rsuId || ''
            this.tel = res.detail.tel || ''
            this.highschool = res.detail.highschool || ''
            this.major = res.detail.major || ''
            this.gpa = res.detail.gpa || ''
          } else {
            alert('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง')
          }
        } else {
          alert('รหัสผิดพลาด')
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    }
  }
}
</script>
