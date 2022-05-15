<template>
  <div class="role">
    <RowList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RowList from './components/List.vue'

export default Vue.extend({
  name: 'Role',
  components: {
    RowList
  }
})
</script>

<style lang="scss" scoped>
</style>
