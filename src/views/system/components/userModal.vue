<template>
  <el-dialog @close="handleClose" :close-on-click-modal="false" :close-on-press-escape="false" title="操作" :visible.sync="visible" width="800px">
    <el-form :disabled="disabled" :model="form" ref="form" :rules="rules" label-position="right" label-width="150px" style="padding: 0 80px 0 0;">
      <el-form-item label="账户名称" prop="loginName">
        <el-input v-clear-trim v-model="form.loginName" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-clear-trim v-model="form.userName" maxlength="15"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phonenumber">
        <el-input v-clear-trim v-model="form.phonenumber" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择" style="width: 100%">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input v-clear-trim maxlength="25" v-model="form.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="员工描述" />
      </el-form-item>
      <el-form-item label="拥有角色" prop="roleIds">
        <el-select style="width: 100%" v-model="form.roleIds" placeholder="请选择角色" multiple>
          <el-option v-for="(action) in roleAll" :key="action.roleId" :label="action.roleName" :value="action.roleId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="!disabled">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" v-no-more-click>确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import pick from 'lodash.pick'
import { getRoleAll, saveUser } from '@/service'

export default {
  name: 'userModal',
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[1-9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      disabled: false,
      visible: false,
      form: {},
      roleAll: [],
      rules: {
        roleIds: [{ required: true, message: '请选择角色', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        loginName: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        remark: [
          // { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        phonenumber: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 位数字', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
      },
    }
  },
  created() {
    this.loadRoleAll()
  },
  methods: {
    preview(record) {
      this.disabled = true
      this.edit(record)
    },
    add(parentId) {
      this.edit({ parentId: Number(parentId) || 0, status: '0' })
    },
    edit(record) {
      this.form = pick(Object.assign({}, record), 'userId', 'loginName', 'userName', 'status', 'roleIds', 'remark', 'deptId', 'phonenumber')
      this.visible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    loadRoleAll() {
      getRoleAll().then(res => {
        this.roleAll = res.data
      })
    },
    handleClose() {
      this.disabled = false
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          saveUser(this.form).then(res => {
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
