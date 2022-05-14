<template>
  <div class="menu-add">
    <CreateOrEdit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuAdd',
  components: {
    CreateOrEdit
  }
})
</script>

<style lang="scss" scoped>
</style>
