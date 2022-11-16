<template>
  <table class="table table-bordered">
  <thead>
    <tr>
      <th>รหัสนักศึกษา</th>
      <th>ชื่อ นามสกุล</th>
      <th>สาขา</th>
      <th>สถานะ</th>
    </tr>
    <tr v-for="(item, i) in userlist" :key="i">
        <th>{{item.rsuId}}</th>
        <th>{{item.name}}</th>
        <th>{{item.major}}</th>
        <th>{{item.status}}</th>
        <th>
          <input type="reset" value="แก้ไข">
        </th>
      </tr>
        <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
      <!-- <tr v-if="data.length === i"> -->
        <!-- <td v-if="loopSubjectId && (subjectRequt + 1) % 2 === 0"></td> -->
        <!-- <td>{{item.subjectName}}</td>
        <td>{{item.subjectCredit}}</td>
        <td>{{item.subjectRSUid}}</td>
        <td>{{item.subjectRSUname}}</td> -->
      <!-- </tr> -->
  </thead>
  <!-- <tr id="row-1"><td>test</td></tr> -->
</table>
</template>
<script>

import { fb } from '../firebase'
const db = fb.firestore()
// const table = document.querySelector('tbuser')
export default {
  name: 'Tablemembertable',
  props: {
    msg: String
  },
  data () {
    return {
      userlist: []
    }
  },
  async created () {
    console.log('144')
    await db.collection('users').get().then(userShow => {
      userShow.forEach(async (doc) => {
        console.log('146', doc.data())
        if (doc.data().type !== 'admin') {
          console.log('doc.data()', doc.data())
          let data = doc.data()
          // this.userlist = [...this.userlist, {
          //   rsuid: doc.data().rsuid,
          //   name: doc.data().studentData.student_name,
          //   major: doc.data().studentData.student_major,
          //   status: doc.data().rsuid
          // }]
          console.log(
            {
              rsuId: data.detail.rsuId || '-',
              name: data.detail.name || '-',
              major: await this.generateTextMajor(data.detail.major),
              status: data.status || '-'
            }
          )
          this.userlist.push({
            rsuId: data.detail.rsuId || '-',
            name: data.detail.name || '-',
            major: await this.generateTextMajor(data.detail.major),
            status: data.status || '-'
          })
        }
      })
      console.log('164', this.userlist)
    })
  },
  methods: {
    generateStatus (data) {
      switch (data.status) {
        case 0:
          data.status = 'ยังไม่มีการดำเนินการ'
          break
        default:
          data.status = 'กรอกข้อมูลประจำตัวเเล้ว'
          break
      }
      console.log('107data', data)
    },
    generateTextMajor (major) {
      switch (major) {
        case 'cpe':
          major = 'วิศวกรรมคอมพิวเตอร์'
          break
        default:
          major = ''
          break
      }
      return major
    }
  }
}

// created:
//     db.collection('MEMBER_TABLE').get().then(userShow => {
//       userShow.forEach(doc => {
//         console.log(doc.id, '=>', doc.data())
//         showData(doc.data())
//       })
//     })
// }
// function showData (doc) {
//   var row = table.inserRow(-1)
//   var cell1 = row.insreCell(0)
//   var cell2 = row.insreCell(1)
//   var cell3 = row.insreCell(2)
//   var cell4 = row.insreCell(3)
//   cell1.innerHTML = doc.data().rsuid
//   cell2.innerHTML = doc.data().name
//   cell3.innerHTML = doc.data().email
//   cell4.innerHTML = doc.data().email
// }
</script>
