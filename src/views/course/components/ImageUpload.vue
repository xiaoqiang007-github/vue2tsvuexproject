<template>
  <div class="image-upload-space">
    <el-progress
      type="circle"
      :status="status?status:null"
      :percentage="percentage"
      :width="178"
      v-if="isLoading"
    ></el-progress>
    <el-upload
      class="avatar-uploader"
      :http-request="upLoadRequest"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      v-else
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toUploadCourse } from '@/utils/course'

export default Vue.extend({
  name: 'ImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: {},
  data() {
    return {
      percentage: 0,
      isLoading: false,
      status: ''
    }
  },
  methods: {
    async upLoadRequest(file: any) {
      console.log('upLoadRequest', file.file)
      var formData = new FormData()
      formData.append('file', file.file)
      this.isLoading = true
      const { error, content } = await toUploadCourse(formData, (e: ProgressEvent) => {
        console.log(e)
        console.log(Math.floor(e.loaded / e.total * 100))
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      this.isLoading = false
      if (!error) {
        console.log(content)
        this.status = 'success'
        this.$emit('input', content.name)
      } else {
        this.status = 'exception'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
::v-deep .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
