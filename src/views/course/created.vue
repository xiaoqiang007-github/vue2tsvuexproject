<template>
  <div class="course-create-space">
    <createOrEdit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrEdit from './components/createOrEdit.vue'

export default Vue.extend({
  name: 'CourseCreate',
  components: {
    createOrEdit
  }
})
</script>

<style lang="scss" scoped>
</style>
