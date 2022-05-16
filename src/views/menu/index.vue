<template>
  <div class="menu">
    <el-card class="box-card">
      <el-button slot="header" @click="goAddMenu">添加菜单</el-button>
      <el-table :data="menus" style="width: 100%">
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <el-table-column prop="level" label="菜单级别"> </el-table-column>
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toGetAllMenu, toDeleteMenu } from '@/utils/menu'

export default Vue.extend({
  name: 'Menu',
  components: {},
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.loadMenu()
  },
  methods: {
    goAddMenu() {
      this.$router.push('menu-add')
    },
    async loadMenu() {
      const { error, content } = await toGetAllMenu()
      if (!error) {
        this.menus = content
      }
    },
    handleEdit(index: number, row: any) {
      this.$router.push({
        name: 'menuEdit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete(index: number, row: any) {
      this.$confirm('确定删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { error } = await toDeleteMenu(row.id)
          if (!error) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.loadMenu()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
