<template>
<div class="login">
        <!-- Modal -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"  role="document">
            <div class="modal-content">
                <div class="modal-body">
                        <ul class="nav nav-fill nav-pills mb-5" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                            <h5 class="text-center">Login Please</h5>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary" data-dismiss="modal" @click="login">Login</button>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                             <h5 class="text-center">Create New Account</h5>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email"  v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary" data-dismiss="modal"  @click="register">Signup</button>
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
import { fb } from '../firebase'
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let _data = {}
      fb.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((email) => {
          const db = fb.firestore()
          db.collection('MEMBER_TABLE').where('student_mail', '==', this.email).get().then(userShow => {
            userShow.forEach(doc => {
              console.log(doc.id, '=>', doc.data())
              _data = doc.data()
            })
            localStorage.setItem('userData', JSON.stringify(_data))
            let res = JSON.parse(localStorage.getItem('userData'))
            console.log('auth pass res', res)
            if (res.type) {
              if (res.type === 'admin') {
                this.$router.replace('admin')
              } else if (res.type === 'user' || res.type === 'student') {
                console.log('85>>')
                this.$router.replace('Profileviews')
              }
            } else {
              alert('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง')
            }
          })
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })
    },
    register () {
      fb.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((email) => {
          const db = fb.firestore()
          db.collection('MEMBER_TABLE').doc(this.email).set({
            student_mail: this.email,
            type: 'user',
            status: 0
          })
          console.log('ทำadd db')
          alert('สำเร็จ')
        })
        .catch(function (error) {
        // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          if (errorCode === 'auth/weak-password') {
            alert('The password is too weak.')
          } else {
            alert(errorMessage)
          }
          console.log(error)
        })
    }
  }
}
</script>
