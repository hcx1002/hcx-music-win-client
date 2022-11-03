<template>
  <div class="px-5">
    <div class="text-3xl font-bold pt-4 pb-4">推荐</div>
    <Banner/>
    <Personalized/>
    <PersonalizedNewSong/>
    <MV/>
  </div>
</template>

<script setup lang="ts">
import Banner from '@/components/common/Banner.vue';
import Personalized from "@/views/discover/Personalized.vue";
import PersonalizedNewSong from '@/views/discover/PersonalizedNewSong.vue';
import MV from '@/views/discover/Mv.vue'

</script>

<style scoped lang="scss">

</style>
