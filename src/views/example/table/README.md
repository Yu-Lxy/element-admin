---
title: 后台管理系统element-admin——二次封装Table组件
date: 2020-09-09 14:34:51
tags: vue
categories: vue
---

## Start
项目中使用表格灰常的频繁👿，所以一个简洁的表格组件，既能让代码变得优雅还可以省去很多重复的操作。
<!-- more -->

## element封装调用
element-ui已经为我们封装好了一层，这是element-ui的写法：
``` js
<template>
  <el-table
    :data="tableData"
    style="width: 500px">
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column label="日期" width="120">
      <template slot-scope="scope">{{ '加个前缀😝' + scope.row.date }}</template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1)
      }
    }
  }
</script>
```
![element-table](sTable/table1.png)

虽然已经封装的很好了，但感觉还是不够简洁，并且还想将分页功能、loading功能、拖动功能都通过配置参数的方式来选择是否调用，所以进行了二次封装，看一下封装过后的调用代码：

## 二次封装后调用

``` js
<template>
  <s-table ref="sTable" :data="loadData" :columns="columns">
    <div slot="action" slot-scope="{row}">
      <el-button type="primary" @click="deleteRow(row)">移除</el-button>
    </div>
  </s-table>
<template>

<script>
import STable from '@/components/table/index'
export default {
  components: {
    STable
  },
  data () {
    return {
      columns: [
        {name: '姓名', desc: 'name', width: '100'},
        {name: '日期', desc: 'date', width: '220', filter: true, filterFun: (row) => { return `加个前缀😝 ${row.date}` }},
        {name: '操作', desc: 'action', width: '320', slot: true, fixed: 'right'}
      ],
    }
  },
  methods: {
    loadData: param => {
      return getData()
        .then(res => {
          return res
        })
    }
  }
}
</script>
```
![s-table](sTable/table2.png)

引入组件之后，table的数据由组件内部主动调用并返回，表格的每一列不再是 `el-table-column` 标签，而是由 `columns` 数组传递每一列信息，还包括了 `loading、pagination` 组件的逻辑，不用每次都处理同样的逻辑了。其中还包含了拖拽排序、选中操作等常用的功能。

## 开始写
下面看一下二次封装table组件的思路吧~

### JSX写法
`JSX` 就是Javascript和XML结合的一种格式。React发明了JSX，利用HTML语法来创建虚拟DOM。当遇到 `<` ，JSX就当HTML解析，遇到 `{` 就当JavaScript解析。
我为什么用jsx呢？一方面是之前的一版template写法写的实在是看着很"chou"，另一方面想学习jsx语法和render函数[官方文档看这里](https://cn.vuejs.org/v2/guide/render-function.html)。

### 主思路
> 从结构上来看，主要分为两部分：`table` 和 `pagination` ，而 `table` 中又有 `column` 。

> 其次就是数据的加载和过滤，默认主动调用数据加载，统一处理好数据结构（`table` 所需的 `list` ，分页组件所需的数据等）后，按需返回。

> 拖动功能的初始化和处理。

> table数据的更新机制。

-----------

所以主结构是这样的：
```js
render () {
  return (
    <div>
      { this.renderTable() }
      { this.renderPage() }
    </div>
  )
}
```
因为分页组件根据外部props属性决定使用或者不使用，并且有一些自定义样式，所以改成这样：
```js
render () {
  return (
    <div>
      { this.renderTable() }
      <div style={this.pageClass}>{ this.showPagination ? this.renderPage() : '' }</div>
    </div>
  )
}
```
### renderTable
下面看一下 `renderTable` 中是怎么写的：
```js
/**
  * renderTable
  */
renderTable () {
  const props = {
    border: true, // table的边框
    size: this.tableSize, // table的大小
    data: this.dataList,  // table需要的数据
  }
  return (
    <el-table ref="multipleTable"
      {...{ props }}  // 属性绑定
      v-loading={this.tableLoading} // table的loading
      on-selection-change={this.changeFun}  // 选中某行的回调
      on-select-all={this.selectAll}> // 选中所有行的回调
      {this.columns.map(item => this.renderTableColumn(item))} // 遍历每一列
    </el-table>
  )
},
```
> **renderTable主要思路就是**：先配好 table 的属性 `props` ，return 里返回 table 的结构，结构里 `绑定属性和方法` 。里面的每一列用 `mpa` 函数遍历，再用 `renderTableColumn` 渲染。

### renderTableColumn
渲染列的render函数：
```js
/**
  * renderColumn
  */
renderTableColumn (item) {
  // TableColumn配置的属性
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
    // 这里需要判断当前列(item.type)的属性，如果有type(通常type用于带select选项的列)就展示带type的列。如果没有就展示正常列。
    item.type
      ? <el-table-column {...{ props }} type={item.type} selectable={item.selectable}/> // 带type的列
      : <el-table-column {...{ props }} {...{scopedSlots: { // 不带type的列
        default: (scope) => {
          if (item.slot) { 
            // 如果设置了slot，就设置一个插槽并且自带返回值
            return this.$scopedSlots[item.desc](scope)
          } else if (item.pic) {
            // 如果设置了pic，就返回一个img的结构
            return (<img src={scope.row[item.desc]} style={{width: item.width - 24 + 'px', borderRadius: '5px'}}/>)
          } else if (item.click) {
            // 如果带有点击事件的，就设置点击后的回调，还带有filter的回调。
            return (<div style={item.style} onClick={this.btnClickfunc.bind(item, scope.row, item.desc)}>{item.filter ? item.filterFun(scope.row) : scope.row[item.desc]}</div>)
          } else {
            // 除去以上几种，普通的都直接返回通用的dom结构，带tooltip、filter的回调。
            return (<div style={item.tooltip ? {...this.tooltip, ...item.style} : item.style}>{item.filter ? item.filterFun(scope.row) : scope.row[item.desc]}</div>)
          }
        }
      }}}/>
  )
},
```
> **renderTableColumn主要思路就是**：首先每一列的信息进来先看有没有带type，常见的就是带选择框的（也就是type="selection"）的，如果是就展示带type的列，如果不是就正常列。

> 正常列里面如果是带有插槽属性的，就设置一个插槽并传递参数（插槽相关知识可以参考[这篇](https://www.jianshu.com/p/3af8552449fb)）；
如果设置了本列需要展示pic，就返回一个img结构；
如果设置带有点击事件，那就返回一个带有点击回调的结构；
其余的都返回正常结构，并带有tooltip、filter的回调。

### renderPage
渲染分页组件的render函数：
```js
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
```
> 同样的思路：设置props，绑定属性和方法。

### 数据加载
结构大概搭好之后考虑一下数据问题，默认是主动加载数据的，但也有不需要一加载组件就请求数据的，所以我们在mounted函数内以 `isInit` 属性按需请求，下面是 `loadData` 函数：
```js
/**
  * 数据加载
  */
loadData () {
  this.tableLoading = true  // table的loading
  const param = this.showPagination // 分页信息
    ? { page: this.currentPage, size: this.pageSize }
    : ''
  if (this.data && this.data instanceof Array) { // 如果数据是数组就直接赋值给dataList
    this.tableLoading = false
    this.dataList = this.data
    // 调用初始化拖动方法
    this.dragInit()
  } else {
     // 如果data是一个返回值是promise的函数，就调用并then。
    const result = this.data(param)
    if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
      result.then(rsp => {
        // 处理数据，给table组件、给分页组件
        this.currentPage = rsp.data.currentPage
        this.total = rsp.data.totalElement
        this.tableLoading = false
        this.dataList = rsp.data.list
        // 如果父组件需要返回值就发送过去
        if (this.needData) {
          this.$emit('allBackData', rsp.data)
          this.$emit('backData', rsp.data.list, this.currentPage, this.pageSize)
        }
        // 调用初始化拖动方法
        this.dragInit()
      })
    }
  }
},
```
> 采用组件内调用获取数据方法是因为，基本在和后端小伙伴定义数据结构的时候就统一了 table 和 pagination 的结构，所以在组件内部统一过滤数据可以让调用者代码更简洁，如果调用者需要返回值则可以设置属性。

### 拖动功能
拖动要引入 `import Sortable from 'sortablejs'` ，父组件调用时如果设置了 `drag` 那么组件内将初始化拖动功能。看一下初始化拖动的方法：
```js
/**
  * 设置拖动
  */
setSort () {
  const el = this.$refs.multipleTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
  if (this.drag && !this.sortable) {  // 如果没有创建sortable则创建
    this.sortable = Sortable.create(el, {
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
      setData (dataTransfer) {
        dataTransfer.setData('Text', '')
      },
      onEnd: evt => { // 拖动后
        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0] // 获取当前拖动选项的id
        this.newList.splice(evt.newIndex, 0, tempIndex) // 在新列表里的新位置插入拖动选项的id
        this.$emit('newSort', this.newList)  // 发送给父组件新列表

        // 拖动后需同步table内data数据
        this.dataList.splice(evt.newIndex, 0, this.dataList.splice(evt.oldIndex, 1)[0]) // 在tableList的新位置插入拖动选项的数据
        let newArray = this.dataList.slice(0)
        this.dataList = []
        this.$nextTick(() => {
          this.dataList = newArray  // 重新赋值给dataList
        })
      }
    })
  } else if (!this.drag && this.sortable) { // 如果不需要拖动 但是创建过sortable 那就销毁
    this.sortable.destroy()
    this.sortable = null
  }
},
```
拖动后首先获取到当前拖动项的id，放到列表的新位置上，发送给父组件。
之后table的数据也需要同步顺序，把当前拖动项的数据放到新的位置上返回一个新的数组，等到dom结构更新完成之后，重新赋值给dataList，这样就可以保证看到列表的顺序和实际的顺序是一样的。

### 数据更新
有一些业务场景需要更新table的数据，所以组件里写了一个 `refresh` 的方法，方便父组件更新数据。
```js
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
```

## 总结
整体思路大概就是这样，其中的一些逻辑也是根据后来业务需求加上的，还有一些分页、框选等相关方法这里没过多解释，就直接看代码吧~。