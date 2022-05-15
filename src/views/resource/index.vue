<template>
  <div class="resource">
    <SourceList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SourceList from './components/list.vue'

export default Vue.extend({
  name: 'Resource',
  components: {
    SourceList
  }
})
</script>

<style lang="scss" scoped>
</style>
