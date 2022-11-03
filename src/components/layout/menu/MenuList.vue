<template>
  <el-scrollbar>
    <div class="mt-10 pl-6 pr-6 space-y-1.5" v-for="(item,index) in menus" :key="index">
      <div class="menu-title text-main">{{item.name}}</div>
      <div class="menu-item hover-bg-main  text-main" v-for="menu in item.menus" :key="menu.key" :class="{'active':currentKey===menu.key}" @click="click(menu)">
        <IconPark :icon="menu.icon" size="18" :theme="menu.theme"></IconPark>
        <span class="ml-1">{{menu.name}}</span>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useMenu } from "./useMenu";
import IconPark from '@/components/common/IconPark.vue';
const {menus,click,currentKey} = useMenu()
</script>

<style scoped lang="scss">
.menu-title {
  @apply text-xs pl-4 pr-4 pb-2;
}
.menu-item {
  @apply text-sm pl-4 pr-4 pt-1.5 pb-1.5 rounded cursor-pointer flex items-center;
}
.active {
  @apply bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-50 cursor-default;
}
</style>
