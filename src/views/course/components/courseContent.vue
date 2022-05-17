<template>
  <div class="user-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-position="top">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset('ruleForm')">重置</el-button>
            <el-button type="primary" @click="find('ruleForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDistribution(scope.row.id, scope.row)"
              :type="scope.row.status === 0 ? 'danger' : 'primary'"
              >下架</el-button
            >
            <el-button
              size="mini"
              @click="handleDistribution(scope.row.id, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="handleDistribution(scope.row.id, scope.row)"
              >内容管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="form.currentPage"
        :page-size="form.pageSize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="分配角色" :visible.sync="roleDialogVisible">
      <el-select v-model="value1" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import {
  toGetRoleAll,
  toSetAllocateUserRoles,
  toQueryRoleUser
} from '@/utils/role'
import { toGetQueryCourses } from '@/utils/course'

export default Vue.extend({
  name: 'UserContent',
  components: {},
  data() {
    return {
      form: {
        courseName: '',
        currentPage: 1,
        pageSize: 10,
        status: 0
      },
      options: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '上架'
        },
        {
          value: 2,
          label: '下架'
        }
      ],
      tableData: [],
      total: 0,
      roles: [],
      roleDialogVisible: false,
      selectedUser: -1,
      value1: []
    }
  },
  created() {
    this.loadUser()
  },
  methods: {
    async loadUser() {
      // 表单校验
      console.log(this.form)
      const { courseName, currentPage, pageSize, status } = this.form
      const { error, content } = await toGetQueryCourses({
        currentPage,
        pageSize,
        courseName,
        status
      })
      console.log('content', content)
      if (!error) {
        this.tableData = content.records
        this.total = content.total
      }
    },
    async loadRole() {
      const { error, content } = await toGetRoleAll()
      if (!error) {
        this.roles = content
      }
    },
    reset() {
      (this.$refs.form as Form).resetFields()
    },
    find() {
      this.loadUser()
    },
    async handleDistribution(id: number | string) {
      const { error, content } = await toQueryRoleUser(this.selectedUser)
      if (!error) {
        this.value1 = content.map((item: any) => item.id)
      }
      this.loadRole()
      this.selectedUser = id as any
      this.roleDialogVisible = true
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`)
      this.loadUser()
    },
    async confirmDialog() {
      const { error, message } = await toSetAllocateUserRoles({
        userId: this.selectedUser,
        roleIdList: this.value1
      })
      if (!error) {
        this.$message.success(message)
        this.roleDialogVisible = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
