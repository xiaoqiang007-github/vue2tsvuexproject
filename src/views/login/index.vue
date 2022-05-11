
<template>
  <div class="login">
    <el-form ref="loginForm" label-position="top" :model="form" :rules="rules" >
      <el-form-item label="用户名" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="isLoginLoadding" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { userLogin } from '@/utils/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'Login',
  components: {},
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoginLoadding: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        console.log('submit!')
        // 1. 表单验证
        await (this.$refs.loginForm as Form).validate()
        // 2. 提交表单
        this.isLoginLoadding = true
        const data = await userLogin(this.form)
        const { state, message, content } = data.data
        console.log(this.$store.state.user)
        if (state !== 1) {
          this.$message.error(message)
        } else {
          this.$store.commit('setUser', content)
          this.$message.success(message)
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (e) {
        console.log(e)
        this.isLoginLoadding = false
      }
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
