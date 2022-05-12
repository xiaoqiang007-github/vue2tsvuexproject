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
        <!-- https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png -->
        <!-- <el-avatar :size="'medium'" :src="user.portrait || requier('../../assets/avatar-default.png')" :src="''"></el-avatar> -->
        <el-avatar :size="'medium'" :src="user.portrait"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="username">{{user.userName}}</el-dropdown-item>
        <el-dropdown-item divided command="loginout" @click.native="handleCommand('loginout')">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getInfo, loginOut } from '@/utils/user'
export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      user: {}
    }
  },

  created () {
    this.loadUserInfo()
    this.loadUserInfo()
    this.loadUserInfo()
  },

  methods: {
    async loadUserInfo () {
      console.log('loadUserInfo')
      const { content: data } = await getInfo()
      console.log(data)
      this.user = data
    },
    async handleCommand (command: string) {
      if (command === 'loginout') {
        this.$confirm('确认退出应用？', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { error: userError, message } = await loginOut()
          if (!userError) {
            this.$store.commit('setUser', '')
            this.$message.success(message)
            this.$router.push('/login')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
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
