<template>
  <div class="login">
    <el-form ref="form" label-position="top" :model="form" >
      <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Login',
  components: {},
  data () {
    return {
      form: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;
    padding: 0 20px;
    background-color: #fff;
    border-radius: 5px;

    // 无法直接给表单元素el-form-item__label加上样式
    .el-form-item ::v-deep.el-form-item__label {
      float: left !important;
    }

    .el-form--label-top .el-form-item__label{
      float: left !important;
    }
  }

  .login-btn {
    width: 100%;
  }

}

</style>
