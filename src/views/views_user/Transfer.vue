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
          <div v-if="!haveRecord">
            <input
              type="text"
              v-model="rsuid"
              class="inboxput"
              placeholder="กรอกระหัสประจำตัวนักศึกษา"
            />
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
                  <td></td>
                  <td>{{item.subjectName}}</td>
                  <td>{{item.subjectCredit}}</td>
                  <td>{{item.subjectGrade}}</td>
                </tr>
              </tbody>
              <button class="btnmapping" @click="pushrow">+</button>
            </table>
            <button class="btn btn-primary" @click="save">บันทึก</button>
          </div>
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
// @ is an alias to /src
export default {
  name: 'Transfer',
  components: {},
  data () {
    return {
      data: [],
      counter: 1,
      rsuid: JSON.parse(localStorage.getItem('userData')).rsuid,
      rsuEmail: JSON.parse(localStorage.getItem('userData')).student_mail,
      status: '',
      subjectid: '',
      subjectName: '',
      subjectCredit: '',
      subjectGrade: '',
      subjectRSUid: '',
      subjectRSUname: '',
      subjectRSUCredit: '',
      loopSubjectId: '',
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
    await this.findRecord()
    await this.findStatus()
  },
  methods: {
    findRecord () {
      console.log('this.rsuEmail', this.rsuEmail)
      console.log('this.status', this.status)
      this.db.collection('RECORD_TABLE')
        .where('student', '==', this.rsuid).get()
        .then(Show => {
          Show.forEach(doc => {
            console.log('findRecord doc =>', doc.id)
            if (doc.id) {
              this.haveRecord = true
            }
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
    },
    findStatus () {
      this.db.collection('MEMBER_TABLE')
        .where('rsuid', '==', this.rsuid).get()
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
                console.log('else')
              }
            })
          })
      } else {
        alert('กรุณาทำการเลือกผลการเรียนก่อนทำการเพิ่มรายวิชาถัดไป')
      }
    },
    save () {
      console.log('save')
      // Add a new document in collection "cities"
      this.db.collection('RECORD_TABLE').doc(this.rsuid).set({
        subjectData: this.data,
        student: this.rsuid
      })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      this.db.collection('MEMBER_TABLE').doc(this.rsuEmail).update({
        status: 1
      })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      alert('บันทึก สำเร็จ')
    },
    pushrow () {
      if (this.tagitem && (this.data.length !== 0)) {
        console.log('tagitem', this.tagitem)
        this.duplicateSubjectId = false
        if (this.subjectid !== '') {
          for (let i = 0; i < this.data.length; i++) {
            console.log(this.data[i].subjectid, '===', this.subjectid)
            if (this.data[i].subjectid === this.subjectid) {
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
                subjectCredit: this.subjectCredit,
                subjectRSUid: this.subjectRSUid,
                subjectRSUname: this.subjectRSUname,
                subjectRSUCredit: this.subjectRSUCredit
              }
              this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
              this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
              this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
              this.tagitem[this.tagitem.length - 1].subjectGrade = this.subjectGrade
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
      } else if (this.tagitem && (this.data.length === 0)) {
        if (this.subjectGrade !== '') {
          if (this.subjectGrade !== '') {
            let _data = {
              subjectid: this.subjectid,
              subjectName: this.subjectName,
              subjectGrade: this.subjectGrade,
              subjectCredit: this.subjectCredit,
              subjectRSUid: this.subjectRSUid,
              subjectRSUname: this.subjectRSUname,
              subjectRSUCredit: this.subjectRSUCredit
            }
            this.tagitem[this.tagitem.length - 1].subjectGrade = this.subjectGrade
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
          alert('กรุณาทำการกรอกรายวิชา และ กดปุ่ม "ตรวจสอบ"')
        }
      }
    },
    log () {
      console.log('status', this.status)
    }
  }
}
</script>
