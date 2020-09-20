import Sortable from 'sortablejs'
export default {
  data () {
    return {
      multipleSelection: [], // 已选中的行
      isUpdateSelection: true, // 是否更新已选中
      tableLoading: false,
      currentPage: this.currentPages,
      total: this.totals,
      pageSize: this.pageSizes,
      dataList: [],
      pageClass: { height: '70px', display: 'flex', alignItems: 'center', position: 'relative', right: '0px' },
      tooltip: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' },
      pageStyle: { position: 'absolute', right: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    }
  },
  render () {
    return (
      <div>
        { this.renderTable() }
        <div style={this.pageClass}>{ this.showPagination ? this.renderPage() : '' }</div>
      </div>
    )
  },
  mounted () {
    if (this.isInit) {
      this.loadData()
    }
  },
  methods: {
    /**
     * renderTable
     */
    renderTable () {
      const props = {
        border: true,
        size: this.tableSize,
        data: this.dataList
      }
      return (
        <el-table ref="multipleTable" {...{ props }} v-loading={this.tableLoading} on-selection-change={this.changeFun} on-select-all={this.selectAll}>
          {this.columns.map(item => this.renderTableColumn(item))}
        </el-table>
      )
    },
    /**
     * renderColumn
     */
    renderTableColumn (item) {
      const props = {
        prop: item.desc,
        label: item.name,
        align: 'center',
        key: item.desc,
        width: item.fixedWidth == undefined ? 'auto' : item.fixedWidth,
        minWidth: item.width == undefined ? 'auto' : item.width,
        fixed: item.fixed,
        showOverflowTooltip: item.tooltip ? true : false,
        sortable: item.sortable ? 'custom' : false
      }
      return (
        item.type
          ? <el-table-column {...{ props }} type={item.type} selectable={item.selectable}/>
          : <el-table-column {...{ props }} {...{scopedSlots: {
            default: (scope) => {
              if (item.slot) {
                return this.$scopedSlots[item.desc](scope)
              } else if (item.pic) {
                return (<img src={scope.row[item.desc]} style={{width: item.width - 24 + 'px', borderRadius: '5px'}}/>)
              } else if (item.click) {
                return (<div style={item.style} onClick={this.btnClickfunc.bind(item, scope.row, item.desc)}>{item.filter ? item.filterFun(scope.row) : scope.row[item.desc]}</div>)
              } else {
                return (<div style={item.tooltip ? {...this.tooltip, ...item.style} : item.style}>{item.filter ? item.filterFun(scope.row) : scope.row[item.desc]}</div>)
              }
            }
          }}}/>
      )
    },
    /**
     * renderPage
     */
    renderPage () {
      const props = {
        background: true,
        small: this.pageSmall,
        currentPage: this.currentPage,
        pageSizes: [15, 30, 60, 120],
        pageSize: this.pageSize,
        total: this.total,
        layout: 'total, sizes, prev, pager, next, jumper'
      }
      return (
        <el-pagination {...{ props }} on-current-change={this.handleCurrentChange} on-size-change={this.handleSizeChange} style={this.pageStyle}/>
      )
    },
    /**
     * 数据加载
     */
    loadData () {
      this.tableLoading = true
      const param = this.showPagination
        ? { page: this.currentPage, size: this.pageSize }
        : ''
      if (this.data && this.data instanceof Array) {
        this.tableLoading = false
        this.dataList = this.data
        this.dragInit()
      } else {
        const result = this.data(param)
        if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
          result.then(rsp => {
            this.currentPage = rsp.data.currentPage
            this.total = rsp.data.totalElement
            this.tableLoading = false
            this.dataList = rsp.data.list
            if (this.needData) {
              this.$emit('allBackData', rsp.data)
              this.$emit('backData', rsp.data.list, this.currentPage, this.pageSize)
            }
            // 拖动
            this.dragInit()
          })
        }
      }
    },
    dragInit () {
      this.setSort()
      this.oldList = this.dataList.map(v => v.id)
      this.newList = this.oldList.slice()
    },
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh (bool = false) {
      if (bool) {
        this.currentPage = 1
      }
      this.loadData()
    },
    /**
     * 页码改变
     */
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadData()
    },
    /**
     * 每页条数改变
     */
    handleSizeChange (val) {
      this.pageSize = val
      this.loadData()
    },
    /**
     * 获取已选中的行
     */
    changeFun (val) {
      if (this.isUpdateSelection) {
        this.multipleSelection = val
        this.$emit('selectChange', val)
      } else {
        this.isUpdateSelection = true
      }
    },
    /**
     * 全选按钮
     */
    selectAll (val) {
      this.$emit('selectAll', val)
    },
    /**
     * 清空选择
     */
    clearSelection () {
      this.$refs.multipleTable.clearSelection()
    },
    /**
     * 设置拖动
     */
    setSort () {
      const el = this.$refs.multipleTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      if (this.drag && !this.sortable) {
        this.sortable = Sortable.create(el, {
          ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
          setData (dataTransfer) {
            dataTransfer.setData('Text', '')
          },
          onEnd: evt => {
            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0] // 获取当前拖动选项的id
            this.newList.splice(evt.newIndex, 0, tempIndex) // 在新列表里的新位置插入拖动选项的id
            this.$emit('newSort', this.newList)  // 发送给父组件新列表

            // 拖动后需同步table内data数据
            this.dataList.splice(evt.newIndex, 0, this.dataList.splice(evt.oldIndex, 1)[0]) // 在tableList的新位置插入拖动选项的数据
            let newArray = this.dataList.slice(0)
            this.dataList = []
            this.$nextTick(() => {
              this.dataList = newArray
            })
          }
        })
      } else if (!this.drag && this.sortable) {
        this.sortable.destroy()
        this.sortable = null
      }
    },
    btnClickfunc (column, row) { // 按钮点击
      this.$emit('btnClickFunc', { column: column, row: row })
    }
  },
  props: {
    data: {
      type: [Function, Array],
      required: true
    },
    needData: {
      type: Boolean,
      default: false
    },
    isInit: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableSize: {
      type: String,
      default: ''
    },
    totals: {
      type: Number,
      default: 0
    },
    currentPages: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Number,
      default: 15
    },
    pageSmall: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    drag: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function
    }
  }
}
