<template>
    <div class="container">
      <div class="card bg-dark text-back">
        <img class="card-img" src="/img/svg/page2.png" alt="Card image">
        <div class="card-img-overlay">
          <div style="margin-left: 20px">
          <div style="margin-right: 0px">
          <div class="row" style="margin-top: 280px">
            <div class="col-1">col-1</div>
            <div class="col-3">{{ rsuId }}</div>
            <div style="margin-left: 20px" class="col-0.5">col-1</div>
            <div style="margin-left: 10px" class="col-1">col-1</div>
            <div class="col-0.5">col-1</div>
            <div style="margin-left: 00px" class="col-3">col-1</div>
            <div class="col-1">col-1</div>
            <div style="margin-left: 0px" class="col-0.5">col-1</div>
            <div style="margin-left: 20px" class="col-1">col-1</div>
          </div>
          <div class="row" style="margin-top: 10px">
            <div class="col-1">col-1</div>
            <div class="col-3">{{ rsuId }}</div>
            <div style="margin-left: 20px" class="col-0.5">col-1</div>
            <div style="margin-left: 10px" class="col-1">col-1</div>
            <div class="col-0.5">col-1</div>
            <div style="margin-left: 00px" class="col-3">col-1</div>
            <div class="col-1">col-1</div>
            <div style="margin-left: 0px" class="col-0.5">col-1</div>
            <div style="margin-left: 20px" class="col-1">col-1</div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Config } from '../../config'
import axios from 'axios'
export default {
  name: 'Printpage',
  data () {
    return {
      rsuId: JSON.parse(localStorage.getItem('printData')),
      cols: []
    }
  },
  async created () {
    console.log('27rsuId', this.rsuId)
    // console.log('JSON.parse(localStorage.getItem(userData))', JSON.parse(localStorage.getItem('userData')))
    // this.setData()
    await this.findRecord()
  },
  methods: {
    findRecord () {
      console.log('59 ')
      let uri = `${Config.APIURL}${Config.PART.TRANSFERFETCHFULL}`
      axios.post(uri, {}).then(response => {
        console.log('RESPONSE API TRANSFERRECORDLIST', response)
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
