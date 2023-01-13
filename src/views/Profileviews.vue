<template>
<div class="container">
  <div class="profile">
      <Navbar></Navbar>
      <!-- <Hero/> -->
      <login></login>
    <div class="inputtextgroup">
      <Profiletag></Profiletag>
      <div class="inputtextgroup2">
        <div class="container"><h1>กรอกข้อมูล</h1></div>
        <input type="text" v-model="rsuId" placeholder="กรอกระหัสประจำตัวนักศึกษา">
        <input type="text" v-model="nname" placeholder="คำนำหน้าชื่อ">
        <input type="text" v-model="name" placeholder="กรอกชื่อจริง">
        <input type="text" v-model="lastname" placeholder="นามสกุล">
        <input type="text" v-model="tel" placeholder="หมายเลขโทรศัพท์/โทรศัพท์มือถือ">
        <input type="text" v-model="highschool" placeholder="ชื่อสถาบันเดิม">
        <input type="text" v-model="major" placeholder="สาขาวิชา ใช้เป็นตัวย่อภาษาอังกฤษ">
        <input type="text" v-model="gpa" placeholder="CGPA">
        <button class="btn1" @click="addDataProfile">เพิ่มข้อมูล</button>
      </div>
      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/1.jpg" alt="" width="400">
          </div>
        </div>
      </div>
  </div>
  </div>
  </div>
</template>
<script>
// import { fb } from '../firebase'
import { Config } from '../config'
import axios from 'axios'
// @ is an alias to /src
export default {
  name: 'Profileviews',
  components: {
  },
  data () {
    return {
      email: JSON.parse(localStorage.getItem('userData')).email,
      nname: '',
      name: '',
      rsuId: '',
      lastname: '',
      tel: '',
      highschool: '',
      major: '',
      gpa: ''
    }
  },
  created () {
    console.log('email', this.email)
    console.log('JSON.parse(localStorage.getItem(userData))', JSON.parse(localStorage.getItem('userData')))
    this.setData()
  },
  methods: {
    addDataProfile () {
      let uri = `${Config.APIURL}${Config.PART.PROFILEUPDATA}`
      axios.post(uri, {
        email: this.email,
        status: 'รอข้อมูลเพิ่มเติม',
        detail: {
          nname: this.nname,
          name: this.name,
          rsuId: this.rsuId,
          lastname: this.lastname,
          tel: this.tel,
          highschool: this.highschool,
          major: this.major,
          gpa: this.gpa
        }
      }).then(response => {
        console.log('RESPONSE API LOGIN', response)
        if (response.data.status.code === 0) {
          localStorage.setItem('userData', JSON.stringify(response.data.data))
          let res = response.data.data
          console.log('responseRegister res', res)
          alert(`${response.data.status.message}`)
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    },
    // addDataProfile () {
    //   console.log('this.email:', this.email)
    //   const db = fb.firestore()
    //   db.collection('MEMBER_TABLE').where('student_mail', '==', this.email).get().then(Show => {
    //     Show.forEach(doc => {
    //       console.log(doc.id, '=>', doc.data())
    //       console.log(doc.id)
    //       var flieid = db.collection('MEMBER_TABLE').doc(doc.id)
    //       flieid.update({
    //         rsuid: this.rsuid,
    //         studentData: {
    //           student_n_name: this.nname,
    //           student_name: this.name,
    //           rsuid: this.rsuid,
    //           student_tel: this.tel,
    //           student_highschool: this.highschool,
    //           student_major: this.major,
    //           student_gpa: this.cgpa
    //         }
    //       })
    //       alert('สำเร็จ')
    //     })
    //   })
    //   return {
    //     nname: '',
    //     name: '',
    //     rsuid: '',
    //     tel: '',
    //     highschool: '',
    //     major: '',
    //     cgpa: ''
    //   }
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
            this.nname = res.detail.nname || ''
            this.name = res.detail.name || ''
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
    // setData () {
    //   if (JSON.parse(localStorage.getItem('userData')).studentData.student_name !== '' &&
    //     JSON.parse(localStorage.getItem('userData')).studentData.rsuid !== '' &&
    //     JSON.parse(localStorage.getItem('userData')).studentData.student_n_name !== '' &&
    //     JSON.parse(localStorage.getItem('userData')).studentData.student_tel !== '' &&
    //     JSON.parse(localStorage.getItem('userData')).studentData.student_highschool !== '' &&
    //     JSON.parse(localStorage.getItem('userData')).studentData.student_major !== '' &&
    //     JSON.parse(localStorage.getItem('userData')).studentData.student_gpa !== ''
    //   ) {
    //     this.name = JSON.parse(localStorage.getItem('userData')).studentData.student_name
    //     this.rsuid = JSON.parse(localStorage.getItem('userData')).studentData.rsuid
    //     this.nname = JSON.parse(localStorage.getItem('userData')).studentData.student_n_name
    //     this.tel = JSON.parse(localStorage.getItem('userData')).studentData.student_tel
    //     this.highschool = JSON.parse(localStorage.getItem('userData')).studentData.student_highschool
    //     this.major = JSON.parse(localStorage.getItem('userData')).studentData.student_major
    //     this.cgpa = JSON.parse(localStorage.getItem('userData')).studentData.student_gpa
    //   }
    // }
  }
}
</script>
