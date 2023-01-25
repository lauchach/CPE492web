<template>
  <div class='login'>
    <!-- Modal -->
    <div
      class='modal fade'
      id='login'
      tabindex='-1'
      role='dialog'
      aria-labelledby='loginTitle'
      aria-hidden='true'
    >
      <div class='modal-dialog modal-dialog-centered' role='document'>
        <div class='modal-content'>
          <div class='modal-body'>
            <ul class='nav nav-fill nav-pills mb-5' id='pills-tab' role='tablist'>
              <li class='nav-item'>
                <a
                  class='nav-link active'
                  id='pills-home-tab'
                  data-toggle='pill'
                  href='#pills-login'
                  role='tab'
                  aria-controls='pills-login'
                  aria-selected='true'
                >Login</a>
              </li>
              <li class='nav-item'>
                <a
                  class='nav-link'
                  id='pills-register-tab'
                  data-toggle='pill'
                  href='#pills-register'
                  role='tab'
                  aria-controls='pills-register'
                  aria-selected='false'
                >Signup</a>
              </li>
            </ul>
            <div class='tab-content' id='pills-tabContent'>
              <div
                class='tab-pane fade show active'
                id='pills-login'
                role='tabpanel'
                aria-labelledby='pills-login-tab'
              >
                <h5 class='text-center'>Login Please</h5>
                <div class='form-group'>
                  <label for='exampleInputEmail1'>Email address</label>
                  <input
                    type='email'
                    v-model='email'
                    class='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                  />
                  <small class='form-text text-muted'>We'll never share your email with anyone else.</small>
                </div>
                <div class='form-group'>
                  <label for='exampleInputPassword1'>Password</label>
                  <input
                    type='password'
                    @keyup.enter='login'
                    v-model='password'
                    class='form-control'
                    id='exampleInputPassword1'
                    placeholder='Password'
                  />
                </div>
                <div class='form-group'>
                  <button class='btn btn-primary' data-dismiss='modal' @click='login'>Login</button>
                </div>
              </div>
              <div
                class='tab-pane fade'
                id='pills-register'
                role='tabpanel'
                aria-labelledby='pills-register-tab'
              >
                <h5 class='text-center'>Create New Account</h5>
                <div class='form-group'>
                  <label for='email'>Email address</label>
                  <input
                    type='email'
                    v-model='email'
                    class='form-control'
                    id='email'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                  />
                </div>
                <div class='form-group'>
                  <label for='password'>Password</label>
                  <input
                    type='password'
                    v-model='password_1'
                    class='form-control'
                    id='password'
                    placeholder='Password'
                  />
                </div>
                <div class='form-group'>
                  <label for='password'>Password</label>
                  <input
                    type='password'
                    v-model='password_2'
                    class='form-control'
                    id='password'
                    placeholder='Password'
                  />
                </div>
                <div class='form-group'>
                  <button class='btn btn-primary' data-dismiss='modal' @click='register'>Signup</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { fb } from '../firebase' // เรียกใช้งาน fb จาก firebase.js
import { Config } from '../config'
import axios from 'axios' // เรียกใช้งาน axios

export default {
  name: 'Login',
  props: {
    msg: String
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_1: '',
      password_2: ''
    }
  },
  async created () {}, // สั่งให้หน้าเพจทำเริ่มทำงานฟังชั่นที่ต้องการ},
  methods: { // ''// methods ของหน้าเพจ"
    async login () {
      let uri = `${Config.APIURL}${Config.PART.LOGIN}`
      axios.post(uri, {
        email: this.email,
        password: this.password
      }).then(responseLogin => {
        if (responseLogin.data.status.code === 0) {
          localStorage.setItem('userData', JSON.stringify(responseLogin.data.data))
          let res = responseLogin.data.data
          if (res.type) {
            if (res.type === 'admin' || res.type === 'deputyDean') {
              if (res.type === 'deputyDean') this.$router.replace('admin/overview')
              else this.$router.replace('admin')
            } else if (res.type === 'user' || res.type === 'student') {
              this.$router.replace('Profileviews')
            }
          } else {
            alert('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง')
          }
        } else {
          alert('รหัสผิดพลาด')
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    },
    register () {
      if (this.email.split('@')[1] === 'rsu.ac.th') {
        let uri = `${Config.APIURL}${Config.PART.REGISTER}`
        axios.post(uri, {
          email: this.email,
          password_1: this.password_1,
          password_2: this.password_2,
          type: 'student'
        }).then(responseRegister => {
          if (responseRegister.data.status.code === 0) {
            localStorage.setItem('userData', JSON.stringify(responseRegister.data.data))
            let res = responseRegister.data.data
            alert('สมัครสมาชิกสำเร็จ')
          } else {
            alert(`${responseRegister.data.status.message}`)
          }
        }).catch(err => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
      } else {
        alert('กรุณาลองใช้ Emal @rsu.ac.th')
      }
    }
  }
}
</script>
