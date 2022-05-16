<template>
  <div class="menu-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">{{isEdit?'编辑菜单':'添加菜单'}}</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择活动区域">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option v-for="item in parentMenuList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.orderNum"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toSaveOrUpdate, toGetEditMenuInfo } from '@/utils/menu'

export default Vue.extend({
  name: 'CreateOrEdit',
  components: {},
  data() {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      parentMenuList: {}
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      const { error, content } = await toGetEditMenuInfo(this.$route.params.id)
      if (!error) {
        if (content.menuInfo) {
          this.form = content.menuInfo
        }
        this.parentMenuList = content.parentMenuList
      }
    },
    async onSubmit() {
      // 表单验证
      // 提交表单
      const { error, message } = await toSaveOrUpdate(this.form)
      if (!error) {
        this.$message.success(message)
        this.$router.back()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
