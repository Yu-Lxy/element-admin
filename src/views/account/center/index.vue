<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16" :offset="4">
        <div class="grid-content bg-purple">
          <el-card>
            <div slot="header" class="clearfix">
              <h3>个人基本信息</h3>
            </div>
            <section class="info-container" v-if="accountInfo">
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="row-label">账户名称</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <div class="row-container">{{ accountInfo.loginName }}</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="row-action"></div>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="row-label">员工姓名</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <div class="row-container">{{ accountInfo.userName }}</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="row-action"></div>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="row-label">联系方式</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <div class="row-container">{{ accountInfo.phonenumber }}</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="row-action">
                      <el-button size="small" type="text" @click="handleEditPhone" class="button">修改手机号</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row type="flex" align="middle">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="row-label">密码管理</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <div class="row-container">••••••••</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="row-action">
                      <el-button size="small" type="text" @click="handleEditPwd" class="button">修改密码</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="row-label">角色</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <div class="row-container">
                      <el-tag :key="index" class="role-tag" v-for="(item, index) in accountInfo.roles">
                        {{ item.roleName }}
                      </el-tag>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="row-action"></div>
                  </div>
                </el-col>
              </el-row>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <div class="row-label">权限</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <div class="row-container">
                      <el-tree ref="tree" :check-strictly="checkStrictly" :data="permissionsData" :props="defaultProps" node-key="key" class="permission-tree" />
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="row-action"></div>
                  </div>
                </el-col>
              </el-row>
            </section>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <edit-phone-modal ref="editPhoneModal" @ok="handleOk"></edit-phone-modal>
    <edit-pwd-modal ref="editPwdModal" @ok="handleOkLogout"></edit-pwd-modal>
  </div>
</template>
<script>
import {
  getAccountDetail,
  getAccountPermissions
} from '@/service'
import EditPhoneModal from '../components/editPhoneModal'
import EditPwdModal from '../components/editPwdModal'

export default {
  components: {
    EditPhoneModal,
    EditPwdModal
  },
  data() {
    return {
      accountInfo: {},
      checkStrictly: false,
      permissionsData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.getRoutes()
    this.initDate()
  },
  methods: {
    async initDate() {
      let accountRes = await getAccountDetail()
      console.log(accountRes.data)
      this.accountInfo = accountRes.data
    },
    async getRoutes() {
      let roleRes = await getAccountPermissions()
      this.buildtree(roleRes.data, this.permissionsData, 0)
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
    },
    handleEditPhone() {
      this.$refs.editPhoneModal.edit()
    },
    handleEditPwd() {
      this.$refs.editPwdModal.edit()
    },
    handleOk() {
      this.initDate()
    },
    async handleOkLogout() {
      await this.$store.dispatch('Logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
}

</script>
<style lang="scss" scoped>
.button {
  float: right;
}

.role-tag {
  margin-right: 10px;
}

</style>
