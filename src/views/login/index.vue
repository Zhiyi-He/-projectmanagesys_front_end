<template>
  <div class="login-container">
    <div class="header">
      <div class="header-content" @click="backHome">
        <div class="header-image">
          <img src="..\..\assets\images\nation.png" />
        </div>
        <div class="header-text">
          <span>湖北省卫生计生委</span>
          <br />
          <span>---科研项目管理系统</span>
        </div>
      </div>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">湖北省卫计委科研项目管理系统</h3>
        <h3 class="sub-title">---{{loginName}}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'xiaobao520',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '请输入正确的用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '请输入正确的密码', trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      immediate: true, // 一旦监听到路由的变化立即执行
      handler(to, from) {
        // 回调函数，两个参数，to：当前的组件，from：上一个组件
        // this.redirect = to.query && to.query.redirect;
        if (to.query.redirect == undefined) {
          store.dispatch('user/setLogin', to.query.loginParam)
          // this.redirect = jump(to.query.loginParam);
        } else {
          this.redirect = to.query && to.query.redirect
        }
      }
    }
  },
  methods: {
    backHome() {
      this.$router.push('/')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/index' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    ...mapGetters(['loginName'])
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

@media only screen and (max-width: 540px) {
  .header {
    margin-top: 10px;
    .header-text {
      font-size: 25px;
      :last-child {
        font-size: 18px;
        float: right;
      }
    }
  }
  .title-container {
    margin-top: 0;
    .title {
      font-size: 22px;
    }
  }
}

@media only screen and (min-width: 1024px) {
  .header {
    height: 100px;
    .header-content {
      width: 50%;
      .header-text {
        font-size: 34px;
        br {
          display: none;
        }
        :last-child {
          font-size: 24px;
        }
      }
    }
  }
  .title-container {
    margin-top: -40px;
    .title {
      font-size: 26px;
    }
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .header {
    padding: 0;
    color: $light_gray;
    font-weight: 500;
    .header-content {
      margin-left: 40px;
      display: flex;
      height: 100%; //100px
      align-items: center;
      cursor: pointer;
      .header-image {
        margin-right: 10px;
        height: 80px;
        width: 80px;
      }
      .header-text {
        margin-top: 10px;
      }
    }
  }

  .login-form {
    // position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 40px;
    .title {
      color: $light_gray;
      margin: auto;
      text-align: center;
      font-weight: bold;
    }
    .sub-title {
      font-size: 18px;
      color: $light_gray;
      margin: auto 0 auto 0;
      float: right;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
