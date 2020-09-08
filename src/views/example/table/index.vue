<template>
  <div class="container">
    <div class="s-table-bg">
      <!-- @btnClickFunc="openWindow"
        @handleBtnClick="phandleBtnClick" -->
      <s-table ref="sTable"
        :columns="columns"
        :tableSize="'medium'"
        :drag="true"
        :await="isAwait"
        :pageSmall="true"
        :data="loadData"
        @newSort="newSort">
        <el-table-column label="操作" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="small"
              @click="rowDetail(scope.row)">详情</el-button>
            <el-button
              type="danger"
              plain
              circle
              icon="el-icon-delete"
              size="small"
              @click="rowDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </s-table>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      @close="backUrl">
    </el-dialog>
    <el-button @click="isAwait=false">请求数据</el-button>
    <el-button @click="$refs.sTable.refresh(true)">刷新列表</el-button>
  </div>
</template>

<script>
import STable from '@/components/table'
import { formatDate } from '@/plugins/filters'
import { getFeedbackList } from '@/service'
export default {
  name: 'tableList',
  data () {
    return {
      list: [],
      columns: [
        {name: '', desc: 'sel', width: '50', type: 'selection'},
        {name: '名称', desc: 'nickname', width: '120', tooltip: true},
        {slot: true, slotName: 'listen'},
        {name: '图片', desc: 'pic', width: '130', pic: true},
        {slot: true, slotName: 'user'},
        {name: '时间', desc: 'feedbackTime', width: '90', filter: true, filterFun: (row) => { return formatDate(row.feedbackTime) }}
      ],
      dialogTitle: '', // 弹窗标题
      dialogVisible: false, // 弹窗显示
      dialogWidth: '70%', // 弹窗的宽度
      status: '1',
      isAwait: true,
      loadData: param => {
        return getFeedbackList(Object.assign(param, {status: this.status}))
          .then(res => {
            return res
          })
      }
    }
  },
  mounted () {
    // this.initData()
  },
  components: {
    STable
  },
  methods: {
    // initData () {
      
    // },
    openWindow (data) { // 打开弹窗{column:column,row:row,type:clickType}
      console.log(data)
      // let column = data.column
      let row = data.row
      this.dialogTitle = row.name
      this.dialogVisible = true
    },
    newSort (sort) {
      console.log(sort)
    },
    rowDetail (row) {
      console.log(row)
    },
    rowDelete (row) {
      console.log(row)
    },
    backUrl () {

    },
    phandleBtnClick (data) { // 表格内按钮点击事件
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    height:100%;width:100%;padding:10px;font-size:12px;
    .s-table-bg{height:calc(100% - 50px);}
  }
</style>
