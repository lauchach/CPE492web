<template>
  <div class="home">
    <Navbar></Navbar>
    <login></login>
    <div class="inputtextgroup">
      <Profiletag></Profiletag>
      <div class="inputtextgroup2">
        <div class="container">
          <h1>กรอกข้อมูลเทียบโอน</h1>
        </div>
        <div class="inputtextgroup2">
          <div v-if="haveRecord">
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
              <tbody v-for="(item, i) in records" :key="i">
                <tr>
                  <td>{{item.subjectid}}</td>
                  <td><button class="btn btn-danger" @click="deleteRow(i, true)">ลบ</button></td>
                  <td>{{item.subjectName}}</td>
                  <td>{{item.subjectCredit}}</td>
                  <td>{{item.subjectGrade}}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
              <tbody v-for="(item, i) in tagitem" :key="i">
                <tr v-if="data.length === i">
                  <td v-if="loopSubjectId && (subjectRequt + 1) % 2 === 0">
                      <div class="form-group">
                      <select class="form-control" v-model="subjectid" id="subjectid">
                        <option v-for="(list, i) in item.loopSubjectId" :key="i">{{list}}</option>
                      </select>
                    </div>
                  </td>
                  <td v-else-if="i === data.length">
                    <input type="text-on-table-ids" v-model="subjectid" placeholder="3000-XXXX">
                  </td>
                  <td>
                    <button class="btnmapping" @click="mapping">ตรวจสอบ</button>
                  </td>
                  <td>{{item.subjectName}}</td>
                  <td>{{item.subjectCredit}}</td>
                  <td>
                    <select id="txt_r_state" v-model="subjectGrade" class="form-control">
                      <option value="">เกรด</option>
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                      <option value="2.5">2.5</option>
                      <option value="3">3</option>
                      <option value="3.5">3.5</option>
                      <option value="4">4</option>
                    </select>
                  </td>
                </tr>
                <tr v-else>
                  <td>{{item.subjectid}}</td>
                  <td><button class="btn btn-danger" @click="deleteRow(i, false)">ลบ</button></td>
                  <td>{{item.subjectName}}</td>
                  <td>{{item.subjectCredit}}</td>
                  <td>{{item.subjectGrade}}</td>
                </tr>
              </tbody>
              <button class="btnmapping" @click="pushrow">+</button>
            </table>
            <button class="btn btn-primary" @click="save">บันทึก</button>
          <div v-if="this.status === 1">
            <img src="../../../dist/img/svg/waiting.jpg" alt="" width="700">
          </div>
          <div v-else-if="this.status === 200">
            <img src="../../../dist/img/svg/allow.png" alt="" width="700">
          </div>
          <div v-else-if="this.status === 400">
            <img src="../../../dist/img/svg/false.png" alt="" width="700">
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
    <!-- <button class="btn btn-primary" @click="log">log</button> -->
  </div>
</template>
<script>
import { fb } from '../../firebase'
import { Config } from '../../config'
import axios from 'axios'
// @ is an alias to /src
export default {
  name: 'Transfer',
  components: {},
  data () {
    return {
      data: [],
      counter: 1,
      rsuId: JSON.parse(localStorage.getItem('userData')).detail.rsuId,
      email: JSON.parse(localStorage.getItem('userData')).email,
      status: '',
      subjectid: '',
      subjectName: '',
      subjectCredit: '',
      subjectGrade: '',
      subjectRSUid: '',
      subjectRSUname: '',
      subjectRSUCredit: '',
      loopSubjectId: '',
      records: [],
      tagitem: [
        {
          subjectid: '',
          subjectName: '',
          subjectCredit: '',
          subjectRSUid: '',
          subjectRSUname: '',
          subjectRSUCredit: '',
          loopSubjectId: []
        }
      ],
      subjectRequt: 0,
      duplicateSubjectId: false,
      haveRecord: false,
      findRecordData: '',
      db: fb.firestore()
    }
  },
  async created () {
    await this.findStatus()
    await this.findRecord()
  },
  methods: {
    findRecord () {
      if (this.rsuId) {
        let uri = `${Config.APIURL}${Config.PART.TRANSFFETCH}`
        console.log('158', Config.PART.TRANSFFETCH, {
          rsuId: this.rsuId
        })
        axios.post(uri, {
          rsuId: this.rsuId
        }).then(response => {
          console.log('RESPONSE API TRANSFFETCH', response)
          if (response.data.status.code === 0) {
            let res = response.data.data.subjects
            if (res.length) this.haveRecord = true
            console.log('TRANSFFETCH res', res)
            this.records = res
          } else {
            alert(`${response.data.status.message}`)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    findStatus () {
      if (this.rsuId) {
        console.log('175', this.rsuId)
        this.db.collection('MEMBER_TABLE')
          .where('rsuid', '==', this.rsuId).get()
          .then(Show => {
            Show.forEach(doc => {
              if (doc.id) {
                console.log('doc.data().status', doc.data().status)
                this.status = doc.data().status
              }
            })
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error)
          })
      }
    },
    // addRow () {
    //   let modelData = {
    //     id: '',
    //     name: this.counter++
    //   }
    //   this.data.push(modelData)
    // },
    mapping () {
      if (this.subjectid !== '') {
        this.db.collection('SUBJECT_TABLE')
          .where('Subject_id', '==', this.subjectid).get()
          .then(Show => {
            Show.forEach(doc => {
              console.log('doc.data:', doc.data())
              this.subjectName = doc.data().Subject_Name
              this.subjectCredit = doc.data().Subject_Credit
              if (this.subjectCredit) {
                console.log('if')
                this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
                this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
                this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
                this.tagitem[this.tagitem.length - 1].loopSubjectId = []
              } else {
                console.log('213 else')
              }
            })
          })
      } else {
        alert('กรุณาทำการกรอกรหัสรายวิชาก่อนกดปุ่มตรวจสอบ')
      }
    },
    async save () {
      console.log('202save')
      let data = this.data
      if (this.haveRecord) data = [...this.data, ...this.records]
      let uri = `${Config.APIURL}${Config.PART.TRANSFSAVE}`
      axios.post(uri, {
        email: this.email,
        data: data
      }).then(responseLogin => {
        console.log('TRANSFSAVE', responseLogin)
        if (responseLogin.data.status.code === 0) {
          let res = responseLogin.data.data
          console.log('TRANSFSAVE res', res)
          alert('ดำเนินการสำเร็จ')
        } else {
          alert(responseLogin.data.status.message)
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
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
    deleteRow (index, isRecord) {
      if (isRecord) this.records = this.records.filter((v, i, a) => (i !== index))
      else {
        this.tagitem = this.tagitem.filter((v, i, a) => (i !== index))
        this.data = this.data.filter((v, i, a) => (i !== index))
      }
      console.log('314delete', index, isRecord, this.records.length)
    }
  }
}
</script>
