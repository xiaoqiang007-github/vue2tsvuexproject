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
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

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
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor: any) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
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
