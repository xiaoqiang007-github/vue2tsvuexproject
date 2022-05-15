<template>
  <div class="role-list">
    <!-- <el-card class="box-card">
    </el-card> -->
    <el-card class="box-card">
      <el-button slot="header" @click="dialogRole = true">添加角色</el-button>
      <el-table :data="roles" style="width: 100%">
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="name" label="角色名称"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
            type="text" size="mini" @click="handleEdit(scope.$index, scope.row)"
              >分配菜单</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >分配资源</el-button
            >
            <el-button
            type="text" size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="添加角色"
      :visible.sync="dialogRole"
      width="30%"
      >
      <CreateOrEdit @roleSuccess="roleSuccess" @roleCancel="dialogRole = false" />
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRole = false">取 消</el-button>
        <el-button type="primary" @click="dialogRole = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toGetRoleAll, toDeleteRole } from '@/utils/role'
import CreateOrEdit from './CreateOrEdit2.vue'

export default Vue.extend({
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data() {
    return {
      roles: [],
      dialogRole: false
    }
  },
  created() {
    this.loadRole()
  },
  methods: {
    roleSuccess () {
      this.dialogRole = false
      this.loadRole()
    },
    async loadRole() {
      const { error, content } = await toGetRoleAll()
      if (!error) {
        this.roles = content
      }
    },
    handleEdit(index: number, row: any) {
      console.log(index, row)
      this.$router.push({
        name: 'menuEdit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete(index: number, row: any) {
      console.log(index, row)
      this.$confirm('确定删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { error } = await toDeleteRole(row.id)
          if (!error) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.loadRole()
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
