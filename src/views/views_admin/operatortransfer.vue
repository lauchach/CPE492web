<template>
  <div class="home">
    <Navbar></Navbar>
    <login></login>
    <div class="inputtextgroup">
      <Profiletag></Profiletag>
      <div class="inputtextgroup2">
        <div class="container">
          <h1>เทียบโอน</h1>
        </div>
        <div class="inputtextgroup2">
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
      </div>
    </div>
    <div>
            <li >
              <router-link to="/prints" class="nav-link">print</router-link>
            </li>
      <button @click="addRow()">Add</button>
      <button @click="saveData()">Save</button>
      <div v-for="(item, i) in record" :key="i">
        {{item.name}}
      </div>
    </div>
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
  methods: {
    addRow () { 
      let modelData = {
        id: '',
        name: this.counter++
      }
      this.data.push(modelData)
    },
    saveData () {
      console.log('data : ', this.data)
    },
    mapping () {
      console.log('this.subjectid', this.subjectid)
      // console.log(true)
      const db = fb.firestore()
      db.collection('MAPPIN_TABLE').where('subject', 'array-contains', this.subjectid).get().then(Show => {
        Show.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          // console.log(doc.id)
          this.subjectRSUid = doc.id
          // console.log(this.subjectRSUid)
        })
        db.collection('SUBJECT_RSU_TABLE').where('Subject_id', '==', this.subjectRSUid).get().then(Show => {
          Show.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          // console.log('Subject_Name:', doc.data())
            this.subjectRSUname = doc.data().Subject_Name
            this.subjectRSUCredit = doc.data().Subject_Credit
          })
        })
        db.collection('SUBJECT_TABLE')
          .where('Subject_id', '==', this.subjectid)
          .get()
          .then(Show => {
            Show.forEach(doc => {
              // console.log(doc.id, '=>', doc.data())
              console.log('doc.data:', doc.data())
              this.subjectName = doc.data().Subject_Name
              this.subjectCredit = doc.data().Subject_Credit
              console.log('this.subjectCredit', this.subjectCredit, '===', 'this.subjectRSUid', this.subjectRSUCredit)
              if (this.subjectCredit === this.subjectRSUCredit) {
                console.log('if')
                this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
                this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
                this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
                this.tagitem[this.tagitem.length - 1].subjectRSUid = this.subjectRSUid
                this.tagitem[this.tagitem.length - 1].subjectRSUname = this.subjectRSUname
                this.tagitem[this.tagitem.length - 1].subjectRSUCredit = this.subjectRSUCredit
                this.tagitem[this.tagitem.length - 1].loopSubjectId = []
              } else {
                console.log('else')
                alert('else')
                this.loopSubjectId = this.subjectid
                console.log('this.loopSubjectId', this.loopSubjectId)
                if (this.tagitem[this.tagitem.length - 1].subjectRSUid !== this.subjectRSUid) {
                  console.log('if')
                  this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
                  this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
                  this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
                  this.tagitem[this.tagitem.length - 1].subjectRSUid = this.subjectRSUid
                  this.tagitem[this.tagitem.length - 1].subjectRSUname = this.subjectRSUname
                  this.tagitem[this.tagitem.length - 1].subjectRSUCredit = this.subjectRSUCredit
                  this.tagitem[this.tagitem.length - 1].loopSubjectId = []
                  this.pushrow()
                  if ((this.subjectRequt) % 2 === 0) {
                    const db = fb.firestore()
                    db.collection('MAPPIN_TABLE').where('subject2plus1', 'array-contains', this.loopSubjectId).get().then(Show => {
                      Show.forEach(doc => {
                        this.tagitem[this.tagitem.length - 1].loopSubjectId = doc.data().subject2plus1
                      })
                    })
                  }
                  this.subjectRequt = this.subjectRequt + 1
                  console.log('tagitem>>>>', this.tagitem)
                } else {
                  console.log('elseelse')
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
      console.log('save')
      const db = fb.firestore()
      db.collection('RECORD_TABLE').add({
        [this.rsuid]: this.data
      })
    // console.log(true)
    },
    pushrow () {
      if (this.tagitem) {
        console.log('tagitem', this.tagitem)
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
        console.log('this.data>>:', this.data)
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
