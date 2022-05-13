<template>
  <div class="menu">
    <el-card class="box-card">
      <el-button slot="header" @click="goAddMenu">添加菜单</el-button>
      <div v-for="o in 4" :key="o" class="text">
        {{ '列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Menu',
  components: {},
  methods: {
    goAddMenu() {
      this.$router.push('menu-add')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
