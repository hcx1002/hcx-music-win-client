<template>
  <div class="w-screen h-screen flex items-stretch overflow-hidden">
    <div class="w-56 h-screen flex-shrink-0 hidden lg:block bg-gray-200 dark:bg-[#303031]">
      <Menu/>
    </div>
    <div class="flex-1 flex flex-col">
      <div>
        <Header></Header>
      </div>
      <div class="flex-1 overflow-hidden">
        <ElScrollbar>
          <div class="container mx-auto">
            <RouterView v-slot="{ Component,route }" v-if="animation">
              <transition name="fade" mode="out-in">
                <component :is="Component" :key="route.path"/>
              </transition>
            </RouterView>
            <router-view v-else></router-view>
          </div>
        </ElScrollbar>
      </div>
      <div class="h-20">
        <Footer/>
      </div>
    </div>
    <PlayList/>
    <PlayView/>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/layout/menu/Menu.vue'
import Header from '@/components/layout/header/Header.vue'
import Footer from "@/components/layout/footer/Footer.vue";
import PlayList from "@/components/layout/playList/PlayList.vue";
import PlayView from '@/components/layout/playView/PlayView.vue'
import { onBeforeRouteUpdate } from 'vue-router';
import { ref } from "vue";
const animation = ref(true)
onBeforeRouteUpdate((to, from) => {
  animation.value = to.meta?.animation != false;
  if (to.meta.menu===from.meta.menu) animation.value = false
})
</script>

<style scoped lang="scss">
.fade-enter-from, .fade-leave-to {
  transform: translateX(20px);
  opacity: 0.8;
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.2s ease;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
