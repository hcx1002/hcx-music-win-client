<template>
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-5 ">
    <div v-for="(item,index) in songList" :key="index" :class="{'item-1':index===0}"
         @click="router.push({name:'playlist',query:{id:item.id}})">
      <CoverPlay :name="item.name" :pic-url="item.coverImgUrl" :play-count="item.playCount" show-play-count/>
      <div class="mt-2 text-xs text-main truncate">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserLikeStore } from "@/stores/userLike";
import { onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/common/CoverPlay.vue";

const {getSongList} = useUserLikeStore()
const {songList} = toRefs(useUserLikeStore())
const router = useRouter()
onMounted(async ()=>{
  await getSongList()
})
</script>

<style scoped lang="scss">

</style>
