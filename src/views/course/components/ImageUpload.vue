<template>
  <div class="image-upload-space">
    <el-upload
      class="avatar-uploader"
      :http-request="upLoadRequest"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
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
  methods: {
    async upLoadRequest(file: any) {
      console.log('upLoadRequest', file.file)
      var formData = new FormData()
      formData.append('file', file.file)
      const { error, content } = await toUploadCourse(formData)
      if (!error) {
        console.log(content)
        this.$emit('input', content.name)
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
