<template>
  <div class="home">
      <Navbar></Navbar>
      <login></login>
    <div class="inputtextgroup">
      <Profiletag></Profiletag>
      <div class="inputtextgroup2">
        <div class="container"><h1>เทียบโอน</h1></div>
      <div class= 'inputtextgroup2'>
      <input type="text" v-model="rsuid" class="inboxput" placeholder="กรอกระหัสประจำตัวนักศึกษา">
      <table class="transfer-table">
        <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ปุ่ม</th>
            <th>ชื่อวิชา</th>
            <th>หน่วยกิต</th>
            <th>เกรด</th>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชา</th>
            <th>หน่วยกิต</th>
            <th>เกรด</th>
            <!-- <th>สถานะ</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in tagitem" :key="i">
            <td v-if="item.loopSubjectId.length">
            <div class="dropdown">
              <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Tutorials
              <span class="caret"></span></button>
              <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                <li>{{item.loopSubjectId}}</li>
              </ul>
            </div>
            </td>
            <!-- <td v-if="tagitem.length - 1 === i"><input type="text-on-table-ids" v-model="subjectid" placeholder="3000-XXXX"></td>
            <td v-else-if="a"><input type="text-on-table-ids" v-model="item.subjectid" placeholder="3000-XXXX"></td>
            <td v-else></td> -->
            <td v-if="tagitem.length - 1 === i"><input type="text-on-table-ids" v-model="subjectid" placeholder="3000-XXXX"></td>
            <td v-else><input type="text-on-table-ids" v-model="item.subjectid" placeholder="3000-XXXX"></td>
            <td><button class="btnmapping" @click="mapping">ตรวจสอบ</button></td>
            <td>{{item.subjectName}}</td>
            <td>{{item.subjectCredit}}</td>
            <td>{{item.subjectgpa}}</td>
            <td>{{item.subjectRSUid}}</td>
            <td>{{item.subjectRSUname}}</td>
            <td v-if="Number(item.subjectCredit) === 1 || Number(item.subjectCredit) === 2" :rowspan="2">{{item.subjectRSUCredit}}</td>
            <td v-else :rowspan="1">{{item.subjectRSUCredit}}</td>
            <!-- <td  :rowspan="3">{{item.subjectRSUCredit}}</td> -->
          </tr>
        </tbody>
        <button class="btnmapping" @click="pushrow">+</button>
      </table>
       </div>
      </div>
      </div>
  </div>
</template>
<script>
import { fb } from '../../firebase'
// @ is an alias to /src
export default {
  name: 'Transfer',
  components: {
  },
  data () {
    return {
      rsuid: JSON.parse(localStorage.getItem('userData')).rsuid,
      subjectid: '',
      subjectName: '',
      subjectCredit: '',
      subjectRSUid: '',
      subjectRSUname: '',
      subjectRSUCredit: '',
      loopSubjectId: '',
      tagitem: [{
        subjectid: '',
        subjectName: '',
        subjectCredit: '',
        subjectRSUid: '',
        subjectRSUname: '',
        subjectRSUCredit: '',
        loopSubjectId: []
      }]
    }
  },
  methods: {
    mapping () {
      console.log('this.subjectid', this.subjectid)
      // console.log(true)
      const db = fb.firestore()
      db.collection('MAPPIN_TABLE').where('subject', 'array-contains', this.subjectid).get().then(Show => {
        Show.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          // console.log(doc.id)
          this.subjectRSUid = doc.id
          // console.log(this.subjectRSUid)
        })
        db.collection('SUBJECT_RSU_TABLE').where('Subject_id', '==', this.subjectRSUid).get().then(Show => {
          Show.forEach(doc => {
            // console.log(doc.id, '=>', doc.data())
            // console.log('Subject_Name:', doc.data())
            this.subjectRSUname = doc.data().Subject_Name
            this.subjectRSUCredit = doc.data().Subject_Credit
          })
        })
        db.collection('SUBJECT_TABLE').where('Subject_id', '==', this.subjectid).get().then(Show => {
          Show.forEach(doc => {
            // console.log(doc.id, '=>', doc.data())
            // console.log('Subject_Name:', doc.data())
            this.subjectName = doc.data().Subject_Name
            this.subjectCredit = doc.data().Subject_Credit
            if (this.subjectCredit === this.subjectRSUCredit) {
              console.log('if')
              this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
              this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
              this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
              this.tagitem[this.tagitem.length - 1].subjectRSUid = this.subjectRSUid
              this.tagitem[this.tagitem.length - 1].subjectRSUname = this.subjectRSUname
              this.tagitem[this.tagitem.length - 1].subjectRSUCredit = this.subjectRSUCredit
              this.tagitem[this.tagitem.length - 1].loopSubjectId = []
            } else {
              console.log('else')
              alert('else')
              this.loopSubjectId = this.subjectid
              this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
              this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
              this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
              this.tagitem[this.tagitem.length - 1].subjectRSUid = this.subjectRSUid
              this.tagitem[this.tagitem.length - 1].subjectRSUname = this.subjectRSUname
              this.tagitem[this.tagitem.length - 1].subjectRSUCredit = this.subjectRSUCredit
              this.tagitem[this.tagitem.length - 1].loopSubjectId = []
              // console.log(this.tagitem)
              this.tagitem.push({
                // subjectid: '',
                subjectName: '',
                subjectCredit: '',
                subjectRSUid: '',
                subjectRSUname: '',
                subjectRSUCredit: '',
                loopSubjectId: []
              })
              const db = fb.firestore()
              db.collection('MAPPIN_TABLE').where('subject2plus1', 'array-contains', this.loopSubjectId).get().then(Show => {
                Show.forEach(doc => {
                  this.tagitem[this.tagitem.length - 1].loopSubjectId = doc.data().subject2plus1
                })
              })
              console.log('tagitem', this.tagitem)
            }
          })
        })
      })
    }
    // ,
    // pushrow () {
    //   this.subjectid = ''
    //   this.tagitem.push({
    //     subjectName: '',
    //     loopSubjectId: []
    //   })
    // }
  }
}
</script>
