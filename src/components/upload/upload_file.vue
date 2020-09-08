<template>
  <div class="upload-container">
    <el-upload
      class = "upload-demo"
      :action = "uploadFile.action ? uploadFile.action : '/third/v1/file/upload'"
      :headers = "{token: user.token}"
      :on-remove = "handleRemove"
      :on-success = "handleSuccess"
      :before-upload = "beforeUpload"
      multiple
      :accept = "accepts"
      :file-list = "fileList"
      drag
      :limit = "uploadFile.limit"
      :on-exceed = "onExceed">
      <el-button size="mini" type="primary" plain>{{uploadFile.tips ? uploadFile.tips : '点击或拖拽上传'}}</el-button>
      <div class="el-upload__tip" slot="tip" v-if="uploadFile">
        <span v-if="uploadFile.strictType != false">只能上传 {{ uploadFile.strictType.toString() }} 文件 /</span>
        <span v-if="uploadFile.strictSuit">大小不超过 {{ uploadFile.strictSuit }}</span>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'upload_file',
  props: {
    value: {
      type: String,
      default: ''
    },
    uploadFile: {
      type: Object
    }
  },
  data () {
    return {
      fileList: []
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    fileUrl () {
      return !this.value
        ? []
        : this.value.split(',')
    },
    fileData () {
      return this.uploadFile
    },
    // 限制格式
    accepts () {
      if (this.fileData.strictType !== false) {
        let acceptArr = []
        this.fileData.strictType.forEach(element => {
          if (element === 'xls') {
            acceptArr.push('.xls', '.xlsx', '.XLS', 'XLSX')
          } else if (element === 'pdf') {
            acceptArr.push('.pdf', '.PDF')
          } else if (element === 'doc') {
            acceptArr.push('.doc', '.docx', '.DOC', '.DOCX')
          } else {
            acceptArr.push(`.${element}`)
          }
        })
        return acceptArr.toString()
      }
    }
  },
  methods: {
    emitInput (val) {
      this.$emit('input', val)
    },
    /**
     * 删除
     */
    handleRemove (file, fileList) {
      this.emitInput(this.fileListFilter(fileList))
    },
    /**
     * 上传成功
     */
    handleSuccess (rsp, file, fileList) {
      file.url = rsp.data
      this.emitInput(this.fileListFilter(fileList))
      this.$emit('finish', rsp.data)
    },
    /**
     * 过滤数据返给父组件
     */
    fileListFilter (fileList) {
      let fileArr = []
      fileList.forEach(element => {
        fileArr.push(element.url)
      })
      return fileArr.toString()
    },
    /**
     * 刷新
     */
    refresh () {
      let arr = !this.value ? [] : this.value.split(',')
      this.fileList = []
      arr.forEach(x => { this.fileList.push({url: x, name: x}) })
    },
    onExceed () {
      this.$message.error(`只能上传 ${this.fileData.limit} 个文件`)
    },
    // 限制大小
    strictSuit (file) {
      let isSuit = ''
      const suffix = this.fileData.strictSuit.substr(this.fileData.strictSuit.length - 1)
      const suit = parseFloat(this.fileData.strictSuit.substr(0, this.fileData.strictSuit.length - 1))
      if (suffix === 'K') {
        isSuit = file.size / 1024 < suit
      } else {
        isSuit = file.size / 1024 / 1024 < suit
      }
      if (!isSuit) {
        this.$message.error(`上传文件大小不能超过 ${this.fileData.strictSuit}`)
      }
      return isSuit
    },
    /**
     * 上传之前
     */
    beforeUpload (file) {
      if (this.fileData && this.fileData.strictSuit) {
        return this.strictSuit(file)
      }
    }
  },
  mounted () {
    this.fileUrl.forEach((item, index) => {
      this.fileList.push({url: item, name: item})
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.upload-container {
  width: 100%;
  display: flex;
  /deep/ .el-upload-dragger{
    width: auto;
    padding: 0 12px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  /deep/ .el-upload-dragger .el-icon-upload{
    font-size: 40px;
    margin: 0 0 15px 0;
  }
  /deep/ .el-upload--picture-card{
    line-height: normal;
  }
}
</style>
