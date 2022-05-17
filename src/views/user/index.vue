<template>
  <div class="user">
    <UserContent />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserContent from './components/UserContent.vue'

export default Vue.extend({
  name: 'User',
  components: {
    UserContent
  }
})
</script>

<style lang="scss" scoped>
</style>
