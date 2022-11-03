<template>
  <div class="pl-5 pr-5 video">
    <h1 class="text-3xl font-bold pt-4 pb-4">视频</h1>
    <el-affix target=".video" :offset="56">
      <div class="bg-view">
        <el-tabs v-model="currentMenu" @tab-click="onTabClick">
          <el-tab-pane v-for="menu in menus" :key="menu.name" :label="menu.label" :name="menu.name" class="text-main"/>
        </el-tabs>
      </div>
    </el-affix>
    <div class="mt-5">
      <RouterView/>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useVideoMenu } from '@/views/video/VideoController'

const {menus, currentMenu, onTabClick} = useVideoMenu()

</script>

<style scoped lang="scss">
.video {
  .el-tabs__nav-wrap::after {
    height: 0;
  }

  :deep(.el-tabs__header) {
    @apply m-0;
  }

  :deep(.el-tabs__item:not(.is-active)) {
    @apply dark:text-white
  }
}
</style>
