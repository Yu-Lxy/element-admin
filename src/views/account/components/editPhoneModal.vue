<template>
  <el-dialog :close-on-click-modal="false" title="更换手机号" :visible.sync="visible" width="450px">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label-width="80px" label="新手机" prop="mobile">
        <el-input maxlength="11" v-model="form.mobile"></el-input>
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
import { getPermissions, getRolePermIds, updateAccountMobile } from '@/service'

export default {
  name: 'editPhoneModal',
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      visible: false,
      form: {},
      rules: {
        mobile: [
          { required: true, message: '请输入新手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 位数字', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
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
          updateAccountMobile(this.form)
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
