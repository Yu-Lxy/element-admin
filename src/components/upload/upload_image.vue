<template>
  <div class="upload-container">
    <el-upload
      ref='upload'
      action = "/third/v1/file/upload"
      list-type = "picture-card"
      :limit = imageData.limit
      :on-exceed = "onExceed"
      :disabled = "disabled"
      multiple
      :accept = "accepts"
      :before-upload = "beforeImageUpload"
      :on-remove = "handleRemove"
      :on-preview = "handlePictureCardPreview"
      :on-success = "handleImageSuccess"
      :file-list="fileList"
      scoped-slot
      drag>
      <i class="el-icon-upload" />
      <span class="tip">拖拽或点击上传</span>
      <div class="el-upload__tip" slot="tip" v-if="imageData">
        <span v-if="imageData.strictType">只能上传 {{ imageData.strictType.toString() }} 文件 、</span>
        <span v-if="imageData.strictSuit">大小不超过 {{ imageData.strictSuit }} 、</span>
        <span v-if="imageData.strictScale">比例：{{imageData.strictScale}}</span>
        <span v-if="imageData.strictSize">{{ imageData.width ? `宽度：${imageData.width}px` : '' }}  {{ imageData.height ? `高度：${imageData.height}px` : '' }}</span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body='true'>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'upload_image',
  props: {
    value: {
      type: String,
      default: ''
    },
    uploadImage: {
      type: Object
    },
    limit: {
      type: String,
      default: '1'
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    imageUrl () {
      return !this.value
        ? []
        : this.value.split(',')
    },
    imageData () {
      return this.uploadImage
    },
    // 限制格式
    accepts () {
      if (this.imageData.strictType) {
        let acceptArr = []
        this.imageData.strictType.forEach(element => {
          if (element === 'jpg') {
            acceptArr.push('.jpg', '.jpeg', '.JPG', '.JPEG')
          } else if (element === 'png') {
            acceptArr.push('.png', '.PNG')
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
     * 过滤数据返给父组件
     */
    fileListFilter (fileList) {
      let imgArr = []
      fileList.forEach(element => {
        imgArr.push(element.url)
      })
      return imgArr.toString()
    },
    /**
     * 刷新
     */
    refresh () {
      let arr = !this.value ? [] : this.value.split(',')
      this.fileList = []
      arr.forEach(x => { this.fileList.push({url: x, name: x}) })
    },
    /**
     * 上传成功
     */
    handleImageSuccess (rsp, file, fileList) {
      file.url = rsp.data
      this.emitInput(this.fileListFilter(fileList))
    },
    /**
     * 删除
     */
    handleRemove (file, fileList) {
      if (fileList.length === 0) {
        this.fileList = []
      }
      this.emitInput(this.fileListFilter(fileList))
    },
    /**
     * 预览
     */
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 限制尺寸
    strictSize (file) {
      let imageSize = new Promise((resolve, reject) => {
        let width = parseInt(this.imageData.width)
        let height = parseInt(this.imageData.height)
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = () => {
          let valid
          if (this.imageData.strictScale) { // 校验比例
            const scale = this.imageData.strictScale.split(':')
            scale[0] / scale[1] === img.width / img.height
              ? valid = true
              : valid = false
          } else { // 校验尺寸
            width && height
              ? valid = img.width === width && img.height === height
              : valid = img.width === width || img.height === height
          }
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        this.$message.error('请按要求尺寸上传图片!')
        return Promise.reject()
      })
      return imageSize
    },
    // 限制大小
    strictSuit (file) {
      let isSuit = ''
      const suffix = this.imageData.strictSuit.substr(this.imageData.strictSuit.length - 1)
      const suit = parseFloat(this.imageData.strictSuit.substr(0, this.imageData.strictSuit.length - 1))
      if (suffix === 'K') {
        isSuit = file.size / 1024 < suit
      } else {
        isSuit = file.size / 1024 / 1024 < suit
      }
      if (!isSuit) {
        this.$message.error(`上传图片大小不能超过 ${this.imageData.strictSuit}`)
      }
      return isSuit
    },
    /**
     * 上传前
     */
    beforeImageUpload (file) {
      if (file.type.split('/')[0] !== 'image') {
        this.$message.error('只能上传图片 😊')
        return false
      } else if (file.type.split('/')[1] === 'gif') {
        this.$message.error('不能上传动图 😊')
        return false
      }
      if (this.imageData) {
        if (this.imageData.strictSize && this.imageData.strictSuit) {
          return this.strictSuit(file) && this.strictSize(file)
        }
        if (this.imageData.strictScale && this.imageData.strictSuit) {
          return this.strictSuit(file) && this.strictSize(file)
        }
        if (this.imageData.strictSize || this.imageData.strictScale) {
          return this.strictSize(file)
        }
        if (this.imageData.strictSuit) {
          return this.strictSuit(file)
        }
      }
    },
    /**
     * 超过限制
     */
    onExceed () {
      this.$message.error(`只能上传 ${this.imageData.limit} 张图片`)
    }
  },
  mounted () {
    this.imageUrl.forEach((item, index) => {
      this.fileList.push({url: item, name: item})
    })
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/mixin.scss";
/deep/ .el-upload-list__item {
  transition: none !important;
}
.upload-container {
  @include clearfix;
  .tip{
    display: block;
    color: #666;
  }
  .autoLayout{
    height: 100%;
    display: flex;
    align-items: center;
    .autoLayout_item{
      margin-bottom: -7px;
    }
  }
  .progress{
    width: 120px;
    margin-top: 15px;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item{
    position: relative;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/ .el-upload-dragger{
    width: auto;
    height: 146px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  /deep/ .el-upload--picture-card{
    border: none;
  }
  /deep/ .el-upload-dragger .el-icon-upload{
    font-size: 40px;
    color: #bdd5ef;
    margin: 0 0 5px 0;
  }
  /deep/ .el-upload--picture-card{
    line-height: normal;
  }
}
</style>
