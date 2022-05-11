<template>
  <div class="header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
    <span class="el-dropdown-link">
      <!-- 默认头像 -->
      <el-avatar :size="'medium'" :src="userInfo.portrait || require('../../assets/default-avatar.png')"></el-avatar>
      <i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
      <el-dropdown-item divided @click="handleLoginOut">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo, toLoginOut } from '@/utils/user'
export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {
      }
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      const { content } = await getUserInfo(this.$store.state.user.refresh_token)
      console.log(this.$store.state.refresh_token, content)
      this.userInfo = content
    },
    async handleLoginOut () {
      const { content } = await toLoginOut(this.$store.state.user.refresh_token)
      if (content) {
        this.$message.success('退出成功')
        this.$store.commit('setUser', null)
        sessionStorage.setItem('user', '')
        this.$router.push('/login')
      }
    }
  }
})
</script>

<style lang="scss">
.header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.el-dropdown {
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
