<template>
  <div class="user-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-position="top">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="time">
            <el-date-picker
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset('ruleForm')">重置</el-button>
            <el-button type="primary" @click="find('ruleForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDistribution(scope.row.id, scope.row)"
              >分配角色</el-button
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
import { toGetUserPages } from '@/utils/user2'
import { toGetRoleAll, toSetAllocateUserRoles, toQueryRoleUser } from '@/utils/role'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'UserContent',
  components: {},
  data() {
    return {
      time: [],
      form: {
        phone: '',
        currentPage: 1,
        pageSize: 10,
        userId: ''
      },
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
      const { phone, currentPage, pageSize, userId } = this.form
      const { error, content } = await toGetUserPages({
        phone,
        currentPage,
        pageSize,
        userId,
        startCreateTime:
          this.time.length === 2
            ? dayjs(this.time[0]).format('YYYY-MM-DD')
            : '',
        endCreateTime:
          this.time.length === 2 ? dayjs(this.time[1]).format('YYYY-MM-DD') : ''
      })
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
      console.log('reset')
      ;(this.$refs.form as Form).resetFields()
      this.time = []
    },
    find() {
      console.log('find', this.form)
      this.loadUser()
    },
    async handleDistribution(id: number | string, row: any) {
      console.log('handleDistribution', id, row)
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
