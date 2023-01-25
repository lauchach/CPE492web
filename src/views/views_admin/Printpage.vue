<template>
    <div class="container">
      <div v-if="!isPrint">
      <button style="margin-left: -205px; margin-bottom: 20px" class="btn btn-primary" type="button" @click="print()">พิมพ์</button>
      <button style="margin-left: -305px; margin-bottom: 20px" class="btn btn-primary" type="button" @click="backpage()">กลับ</button>
      </div>
      <div style="width: 900px" class="card bg-dark text-back">
        <img class="card-img" src="/img/svg/page2.png" alt="Card image">
        <div class="card-img-overlay">
          <div style="margin-left: -25px">
            <div style="margin-right: 0px">
              <div v-for="(item, i) in cols" :key="i">
                <div v-if="i === 0" class="row" style="margin-top: 220px">
                  <div class="col-2">{{ item.subjectid }}</div>
                  <div v-if="item.subjectName.length < 25" style="margin-left: -50px" class="col-3">{{ item.subjectName }}</div>
                  <div v-else style="margin-left: -60px" class="col-3">{{ item.subjectName }}</div>
                  <div v-if="item.subjectName.length < 25" style="margin-left: 25px" class="col-0.5">{{ item.subjectCredit }}</div>
                  <div v-else style="margin-left: 20px" class="col-0.5">{{ item.subjectCredit }}</div>
                  <div style="margin-left: 10px" class="col-1">{{ item.subjectGrade }}</div>
                  <div class="col-0.5">{{ item.rsuSubjecteId }}</div>
                  <div style="margin-left: 0px" class="col-3">{{ item.rsuSubjectName }}</div>
                  <div style="margin-left: -40px" class="col-1">{{ item.rsuSubjectCredit }}</div>
                  <div style="margin-left: 0px" class="col-0.5">{{ item.rsuSubjectGrade }}</div>
                  <div style="margin-left: 20px" class="col-1"></div>
                </div>
                <div v-else class="row" style="margin-top: 4px">
                  <div class="col-2">{{ item.subjectid }}</div>
                  <div v-if="item.subjectName.length < 25" style="margin-left: -50px" class="col-3">{{ item.subjectName }}</div>
                  <div v-else style="margin-left: -50px" class="col-3">{{ item.subjectName }}</div>
                  <div v-if="item.subjectName.length < 25" style="margin-left: 25px" class="col-0.5">{{ item.subjectCredit }}</div>
                  <div v-else style="margin-left: 25px" class="col-0.5">{{ item.subjectCredit }}</div>
                  <div style="margin-left: 10px" class="col-1">{{ item.subjectGrade }}</div>
                  <div class="col-0.5">{{ item.rsuSubjecteId }}</div>
                  <div style="margin-left: -10px" class="col-3">{{ item.rsuSubjectName }}</div>
                  <div style="margin-left: -30px" class="col-1">{{ item.rsuSubjectCredit }}</div>
                  <div style="margin-left: 0px" class="col-0.5">{{ item.rsuSubjectGrade }}</div>
                  <div style="margin-left: 20px" class="col-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Config } from '../../config' // เรียกใช้งาน Config จาก Config.js
import axios from 'axios' // เรียกใช้งาน axios
export default {
  name: 'Printpage',
  data () {
    return {
      rsuId: JSON.parse(localStorage.getItem('printData')),
      cols: [],
      isPrint: false
    }
  },
  async created () { // สั่งให้หน้าเพจทำเริ่มทำงานฟังชั่นที่ต้องการ
    await this.findStatus() // ฟังชั่น findRecord ให้ทำงาน
  },
  methods: { // ''// methods ของหน้าเพจ"
    findRecord () {
      let uri = `${Config.APIURL}${Config.PART.TRANSFERFETCHFULL}`
      axios.post(uri, {
        rsuId: this.rsuId
      }).then(response => {
        if (response.data.status.code === 0) {
          this.cols = response.data.data.cols
        } else {
          alert(`${response.data.status.message}`)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    backpage () {
      this.$router.replace('admin/overview')
    },
    print () {
      this.isPrint = true
      setTimeout(() => {
        window.print()
      }, 300)
      setTimeout(() => {
        this.isPrint = false
      }, 1000)
    }
  }
}
</script>
