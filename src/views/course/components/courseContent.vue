<template>
  <div class="user-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-position="top">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="form.status" placeholder="请选择">
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
            <el-button type="success" @click="$router.push('/course-create')">添加课程</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="changeStatus(scope.row, $event)"
              :disabled="scope.row.isStatusLoadding"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="$router.push(('/course/'+scope.row.id+'/course-edit'))"
              >编辑</el-button
            >
            <el-button
              size="mini"
              @click="$router.push(('/course/'+scope.row.id+'/section'))"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { toGetQueryCourses, toChangeState } from '@/utils/course'

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
          label: '下架'
        },
        {
          value: 1,
          label: '上架'
        }
      ],
      tableData: [],
      total: 0,
      roles: [],
      selectedUser: -1,
      value1: []
    }
  },
  created() {
    this.loadUser()
  },
  methods: {
    edit () {
      // this.$router.push({name: 'course-edit', query: {CourseId: scope.row.id}})
    },
    async changeStatus (row: any, status: number) {
      console.log(row.id, status)
      row.isStatusLoadding = true
      const { error, message } = await toChangeState({
        courseId: row.id,
        status
      })
      if (!error) {
        this.$message.success(message)
      }
      row.isStatusLoadding = false
    },
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
        const tableData = content.records
        tableData.forEach((item: any) => {
          item.isStatusLoadding = false
        })
        this.tableData = tableData
        this.total = content.total
      }
    },
    reset() {
      (this.$refs.form as Form).resetFields()
    },
    find() {
      console.log(this.form)
      this.loadUser()
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`)
      this.loadUser()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
