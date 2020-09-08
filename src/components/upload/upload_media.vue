<template>
  <div class="upload-container">
    <el-upload
      action = ""
      list-type = "picture-card"
      :on-remove = "handleRemove"
      :limit = uploadMedia.limit
      multiple
      :on-success = "handleImageSuccess"
      :http-request = "httpRequest"
      :on-exceed = "onExceed"
      :file-list = "fileData"
      :accept = "accepts"
      :on-change="handleFileChange"
      :before-upload = "beforeImageUpload"
      scoped-slot
      drag>
      <div slot="file" slot-scope="{file}">
        <div class="autoLayout_item">
          <audio v-if="uploadMedia.fileType === 'audio'" :src="file.url" controls class="audio"></audio>
          <video v-if="uploadMedia.fileType === 'video'" :src="file.url" controls class="video"></video>
          <span class="upload_icon_box">
            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
            <div class="upload_file_name">{{file.name}}</div>
          </span>
        </div>
      </div>
      <el-button size="mini" type="primary" plain>点击或拖拽上传</el-button>
      <el-progress class="progress" :text-inside="true" :stroke-width="20" :color="customColor" :percentage="percentage" ></el-progress>
      <div class="el-upload__tip" slot="tip" v-if="uploadMedia">
        <span v-if="uploadMedia.strictType != false">只能上传 {{ uploadMedia.strictType.toString() }} 文件 /</span>
        <span v-if="uploadMedia.strictSuit">大小不超过 {{ uploadMedia.strictSuit }}</span>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { formatDuraton } from '@/plugins/filters'
export default {
  name: 'upload_file',
  props: {
    value: {
      type: String,
      default: ''
    },
    uploadMedia: {
      type: Object
    }
  },
  data () {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' },
      fileData: [],
      fileList: [],
      percentage: 0,
      customColor: ''
    }
  },
  computed: {
    fileUrl () {
      return !this.value
        ? []
        : this.value.split(',')
    },
    mediaData () {
      return this.uploadMedia
    },
    // 限制格式
    accepts () {
      if (this.mediaData.strictType !== false) {
        let acceptArr = []
        this.mediaData.strictType.forEach(element => {
          if (element === 'mp3') {
            acceptArr.push('.mp3', '.MP3')
          } else if (element === 'mp4') {
            acceptArr.push('.mp4', '.MP4')
          } else if (element === 'm4a') {
            acceptArr.push('.m4a')
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
    handleRemove (file) {
      this.fileData.splice(this.fileList.indexOf(file), 1)
      this.fileList.splice(this.fileList.indexOf(file), 1)
      this.emitInput(this.fileListFilter(this.fileData))
    },
    /**
     * 上传成功
     */
    handleImageSuccess (rsp, file, fileList) {
      file.url = rsp.data
      this.fileList = fileList
      this.fileData.push(file)
      this.emitInput(this.fileListFilter(this.fileData))
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
      this.$message.error(`只能上传 ${this.mediaData.limit} 个文件`)
    },
    // 限制大小
    strictSuit (file) {
      let isSuit = ''
      const suffix = this.mediaData.strictSuit.substr(this.mediaData.strictSuit.length - 1)
      const suit = parseFloat(this.mediaData.strictSuit.substr(0, this.mediaData.strictSuit.length - 1))
      if (suffix === 'K') {
        isSuit = file.size / 1024 < suit
      } else {
        isSuit = file.size / 1024 / 1024 < suit
        console.log(file.size / 1024 / 1024)
      }
      if (!isSuit) {
        this.$message.error(`上传文件大小不能超过 ${this.mediaData.strictSuit}`)
      }
      return isSuit
    },
    /**
     * 上传之前
     */
    beforeImageUpload (file) {
      this.percentage = 0
      this.customColor = ''
      if (this.mediaData && this.mediaData.strictSuit) {
        return this.strictSuit(file)
      }
    },
    /**
     * 自定义上传方法
     */
    httpRequest (rsp) {
      const _this = this
      const fd = new FormData()
      const xhr = new XMLHttpRequest()
      xhr.open('post', '/third/v1/file/upload', true)
      xhr.upload.onprogress = (ev) => {
        // 上传进度 = 100* ev.loaded/ev.total
        if (ev.lengthComputable) {
          var precent = 100 * ev.loaded / ev.total
          this.percentage = Math.floor(precent) < 99 ? Math.floor(precent) : 99
          xhr.onload = function (e) {
            if (this.status === 200) {
              console.log(JSON.parse(this.response))
              _this.$message.success(`${rsp.file.name} 上传完成`)
              _this.percentage = 100
              _this.customColor = '#67c23a'
              rsp.onSuccess(JSON.parse(this.response))
            } else {
              rsp.onError()
            }
          }
        }
      }
      fd.append('file', rsp.file)
      xhr.send(fd)
    },
    async handleFileChange (file, fileList) {
      if (file.status === 'ready') {
        file.duration = await this.getTimes(file.raw) || 0
        file.durationFormat = formatDuraton(file.duration)
        this.$emit('fileChange', file)
      }else if(file.status === 'success') {
      }else if(file.status === 'fail') {
        // const fileRaw = this.getFile(file);
        // const fileListRaw = this.groupFile;
        // fileListRaw.splice(fileListRaw.indexOf(fileRaw), 1);
      }
    },
    getTimes (file) {
      return new Promise((resolve, reject) => {
        var url = URL.createObjectURL(file)
        var audioElement = new Audio(url)
        var duration
        audioElement.addEventListener('loadedmetadata', (_event) => {
          duration = audioElement.duration.toFixed()
          resolve(duration)
        })
      })
    }
  },
  mounted () {
    this.fileUrl.forEach((item, index) => {
      this.fileData.push({ url: item, name: item })
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";
.upload-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .audio{
    width: 250px;
    height: 50px;
  }
  .video{
    width: 280px;
    height: 130px;
  }
  .upload_icon_box{
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 280px;
    height: 30px;
    overflow: scroll;
  }
  .progress{
    width: 120px;
    margin-top: 10px;
  }
  .upload_file_name{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    color: #666;
    width: 85%;
    left: 35px;
    height: 30px;
  }
  /deep/ .el-upload-list__item-delete{
    position: absolute;
    left: 0;
    top: 0;
    font-size: 14px;
    color: #ccc;
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  /deep/ .el-upload-list__item-delete:hover{
    color: #eca5a5;
    cursor: pointer;
  }
  /deep/ .el-upload-list--picture-card{
    display: inline-block;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item{
    width: 280px;
    height: 130px;
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    display: inline-block;
    text-align: center;
    line-height: 150px;
    margin: 10px 10px 10px 0;
    audio::-webkit-media-controls-current-time-display,
    audio::-webkit-media-controls-time-remaining-display {
      font-size: 12px;
    }
  }
  /deep/ .el-upload-dragger{
    width: 150px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  /deep/ .el-upload{
    margin: 10px 10px 10px 0;
  }
  /deep/ .el-upload--picture-card{
    height: auto;
    border: none;
  }
  /deep/ .el-upload-dragger .el-icon-upload{
    font-size: 40px;
    margin: 0 0 15px 0;
  }
  /deep/ .el-upload--picture-card{
    line-height: normal;
  }
  // /deep/ .el-upload-list{
  //   display: none;
  // }
}
</style>

