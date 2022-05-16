<template>
  <div class="assets-menu">
    <el-tree
      ref="tree"
      :data="menus"
      node-key="id"
      :props="defaultProps"
      show-checkbox
      :default-expand-all="true"
      :default-checked-keys="selectedList"
      empty-text="暂无权限数据"
    ></el-tree>
    <el-button @click="clear">清空</el-button>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { toGetAssestAll, toGetAllResourceCategory, toSetResource } from '@/utils/assets'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AssetsMenu',
  data() {
    return {
      menus: [
      ],
      defaultProps: {
        children: 'resourceList',
        label: 'name'
      },
      selectedList: []
    }
  },
  created () {
    this.loadMenus()
  },
  methods: {
    async loadMenus () {
      const { error, content } = await toGetAllResourceCategory()
      if (!error) {
        this.menus = content
        this.loadMenusAssets()
      }
    },
    async loadMenusAssets () {
      // 拿到所有选中的值getCheckedKeys 设置默认选中的节点setCheckedKeys 清空所有选中的setCheckedNodes
      const { error, content } = await toGetAssestAll(this.$route.params.id)
      if (!error) {
        this.menus = content
        this.getCheckedKeys(content)
      }
    },
    getCheckedKeys (content: any) {
      // 解决报错(menu: any)    Parameter 'item' implicitly has an 'any' type.
      content.forEach((menu: any) => {
        if (menu.selected) {
          // 解决报错as never   Type 'any' is not assignable to type 'never'.
          this.selectedList = [...this.selectedList, menu.id] as never
        }
        if (menu.resourceList) {
          this.getCheckedKeys(menu.resourceList as never)
        }
      })
    },
    clear () {
      (this.$refs.tree as Tree).setCheckedKeys([])
    },
    async save () {
      try {
        const list = (this.$refs.tree as Tree).getCheckedKeys()
        console.log('list', list, Number(this.$route.params.id))
        const { error, message } = await toSetResource({
          roleId: Number(this.$route.params.id),
          resourceIdList: list as any
        })
        if (!error) {
          this.$message.success(message)
        }
      } catch (e) {
        console.log('save error', e)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.assets-menu {
  background-color: #fff;
}
</style>
