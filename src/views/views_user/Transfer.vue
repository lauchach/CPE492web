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
        <div v-if="status !== 'รอข้อมูลเพิ่มเติม'" class="inputtextgroup2">
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
                      <!-- <option value="1" @click="this.$alert('Hello Vue Simple Alert.')">1</option>
                      <option value="1.5">1.5</option> -->
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
        <div v-else>
          <h3>อัพโหลดเอกสาร</h3>
          <div style="width: 500px; margin-left: 32%; margin-top: 30px">
            <!-- <label class="form-label" for="customFile"></label> -->
            <input type="file" class="form-control" id="customFile" @change="uploadImage" />
          </div>
          <div class="form-group">
            <div style="margin-left: 0%; margin-top: 30px">
              <img style="width: 800px" :src="upload.image" alt="">
            </div>
          </div>
          <div v-if="!isUpload">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" >กรุณา upload ภาพถ่าย transcript หรือ ใบแสดงผลการศึกษา ก่อนทำการกรอกผลการศึกษา</button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="editStatus('รอการเทียบโอน'); status = 'รอการเทียบโอน'">ทำการกรอกผลการศึกษาเพื่อเทียบโอน</button>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import { fb } from '../../firebase' // เรียกใช้งาน fb จาก firebase.js  // เรียกใช้งาน "fb" จาก firebase.js
import { Config } from '../../config' // เรียกใช้งาน Config จาก Config.js // เรียกใช้งาน "Config" จาก config.js
import axios from 'axios' // เรียกใช้งาน axios// เรียกใช้งาน "axios"

export default { // export หน้า page เพื่อใช้ใน router
  name: 'Transfer',
  components: {}, // components ที่เกี่ยวข้องในหน้าเพจนี้},
  data () { // set data ของหน้าเพจนี้เบื่องต้น
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
      db: fb.firestore(),
      upload: {
        image: ''
      },
      isUpload: false
    }
  },
  async created () { // สั่งให้หน้าเพจทำเริ่มทำงานฟังชั่นที่ต้องการ 
    await this.findStatus() // ฟังชั่น findStatus ให้ทำงาน
    await this.findStatus() // ฟังชั่น findRecord ให้ทำงาน
    await this.getProfile() // ฟังชั่น findRecord ให้ทำงาน
  },
  methods: { // ''// methods ของหน้าเพจ"
    findRecord () {
      if (this.rsuId) {
        let uri = `${Config.APIURL}${Config.PART.TRANSFERFETCH}`
        axios.post(uri, {
          rsuId: this.rsuId
        }).then(response => {
          if (response.data.status.code === 0) {
            let res = response.data.data.subjects
            if (res.length) this.haveRecord = true
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
        let uri = `${Config.APIURL}${Config.PART.GETPROFILE}`
        axios.post(uri, {
          email: JSON.parse(localStorage.getItem('userData')).email || ''
        }).then(responseLogin => {
          if (responseLogin.data.status.code === 0) {
            let res = responseLogin.data.data
            if (res) {
              this.status = responseLogin.data.data.status
            } else {
              alert('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง')
            }
          } else {
            alert('รหัสผิดพลาด')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mapping () {
      if (this.subjectid !== '') {
        this.db.collection('SUBJECT_TABLE')
          .where('Subject_id', '==', this.subjectid).get()
          .then(Show => {
            Show.forEach(doc => {
              this.subjectName = doc.data().Subject_Name
              this.subjectCredit = doc.data().Subject_Credit
              if (this.subjectCredit) {
                this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
                this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
                this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
                this.tagitem[this.tagitem.length - 1].loopSubjectId = []
              } else {
              }
            })
          })
      } else {
        alert('กรุณาทำการกรอกรหัสรายวิชาก่อนกดปุ่มตรวจสอบ')
      }
    },
    async save () {
      let data = this.data
      if (this.haveRecord) data = [...this.data, ...this.records]
      let uri = `${Config.APIURL}${Config.PART.TRANSFERSAVE}`
      axios.post(uri, {
        email: this.email,
        data: data
      }).then(responseLogin => {
        if (responseLogin.data.status.code === 0) {
          let res = responseLogin.data.data
          alert('ดำเนินการสำเร็จ')
        } else {
          alert(responseLogin.data.status.message)
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
      })
    },
    pushrow () {
      // if (this.tagitem && (this.data.length !== 0)) {
      this.duplicateSubjectId = false
      if (this.subjectid !== '') {
        let data = this.records.length ? [...this.data, ...this.records] : this.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].subjectid === this.subjectid) {
            this.duplicateSubjectId = true
          }
        }
        if (!this.duplicateSubjectId) {
          if (this.subjectGrade !== '') {
            let _data = {
              subjectid: this.subjectid,
              subjectName: this.subjectName,
              subjectGrade: this.subjectGrade,
              subjectCredit: this.subjectCredit
            }
            this.tagitem[this.tagitem.length - 1].subjectid = this.subjectid
            this.tagitem[this.tagitem.length - 1].subjectName = this.subjectName
            this.tagitem[this.tagitem.length - 1].subjectGrade = this.subjectGrade
            this.tagitem[this.tagitem.length - 1].subjectCredit = this.subjectCredit
            this.data.push(_data)
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
    },
    deleteRow (index, isRecord) {
      if (isRecord) this.records = this.records.filter((v, i, a) => (i !== index))
      else {
        this.tagitem = this.tagitem.filter((v, i, a) => (i !== index))
        this.data = this.data.filter((v, i, a) => (i !== index))
      }
    },
    async editStatus (data) {
      if (!data) alert('ผิดปกติ')
      let uri = `${Config.APIURL}${Config.PART.EDITSTATUS}`
      await axios.post(uri, {
        rsuId: this.rsuId,
        status: data
      }).then(response => {
        if (response.data.status.code === 0) {
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    uploadImage (e) {
      let file = e.target.files[0]
      const storageRef = fb.storage().ref('transcript/' + file.name)
      let uploadTask = storageRef.put(file)
      uploadTask.on('state_changed', (snapshot) => {
      }, (error) => {
        console.log(error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.upload.image = downloadURL
          this.isUpload = true
          this.uploadImaLink(downloadURL)
        })
      })
    },
    async uploadImaLink (link) {
      if (!link) alert('ผิดปกติ')
      let uri = `${Config.APIURL}${Config.PART.UPLOADIMG}`
      await axios.post(uri, {
        rsuId: this.rsuId,
        link: link
      }).then(response => {
        if (response.data.status.code === 0) {
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
