<template>
  <el-dialog :close-on-click-modal="false" title="修改密码" :visible.sync="visible" width="450px">
    <el-form :model="form" ref="form" :rules="rules">
      <!-- <el-form-item label-width="80px" label="旧密码" prop="olddata">
        <el-input v-model="form.olddata"></el-input>
      </el-form-item> -->
      <el-form-item label-width="80px" label="新密码" prop="password">
        <el-input v-model="form.password" maxlength="18"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button v-no-more-click type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import pick from 'lodash.pick'
import { resetAccountPwd } from '@/service'

export default {
  name: 'editPhoneModal',
  data() {
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('密码必须是字母和数字组成'));
        }
      }
    };
    return {
      visible: false,
      form: {},
      rules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    edit(record) {
      this.form = {}
      this.visible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          resetAccountPwd(this.form)
            .then(res => {
              if (res.event === 0) {
                this.$message.success('保存成功')
                this.$emit('ok')
                this.visible = false
              } else {
                this.$message.error(res.message)
              }
            }).catch(() => {
              this.$message.error('系统错误，请稍后再试')
            })
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
