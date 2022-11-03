<template>
<div>
  <SongList :songs="musicLike"></SongList>
</div>
</template>

<script setup lang="ts">
import { useUserLikeStore } from "@/stores/userLike";
import { onMounted, toRefs } from "vue";
import SongList from '@/views/playlist/SongList.vue'

const {getMusicLikeList} = useUserLikeStore()
const {musicLike} = toRefs(useUserLikeStore())

onMounted(async ()=>{
  await getMusicLikeList()
})

</script>

<style scoped lang="scss">

</style>
