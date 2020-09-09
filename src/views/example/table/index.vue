<template>
  <div class="container">
    <s-table ref="sTable"
      style="width: 500px;margin: 20px"
      :data="loadData"
      :columns="columns"
      :pageSmall="true">
      <div slot="action" slot-scope="{row}">
        <el-button type="primary" size="small" @click="handleDetail(row)">删除</el-button>
      </div>
    </s-table>
    <!-- <el-button @click="isAwait=false">请求数据</el-button>
    <el-button @click="$refs.sTable.refresh(true)">刷新列表</el-button> -->
  </div>
</template>

<script>
import STable from '@/components/table'
import { formatDate } from '@/plugins/filters'
import { getTableData } from '@/service'
export default {
  name: 'tableList',
  data () {
    return {
      list: [],
      columns: [
        {name: '姓名', desc: 'name', width: '100'},
        {name: '日期', desc: 'date', width: '220', filter: true, filterFun: (row) => { return `加个前缀😝 ${row.date}` }},
        {name: '操作', desc: 'action', width: '120', slot: true, fixed: 'right'}
      ],
      loadData: param => {
        return getTableData()
        .then(res => {
          return res
        })
      }
    }
  },
  components: {
    STable
  },
  methods: {
    handleDetail (row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    height:100%;width:100%;padding:10px;font-size:12px;
  }
</style>
