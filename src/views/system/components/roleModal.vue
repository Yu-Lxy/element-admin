<template>
  <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="操作" :visible.sync="visible" width="800px">
    <el-form :model="form" ref="form" :rules="rules" label-position="right" label-width="150px" style="padding: 0 80px 0 0;">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-clear-trim v-model="form.roleName" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="权限字符" prop="roleKey">
        <el-input v-clear-trim v-model="form.roleKey"></el-input>
      </el-form-item>
      <!-- <el-form-item label="显示顺序" prop="roleSort">
        <el-input v-clear-trim v-model.number="form.roleSort"></el-input>
      </el-form-item> -->
      <el-form-item label="状态" prop="status">
        <el-select value-key="M" v-model="form.status" placeholder="状态">
          <el-option label="启用" value="0"></el-option>
          <el-option label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述" prop="remark">
        <el-input v-clear-trim v-model="form.remark" maxlength="50" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="角色描述" />
      </el-form-item>
      <el-form-item label="拥有权限">
        <el-tree ref="tree" @check="onCheck" :check-strictly="false" :data="permissions" :props="defaultProps" show-checkbox default-expand-all node-key="key" class="permission-tree" v-model="checkedKeys" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" v-no-more-click>确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import pick from 'lodash.pick'
import { getPermissions, getRolePermIds, saveRole } from '@/service'
import ElTreeSelect from './SelectTree';

export default {
  name: 'roleModal',
  data() {
    return {
      visible: false,
      form: {},
      rules: {
        remark: [
          // { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        roleSort: [
          { required: true, message: '请输入顺序', trigger: 'blur' },
          // { type: 'number', message: '顺序必须为数字值', trigger: 'blur' }
        ],
        roleKey: [
          { required: true, message: '请输入权限字符', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      },

      treeCheck: false,
      pidSet: [],
      checkedKeys: [],
      halfCheckedKeys: [],
      permissions: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  components: {
    ElTreeSelect
  },
  created() {
    this.loadPermissions()
  },
  methods: {
    add() {
      this.edit({ status: '0'})
    },
    edit(record) {
      this.visible = true
      if (record.roleId) {
        getRolePermIds(record.roleId).then(res => {
          const pidSet = new Set(res.data.map(m => m.parentId).filter(id => id > 0))
          this.pidSet = pidSet
          this.checkedKeys = res.data.map(m => m.menuId).filter(id => !pidSet.has(id))
          this.$refs.tree.setCheckedKeys(this.checkedKeys);
        })
      }
      this.form = pick(Object.assign({}, record), 'status', 'roleSort', 'roleKey', 'roleId', 'roleName', 'remark')
      this.$nextTick(() => {
        if (!record.roleId) {
          this.checkedKeys = []
          this.$refs.tree.setCheckedKeys(this.checkedKeys);
        }
        this.$refs['form'].clearValidate()
      })
    },
    /**
     * [loadPermissions 初始化获取菜单信息]
     * @return {[type]} [description]
     */
    loadPermissions() {
      getPermissions().then(res => {
        this.buildtree(res.data, this.permissions, 0)
      })
    },
    onCheck(checkedKeys, info) {
      console.log(checkedKeys)
      console.log(info)
      if (!this.treeCheck) this.treeCheck = true
      console.log('onCheck', info)
      this.checkedKeys = checkedKeys
      this.halfCheckedKeys = info.halfCheckedKeys
    },
    /**
     * [buildtree 生成菜单树]
     * @param  {[type]} list     [要生成的数组]
     * @param  {[type]} arr      [递归结果数组]
     * @param  {[type]} parentId [上一层id]
     * @return {[type]}          [description]
     */
    buildtree(list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          var child = {
            key: item.menuId,
            value: item.menuId + '',
            title: item.menuName,
            children: []
          }
          this.buildtree(list, child.children, item.menuId)
          arr.push(child)
        }
      })
    },
    /**
     * [handleSubmit 模态框提交]
     * @return {[type]} [description]
     */
    handleSubmit() {
      const _this = this
      // 如果没有check过，半选节点是拿不到的，只能通过预先设置的pidSet获取
      this.$refs['form'].validate((valid) => {
        const checkedKeys = this.$refs.tree.getCheckedKeys()
        const checkedAll = this.treeCheck ? checkedKeys.concat(_this.halfCheckedKeys) : checkedKeys.concat(Array.from(_this.pidSet))

        if (!checkedAll.length > 0) {
          _this.$message.warning('请至少选择一个权限')
          return
        }

        // const checkedKeys = this.$refs.tree.getCheckedKeys()
        // if (!checkedKeys.length > 0) {
        //   this.$message.warning('请至少选择一个权限')
        //   return
        // }
        if (valid) {
          this.form.menuIds = Array.from(new Set(checkedAll))
          saveRole(this.form)
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
