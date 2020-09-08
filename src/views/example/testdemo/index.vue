<template>
	<div class="demo-test">
		<el-form style="margin-top: 20px;" :label-position="'right'" label="产品类型" label-width="80px" :model="formLabelAlign">
		  <el-form-item label="名称">
		    <el-input v-model="formLabelAlign.name" style="width:400px"></el-input>
		  </el-form-item>
		  <el-form-item label="活动区域">
		    <el-input v-model="formLabelAlign.region" style="width:400px"></el-input>
		  </el-form-item>
		  <el-form-item label="活动形式">
		    <el-input v-model="formLabelAlign.type" style="width:400px"></el-input>
		  </el-form-item>

		  <el-form-item label="单选" >
	        <el-tag 
	        	v-if="teacherObj&&teacherObj.name"
	        	closable
	        	:disable-transitions="false"
	        	@close="radioHandleClose"
	        >
	        {{teacherObj.name}}
	    	</el-tag>
	        <el-button type="primary" size="mini"  style="margin-left: 10px;" @click="openDialog1">选择</el-button>
	      </el-form-item>


	      <el-form-item label="多选">
	        <el-tag
			  	:key="tag._id"
			  	v-for="tag in dynamicTags"
			  	closable
			  	:disable-transitions="false"
			  	@close="checkboxHandleClose(tag)"
			>
			  {{tag.name}}
			</el-tag>
	        <el-button v-allow="'delete'" type="primary" size="mini"  style="margin-left: 10px;" @click="openDialog2">删除</el-button>
	      </el-form-item>
		</el-form>

		<test-component :columns="columns">


		</test-component>
	</div>
</template>

<script>
import CheersDialog from '@/components/cheers-dialod';
import TestComponent from './components/textComponent'
export default {
	data() {
		return {
			dynamicTags: [],
			teacherObj: null,
			formLabelAlign: {},
			columns: [1,2,3,4]
		}
	},
	components: {
		TestComponent
	},
	created() {
	},
	methods: {
		handleEdit(scope) {
    	console.log(scope)
    },
		openDialog1() {
			CheersDialog.radio({
				title:'Dialig1',
				serviceName: 'getUserList'
			})
			.then(
				(data) => {
                    this.teacherObj=data.data
                },
                (data) => {}
			)
		},
		openDialog2() {
			CheersDialog.checkbox({
				title:'Dialig2',
				serviceName: 'getUserListTwo',
				checkboxSelectList:this.dynamicTags.slice(),
				confirmButtonText: '确认11',
				cancelButtonText: '取消22',
			})
			.then(
				(data) => {
                    this.dynamicTags=data.data
                },
                (data) => {}
			)
		},
		radioHandleClose() {
			this.teacherObj=null
		},
		checkboxHandleClose(item) {
			let currentTag = this.dynamicTags.findIndex((age) => {
	  			return age._id == item._id;
	  		})
	  		this.dynamicTags.splice(currentTag, 1);
		},
	}
	
}
</script>
<style lang="scss" scoped>
.demo-test {
	/deep/ .el-tag + .el-tag {
    	margin-left: 10px;
  	}
}
.tmpl{
	background-color: red;
}
</style>