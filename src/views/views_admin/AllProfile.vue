<template>
    <div class="container">
      <h3>Profile Tast</h3>
      <Tablemembertable></Tablemembertable>
    </div>
</template>

<script>
import Tablemembertable from '@/components/Tablemembertable.vue'
export default {
  name: 'AllProfile',
  created () {
    console.log('ไปหน้าAllProfilewได้')
  },
  components: {
    Tablemembertable
  }
}
</script>
