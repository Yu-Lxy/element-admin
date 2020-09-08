<template>
  <div>
    <el-dialog append-to-body :close-on-click-modal="false" :close-on-press-escape="false" :title="title" :visible.sync="visible" :width="width">
      <div class="filter-container" v-if="queryOptions.length">
        <!-- 筛选头 -->
        <el-form :model="queryParam" ref="queryRefOptions" inline size="small">
          <el-form-item v-for="(item, key) in queryOptions" :key="key" :label="item.label" :prop="item.queryValue">
            <el-input v-clear-trim v-if="item.type=='input'" :placeholder="item.placeholder" v-model="queryParam[`${item.queryValue}`]">
            </el-input>
            <el-select v-if="item.type=='select'" v-model="queryParam[`${item.queryValue}`]" :placeholder="item.placeholder" class="filter-item">
              <el-option v-for="(selItem, selIndex) in item.selectMap" :key="selIndex" :label="selItem.label" :value="selItem.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">筛选</el-button>
            <el-button @click="resetQueryOptions">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tips"><i class="el-icon-warning-outline"> 能选择{{limitSlectNum}}个 😊</i></div>
      <!-- 列表 -->
      <stable :isInit="false" ref="sTable" :columns="columns" :tableSize="'medium'" :pageSmall="true" :data="loadData" @selectChange="selectChange" @selectAll="selectAll"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" v-no-more-click>添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Stable from '@/components/table/index'
export default {
  name: 'dataListModal',
  props: {
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
    valueName: {
      type: String,
      required: true
    },
    limitSlectNum: {
      type: Number,
      default: 10
    },
    activeData: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    width: {
      type: String,
      default: '1100px'
    },
    title: {
      type: String,
      default: '选择'
    }
  },
  inject: {
    tableData: {
      default: []
    }
  },
  components: {
    Stable
  },
  data () {
    return {
      selectedData: [],
      cloneValue: '',
      visible: false,
      ids: [],
      form: {},
      queryParam: {},
      columns: [],
      loadData: param => {
        return this.loadIntfc(Object.assign(param, this.queryParam))
          .then(res => {
            return res
          })
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let itemAction = [{ name: '', desc: '', type: 'selection', selectable: (row) => { return !this.filterShowItem(row[`${this.valueName}`]) } }]
      this.columns = [ ...itemAction, ...this.tableColumns ]
    },
    open () {
      this.visible = true
      this.queryParam = {}
      // this.selectedData = data
      this.$nextTick(() => {
        this.$refs.sTable && this.$refs.sTable.refresh(true)
      })
    },
    handleSubmit () {
      this.$emit('finish', this.selectedData)
      this.$emit('input', this.selectedData)
      this.visible = false
    },
    handleFilter () {
      this.$refs.sTable.refresh(true)
    },
    resetQueryOptions () {
      this.$refs['queryRefOptions'].resetFields()
    },
    selectChange (data) {
      this.selectedData = data
    },
    selectAll (val) {
      if (val.length > this.limitSlectNum) {
        this.$message.warning(`只能选择${this.limitSlectNum}个`)
        this.$refs.sTable.clearSelection()
      }
    },
    filterShowItem (id) {
      if (this.selectedData.length >= this.limitSlectNum) {
        let selectedIndex = this.selectedData.findIndex((item) => {
          return item[`${this.valueName}`] === id
        })
        if (selectedIndex === -1) {
          return true
        } else {
          return false
        }
      }
      if (this.activeData) {
        let activeIndex = this.activeData.findIndex((item) => {
          return item[`${this.valueName}`] === id
        })
        if (activeIndex === -1) {
          return false
        } else {
          return true
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.filter-container .el-input {
  width: 200px;
}
.tips {
  margin: -10px 0 20px 0;
  color: rgb(228, 80, 80);
}
/deep/ .el-tag+.el-tag {
  margin-left: 10px;
}
.select-container {
  line-height: normal;
}
</style>
