<template>
  <div class="select-container">


    <el-tooltip v-if="selectType=='radio'&&cloneValue" effect="dark" :content="cloneValue[`${labelName}`]" placement="top-start">
      <el-tag :closable="!dataListDisabled" :disable-transitions="false" @close="radioTagClose()">
        {{ cloneValue[`${labelName}`] ? cloneValue[`${labelName}`].substr(0,limitTag)+'...':'' }}
      </el-tag>
    </el-tooltip>

    <vue-drag-gable v-if="selectType=='checkbox'&&cloneValue.length" style="display: inline-block;" @end="handleDropEnd" v-model="cloneValue">
      <el-tooltip :key="tindex" v-for="(titem, tindex) in cloneValue" effect="dark" :content="titem[`${labelName}`]||''" placement="top-start">
        <el-tag :key="tindex" :closable="!dataListDisabled" :disable-transitions="false" @close="checkboxTagClose(tindex)">
          {{ titem[`${labelName}`] ? titem[`${labelName}`].substr(0,limitTag)+'...':''  }}
        </el-tag>
      </el-tooltip>  
    </vue-drag-gable>
    <el-button type="primary" size="small" @click="handleShow">{{ buttonText }}</el-button>
    <el-dialog append-to-body :close-on-click-modal="false" :close-on-press-escape="false" :title="title" :visible.sync="visible" :width="width">
      <div class="filter-container" v-if="queryOptions.length">
        <el-form :model="queryParam" ref="queryRefOptions" inline size="small">
          <el-form-item v-for="(citem, cindex) in queryOptions" :key="cindex" :label="citem.cmptLabel" :prop="citem.queryValue">
            <el-form-item v-show="0" label="" prop="keyword">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-input v-clear-trim v-if="citem.cmptType=='input'" :placeholder="citem.cmptPlaceholder" v-model="queryParam[`${citem.queryValue}`]">
            </el-input>
            <el-select v-if="citem.cmptType=='select'" v-model="queryParam[`${citem.queryValue}`]" :placeholder="citem.cmptPlaceholder" class="filter-item">
              <el-option v-for="(selItem, selIndex) in citem.selectMap" :key="selIndex" :label="selItem.label" :value="selItem.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">筛选</el-button>
            <el-button @click="resetQueryOptions">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-row v-if="selectType=='checkbox'&&selectedData.length" :gutter="20" style="padding-bottom: 20px;">
        <el-col :span="24">
          <div class="tag-group">
            <span class="tag-group__title">已选中：</span>
            <vue-drag-gable style="display: inline-block;" v-model="selectedData">
              <el-tag :key="index" v-for="(tag, index) in selectedData" closable :disable-transitions="false" @close="tagClose(tag)">
                {{ tag[`${labelName}`] }}
              </el-tag>
            </vue-drag-gable>
            <el-button @click="deteleAllSelect" class="delete-allitem" type="text" v-if="selectedData.length">清空</el-button>
          </div>
        </el-col>
      </el-row>
      <stable :isInit="false" ref="sTable" :columns="columns" :tableSize="'medium'" :pageSmall="true" :data="loadData">
        <div slot="action" slot-scope="scope">
          <el-button v-if="selectType=='radio'" type="primary" size="small" @click="selectItemClick(scope.row)">选中</el-button>
          <el-button v-if="!filterShowItem(scope.row[`${valueName}`])&&selectType=='checkbox'" type="primary" size="small" @click="selectItemClick(scope.row)">选中</el-button>
          <el-button v-if="filterShowItem(scope.row[`${valueName}`])&&selectType=='checkbox'" type="info" size="mini">已选</el-button>
        </div>
      </stable>
      <span slot="footer" class="dialog-footer" v-if="selectType=='checkbox'">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" v-no-more-click>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import VueDragGable from 'vuedraggable'
import pick from 'lodash.pick'
import Stable from '@/components/table/index'

function arrayToObject(arr, name, value) {
  return arr.reduce((occ, cha) => {
    occ[cha[name]] = cha[value];
    return occ;
  }, {});
}
export default {
  name: 'cheersDataListModal',
  props: {
    filterValue: {
      type: Object,
      default: null
    },
    queryOptions: {
      type: Array,
      default: []
    },
    queryHideOptions: {
      type: Array,
      default: []
    },
    tableColumns: {
      type: Array,
      default: []
    },
    loadIntfc: {
      type: Function,
      required: true
    },
    buttonText: {
      type: String,
      default: '选择'
    },
    value: {
      type: [Object, Array],
      default: null
    },
    selectType: {
      type: String,
      default: 'radio'
    },
    labelName: {
      type: String,
      required: true
    },
    valueName: {
      type: String,
      required: true
    },
    limitSlectNum: {
      type: Number,
      default: 10
    },
    allValue: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    width: {
      type: String,
      default: '1100px'
    },
    title: {
      type: String,
      default: '操作'
    },
    limitTag: {
      type: Number,
      default: 10
    },
  },
  components: {
    Stable,
    VueDragGable
  },
  inject: {
    elForm: {
      default: ''
    }
  },
  data() {
    return {
      selectedData: [],
      cloneValue: '',
      visible: false,
      form: {},
      queryParam: {},
      columns: [],
      loadData: param => {
        return this.loadIntfc(Object.assign(param, this.queryParam, arrayToObject(this.queryHideOptions, 'queryHideName', 'queryHideValue')))
          .then(res => {
            return res
          })
      }
    }
  },
  computed: {
    dataListDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  created() {
    this.initCmpt()
  },
  methods: {
    filterShowItem(value) {
      if (this.selectType !== 'checkbox') {
        return false
      }
      let selectedIndex = this.selectedData.findIndex((age) => {
        return age[`${this.valueName}`] == value;
      })
      if (selectedIndex != -1) {
        return true;
      } else {
        return false;
      }
    },
    handleShow() {
      this.visible = true
      this.queryParam = {}
      this.initCmpt()
      this.checkDataValue()
      this.$nextTick(() => {
        this.$refs.sTable && this.$refs.sTable.refresh(true)
      })
    },
    checkDataValue(status) {
      let { labelName, valueName, value, selectType } = this
      let checkValue = checkValue = selectType === 'radio' ? value ? value : null : value ? value : []
      this.cloneValue = JSON.parse(JSON.stringify(checkValue))
      this.selectedData = JSON.parse(JSON.stringify(checkValue))
    },
    initCmpt() {
      this.checkDataValue()
      let itemAction = [{ name: '操作', desc: 'action', slot: true, fixed: 'right' }]
      this.columns = [...this.tableColumns, ...itemAction]
    },
    tagClose(item) {
      let currentTap = this.selectedData.findIndex((age) => {
        return age[`${this.valueName}`] == item[`${this.valueName}`];
      })
      this.selectedData.splice(currentTap, 1);
    },
    radioTagClose() {
      this.selectedData = null
      this.cloneValue = null
      this.$emit('input', null);
    },
    checkboxTagClose(index) {
      let cloneValue = this.value.slice()
      cloneValue.splice(index, 1)
      this.selectedData = [...cloneValue]
      this.cloneValue = [...cloneValue]
      console.log([...cloneValue])
      this.$emit('input', [...cloneValue]);
    },
    handleDropEnd(evt) {
      this.$emit('input', this.cloneValue);
    },
    deteleAllSelect() {
      this.selectedData = [];
    },
    selectItemClick(row) {
      if (this.selectType === 'checkbox' && this.selectedData.length >= this.limitSlectNum) {
        this.$message(`最多只能选${this.limitSlectNum}条`);
        return
      }
      let { labelName, valueName } = this
      let itemRow = pick(row, labelName, valueName)
      if (this.filterValue) {
        for (let key in this.filterValue) {
            itemRow[key] = row[this.filterValue[key]]
        }
      }
      if (this.allValue) {
        itemRow = Object.assign(row, itemRow)
      }

      if (this.selectType == 'radio') {
        this.selectedData = Object.assign({}, itemRow)
        this.cloneValue = Object.assign({}, itemRow)
        this.$emit('input', Object.assign({}, itemRow))
        this.$emit('finish', row)
        this.visible = false
      } else if (this.selectType == 'checkbox') {
        this.selectedData = [...this.selectedData, ...[itemRow]];
      }
    },
    handleSubmit() {
      this.$emit('input', this.selectedData)
      this.$emit('finish', this.selectedData)
      this.cloneValue = this.selectedData.slice()
      this.visible = false
    },
    handleFilter() {
      this.$refs.sTable.refresh(true)
    },
    resetQueryOptions() {
      this.$refs['queryRefOptions'].resetFields();
    },
  },
  watch: {
    selectType(newVal, oldVal) {
      // console.log('监听类型编辑',newVal)
      // if(newVal === 'radio') {
      //   this.$emit('input', null);
      //   console.log('打印绑定数据',this.value)
      // }else if(newVal === 'checkbox') {
      //   this.$emit('input', []);
      //   console.log('打印绑定数据',this.value)
      // }
      this.checkDataValue(true)
    },
    value(newVal, oldVal) {
      this.checkDataValue()
    }
  }
}

</script>
<style lang="scss" scoped>
.filter-container .el-input {
  width: 200px;
}

/deep/ .el-tag+.el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}

.select-container {
  line-height: normal;
}

</style>
