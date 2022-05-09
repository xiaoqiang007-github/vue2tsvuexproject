<template>
  <el-container>
    <el-aside style="width:200px;"><AppAside /></el-aside>
    <el-container>
      <el-header>
        <AppHeader />
      </el-header>
      <!-- 子路由出口 -->
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  min-width: 780px;
}

.el-aside {
  background-color: #d3dce6;
}

.el-header {
  background-color: #b3c0d1;
  padding: 0;
}
</style>
