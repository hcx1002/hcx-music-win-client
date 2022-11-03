<template>
  <div class="p-5" v-if="mvUrl">
    <div class="flex gap-x-5">
      <div class="flex-1">
<!--        <video class="aspect-video w-full" :src="mvUrl?.url" autoplay controls/>-->
<!--        <vue3-video-play :src="mvUrl?.url"></vue3-video-play>-->
        <video-play :src="mvUrl?.url" :title="mvDetail?.name" ></video-play>
      </div>
    </div>
    <div class="mt-4">
      <div class="font-bold">{{mvDetail?.name}}</div>
      <div class="text-gray-500 text-xs">{{mvDetail?.desc}}</div>
    </div>
    <div class="mt-4">
      <div class="font-bold mb-2">精彩评论</div>
      <div class="divide-y divide-gray-200">
        <div v-for="item in mvCommon" :key="item.commentId" class="flex pt-3">
          <CommonListItem :item="item" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue3-video-play'
import CommonListItem from '@/components/common/CommonListItem.vue'
import { useMvUrl, useMvDetail, useMvComment } from "@/utils/api";
import {useRoute} from "vue-router";
import {onMounted, onUnmounted, ref} from "vue";
import type { MvUrl, MvDetail, MvCommon } from "@/models/mv";
import {usePlayerStore} from "@/stores/player";
const route = useRoute()

const id = Number(route.query.id)

const {setPlay, setPause} = usePlayerStore()

const mvUrl = ref<MvUrl>()
const mvDetail = ref<MvDetail>()
const mvCommon = ref<MvCommon[]>()

onMounted(async () => {
  mvUrl.value = await useMvUrl(id)
  mvDetail.value = await useMvDetail(id)
  mvCommon.value = await useMvComment(id)
  setPause()
})

onUnmounted(() => {
  setTimeout(() => {
    setPlay()
  }, 1000)
})


</script>
<style lang="scss">

</style>
