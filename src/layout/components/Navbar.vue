<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <span class="nick-name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link> -->
          <router-link to="/account/center">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <!-- <el-dropdown-item>
            <span @click="resetPasswordFormVisible = true">修改密码</span>
          </el-dropdown-item> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--修改密码弹框-->
    <el-dialog title="修改密码" :visible.sync="resetPasswordFormVisible" :close-on-click-modal="false" width="450px" :modal-append-to-body="false">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item  prop="oldPassword" :label-width="formLabelWidth" >
          <el-input type="password" v-model="form.oldPassword" auto-complete="off" placeholder="原密码" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" :label-width="formLabelWidth" >
          <el-input type="password" v-model="form.newPassword" auto-complete="off" placeholder="新密码" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" :label-width="formLabelWidth" >
          <el-input type="password" v-model="form.checkPass" auto-complete="off" placeholder="确认新密码" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="resetPassword('ruleForm')" size="small" icon="el-icon-check">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetPasswordFormVisible: false,
      formLabelWidth: '50px',
      form: {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请填写原密码', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout () {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$store.dispatch('Logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`).catch(err => {})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    resetPassword (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('user/resetPassword', this.form)
          this.$message.warning('更改成功，请重新登录 😊')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        /*margin-top: 5px;*/
        position: relative;
        cursor: pointer;
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          vertical-align: middle;
        }
        .nick-name {
          cursor: pointer;
          vertical-align: middle;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
