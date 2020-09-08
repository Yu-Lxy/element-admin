<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form label-width="80px" :model="queryParam" ref="queryOptions" inline size="small">
        <el-form-item label="状态：" prop="status">
          <el-select v-model="queryParam
.status" placeholder="选择状态" class="filter-item">
            <el-option label="全部" :value="''" />
            <el-option label="启用" :value="'0'" />
            <el-option label="禁用" :value="'1'" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名：" prop="loginName">
          <el-input v-clear-trim v-model="queryParam.loginName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">筛选</el-button>
          <el-button @click="resetQueryOptions">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button v-if="addEnable" type="primary" size="medium" @click="$refs.modal.add()">新建员工</el-button>
    <stable style="width: 100%; margin-top:30px;" ref="sTable" :columns="columns" :tableSize="'medium'" :pageSmall="true" :data="loadData">
      <div slot="roles" slot-scope="{row}">
        <div class="tag-wrap">
          <!-- <span :key="index" class="role-tag" v-for="(item, index) in row.roles">{{ item.roleName }}</span> -->
          <el-tag :key="index" class="role-tag" v-for="(item, index) in row.roles">{{ item.roleName }}</el-tag>
        </div>
      </div>
      <div slot="status" slot-scope="{row}">
        <el-switch :disabled="!setStatusEnabel" v-model="row.status" @change="onChangeStatus(row)" active-value="0" inactive-value="1"></el-switch>
      </div>
      <div slot="action" slot-scope="scope">
        <el-link v-if="previewEnable" type="primary" size="small" @click="handlePreview(scope)">查看</el-link>
        <el-link v-if="editEnabel" type="primary" size="small" @click="handleEdit(scope)">编辑</el-link>
        <el-link v-if="resetPwdEnabel" type="primary" size="small" @click="handleUserPwd(scope.row)">重置密码</el-link>
        <el-link v-if="removeEnable" type="danger" size="small" @click="delById(scope)">删除</el-link>
      </div>
    </stable>
    <user-modal ref="modal" @ok="handleOk"></user-modal>
  </div>
</template>
<script>
import pick from 'lodash.pick'
import {
  getUserList,
  delUser,
  changUserStatus,
  resetPwd,
  getPermissions
} from '@/service'
import { checkPermission } from '@/utils/permissions'
import UserModal from './components/userModal'
import Stable from '@/components/table/index'

export default {
  data() {
    return {
      addEnable: checkPermission('system:user:add'),
      editEnabel: checkPermission('system:user:edit'),
      resetPwdEnabel: checkPermission('system:user:resetPwd'),
      setStatusEnabel: checkPermission('system:user:setStatus'),
      removeEnable: checkPermission('system:user:remove'),
      previewEnable: checkPermission('system:user:preview'),
      queryParam: {
        status: ''
      },
      columns: [
        { name: 'ID', desc: 'userId', width: '40' },
        { name: '员工姓名', desc: 'loginName', width: '100' },
        { name: '联系方式', desc: 'phonenumber', width: '100' },
        { name: '角色', desc: 'roles', slot: true, width: '100' },
        { name: '创建时间', desc: 'createTime', width: '100' },
        { name: '状态', desc: 'status', slot: true, width: '50' },
        { name: '操作', desc: 'action', slot: true, width: '200', fixed: 'right' }
      ],
      loadData: param => {
        return getUserList(Object.assign(param, this.queryParam))
          .then(res => {
            return res
          })
      }
    }
  },

  components: {
    UserModal,
    Stable
  },
  methods: {
    /**
     * [onChangeStatus 修改用户状态]
     * @param  {[type]} record [description]
     * @return {[type]}        [description]
     */
    onChangeStatus(record) {
      changUserStatus(pick(record, 'userId', 'status'))
        .then(res => {
          if (res.event === 0) {
            this.$message.success('状态修改成功')
          } else {
            record.status = record.status === '0' ? '1' : '0'
            this.$message.error(res.message)
          }
        })
        .catch((err) => {
          record.status = record.status === '0' ? '1' : '0'
        })
    },
    handleUserPwd(record) {
      let password = '123456'
      resetPwd(Object.assign({ password }, pick(record, 'userId', 'loginName')))
        .then(res => {
          if (res.event === 0) {
            this.$message.success(`${record.loginName}` + '重置密码成功')
          } else {
            this.$message.error(res.message)
          }
        }).catch(() => {
          this.$message.error('系统错误，请稍后再试')
        })
    },
    /**
     * [handleOk 模态框回调]
     * @return {[type]} [description]
     */
    handleOk() {
      this.$refs.sTable.refresh()
    },
    /**
     * [handleFilter 列表筛选]
     * @return {[type]} [description]
     */
    handleFilter() {
      this.$refs.sTable.refresh()
    },
    /**
     * [resetQueryOptions 查询条件重置]
     * @return {[type]} [description]
     */
    resetQueryOptions() {
      this.$refs['queryOptions'].resetFields();
    },

    /**
     * [handlePreview 查看员工]
     * @param  {[type]} options.$index [description]
     * @param  {[type]} options.row    [description]
     * @return {[type]}                [description]
     */
    handlePreview({ $index, row }) {
      this.$refs.modal.preview(row)
    },
    /**
     * [handleEdit 编辑]
     * @param  {[type]} options.$index [description]
     * @param  {[type]} options.row    [description]
     * @return {[type]}                [description]
     */
    handleEdit({ $index, row }) {
      this.$refs.modal.edit(row)
    },
    /**
     * [delById 删除]
     * @param  {[type]} options.$index [description]
     * @param  {[type]} options.row    [description]
     * @return {[type]}                [description]
     */
    delById({ $index, row }) {
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          delUser({ ids: row.userId })
            .then(res => {
              if (res.event === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                this.handleOk()
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(err => { console.error(err) })
        })
    }
  }
}

</script>
<style lang="scss" scoped>
.app-container {}
.tag-wrap {
  padding: 5px;
}
.role-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>>
