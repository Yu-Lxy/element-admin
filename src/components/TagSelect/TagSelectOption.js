export default {
  name: 'TagSelectOption',
  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localChecked: this.checked || false
    }
  },
  watch: {
    'checked' (val) {
      this.localChecked = val
    },
    '$parent.items': {
      handler: function (val) {
        this.value && val.hasOwnProperty(this.value) && (this.localChecked = val[this.value])
      },
      deep: true
    }
  },
  render () {
    const { $slots, value } = this
    const onChange = (checked) => {
      this.$emit('change', { value, checked })
    }
    return (<el-tag type="default" key={value} vModel={this.localChecked} onClick={onChange}>
      {$slots.default}
    </el-tag>)
  }
}
