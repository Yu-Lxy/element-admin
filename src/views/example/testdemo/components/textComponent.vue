<template>
	<div class="test-container">
		<h1>子组件</h1>
    <!-- <slot name="status" :data="data"></slot> -->
    <!-- <slot></slot> -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <!-- <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->
    </el-table>
	</div>	
</template>

<script>
export default {
	props: {
		columns: {
      type: Array,
      default: []
    },
	},
	data: function(){
    return {
      data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba'],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {
  	console.log(this)
  	console.log(this.columns)
  },
  // render() {
  // 	let scopedSlotsList = Object.keys(this.$scopedSlots)
  // 	const table = (
  //     <div>
  //       { scopedSlotsList.map(name => (this.$scopedSlots[name]({data: this.data}))) }
  //     </div>
  //   )
  //   console.log('----this.scopedSlots-----')
  //   console.dir(this.$scopedSlots)
  //   console.log('----this.slots-----')
  //   console.dir(this.$slots)
  //   console.log('-----this.defaultSort----')
  //   console.dir(this.$defaultSort)

    

  // 	return (
  //     <div class="table-wrapper">
  //      { table }
  //     </div>
  //   )
  // }
}
</script>
<style lang="scss" scoped>
.tmpl{
	background-color: #ccc;
}
</style>