<template>
  <div class="textEdit-space">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>

<script lang="ts">
// vue中使用教程 https://www.wangeditor.com/v5/for-frame.html#%E4%BD%BF%E7%94%A8
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { toUploadCourse } from '@/utils/course'
const customUpload = async (file: any, insertFn: any) => {
  // 自定义选择图片
  console.log(file, insertFn)
  // toUploadCourse
  var formData = new FormData()
  formData.append('file', file)
  const { error, content } = await toUploadCourse(formData)
  if (!error) {
    insertFn(content.name)
  }
}

export default Vue.extend({
  name: 'TextEdit',
  components: {
    Editor,
    Toolbar
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            customUpload
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor: any) {
      // editor.MENU_CONF.uploadImage = {
      //   // 自定义上传
      //   async customUpload(file: File, insertFn: any) {
      //     // file 即选中的文件
      //     // 自己实现上传，并得到图片 url alt href
      //     // 最后插入图片
      //     // insertFn(url, alt, href)
      //     console.log('上传图片')
      //   }
      // }
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      console.log('onCreated', editor)
    },
    onChange(editor: any) {
      console.log('onChange', editor.getHtml())
      this.$emit('input', editor.getHtml())
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    ;(editor as any).destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style lang="scss" scoped>
</style>
