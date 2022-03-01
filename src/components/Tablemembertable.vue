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
        <th>{{item.rsuid}}</th>
        <th>{{item.name}}</th>
        <th>{{item.major}}</th>
        <th>{{item.status}}</th>
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
  <tr id="row-1"><td>test</td></tr>
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
      userlist: [],
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  async created () {
    await db.collection('MEMBER_TABLE').get().then(userShow => {
      userShow.forEach((doc) => {
        if (doc.data().type === 'user') {
          this.userlist = [...this.userlist, {
            rsuid: doc.data().rsuid,
            name: doc.data().studentData.student_name,
            major: doc.data().studentData.student_major,
            status: doc.data().rsuid
          }]
        }
      })
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
