<template>
    <div class="container">
      <h3>จัดการรายวิชา</h3>
      <div v-if="!isView">
        <table class='table table-bordered'>
          <thead>
            <tr>
              <th>หมวด</th>
            </tr>
            <tr>
              <th>
                <button class='btn btn-light' data-toggle="modal" data-target="#exampleModal" @click='view(false)'>
                  รายวิชา ปวส.
                </button>
              </th>
            </tr>
            <tr>
              <th>
                <button class='btn btn-light' data-toggle="modal" data-target="#exampleModal" @click='view(true)'>
                  รายวิชา มหาวิทยาลัย
                </button>
              </th>
            </tr>
            <tr>
              <th>
                <button class='btn btn-light' data-toggle="modal" data-target="#exampleModal" @click='view(item)'>
                  ความสัมพันธ์รายวิชา
                </button>
              </th>
            </tr>
            <v-data-table :headers='headers' :items='desserts' :items-per-page='5' class='elevation-1'></v-data-table>
          </thead>
        <div class='col-md-6' align='right'>
        </div>
        </table>
      </div>
      <div v-else>
        <div v-if="isSelectToEdit">
          <transition name="model">
            <div class="modal-content">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">แก้ไขรายวิชา</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="isSelectToEdit = false, selectItem = {}">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <div class="form-group">
                  <table class="transfer-table">
                    <thead>
                      <tr>
                        <th>รหัสวิชา</th>
                        <th>ปุ่ม</th>
                        <th>ชื่อวิชา</th>
                        <th>หน่วยกิต</th>
                      </tr>
                    </thead>
                    <tbody>
                      <td><input for="exampleFormControlInput1" class="form-control" v-model="selectItem.Subject_id" placeholder="3000-XXXX"></td>
                      <td><button class="btn btn-primary" @click="selectItem = isSelectToEdit = false, selectItem = {}">ยกเลิก</button></td>
                      <td><input for="exampleFormControlInput1" class="form-control" v-model="selectItem.Subject_Name" placeholder=""></td>
                      <td><input for="exampleFormControlInput1" class="form-control" v-model="selectItem.Subject_Credit" placeholder=""></td>
                    </tbody>
                  </table>
                </div>
              </div>
              <tr>
              <div div class="mb-1">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">เพิ่มรายวิชาใหม่</button>
              </div>
              </tr>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">ปิด</button>
                <button type="button" class="btn btn-primary"  @click='saveStack()'>บันทึก</button>
              </div>
              </div>
            </div>
          </transition>
        </div>
        <transition name="model">
          <div class="modal-content">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">แก้ไข</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clear()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <table class="transfer-table">
                    <thead>
                      <tr>
                        <th>รหัสวิชา</th>
                        <th>ปุ่ม</th>
                        <th>ชื่อวิชา</th>
                        <th>หน่วยกิต</th>
                      </tr>
                    </thead>
                    <tbody v-for="(item, i) in records" :key="i">
                      <!-- <tr v-if="!isSelectToEdit"> -->
                        <td>{{item.Subject_id}}</td>
                        <td><button class="btn btn-primary" @click="selectToEdit(item)">แก้ไข</button></td>
                        <td>{{item.Subject_Name}}</td>
                        <td>{{item.Subject_Credit}}</td>
                      <!-- </tr> -->
                      <!-- <tr v-else>
                        <td>{{item.Subject_id}}</td>
                        <td><button class="btn btn-primary" @click="selectToEdit(item)">บันทึก</button></td>
                        <td>{{item.Subject_Name}}</td>
                        <td>{{item.Subject_Credit}}</td>
                      </tr> -->
                    </tbody>
                  </table>
                </div>
              </div>
              <div div class="mb-1">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="isSelectToEdit = true">เพิ่มรายวิชาใหม่</button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">ปิด</button>
                <!-- <button type="button" class="btn btn-primary"  @click='saveStack()'>บันทึก</button> -->
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>
<script>
import { Config } from '../../config'
import axios from 'axios'
export default {
  name: 'Subjectmap',
  data () {
    return {
      data: [],
      isView: false,
      isSelectToEdit: false,
      records: [],
      selectItem: {}
    }
  },
  async created () {
    await this.findStatus()
  },
  methods: {
    async view (isRSU) {
      this.isView = true
      console.log('58')
      await this.fetchSubjectList(isRSU)
    },
    async selectToEdit (data) {
      this.isSelectToEdit = true
      console.log('114', data)
      this.selectItem = data
    },
    fetchSubjectList (isRSU) {
      let uri = !isRSU ? `${Config.APIURL}${Config.PART.SUBJECTLIST}` : `${Config.APIURL}${Config.PART.SUBJECTRSULIST}`
      console.log('158', Config.PART.SUBJECTLIST, {
      })
      axios.post(uri, {}).then(response => {
        console.log('RESPONSE API SUBJECTLIST', response)
        if (response.data.status.code === 0) {
          let res = response.data.data
          console.log('SUBJECTLIST res', res)
          this.records = res
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    pushrow () {
      // if (this.tagitem && (this.data.length !== 0)) {
      console.log('tagitem', this.tagitem)
      this.duplicateSubjectId = false
      console.log('245this.subjectid', this.subjectid)
      if (this.subjectid !== '') {
        let data = this.records.length ? [...this.data, ...this.records] : this.data
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].subjectid, '===', this.subjectid)
          if (data[i].subjectid === this.subjectid) {
            this.duplicateSubjectId = true
            console.log('this.duplicateSubjectId++', this.duplicateSubjectId)
          }
        }
        console.log('this.duplicateSubjectId', this.duplicateSubjectId)
        if (!this.duplicateSubjectId) {
          console.log('iffffff this.subjectGrade', this.subjectGrade)
          if (this.subjectGrade !== '') {
            let _data = {
              subjectid: this.subjectid,
              subjectName: this.subjectName,
              subjectGrade: this.subjectGrade,
              subjectCredit: this.subjectCredit
              // subjectRSUid: this.subjectRSUid,
              // subjectRSUname: this.subjectRSUname,
              // subjectRSUCredit: this.subjectRSUCredit
            }
            this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
            this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
            this.tagitem[this.tagitem.length - 1].subjectGrade = this.subjectGrade
            this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
            this.data.push(_data)
            console.log('this.data>>:', this.data)
            this.subjectid = ''
            this.tagitem.push({
              subjectName: '',
              loopSubjectId: []
            })
          } else {
            alert('กรุณาทำการเลือกผลการเรียนก่อนทำการเพิ่มรายวิชาถัดไป')
          }
        } else {
          alert('ไม่สามารถกทำการรอกรายวิชาซ้ำได้')
        }
      } else {
        alert('กรุณาทำการกรอกรายวิชา และ กดปุ่ม "ตรวจสอบ"')
      }
      // } else if (this.tagitem && (this.data.length === 0)) {
      //   if (this.subjectGrade !== '') {
      //     if (this.subjectGrade !== '') {
      //       let _data = {
      //         subjectid: this.subjectid,
      //         subjectName: this.subjectName,
      //         subjectGrade: this.subjectGrade,
      //         subjectCredit: this.subjectCredit
      //         // subjectRSUid: this.subjectRSUid,
      //         // subjectRSUname: this.subjectRSUname,
      //         // subjectRSUCredit: this.subjectRSUCredit
      //       }
      //       this.tagitem[this.tagitem.length - 1].subjectGrade = this.subjectGrade
      //       this.data.push(_data)
      //       console.log('this.data>>:', this.data)
      //       this.subjectid = ''
      //       this.tagitem.push({
      //         subjectName: '',
      //         loopSubjectId: []
      //       })
      //     } else {
      //       alert('กรุณาทำการเลือกผลการเรียนก่อนทำการเพิ่มรายวิชาถัดไป')
      //     }
      //   } else {
      //     alert('กรุณาทำการกรอกรายวิชา และ กดปุ่ม "ตรวจสอบ"')
      //   }
      // }
    },
    clear () {
      this.isView = false
    }
  }
}
</script>
