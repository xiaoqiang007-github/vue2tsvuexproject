<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="form" :model="form" label-position="right">
          <el-form-item label="资源名称" props="name">
            <el-input v-model="form.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="资源路径" props="url">
            <el-input v-model="form.url" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="资源分类" props="categoryId">
            <el-select v-model="form.categoryId" placeholder="请选择资源分类">
              <el-option :label="cate.name" v-for="cate in categoryList" :key="cate.id" :value="cate.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isLoadding">查询</el-button>
            <el-button @click="resetForm" :disabled="isLoadding">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="resources" style="width: 100%" v-loading="isLoadding">
        <el-table-column label="编号" type="index"> </el-table-column>
        <el-table-column prop="name" label="资源名称"> </el-table-column>
        <el-table-column prop="url" label="资源路径"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="createdTime" label="时间"> </el-table-column>
      </el-table>
      <!-- current-page.sync="form.current" 组件内部改变page会同步 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[2, 5, 10, 20, 50]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :disabled="isLoadding"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toGetResourcePages, toGetAllSource } from '@/utils/source'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceList',
  components: {},
  data() {
    return {
      resources: [],
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 10
      },
      categoryList: [],
      total: 0,
      isLoadding: false // 考虑网络慢的情况，显示loading效果并阻止部分区域用户点击
    }
  },
  created() {
    this.getSourceCategory()
    this.loadSource()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      this.initForm()
      this.loadSource()
    },
    initForm () {
      this.form.current = 1
    },
    resetForm () {
      // 比起手动重置效果好上不少
      (this.$refs.form as Form).resetFields()
      this.initForm()
      this.loadSource()
    },
    async getSourceCategory() {
      const { error, content } = await toGetAllSource(-1)
      if (!error) {
        this.categoryList = content
      }
    },
    async loadSource() {
      this.isLoadding = true
      const { error, content } = await toGetResourcePages(this.form)
      if (!error) {
        this.resources = content.records
        this.total = content.total
      }
      this.isLoadding = false
    },
    handleSizeChange(page: number) {
      this.form.current = 1
      this.form.size = page
      this.loadSource()
    },
    handleCurrentChange(page: number) {
      this.form.current = page
      this.loadSource()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
