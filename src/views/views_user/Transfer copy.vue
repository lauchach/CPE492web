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
            <tbody>
              <tr v-for="(item, i) in tagitem" :key="i">
                <td v-if="item.loopSubjectId.length">
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">Example select</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option v-for="(list, i) in item.loopSubjectId" :key="i">{{list}}</option>
                    </select>
                  </div>
                  <div class="dropdown">
                    <button
                      class="btn btn-default dropdown-toggle"
                      type="button"
                      id="menu1"
                      data-toggle="dropdown"
                    >
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                      <li v-for="(list, i) in item.loopSubjectId" :key="i">{{list}}</li>
                    </ul>
                  </div>
                </td>
                <td v-if="tagitem.length - 1 === i"><input type="text-on-table-ids" v-model="subjectid" placeholder="3000-XXXX"></td>
                <!-- <td v-else-if="a"><input type="text-on-table-ids" v-model="item.subjectid" placeholder="3000-XXXX"></td> -->
                <td>
                  <button class="btnmapping" @click="mapping">ตรวจสอบ</button>
                </td>
                <td>{{item.subjectName}}</td>
                <td>{{item.subjectCredit}}</td>
                <td>
                  <select id="txt_r_state" name="g_yearTerm" class="form-control">
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
            <td v-if="Number(item.subjectCredit) === 1 || Number(item.subjectCredit) === 2" :rowspan="2">{{item.subjectRSUCredit}}</td>
            <td v-else :rowspan="1">{{item.subjectRSUCredit}}</td>
                <td :rowspan="3">{{item.subjectRSUCredit}}</td>
              </tr>
            </tbody>
            <button class="btnmapping" @click="pushrow">+</button>
          </table>
          <button class="btn btn-primary" @click="save">บันทึก</button>
        </div>
      </div>
    </div>
    <div>
      <button @click="addRow()">Add</button>
      <button @click="saveData()">Save</button>
      <div v-for="(item, i) in data" :key="i">
        {{item.name}}
      </div>
    </div>
  </div>
</template>
<script>
import { fb } from '../../firebase'
// @ is an alias to /src
export default {
  name: 'Transfer1',
  components: {},
  data () {
    return {
      data: [
        {
          id: '1234',
          name: 0
        }
      ],
      counter: 1,
      rsuid: JSON.parse(localStorage.getItem('userData')).rsuid,
      subjectid: '',
      subjectName: '',
      subjectCredit: '',
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
      ]
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
              if (this.subjectCredit === this.subjectRSUid) {
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
                this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
                this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
                this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
                this.tagitem[this.tagitem.length - 1].subjectRSUid = this.subjectRSUid
                this.tagitem[this.tagitem.length - 1].subjectRSUname = this.subjectRSUname
                this.tagitem[this.tagitem.length - 1].subjectRSUCredit = this.subjectRSUCredit
                this.tagitem[this.tagitem.length - 1].loopSubjectId = []
                // console.log(this.tagitem)
                this.tagitem.push({
                  // subjectid: '',
                  subjectName: '',
                  subjectCredit: '',
                  subjectRSUid: '',
                  subjectRSUname: '',
                  subjectRSUCredit: '',
                  loopSubjectId: []
                })
                const db = fb.firestore()
                db.collection('MAPPIN_TABLE').where('subject2plus1', 'array-contains', this.loopSubjectId).get().then(Show => {
                  Show.forEach(doc => {
                    this.tagitem[this.tagitem.length - 1].loopSubjectId = doc.data().subject2plus1
                  })
                })
                console.log('tagitem', this.tagitem)
              }
            })
          })
      })
    },
    save () {
      console.log('save')
    },
    pushrow () {
      this.subjectid = ''
      this.tagitem.push({
        subjectName: '',
        loopSubjectId: []
      })
    }
  }
}
</script>
