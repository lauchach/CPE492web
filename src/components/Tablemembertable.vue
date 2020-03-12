<template>
  <table class="table table-bordered" id='tbuser'>
  <thead>
    <tr>
      <th>#</th>
      <th>First</th>
      <th>Last</th>
      <th>Handle</th>
    </tr>
  </thead>
</table>
</template>
<script>

import { fb } from '../firebase'
const db = fb.firestore()
// const table = document.querySelector('tbuser')
export default {
  name: 'Tablemembertable',
  props: {
    msg: String
  },
  created:
      db.collection('MEMBER_TABLE').get().then(userShow => {
        userShow.forEach(doc => {
          // console.log(doc.id, '=>', doc.data())
          showData(doc.data())
        })
      })
}
function showData (doc) {
  // var row = table.inserRow(-1)
  // var cell1 = row.insreCell(0)
  // var cell2 = row.insreCell(1)
  // var cell3 = row.insreCell(2)
  // var cell4 = row.insreCell(3)
  // cell1.innerHTML = doc.data().rsuid
  // cell2.innerHTML = doc.data().name
  // cell3.innerHTML = doc.data().email
  // cell4.innerHTML = doc.data().email
}
</script>
