<template>
  <div class="app-container">
    <el-button type="primary" v-if="addEnable" @click="$refs.modal.add()">添加角色</el-button>
    <stable style="width: 100%; margin-top:30px;" ref="sTable" :columns="columns" :tableSize="'medium'" :pageSmall="true" :data="loadData">
      <div slot="action" slot-scope="scope">
        <el-link v-if="editEnabel" type="primary" size="small" @click="handleEdit(scope)">编辑</el-link>
        <el-link v-if="removeEnable" type="danger" size="small" @click="delById(scope)">删除</el-link>
      </div>
    </stable>
    <role-modal ref="modal" @ok="handleOk"></role-modal>
  </div>
</template>
<script>
import { getRoles, delRole } from '@/service'
import { checkPermission } from '@/utils/permissions'
import RoleModal from './components/roleModal'
import Stable from '@/components/table/index'

export default {
  data() {
    return {
      columns: [
        { name: '编号', desc: 'roleId' },
        { name: '角色名称', desc: 'roleName' },
        { name: '描述', desc: 'remark' },
        { name: '员工数量', desc: 'staff' },
        { name: '操作', desc: 'action', slot: true, fixedWidth: '200', fixed: 'right' }
      ],
      loadData: param => {
        return getRoles(Object.assign(param, {}))
          .then(res => {
            return res
          })
      },
      addEnable: checkPermission('system:role:add'),
      editEnabel: checkPermission('system:role:edit'),
      removeEnable: checkPermission('system:role:remove')
    }
  },
  components: {
    RoleModal,
    Stable
  },
  methods: {
    handleEdit(record) {
      this.$refs.modal.edit(record.row)
    },
    delById({ $index, row }) {
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          delRole({ ids: row.roleId })
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
    },
    handleOk() {
      this.$refs.sTable.refresh()
    },
  }
}

</script>
<style lang="scss" scoped>
.app-container {}

</style>>
