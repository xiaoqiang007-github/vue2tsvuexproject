<template>
  <div class="edit-course">
    <createOrEdit :is-edit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrEdit from './components/createOrEdit.vue'

export default Vue.extend({
  name: 'CourseEdit',
  props: {
  },
  components: {
    createOrEdit
  }
})
</script>

<style lang="scss" scoped>
</style>
