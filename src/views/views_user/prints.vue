<template>
  <div class="print">
    <!-- <Navbar></Navbar> -->
    <!-- <login></login> -->
    <!-- <div class="inputtextgroup"> -->
      <!-- <Profiletag></Profiletag> -->
      <!-- <div class="inputtextgroup2"> -->
        <!-- <div class="container">
          <h1>เทียบโอน</h1>
        </div> -->
        <div class="inputtextgroup2">
          <!-- <input
            type="text"
            v-model="rsuid"
            class="inboxput"
            placeholder="กรอกระหัสประจำตัวนักศึกษา"
          /> -->
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
                <td v-else v-for="(item, i) in data" :key="i">
                  {{data}}
                </td>
                <td>
                  <button class="btnmapping" @click="mapping">ตรวจสอบ</button>
                </td>
                <td>{{item.subjectName}}</td>
                <td>{{item.subjectCredit}}</td>
                <td>
                  <select id="txt_r_state" v-model="subjectGrade" class="form-control">
                    <option selected>เกรด</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4</option>
                  </select>
                </td>
                <td>{{item.subjectRSUid}}</td>
                <td>{{item.subjectRSUname}}</td>
                <td v-if="Number(item.subjectCredit) === 2" :rowspan="2">{{item.subjectRSUCredit}}</td>
                <td v-else :rowspan="1">{{item.subjectRSUCredit}}</td>
                <td></td>
              </tr>
              <tr v-else>
                <td>{{item.subjectid}}</td>
                <td></td>
                <td>{{item.subjectName}}</td>
                <td>{{item.subjectCredit}}</td>
                <td>{{item.subjectGrade}}</td>
                <td>{{item.subjectRSUid}}</td>
                <td>{{item.subjectRSUname}}</td>
                <td>{{item.subjectRSUCredit}}</td>
              </tr>
            </tbody>
            <button class="btnmapping" @click="pushrow">+</button>
          </table>
          <button class="btn btn-primary" @click="save">บันทึก</button>
        </div>
      <!-- </div> -->
    <!-- </div> -->
    <div>
            <li >
              <router-link to="/print" class="nav-link">Home</router-link>
            </li>
      <button onclick="window.print()">print</button>
      <button @click="addRow()">Add</button>
      <button @click="saveData()">Save</button>
      <div v-for="(item, i) in record" :key="i">
        {{item.name}}
      </div>
    </div>
  </div>
</template>
<script>
import { fb } from '../../firebase' // เรียกใช้งาน fb จาก firebase.js
// @ is an alias to /src
export default {
  name: 'prints',
  components: {}, // components ที่เกี่ยวข้องในหน้าเพจนี้},
  data () {
    return {
      data: [],
      counter: 1,
      rsuid: JSON.parse(localStorage.getItem('userData')).rsuid,
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
      subjectRequt: 0
    }
  },
  methods: { // ''// methods ของหน้าเพจ"
    addRow () {
      let modelData = {
        id: '',
        name: this.counter++
      }
      this.data.push(modelData)
    },
    saveData () {
    },
    mapping () {
      const db = fb.firestore() // กำหนด fb.firestore() ไวในตัวแปล db
      db.collection('MAPPIN_TABLE').where('subject', 'array-contains', this.subjectid).get().then(Show => {
        Show.forEach(doc => {
          this.subjectRSUid = doc.id
        })
        db.collection('SUBJECT_RSU_TABLE').where('Subject_id', '==', this.subjectRSUid).get().then(Show => {
          Show.forEach(doc => {
            this.subjectRSUname = doc.data().Subject_Name
            this.subjectRSUCredit = doc.data().Subject_Credit
          })
        })
        db.collection('SUBJECT_TABLE')
          .where('Subject_id', '==', this.subjectid)
          .get()
          .then(Show => {
            Show.forEach(doc => {
              this.subjectName = doc.data().Subject_Name
              this.subjectCredit = doc.data().Subject_Credit
              if (this.subjectCredit === this.subjectRSUCredit) {
                this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
                this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
                this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
                this.tagitem[this.tagitem.length - 1].subjectRSUid = this.subjectRSUid
                this.tagitem[this.tagitem.length - 1].subjectRSUname = this.subjectRSUname
                this.tagitem[this.tagitem.length - 1].subjectRSUCredit = this.subjectRSUCredit
                this.tagitem[this.tagitem.length - 1].loopSubjectId = []
              } else {
                this.loopSubjectId = this.subjectid
                if (this.tagitem[this.tagitem.length - 1].subjectRSUid !== this.subjectRSUid) {
                  this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
                  this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
                  this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
                  this.tagitem[this.tagitem.length - 1].subjectRSUid = this.subjectRSUid
                  this.tagitem[this.tagitem.length - 1].subjectRSUname = this.subjectRSUname
                  this.tagitem[this.tagitem.length - 1].subjectRSUCredit = this.subjectRSUCredit
                  this.tagitem[this.tagitem.length - 1].loopSubjectId = []
                  this.pushrow()
                  if ((this.subjectRequt) % 2 === 0) {
                    const db = fb.firestore() // กำหนด fb.firestore() ไวในตัวแปล db
                    db.collection('MAPPIN_TABLE').where('subject2plus1', 'array-contains', this.loopSubjectId).get().then(Show => {
                      Show.forEach(doc => {
                        this.tagitem[this.tagitem.length - 1].loopSubjectId = doc.data().subject2plus1
                      })
                    })
                  }
                  this.subjectRequt = this.subjectRequt + 1
                } else {
                  this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
                  this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
                  this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
                  this.tagitem[this.tagitem.length - 1].subjectRSUid = this.subjectRSUid
                  this.tagitem[this.tagitem.length - 1].subjectRSUname = this.subjectRSUname
                  this.tagitem[this.tagitem.length - 1].subjectRSUCredit = this.subjectRSUCredit
                  this.tagitem[this.tagitem.length - 1].loopSubjectId = []
                  this.subjectRequt = false
                }
              }
            })
          })
      })
    },
    save () {
      const db = fb.firestore() // กำหนด fb.firestore() ไวในตัวแปล db
      db.collection('RECORD_TABLE').add({
        [this.rsuid]: this.data
      })
    },
    pushrow () {
      if (this.tagitem) {
        let _data = { [this.subjectRSUid]: {
          subjectid: this.subjectid,
          subjectName: this.subjectName,
          subjectGrade: this.subjectGrade,
          subjectCredit: this.subjectCredit,
          subjectRSUid: this.subjectRSUid,
          subjectRSUname: this.subjectRSUname,
          subjectRSUCredit: this.subjectRSUCredit
        }
        }
        this.tagitem[this.tagitem.length - 1].subjectGrade = this.subjectGrade
        this.data.push(_data)
        this.subjectid = ''
        this.tagitem.push({
          subjectName: '',
          loopSubjectId: []
        })
      }
    }
  }
}
</script>
