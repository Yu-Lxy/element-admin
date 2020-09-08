<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="queryParam" ref="queryOptions" inline size="small">
        <el-form-item label="唯一键：" prop="menuKey">
          <el-input v-clear-trim v-model="queryParam.menuKey"></el-input>
        </el-form-item>
        <el-form-item label="权限名称：" prop="menuName">
          <el-input v-clear-trim v-model="queryParam.menuName"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="visible">
          <el-select v-model="queryParam.visible" placeholder="选择状态" class="filter-item">
            <el-option label="全部" value="" />
            <el-option label="显示" value="0" />
            <el-option label="隐藏" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">筛选</el-button>
          <el-button @click="resetQueryOptions">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button v-if="addEnable" type="primary" size="medium" @click="$refs.modal.add()">新建</el-button>
    <el-table :data="menuList" row-key="menuId" border :tree-props="{children: 'children', hasChildren: 'hasChildren'}" style="width: 100%; margin-top:30px;">
      <el-table-column prop="menuName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="menuKey" label="动态菜单唯一键" width="180">
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          {{ scope.row.menuType | menuTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="perms" label="权限标识">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.visible | statusFilter }}
        </template>
      </el-table-column>
      <el-table-column width="240" label="操作" align="center">
        <template slot-scope="scope">
          <el-link v-if="editEnabel" size="mini" @click="handleEdit(scope.row)">编辑</el-link>
          <el-link v-if="addEnable" type="primary" size="mini" @click="handleAdd(scope.row.menuId)">新增</el-link>
          <el-link v-if="removeEnable" size="mini" type="danger" @click="delById(scope)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <permission-modal ref="modal" @ok="handleOk" />
  </div>
</template>
<script>
import { getPermissions, menuDelPerm } from '@/service'
import { checkPermission } from '@/utils/permissions'
import { treeData } from '@/utils/treeutil'
import PermissionModal from './components/permissionModal'

export default {
  data() {
    return {
      queryParam: {},
      totalCount: 0,
      menuList: [],
      localLoading: false,
      permissionsData: [],

      addEnable: checkPermission('system:menu:add'),
      editEnabel: checkPermission('system:menu:edit'),
      removeEnable: checkPermission('system:menu:remove')
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': '隐藏',
        '0': '显示'
      }
      return statusMap[status]
    },
    menuTypeFilter(type) {
      const menuMap = {
        'M': '目录',
        'F': '按钮',
        'C': '菜单'
      }
      return menuMap[type]
    }
  },
  components: {
    PermissionModal
  },
  created() {
    this.initData()
  },
  methods: {
    handleEdit(row) {
      this.$refs.modal.edit(row)
    },
    handleAdd(parentId) {
      this.$refs.modal.add(parentId)
    },
    delById({ $index, row }) {
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          menuDelPerm(row.menuId)
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
      this.initData()
    },
    handleFilter() {
      this.initData()
    },
    resetQueryOptions() {
      this.$refs['queryOptions'].resetFields();
    },
    async initData() {
      try {
        this.localLoading = true;
        let res = await getPermissions(this.queryParam);
        this.menuList = treeData(res.data, 'menuId')
        this.localLoading = false;
      } catch (error) {}
    },
    buildtree(list, arr, parentId) {
      list.forEach(item => {
        if (item.parentId === parentId) {
          var child = {
            key: item.menuId,
            title: item.menuName,
            children: []
          }
          this.buildtree(list, child.children, item.menuId)
          arr.push(child)
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.app-container {}
/deep/.el-table th {
  background-color: #f5f7fa!important;
}
</style>>
