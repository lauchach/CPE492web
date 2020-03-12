<template>
  <div class="home">
      <Navbar></Navbar>
      <!-- <Hero/> -->
      <login></login>
    <div class="inputtextgroup">
      <Profiletag></Profiletag>
      <div class="inputtextgroup2">
        <div class="container"><h1>กรอกข้อมูล</h1></div>
        <!-- <input type="text" id="rsuid" placeholder="กรอกระหัสประจำตัวนักศึกษา"> -->
        <input type="text" v-model="rsuid" placeholder="กรอกระหัสประจำตัวนักศึกษา">
        <input type="text" v-model="nname" placeholder="คำนำหน้าชื่อ">
        <input type="text" v-model="name" placeholder="กรอกชื่อจริง และ นามสกุล">
        <input type="text" v-model="tel" placeholder="หมายเลขโทรศัพท์/โทรศัพท์มือถือ">
        <input type="text" v-model="highschool" placeholder="ชื่อสถาบันเดิม">
        <input type="text" v-model="major" placeholder="สาขาวิชา">
        <input type="text" v-model="cgpa" placeholder="CGPA">
        <button class="btn1" @click="addDataProfile">เพิ่มข้อมูล</button>
      </div>
      <!-- <products-list></products-list> -->
      <div class="container h-100">
        <div class="row p-5 h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/1.jpg" alt="" width="400">
          </div>
          <div class="col-md-6">
            <input v-model="email" placeholder="edit me">
            <h3>Profileviews test</h3>
             <button class="btn custom-btn btn-outline-primary mr-4">Button test</button>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>
<script>
import { fb } from '../firebase'
// @ is an alias to /src
export default {
  name: 'Profileviews',
  components: {
  },
  data () {
    return {
      email: JSON.parse(localStorage.getItem('userData')).student_mail,
      name: JSON.parse(localStorage.getItem('userData')).student_name,
      rsuid: JSON.parse(localStorage.getItem('userData')).rsuid,
      nname: JSON.parse(localStorage.getItem('userData')).student_n_name,
      tel: JSON.parse(localStorage.getItem('userData')).student_tel,
      highschool: JSON.parse(localStorage.getItem('userData')).student_highschool,
      major: JSON.parse(localStorage.getItem('userData')).student_major,
      cgpa: JSON.parse(localStorage.getItem('userData')).student_gpa
    }
  },
  created () {
    console.log('email ', this.rsuid)
  },
  methods: {
    addDataProfile () {
      console.log(this.email)
      const db = fb.firestore()
      db.collection('MEMBER_TABLE').where('student_mail', '==', this.email).get().then(Show => {
        Show.forEach(doc => {
          console.log(doc.id, '=>', doc.data())
          console.log(doc.id)
          // var fileid = doc.id
          var flieid = db.collection('MEMBER_TABLE').doc(doc.id)
          flieid.update({
            student_n_name: this.nname,
            student_name: this.name,
            rsuid: this.rsuid,
            student_tel: this.tel,
            student_highschool: this.highschool,
            student_major: this.major,
            student_gpa: this.cgpa
          })
          alert('สำเร็จ')
        })
      })
      return {
        nname: '',
        name: '',
        rsuid: '',
        tel: '',
        highschool: '',
        major: '',
        cgpa: ''
      }
    }
  }
}
</script>
