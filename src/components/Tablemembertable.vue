<template>
  <table class='table table-bordered'>
    <thead>
      <tr>
        <th>รหัสนักศึกษา</th>
        <th>ชื่อ นามสกุล</th>
        <th>สาขา</th>
        <th>สถานะ</th>
      </tr>
      <tr v-for='(item, i) in userlist' :key='i'>
        <th>{{ item.rsuId }}</th>
        <th>{{ item.name }}</th>
        <th>{{ item.major }}</th>
        <th>{{ item.status }}</th>
        <th>
          <button class='btn btn-primary' @click='editProfile(item.rsuId)'>
            แก้ไข
          </button>
        </th>
      </tr>
      <v-data-table
        :headers='headers'
        :items='desserts'
        :items-per-page='5'
        class='elevation-1'
      ></v-data-table>
      <!-- <tr v-if='data.length === i'> -->
      <!-- <td v-if='loopSubjectId && (subjectRequt + 1) % 2 === 0'></td> -->
      <!-- <td>{{item.subjectName}}</td>
        <td>{{item.subjectCredit}}</td>
        <td>{{item.subjectRSUid}}</td>
        <td>{{item.subjectRSUname}}</td> -->
      <!-- </tr> -->
    </thead>
    <!-- <tr id='row-1'><td>test</td></tr> -->
    <!-- Modal -->
    <div class='col-md-6' align='right'>
      <input
        type='button'
        class='btn btn-success btn-xs'
        @click='openModel'
        value='Add'
      />
    </div>
    <!-- <div v-if="myModel">
    <transition name="model">
     <div class="modal-mask">
      <div class="modal-wrapper">
       <div class="modal-dialog">
        <div class="modal-content">
         <div class="modal-header">
          <button type="button" class="close" @click="myModel=false"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ dynamicTitle }}</h4>
         </div>
         <div class="modal-body">
          <div class="form-group">
           <label>Enter First Name</label>
           <input type="text" class="form-control" v-model="first_name" />
          </div>
          <div class="form-group">
           <label>Enter Last Name</label>
           <input type="text" class="form-control" v-model="last_name" />
          </div>
          <br />
          <div align="center">
           <input type="hidden" v-model="hiddenId" />
           <input type="button" class="btn btn-success btn-xs" v-model="actionButton" @click="submitData" />
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </transition>
   </div> -->
  </table>
</template>
<script>
import { fb } from '../firebase' // เรียกใช้งาน fb จาก firebase.js
import bootstrap from 'bootstrap'
const db = fb.firestore() // กำหนด fb.firestore() ไวในตัวแปล db
// const table = document.querySelector('tbuser')
export default {
  name: 'Tablemembertable',
  props: {
    msg: String
  },
  data () {
    return {
      userlist: [],
      myModel: false
    }
  },
  async created () { // สั่งให้หน้าเพจทำเริ่มทำงานฟังชั่นที่ต้องการ
    await db
      .collection('users')
      .get()
      .then((userShow) => {
        userShow.forEach(async (doc) => {
          if (doc.data().type !== 'admin') {
            let data = doc.data()
            this.userlist.push({
              rsuId: data.detail.rsuId || '-',
              name: data.detail.name || '-',
              major: await this.generateTextMajor(data.detail.major),
              status: data.status || '-'
            })
          }
        })
      })
  },
  methods: { // ''// methods ของหน้าเพจ"
    openModel () {
      this.first_name = ''
      this.last_name = ''
      this.actionButton = 'Insert'
      this.dynamicTitle = 'Add Data'
      this.myModel = true
    },
    editProfile (data) {
      const myModalAlternative = new bootstrap.Modal('#staticBackdrop', {
        show: 0,
        hide: 150
      })
      document.onreadystatechange = function () {
        myModalAlternative.show()
      }
    },
    generateStatus (data) {
      switch (data.status) {
        case 0:
          data.status = 'ยังไม่มีการดำเนินการ'
          break
        default:
          data.status = 'กรอกข้อมูลประจำตัวเเล้ว'
          break
      }
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
</script>
