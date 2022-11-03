<template>
  <img :src="item.user.avatarUrl" class="w-8 h-8 rounded-full">
  <div class="flex-1 ml-3">
    <div class="text-xs">{{item.user.nickname}}</div>
    <div class="flex text-gray-500 text-xs">
      <div class="mr-4">{{item.timeStr}}</div>
      <div>{{(item.ipLocation.location)||""}}</div>
    </div>
    <div class="text-xs my-3">{{item.content}}</div>
  </div>
</template>

<script setup lang="ts">
import type {MvCommon} from '@/models/mv'
const props = defineProps<{
  item: MvCommon
}>()
</script>

<style scoped lang="scss">

</style>
