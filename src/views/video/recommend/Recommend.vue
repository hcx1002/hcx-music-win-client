<template>
  <div class="grid grid-flow-row xl:grid-cols-4 grid-cols-2 gap-5 mt-5">
    <div v-for="item in personalizedMv" :key="item.id" @click="router.push({name:Pages.mvDetail,query:{id:item.id}})">
      <CoverPlay :pic-url="item.picUrl" video show-label :artist-name="item.artistName" :name="item.name"/>
    </div>
    <div v-for="item in useWYMvList" :key="item.id" @click="router.push({name:Pages.mvDetail,query:{id:item.id}})">
      <CoverPlay :pic-url="item.cover" video show-label :artist-name="item.artistName" :name="item.name"/>
    </div>
  </div>

</template>

<script setup lang="ts">
import { Pages } from "@/router/pages";
import { useVideoStore } from '@/stores/video'
import { onMounted, ref, toRefs } from "vue";
import CoverPlay from "@/components/common/CoverPlay.vue";
import { useRouter } from "vue-router";
const router = useRouter()
const {getPersonalizedMv,getUseWYMvList} = useVideoStore()
const {personalizedMv,useWYMvList} = toRefs(useVideoStore())
const limit = ref<number>(20)

onMounted(async () => {
  await getPersonalizedMv()
  await getUseWYMvList(limit.value)
})

</script>

<style scoped lang="scss">

</style>
