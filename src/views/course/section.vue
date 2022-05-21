<template>
  <div class="section-space">
    <el-tree
      :data="sections"
      :props="defaultProps"
      draggable
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toGetSectionAndLesson } from '@/utils/chapter'

export default Vue.extend({
  name: 'SectionIndex',
  components: {},
  data() {
    return {
      sections: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'lessonDTOS',
        label: (data: any) => {
          return data.sectionName || data.theme
        }
      }
    }
  },
  created() {
    this.loadSection()
  },
  methods: {
    async loadSection() {
      const { error, content } = await toGetSectionAndLesson(this.$route.params.id)
      if (!error) {
        this.sections = content
      }
    },
    handleNodeClick(data: any) {
      console.log(data)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
