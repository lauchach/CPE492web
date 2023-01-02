<template>
  <div class="Overviwe">
    <div class="container">
      <h3>รายการเทียบโอนทั้งหมด</h3>
    </div>
      <div v-if="!isOpentViewRecord">
        <table class='table table-bordered'>
        <thead>
          <tr>
            <th>รหัสนักศึกษา</th>
            <th>ชื่อ นามสกุล</th>
            <th>สาขา</th>
            <th>สถานะ</th>
          </tr>
          <tr v-for='(item, i) in transferList' :key='i'>
            <th>{{ item.detail.rsuId }}</th>
            <th>{{ item.detail.name }} {{ item.detail.lastname }}</th>
            <th>{{ item.detail.major }}</th>
            <th>{{ item.status }}</th>
            <th>
              <button class='btn btn-light'
                data-toggle="modal"
                data-target="#exampleModal"
                @click='viewRecord(item)'
              >
                ดูราลละเอียด
              </button>
              <th v-if="item.status == 'อนุมัติผลการเทียบโอนแล้ว' ">
                <button class='btn btn-light'
                  data-toggle="modal"
                  data-target="#exampleModal"
                  @click='printTo(item)'
                >
                  พิมพ์
                </button>
              <!-- </th> -->
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
                        <th>เกรด</th>
                      </tr>
                    </thead>
                    <!-- <div v-if="records.length === 0">
                      <thead>
                      <tr>
                        <td>---------</td>
                        <td>---------</td>
                        <td>ไม่มีรายวิชา</td>
                        <td>---------</td>
                        <td>---------</td>
                        </tr>
                    </thead>
                    </div> -->
                    <tbody v-for="(item, i) in records" :key="i">
                      <tr>
                        <td>{{item.subjectid}}</td>
                        <td><button class="btn btn-primary" @click="stack(item)">เทียบ</button></td>
                        <td>{{item.subjectName}}</td>
                        <td>{{item.subjectCredit}}</td>
                        <td>{{item.subjectGrade}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-if="this.stacks.length">
                <div class="modal-body">
                  <div class="form-group">
                    <table class="transfer-table">
                      <thead>
                        <tr>
                          <th>รหัสวิชา</th>
                          <th>ปุ่ม</th>
                          <th>ชื่อวิชา</th>
                          <th>หน่วยกิต</th>
                          <th>เกรด</th>
                          <th>รหัสวิชา</th>
                          <th>ปุ่ม</th>
                          <th>ชื่อวิชา</th>
                          <th>หน่วยกิต</th>
                          <th>เกรด</th>
                        </tr>
                      </thead>
                      <tbody v-for="(item, i) in stacks" :key="i">
                        <tr>
                          <td>{{item.subjectid}}</td>
                          <td><button class="btn btn-secondary" @click="unStack(item)">ยกเลิก</button></td>
                          <td>{{item.subjectName}}</td>
                          <td>{{item.subjectCredit}}</td>
                          <td>{{item.subjectGrade}}</td>
                          <!-- rsu -->
                          <td>{{item.rsu.rsuSubject.subjectRSUid}}</td>
                          <td v-if="item.rsu.isMore && !item.rsu.isHave"><button class="btn btn-secondary" @click="addField(item), item.rsu.isHave = true">เลือกวิชาเพิ่ม</button></td>
                          <td v-else>
                            <button class="btn btn-primary" @click="approve(item)">อนุมัติ</button>
                          </td>
                          <td>{{item.rsu.rsuSubject.subjectRSUName}}</td>
                          <td>{{item.rsu.rsuSubject.subjectRSUCredit}}</td>
                          <td rowspan="2">{{item.subjectGrade}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">ปิด</button>
                <button type="button" class="btn btn-primary"  @click='saveStack()'>บันทึก</button>
              </div>
            </div>
          </div>
        </transition>
        <div v-if="this.approves.length">
          <transition name="model">
            <div class="modal-content">
              <div class="modal-content">
                <div class="modal-header">
                  <!--                        รายวิชาเทียบโอนแล้ว                             -->
                  <h5 class="modal-title" id="exampleModalLabel">รายวิชาเทียบโอนแล้ว</h5>
                  <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clear()">
                    <span aria-hidden="true">&times;</span>
                  </button> -->
                </div>
                <div v-if="this.approves.length">
                  <div class="modal-body">
                    <div class="form-group">
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
                          </tr>
                        </thead>
                        <tbody v-for="(item, i) in approves" :key="i">
                          <tr>
                            <td>{{item.subjectid}}</td>
                            <td><button class="btn btn-secondary" @click="unApprove(item)">ยกเลิก</button></td>
                            <td>{{item.subjectName}}</td>
                            <td>{{item.subjectCredit}}</td>
                            <td>{{item.subjectGrade}}</td>
                            <!-- rsu -->
                            <td>{{item.rsu.rsuSubject.subjectRSUid}}</td>
                            <!-- <td v-if="item.rsu.isMore && !item.rsu.isHave"><button class="btn btn-secondary" @click="addField(item), item.rsu.isHave = true">เลือกวิชาเพิ่ม</button></td>
                            <td v-else>
                              <button class="btn btn-primary" @click="approve(item)">อนุมัติ</button>
                            </td> -->
                            <td>{{item.rsu.rsuSubject.subjectRSUName}}</td>
                            <td>{{item.rsu.rsuSubject.subjectRSUCredit}}</td>
                            <td rowspan="2">{{item.subjectGrade}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                  <ul class="list-group">
                    <div v-if='isEditStatus'>
                      <li class="list-group-item">
                      <button type="button" class="close" data-dismiss="modal" @click="isEditStatus=false, status=''"><span aria-hidden="true">&times;</span></button>
                      <button type="button" class="btn btn-primary" @click="isEditStatus=true">{{ viewUser.status }}</button>
                      </li>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="รอข้อมูลเพิ่มเติม" v-model="viewUser.status" isEditStatus=false id="firstRadio"
                          @click="isEditStatus=false, viewUser.status = 'รอข้อมูลเพิ่มเติม', editStatus('รอข้อมูลเพิ่มเติม')">
                        <label class="form-check-label" for="firstRadio">รอข้อมูลเพิ่มเติม</label>
                      </li>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="กำลังเทียบโอน" v-model="viewUser.status" id="secondRadio"
                          @click="isEditStatus=false, viewUser.status = 'กำลังเทียบโอน', editStatus('กำลังเทียบโอน')">
                        <label class="form-check-label" for="secondRadio">กำลังเทียบโอน</label>
                      </li>
                      <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="อนุมัติผลการเทียบโอนแล้ว" v-model="viewUser.status" id="thirdRadio"
                          @click="isEditStatus=false, viewUser.status = 'อนุมัติผลการเทียบโอนแล้ว', editStatus('อนุมัติผลการเทียบโอนแล้ว')">
                        <label class="form-check-label" for="thirdRadio">อนุมัติผลการเทียบโอนแล้ว</label>
                      </li>
                    </div>
                    <div v-else>
                      <li class="list-group-item">
                      <button type="button" class="btn btn-primary" @click="isEditStatus=true">{{ viewUser.status }}</button>
                      </li>
                    </div>
                  </ul>
                <div class="modal-footer">
                  <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">ปิด</button> -->
                  <!-- <button type="button" class="btn btn-primary"  @click='saveStack()'>บันทึก</button> -->
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
  </div>
</template>
<script>
import { Config } from '../../config'
import { generateTextMajor } from '../../helper'
import axios from 'axios'
export default {
  name: 'Overview',
  props: {
    msg: String
  },
  data () {
    return {
      transferList: [],
      isOpentViewRecord: false,
      viewUser: { rsuId: '' },
      records: [],
      stacks: [],
      approves: [],
      isEditStatus: false
    }
  },
  async created () {
    await this.findRecord()
  },
  methods: {
    findRecord () {
      console.log('59 ')
      let uri = `${Config.APIURL}${Config.PART.TRANSFERRECORDLIST}`
      axios.post(uri, {}).then(response => {
        console.log('RESPONSE API TRANSFERRECORDLIST', response)
        if (response.data.status.code === 0) {
          let res = response.data.data
          for (let i = 0; i < res.length; i++) {
            res[i].detail.major = generateTextMajor(res[i].detail.major)
          }
          console.log('TRANSFERRECORDLIST res', res)
          this.transferList = res
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async viewRecord (data) {
      await data.subjects.forEach(async (v) => {
        if (v.status === 'APPROVE') {
          await data.mapRsuDatas.forEach(async (y) => {
            await y.SubjectIds.forEach(async (z) => {
              if (z.subjectid === v.subjectid) {
                let uri = `${Config.APIURL}${Config.PART.TRANSFERSUBJECT}`
                await axios.post(uri, {
                  subjectid: z.subjectid
                }).then(response => {
                  if (response.data.status.code === 0) {
                    let res = response.data.data
                    v.rsu = res
                  } else {
                    alert(`${response.data.status.message}`)
                  }
                }).catch(err => {
                  console.log(err)
                })
                this.approves = [...this.approves, v]
              }
            })
          })
        }
      })
      console.log('79viewRecord', data.subjects)
      data.subjects = await data.subjects.filter(v => {
        console.log('v.status', v.status)
        if (!v.status) return true
        else if (v.status && v.status === 'APPROVE') return false
        else return true
      })
      this.viewUser = data
      this.records = data.subjects
      setTimeout(() => {
        this.isOpentViewRecord = true
      }, 500)
    },
    async stack (data) {
      this.records = await this.records.filter(v => (v.subjectid !== data.subjectid))
      let uri = `${Config.APIURL}${Config.PART.TRANSFERSUBJECT}`
      await axios.post(uri, {
        subjectid: data.subjectid
      }).then(response => {
        if (response.data.status.code === 0) {
          let res = response.data.data
          // "rsuSubject": {
          //   "subjectRSUid": "RSU160",
          //   "subjectRSUName": "รู้เท่าทันสื่อดิจิทัล",
          //   "subjectRSUCredit": "3"
          // }
          data.rsu = res
          this.stacks = [...this.stacks, data]
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    unStack (data) {
      console.log('204data', data.rsu.isHave)
      if (data.rsu.isMore && data.rsu.isHave) data.rsu.isHave = false
      this.stacks = this.stacks.filter(v => (v.subjectid !== data.subjectid))
      this.records = [...this.records, data]
    },
    async addField (data) {
      for (let i = 0; i < data.rsu.recommends.length; i++) {
        let subject = this.records.find(v => v.subjectid === data.rsu.recommends[i])
        if (subject) {
          this.records = await this.records.filter(v => (v.subjectid !== subject.subjectid))
          subject.rsu = data.rsu
          this.stacks = [...this.stacks, subject]
        }
      }
    },
    async saveStack () {
      if (this.isOpentViewRecord) {
        console.log('saveStack', Config.PART.TRANSFERRSUSAVE, 'this.viewUser', this.viewUser)
        let uri = `${Config.APIURL}${Config.PART.TRANSFERRSUSAVE}`
        await axios.post(uri, {
          rsuId: this.viewUser.rsuId,
          records: this.stacks
        }).then(response => {
          console.log('RESPONSE API TRANSFERRSUSAVE', response)
          if (response.data.status.code === 0) {
            let res = response.data.data
            console.log('TRANSFERRSUSAVE res', res)
            this.transferList = res
            alert('ดำเนินการสำเร็จ')
          } else {
            alert(`${response.data.status.message}`)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    async approve (data) {
      if (!data.subjectid) alert('ผิดปกติ')
      let uri = `${Config.APIURL}${Config.PART.TRANSFERSUBJECTAPPROVE}`
      await axios.post(uri, {
        rsuId: this.viewUser.rsuId,
        subjectId: data.subjectid
      }).then(response => {
        if (response.data.status.code === 0) {
          let res = response.data.data
          console.log('252res', res)
          this.approves = [...this.approves, data]
          this.stacks = this.stacks.filter(v => v.subjectid !== data.subjectid)
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async unApprove (data) {
      console.log('353data', data)
      if (!data.subjectid) alert('ผิดปกติ')
      let uri = `${Config.APIURL}${Config.PART.TRANSFERSUBJECTUNAPPROVE}`
      await axios.post(uri, {
        rsuId: this.viewUser.rsuId,
        subjectId: data.subjectid
      }).then(response => {
        if (response.data.status.code === 0) {
          // let res = response.data.data
          console.log('361res', this.approves.filter(v => v.subjectid !== data.subjectid))
          this.approves = this.approves.filter(v => v.subjectid !== data.subjectid)
          this.records = [...this.records, data]
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async editStatus (data) {
      console.log('403data', data)
      if (!data) alert('ผิดปกติ')
      let uri = `${Config.APIURL}${Config.PART.EDITSTATUS}`
      await axios.post(uri, {
        rsuId: this.viewUser.rsuId,
        status: this.viewUser.status
      }).then(response => {
        if (response.data.status.code === 0) {
          // let res = response.data.data
          // console.log('361res', this.approves.filter(v => v.subjectid !== data.subjectid))
          // this.approves = this.approves.filter(v => v.subjectid !== data.subjectid)
          // this.records = [...this.records, data]
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async clear () {
      this.viewUser = { rsuId: '' }
      this.records = []
      this.stacks = []
      this.approves = []
      this.isOpentViewRecord = false
      await this.findRecord()
    },
    async printTo (data) {
      console.log('440', data)
      localStorage.setItem('printData', JSON.stringify(data.rsuId))
      this.$router.replace('/Printpage')
    }
  }
}
</script>
