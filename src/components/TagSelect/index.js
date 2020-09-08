import Option from './TagSelectOption.js'
export default {
  Option,
  name: 'TagSelect',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    hideCheckAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: this.getItemsKey(this.filterEmpty(this.$slots.default)),
      val: this.value
    }
  },
  methods: {
    getItemsKey (items) {
      const totalItem = {}
      items.forEach(item => {
        totalItem[item.componentOptions.propsData && item.componentOptions.propsData.value] = false
      })
      return totalItem
    },
    filterEmpty (children = []) {
      return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
    },
    onChange (checked) {
      console.log(checked)
      return
      const key = Object.keys(this.items).filter(key => key === checked.value)
      this.items[key] = checked.checked
      const bool = Object.values(this.items).lastIndexOf(false)
      if (bool === -1) {
        this.localCheckAll = true
      } else {
        this.localCheckAll = false
      }
    },
    renderTags (items) {
      const listeners = {
        change: (checked) => {
          this.onChange(checked)
          this.$emit('change', checked)
        }
      }
      return items.map(vnode => {
        const options = vnode.componentOptions
        options.listeners = listeners
        return vnode
      })
    }
  },
  render () {
    let tagItems = this.filterEmpty(this.$slots.default)
    console.log(this.$slots.default)
    console.log(tagItems)
    return (
      <div class="tag-select">
        <el-tag type="default">all</el-tag>
        {this.renderTags(tagItems)}
      </div>
    )
  }
}
