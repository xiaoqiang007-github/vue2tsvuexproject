<template>
  <div class="aside">
    <!-- <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      router
      class="aside-menu"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-menu"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-menu"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-menu"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
      </el-submenu>
      <!-- 只有一个子菜单时不显示父菜单 手动添加点击事件 -->
      <el-submenu index="2" class="hide" @click="$router.push('/course')">
        <template slot="title" >
          <i class="el-icon-location"></i>
          <span>课程管理</span>
        </template>
        <!-- <el-menu-item index="/course">
          <i class="el-icon-document"></i>
          <span slot="title">课程管理</span>
        </el-menu-item> -->
      </el-submenu>
      <el-submenu index="3" class="hide">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>课程管理</span>
        </template>
        <el-menu-item index="/user">
          <i class="el-icon-document"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-menu"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-menu"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AppAside',
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    methods: {
      handleOpen (key: string, keyPath: string): void {
        console.log(key, keyPath)
      },
      handleClose (key: string, keyPath: string): void {
        console.log(key, keyPath)
      }
    }
  }
})
</script>

<style lang="scss">
.aside {
  .aside-menu {
    height: 100vh;
  }
}

// 一级菜单和子菜单距离左边位置过大
.el-submenu__title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.el-menu .el-menu-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

// 隐藏只有一个子菜单时不显示父菜单的箭头
.hide .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>
