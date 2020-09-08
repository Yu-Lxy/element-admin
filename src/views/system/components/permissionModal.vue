<template>
  <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="操作" :visible.sync="visible" width="800px">
    <el-form v-loading="initLoading" :model="form" ref="form" :rules="rules" label-position="right" label-width="150px" style="padding: 0 80px 0 0;">
      <el-form-item label="上级权限" prop="parentId">
        <el-tree-select style="width:100%" :data="permissions" v-model="form.parentId" node-key="key" :props="{label:'title'}" />
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-select value-key="M" v-model="form.menuType" placeholder="请选择">
          <el-option label="目录" value="M"></el-option>
          <el-option label="菜单" value="C"></el-option>
          <el-option label="按钮" value="F"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限名称" prop="menuName">
        <el-input v-clear-trim v-model="form.menuName"></el-input>
      </el-form-item>
      <el-form-item label="动态菜单唯一键" prop="menuKey" v-if="form.menuType!='F'">
        <el-input v-clear-trim v-model="form.menuKey"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" prop="perms" v-if="form.menuType=='F' || form.menuType=='C'">
        <el-input v-clear-trim v-model="form.perms"></el-input>
      </el-form-item>
      <el-form-item label="模块布局类型" prop="menuLay" v-if="form.menuType==='M'">
        <el-select v-model="form.menuLay" placeholder="请选择">
          <el-option label="基础布局，包含了面包屑，和中间内容区 (slot)" value="PageView"></el-option>
          <el-option label="空布局，专门为了二级菜单内容区自定义 (slot)" value="RouterView"></el-option>
          <el-option label="页面tab布局，专门为了二级菜单内容区自定义 (slot)" value="RouterTabView"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图标" prop="icon" v-if="form.menuType==='M' || form.menuType==='C'">
        <el-input v-clear-trim v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="orderNum">
        <el-input v-clear-trim v-model.number="form.orderNum"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="visible">
        <el-select v-model="form.visible" placeholder="请选择">
          <el-option label="显示" value="0"></el-option>
          <el-option label="隐藏" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="!initLoading">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" v-no-more-click>确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import pick from 'lodash.pick'
import { getPermissions, menuSavePerm } from '@/service'
import ElTreeSelect from './SelectTree';
const defaultPermissions = { key: 0, value: '0', title: '无' }

export default {
  name: 'permissionModal',
  data() {
    return {
      initLoading: false,
      visible: false,
      form: {},
      rules: {
        orderNum: [
          { required: true, message: '请输入顺序', trigger: 'blur' },
        ],
        icon: [{ required: true, message: '请填写图标', trigger: 'blur' }],
        parentId: [{ required: true, message: '请选择上级权限', trigger: 'change' }],
        menuType: [{ required: true, message: '请选择类型', trigger: 'change' }],
        menuName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        menuKey: [
          { required: true, message: '请输入动态菜单唯一键', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        perms: [
          { required: true, message: '请输入权限标识', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        menuLay: [{ required: true, message: '请选择类型', trigger: 'change' }],
        visible: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      permissions: [],
    }
  },
  components: {
    ElTreeSelect
  },
  created() {
    // this.loadPermissions()
  },
  methods: {
    add(parentId) {
      this.edit({ parentId: Number(parentId) || 0 })
    },
    async edit(record) {
      this.form = pick(Object.assign({}, record), 'icon', 'menuId', 'parentId', 'menuType', 'visible', 'perms', 'menuName', 'menuKey', 'menuLay', 'orderNum')
      this.visible = true
      this.initLoading = true
      await this.loadPermissions()
      this.initLoading = false
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    async loadPermissions() {
      await getPermissions()
        .then(res => {
          this.permissions.length = 0;
          this.permissions.push(defaultPermissions)
          this.buildtree(res.data, this.permissions, 0)
        })
    },
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
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          menuSavePerm(this.form).then(res => {
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
