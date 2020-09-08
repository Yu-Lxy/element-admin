<template>
  <div>
    <el-date-picker
      v-model = "value"
      @change = "timeDateChange"
      value-format = "timestamp"
      :size = "pickerSize"
      :type = "timeType"
      range-separator = "-"
      :style = "{ width: timePickerOne.width + 'px' }"
      :default-time="['00:00:00', '23:59:59']"
      :picker-options="pickerOptions"
      :start-placeholder = "timePickerOne.startPlaceholder"
      :end-placeholder = "timePickerOne.endPlaceholder">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'time_picker_one',
  props: {
    timePickerOne: {
      type: Object
    },
    startTime: {
      type: [String, Number],
      default: ''
    },
    endTime: {
      type: [String, Number],
      default: ''
    },
    pickerOptions: {
      type: Object
    },
    timeType: {
      type: String,
      default: 'datetimerange'
    },
  },
  data () {
    return {
      value: []
    }
  },
  computed: {
    pickerSize () {
      if (this.timePickerOne.size) {
        if (this.timePickerOne.size === 'small') {
          return 'small'
        } else if (this.timePickerOne.size === 'mini') {
          return 'mini'
        }
      }
    }
  },
  watch: {
    startTime (newV, oldV) {
      if (newV === '') {
        this.value = []
      } else {
        this.value[0] = newV
      }
    },
    endTime (newV, oldV) {
      if (newV === '') {
        this.value = []
      } else {
        this.value[1] = newV
      }
    }
  },
  methods: {
    async timeDateChange (data) {
      try {
        await this.$emit('update:startTime', data[0].toString())
        await this.$emit('update:endTime', data[1].toString())
        this.$emit('timeChange')
      } catch (error) {
        this.$emit('update:startTime', '')
        this.$emit('update:endTime', '')
      }
    },
    refresh () {
      if (this.startTime && this.endTime) {
        this.value = [this.startTime, this.endTime]
      }
    }
  },
  mounted () {
    if (this.startTime && this.endTime) {
      this.value = [this.startTime, this.endTime]
    }
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-range-editor.el-input__inner{
  padding: 3px 3px 3px 10px;
}
</style>

