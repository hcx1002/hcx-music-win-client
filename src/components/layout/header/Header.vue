<template>
  <div class="flex items-center justify-between drag h-14">
    <div class="flex items-center pl-5">
      <IconPark :icon="Left" :size="iconSize" :stroke-width="2" class="icon-button" @click="router.back()"/>
      <IconPark :icon="Right" :size="iconSize" :stroke-width="2" class="icon-button"/>
      <div class="search no-drag ml-2">
        <SearchPop/>
      </div>
    </div>
    <div class="flex-1 border-gray-400 h-full" style="-webkit-app-region: drag">

    </div>
    <div class="flex items-center mr-5">
      <UserInfo/>
      <IconPark :icon="Mail" :stroke-width="2" class="icon-button"/>
      <IconPark :icon="Platte" :stroke-width="2" class="icon-button" @click="changeThemeMode"/>
      <el-popover placement="top" :width="160" trigger="click">
        <div class="flex flex-col justify-center items-center" v-if="cookie!==''">
          <div @click="logout" class="menus">退出登录</div>
        </div>
        <template #reference>
          <IconPark :icon="HamburgerButton" :stroke-width="2" class="icon-button"/>
        </template>

      </el-popover>

      <IconPark :icon="Minus" :stroke-width="2" class="icon-button" @click="minWindow"/>
      <IconPark :icon="Close" :stroke-width="2" class="icon-button" @click="closeWindow"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HamburgerButton, Left, Mail, Platte, Right, Search,Close,Minus } from '@icon-park/vue-next'
import { useRouter } from "vue-router";
import IconPark from "@/components/common/IconPark.vue";
import UserInfo from "@/components/layout/header/UserInfo.vue";
import { useSearchStore } from "@/stores/search";
import { storeToRefs } from "pinia";
import SearchPop from "@/components/layout/header/SearchPop.vue";
import { getCurrentInstance, ref } from "vue";
import type{ ComponentInternalInstance } from "vue";
import { useUserStore } from "@/stores/user";
import {useUserLikeStore} from '@/stores/userLike'
import type{ UserProfile } from "@/models/user";

const iconSize = 22;

const router = useRouter();
const visible = ref(false)
const {showSearchView, searchKeyword} = storeToRefs(useSearchStore())
const {setting,profile,cookie} = storeToRefs(useUserStore())
if (setting.value?.theme == 'dark')
  window.document.documentElement.classList.add('dark')
else window.document.documentElement.classList.remove('dark')
const changeThemeMode = () => {
  if (setting.value?.theme == 'light') {
    window.document.documentElement.classList.add('dark')
    setting.value.theme = 'dark'
  } else {
    window.document.documentElement.classList.remove('dark')
    setting.value.theme = 'light'
  }
}
const {appContext:{config: { globalProperties }} }= getCurrentInstance() as ComponentInternalInstance
const closeWindow = ()=>{
  // globalProperties.$electron.ipcRenderer.send('setCookie',"MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/api/clientlog; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/wapi/feedback; HTTPOnly;__csrf=86927b1fbf886213ed914e6780fbe767; Max-Age=1296010; Expires=Wed, 16 Nov 2022 14:06:03 GMT; Path=/;;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/wapi/feedback; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/eapi/feedback; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/api/feedback; HTTPOnly;MUSIC_U=a455806e0308a0c3ae89bfe3ac5356b786ca5508b50996fe5088de46e9690fd71e8907c67206e1ed2cb8bb0e8adac76a8403850a69f41246fc7ca8f37be060e1e684c8c82d83d6c1a0d2166338885bd7; Max-Age=15552000; Expires=Sun, 30 Apr 2023 14:05:53 GMT; Path=/; HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Tue, 01 Nov 2022 14:05:53 GMT; Path=/;MUSIC_R_T=1485000739707; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1485000693809; Max-Age=2147483647; Expires=Sun, 19 Nov 2090 17:20:00 GMT; Path=/neapi/feedback; HTTPOnly")
  globalProperties.$electron.ipcRenderer.send('close')
}
const minWindow = ()=>{
  globalProperties.$electron.ipcRenderer.send('min')
}
const logout = ()=>{
  const {songList,musicLike,albumList} = storeToRefs(useUserLikeStore())
  cookie.value = "";
  profile.value = {} as UserProfile
  songList.value = []
  musicLike.value = []
  albumList.value = []
}
</script>
<style lang="scss" scoped>
.search {
  @apply text-xs;
  :deep(.el-input__wrapper) {
    @apply rounded-full text-xs bg-slate-100 dark:bg-stone-900;
    width: 250px;
  }
}

.icon-button {
  @apply p-2 cursor-pointer;
  @apply hover:text-emerald-400 ;
}
.menus{
  @apply h-6 w-full flex justify-center items-center cursor-pointer;
  @apply hover:bg-stone-200;
}
</style>
