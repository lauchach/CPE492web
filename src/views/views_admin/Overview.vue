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
                          <td v-if="item.rsu.isMore"><button class="btn btn-secondary" @click="addField(item)">เลือกวิชาเพิ่ม</button></td>
                          <td v-else></td>
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
      stacks: []
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
    viewRecord (data) {
      this.viewUser = data
      console.log('79viewRecord', data.subjects)
      this.isOpentViewRecord = true
      this.records = data.subjects
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
    async clear () {
      this.viewUser = { rsuId: '' }
      this.records = []
      this.stacks = []
      this.isOpentViewRecord = false
      await this.findRecord()
    }
  }
}
</script>
