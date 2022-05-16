<template>
  <div class="create-edit">
    <el-form label-position="top" ref="form" :model="role" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="role.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toSaveOrUpdateRole, toGetRole } from '@/utils/role'

export default Vue.extend({
  name: 'CreateOrEdit',
  components: {
  },
  data () {
    return {
      role: {
        id: '',
        name: '',
        code: '',
        description: ''
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: [String, Number],
      default: 100
    }
  },
  methods: {
    openRole () {
      if (this.isEdit) {
        this.queryRoleUser()
      } else {
        this.initRole()
      }
    },
    closeRole () {
      console.log('closeRole')
    },
    initRole () {
      this.role = {
        id: '',
        name: '',
        code: '',
        description: ''
      }
    },
    async queryRoleUser () {
      const { error, content } = await toGetRole(this.roleId)
      if (!error) {
        this.role = content
      }
    },
    async onSubmit () {
      // 表单验证
      const { error, message } = await toSaveOrUpdateRole(this.role)
      this.$emit('roleSuccess')
      if (!error) {
        this.$message.success(message)
      }
    },
    onCancel () {
      this.$emit('roleCancel')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
