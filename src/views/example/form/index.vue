<template>
  <div class="createPost-container">
    <div class="createPost-main-container">
       <el-form ref="postForm" :model="postForm" class="form-container" label-width="100px" >
          <el-form-item label="上传图片" required>
            {{ postForm.image_url }}
            <upload-image ref="uploadImage" v-model="postForm.image_url" :uploadImage="uploadImage" />
          </el-form-item>
          <el-form-item label="上传文件" required>
             {{ postForm.file_url }}
            <upload-file ref="uploadFile" v-model="postForm.file_url" :uploadFile="uploadFile"/>
          </el-form-item>
          <el-form-item label="上传媒体" required>
            {{ postForm.media_url }}
            <upload-media ref="uploadMedia" v-model="postForm.media_url" :uploadMedia="uploadMedia"/>
          </el-form-item>
          <!-- <el-form-item label="选择时间" required>
            {{ `${postForm.startTime} - ${postForm.endTime}`}}
            <timePickerOne :startTime.sync="postForm.startTime" :endTime.sync="postForm.endTime" :timePickerOne="timePickerOne"/>
          </el-form-item>
          <el-form-item label="自定义指令">
            {{inputVal}}
            <!-- v-validate="{precision: 2}" -->
            <!-- <el-input type="text" v-model="inputVal" v-validate:noSpace style="width: 200px" placeholder="请输入内容"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="富文本" required>
            <vue-ueditor-wrap v-model="msg" style="width:700px;"></vue-ueditor-wrap>
          </el-form-item> -->
          <el-form-item label="富文本" required>
            <vue-ueditor-wrap v-model="msg" style="width:700px;"></vue-ueditor-wrap>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
// import '../../../../static/UEditor/xiumi-ue-v5.css'
// import '../../../../static/UEditor/xiumi-ue-dialog-v5.js'
import uploadImage from '@/components/upload/upload_image'
import uploadFile from '@/components/upload/upload_file'
import uploadMedia from '@/components/upload/upload_media'
import timePickerOne from '@/components/time_picker/time_picker_one'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'form',
  components: {
    uploadImage,
    uploadFile,
    uploadMedia,
    VueUeditorWrap,
    timePickerOne
  },
  data () {
    return {
      testData: [{
        type: 'success',
        text: '成功'
      }, {
        type: 'danger',
        text: '失败'
      }],
      uploadImage: { limit: 8, strictSize: false, width: '', height: '', strictSuit: '1M' },
      uploadFile: { limit: 3, strictSuit: '24K', strictType: [ 'xls' ] },
      uploadMedia: { limit: 4, strictSuit: '30M', strictType: [], fileType: 'audio' },
      timePickerOne: { size: '', startPlaceholder: '开始时间', endPlaceholder: '结束时间' },
      postForm: {
        image_url: '',
        file_url: '',
        media_url: '',
        startTime: '1573660800000',
        endTime: '1573747200000'
      },
      msg: 'hahaha',
      inputVal: ''
    }
  },
  mounted () {
    this.initData()
    // setTimeout(() => {
    //   this.postForm.media_url = ''
    //   this.$nextTick(() => {
    //     this.$refs.uploadMedia.refresh()
    //   })
    // }, 3000)
  },
  methods: {
    async initData () {
      try {
        // let res = await getUserList()
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    startTime (newV, oldV) {
      console.log(newV, oldV)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
