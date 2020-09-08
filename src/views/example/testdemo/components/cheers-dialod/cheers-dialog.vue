<template>
  <div class="cheers-dialog-wrapper">
    <el-dialog width="100" :title="title" :visible.sync="value" :before-close="handleClose">
    	<el-row :gutter="20" style="padding-bottom: 20px;">
				<el-col :span="24">
				  <div class="grid-content bg-purple">
				  	<el-input 
				  	placeholder="请输入内容"
	  				v-model="searchValue"
	  				clearable><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
				  	<el-button type="primary" @click.prevent="searchTarget">搜索</el-button>
				  </div>
				</el-col>
			</el-row>

      <el-row :gutter="20" style="padding-bottom: 20px;">
        <el-col :span="24">
          <div class="tag-group">
            <span class="tag-group__title">已选中：</span>
            <el-tag
              :key="tag._id"
              v-for="tag in checkboxSelectList"
              closable
              :disable-transitions="false"
              @close="tagClose(tag)">
              {{ tag.name }}
            </el-tag>
            <el-button @click="deteleAllSelect" class="delete-allitem" type="text" v-if="checkboxSelectList.length">清空</el-button>
          </div>
        </el-col>
      </el-row>

		  <el-table
		  	:data="tableDataFilter"
		  	border
		  	style="width: 100%"
		  	max-height="650"
		  	v-loading="loading"
		  >
		    <el-table-column property="_id" label="ID"></el-table-column>
		    <el-table-column property="name" label="名称"></el-table-column>
		    <el-table-column property="password" label="密码"></el-table-column>
		    <el-table-column fixed="right" align="center" label="操作" width="150">
		    	<template slot-scope="scope">
		    		<el-button v-if="scope.row.selected" type="info"size="mini">已选</el-button>
		        <el-button @click="selectItemClick(scope.row)" v-else type="primary" size="mini">选中</el-button>
		      </template>
		    </el-table-column>
		  </el-table>

			<el-row :gutter="20">
				<el-col :span="24">
					<div class="grid-content bg-purple">
						<el-pagination
							style="text-align: right; padding-top: 20px;"
						  background
						  layout="prev, pager, next"
						  :total="total"
						  :current-page="currentPage"
					    :page-size="pageSize"
    					@current-change="handleCurrentChange"
						  >
						</el-pagination>
					</div>
				</el-col>
			</el-row>
		
		  <div slot="footer" class="dialog-footer" v-if="type=='checkbox'">
		    <el-button @click="handleAction('cancel')">{{ cancelButtonText }}</el-button>
		    <el-button type="primary" @click="handleAction('confirm')">{{ confirmButtonText }}</el-button>
		  </div>
		</el-dialog>
  </div>
</template>

<script>
let CONFIRM_TEXT = '确定';
let CANCEL_TEXT = '取消';
// import { getUserList, getUserListTwo } from '@/service/index'

export default {
	data() {
    return {
    	title: '标题',
		  showClose: true,
		  modalFade: false,
		  confirmButtonText: CONFIRM_TEXT,
      cancelButtonText: CANCEL_TEXT,
		  callback: null,
		  value:false,
		  type:'radio',
      serviceName:'',

		  searchValue:'',

		  currentPage: 1,
      pageSize: 10,
      total: 0,

      loading: false,
      tableData: [],
      tableDataFilter:[],
      checkboxSelectList:[]
    };
  },
  watch:{

  },
  computed: {
    tableDataLength() {
      return this.checkboxSelectList.length;
    },
  },
  watch: {
    tableDataLength(newVal, oldVal) {
      this.filterShowList();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getList();
    })
  	
  },
  destroyed() {
  	// console.log('销毁')
  },
  methods: {
    /**
     * [filterShowList 过滤已选]
     * @return {[type]} [description]
     */
    filterShowList() {
      let filterList = [];
      this.tableData.forEach((item) => {
        let selectedIndex = this.checkboxSelectList.findIndex((age) => {
          return age._id == item._id;
        })
        if(selectedIndex != -1) {
          item.selected = true;
        }else {
          item.selected = false;
        }
        filterList.push(item)
      })
      this.tableDataFilter = filterList
    },
  	/**
  	 * [tagClose 删除tag]
  	 * @param  {[type]} item [description]
  	 * @return {[type]}      [description]
  	 */
  	tagClose(item) {
  		let currentTap = this.checkboxSelectList.findIndex((age) => {
  			return age._id == item._id;
  		})
  		this.checkboxSelectList.splice(currentTap, 1);
  	},
    /**
     * [deteleAllSelect 清空已选]
     * @return {[type]} [description]
     */
    deteleAllSelect() {
      this.checkboxSelectList = [];
    },
  	handleAction(action) {
      var callback = this.callback;
      this.value = false;
      if(action=='confirm') {
      	callback(action, this.checkboxSelectList);
      }else {
      	callback(action);
      }
    },
    handleClose(done) {
    	done();
    	var callback = this.callback;
      this.value = false;
      callback('cancel');
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    /**
     * [searchTarget 搜索触发]
     * @return {[type]} [description]
     */
    searchTarget() {
    	this.currentPage = 1;
    	this.getList();
    },
    selectItemClick(item) {
    	var callback = this.callback;
    	if(this.type=='radio') {
    		callback('confirm', item);
    		this.value = false;
    	}else if(this.type=='checkbox') {
    		this.checkboxSelectList = [...this.checkboxSelectList, item];
    	}
    },
    async getList() {
      try {
        let server = require('@/service/index')[`${this.serviceName}`]
      	this.loading=true;
        let res=await server(this.currentPage,this.pageSize,this.searchValue);
        this.loading = false;
        this.tableData = res.data.list;
        this.total = res.data.totalElement;
        // 执行过滤
        this.filterShowList();
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.cheers-dialog-wrapper {
  /deep/ .el-input {
    width: 200px;
  }
  /deep/ .el-tag + .el-tag {
    margin-left: 10px;
  }
  .delete-allitem {
    margin-left: 10px;
  }
}
</style>