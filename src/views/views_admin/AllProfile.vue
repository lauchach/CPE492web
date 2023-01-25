<template>
  <div class="container">
    <div v-if="!myModel">
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
            <th>{{ item.name }} {{ item.lastname }}</th>
            <th>{{ item.major }}</th>
            <th>{{ item.status }}</th>
            <th>
              <button class='btn btn-primary'
                data-toggle="modal"
                data-target="#exampleModal"
                @click='tabEditProfile(item)'
              >
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
        </thead>
        <div class='col-md-6' align='right'>
        </div>
      </table>
   </div>
    <div v-else>
      <transition name="model">
          <div class="modal-content">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">แก้ไข</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="myModel=false">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <div class='col-md-2.5' align='left'>ระหัสประจำตัวนักศึกษา</div>
                  <div class="mb-3"><input for="exampleFormControlInput1" class="form-control" v-model="data.rsuId" placeholder="กรอกระหัสประจำตัวนักศึกษา"></div>
                  <div class='col-md-2.5' align='left'>คำนำหน้าชื่อ</div>
                  <div class="mb-3"><input for="exampleFormControlInput1" class="form-control" v-model="data.nname" placeholder="คำนำหน้าชื่อ"></div>
                  <div class='col-md-2.5' align='left'>กรอกชื่อจริง</div>
                  <div class="mb-3"><input for="exampleFormControlInput1" class="form-control" v-model="data.name" placeholder="ชื่อจริง"></div>
                  <div class='col-md-2.5' align='left'>นามสกุล</div>
                  <div class="mb-3"><input for="exampleFormControlInput1" class="form-control" v-model="data.lastname" placeholder="นามสกุล"></div>
                  <div class='col-md-2.5' align='left'>หมายเลขโทรศัพท์</div>
                  <div class="mb-3"><input for="exampleFormControlInput1" class="form-control" v-model="data.tel" placeholder="หมายเลขโทรศัพท์"></div>
                  <div class='col-md-2.5' align='left'>ชื่อสถาบันเดิม</div>
                  <div class="mb-3"><input for="exampleFormControlInput1" class="form-control" v-model="data.highschool" placeholder="ชื่อสถาบันเดิม"></div>
                  <div class='col-md-2.5' align='left'>สาขาวิชา</div>
                  <div class="mb-3"><input for="exampleFormControlInput1" class="form-control" v-model="data.major" placeholder="สาขาวิชาใช้เป็นตัวย่อภาษาอังกฤษ"></div>
                  <div class='col-md-2.5' align='left'>CGPA</div>
                  <div class="mb-3"><input for="exampleFormControlInput1" class="form-control" v-model="data.gpa" placeholder="CGPA"></div>
                  <!-- Example single danger button -->
                  <div class='col-md-1' align='left'>สถานะ</div>
                  <ul class="list-group">
                    <div v-if='!editStatus'>
                      <div v-if="userType === 'deputyDean'">
                        <button type="button" class="btn btn-primary" @click="editStatus=true">{{ data.status }}</button>
                      </div>
                      <div v-else>
                        <button type="button" class="btn btn-primary">{{ data.status }}</button>
                      </div>
                    </div>
                    <div v-else>
                      <li class="list-group-item">
                      <button type="button" class="close" data-dismiss="modal" @click="editStatus=false, status=''"><span aria-hidden="true">&times;</span></button>
                      <div v-if="userType === 'deputyDean'">
                        <button type="button" class="btn btn-primary" @click="editStatus=true">{{ data.status }}</button>
                      </div>
                      <div v-else>
                        <button type="button" class="btn btn-primary">{{ data.status }}</button>
                      </div>
                      </li>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="รอข้อมูลเพิ่มเติม" v-model="status" id="firstRadio">
                        <label class="form-check-label" for="firstRadio">รอข้อมูลเพิ่มเติม</label>
                      </li>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="กำลังเทียบโอน" v-model="status" id="secondRadio">
                        <label class="form-check-label" for="secondRadio">กำลังเทียบโอน</label>
                      </li>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="อนุมัติผลการเทียบโอนแล้ว" v-model="status" id="thirdRadio">
                        <label class="form-check-label" for="thirdRadio">อนุมัติผลการเทียบโอนแล้ว</label>
                      </li>
                    </div>
                  </ul>
                  <!-- หก -->
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="myModel=false, editStatus=false, status=''">ปิด</button>
                <button v-if="userType === 'deputyDean'" type="button" class="btn btn-primary"  @click='addDataProfile()'>บันทึก</button>
              </div>
            </div>
          </div>
      </transition>
   </div>
   </div>
</template>

<script>
import { Config } from '../../config' // เรียกใช้งาน Config จาก Config.js
import axios from 'axios' // เรียกใช้งาน axios
import { fb } from '../../firebase' // เรียกใช้งาน fb จาก firebase.js
const db = fb.firestore() // กำหนด fb.firestore() ไวในตัวแปล db
export default {
  name: 'AllProfile',
  components: { // components ที่เกี่ยวข้องในหน้าเพจนี้
  },
  data () {
    return {
      userType: JSON.parse(localStorage.getItem('userData')).type,
      userlist: [],
      data: {},
      myModel: false,
      editStatus: false,
      dynamicStatus: '',
      status: ''
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
              lastname: data.detail.lastname || '-',
              major: await this.generateTextMajor(data.detail.major),
              status: data.status || '-',
              email: data.email
            })
          }
        })
      })
  },
  methods: { // ''// methods ของหน้าเพจ"
    async tabEditProfile (data) {
      let uri = `${Config.APIURL}${Config.PART.GETPROFILE}`
      await axios.post(uri, {
        email: data.email || ''
      }).then(responseLogin => {
        if (responseLogin.data.status.code === 0) {
          let res = responseLogin.data.data
          if (res) {
            this.data.email = res.email
            this.data.nname = res.detail.nname || ''
            this.data.name = res.detail.name || ''
            this.data.lastname = res.detail.lastname || ''
            this.data.rsuId = res.detail.rsuId || ''
            this.data.tel = res.detail.tel || ''
            this.data.highschool = res.detail.highschool || ''
            this.data.major = res.detail.major || ''
            this.data.gpa = res.detail.gpa || ''
            this.data.status = res.status
          } else {
            alert('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง')
          }
        } else {
          alert('รหัสผิดพลาด')
        }
      }).catch(err => {
        console.log(err)
      })
      this.myModel = true
    },
    addDataProfile () {
      let uri = `${Config.APIURL}${Config.PART.PROFILEUPDATA}`
      const data = {
        email: this.data.email,
        detail: {
          nname: this.data.nname,
          name: this.data.name,
          rsuId: this.data.rsuId,
          lastname: this.data.lastname,
          tel: this.data.tel,
          highschool: this.data.highschool,
          major: this.data.major,
          gpa: this.data.gpa
        }
      }
      if (this.status) data.status = this.status
      axios.post(uri, data).then(response => {
        if (response.data.status.code === 0) {
          let res = response.data.data
          alert(`${response.data.status.message}`)
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
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
