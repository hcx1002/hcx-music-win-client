<template>
  <div class="divide-y divide-gray-200">
    <div v-for="item in commons" :key="item.commentId" class="flex pt-3">
      <CommonListItem :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePlaylistComment} from '@/utils/api'
import type {MvCommon} from '@/models/mv'
import CommonListItem from '@/components/common/CommonListItem.vue'
import { onMounted, ref } from 'vue'
const commons = ref<MvCommon[]>([])
const props = defineProps<{
  id: number
}>()

onMounted(async ()=>{
  commons.value = await usePlaylistComment(props.id)

})

</script>

<style scoped lang="scss">

</style>
