<template>
  <div class="course-space">
    <UserContent />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserContent from './components/courseContent.vue'

export default Vue.extend({
  name: 'CourseIndex',
  components: {
    UserContent
  }
})
</script>

<style lang="scss" scoped>
</style>
