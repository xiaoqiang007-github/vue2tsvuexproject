<template>
  <div class="menu-add">
    <CreateOrEdit :is-edit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'menuEdit',
  components: {
    CreateOrEdit
  }
})
</script>

<style lang="scss" scoped>
</style>
