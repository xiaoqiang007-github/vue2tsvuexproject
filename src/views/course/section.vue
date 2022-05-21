<template>
  <div class="section-space">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span
          >营销信息(添加阶段、添加课时、编辑课时、更新阶段状态、更新课时状态-暂未开发)</span
        >
        <el-button style="float: right">添加阶段</el-button>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        @node-click="handleNodeClick"
        :allow-drop="handleAllowDrop"
        @node-drop="handleNodeDrop"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="data.lessonDTOS" class="level1">
            <el-button size="mini" @click="() => append(data)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="() => remove(node, data)"
            >
              添加课时
            </el-button>
            <el-select
              size="mini"
              class="select-status"
              v-model="data.status"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </span>
          <span v-else class="level2">
            <el-button size="mini" @click="() => append(data)">
              编辑
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="() => remove(node, data)"
            >
              上传视频
            </el-button>
            <el-select
              size="mini"
              class="select-status"
              v-model="data.status"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  toGetSectionAndLesson,
  toSaveOrUpdateSectionChapter
} from '@/utils/chapter'
import { toSaveOrUpdateClassHour } from '@/utils/classhour'

export default Vue.extend({
  name: 'SectionIndex',
  components: {},
  data() {
    return {
      sections: [],
      options: [
        { label: '已隐藏', value: 0 },
        { label: '待更新', value: 1 },
        { label: '已更新', value: 2 }
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
      const { error, content } = await toGetSectionAndLesson(
        this.$route.params.id
      )
      if (!error) {
        this.sections = content
        // 返回数据分析
        // 同一个阶段下的课时，有共同的sessionId
      }
    },
    handleNodeClick(data: any) {
      console.log(data)
    },
    handleAllowDrop(draggingNode: any, dropNode: any, type: any) {
      // 'prev'、'inner' 和 'next' inner表示进入子节点
      // 需要的节点拖曳逻辑： 阶段节点不能作为另一阶段下的课时节点；课时只能在当前阶段拖动不能到另一个阶段里
      return (
        draggingNode.data.sectionId === dropNode.data.sectionId &&
        type !== 'inner'
      )
    },
    async handleNodeDrop(
      draggingNode: any,
      dropNode: any,
      type: any,
      event: any
    ) {
      console.log('handleNodeDrop', draggingNode, dropNode, type, event)
      // 这里采用的方法时遍历所有节点包括子节点，去更新顺序
      try {
        await Promise.all(
          draggingNode.childNodes.map((item: any, index: number) => {
            if (item.data.lessonDTOS) {
              // 阶段
              return toSaveOrUpdateSectionChapter({
                id: item.data.id,
                orderNum: index + 1
              })
            } else {
              // 课时
              return toSaveOrUpdateClassHour({
                id: item.data.id,
                orderNum: index + 1
              })
            }
          })
        )
        this.$message.success('排序成功')
      } catch (e) {
        console.log('error handleNodeDrop ', e)
        this.$message.success('排序失败')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node__content {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
  .custom-tree-node {
    flex: 1;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    .level1,
    .level2 {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
  }
}

.select-status {
  margin-left: 12px;
  width: 100px;
}

.header {
  display: flex;
  align-items: center;
  .el-button {
    margin-left: auto;
  }
}
</style>
