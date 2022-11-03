<template>
  <div class="flex items-center cursor-pointer hover-text">
    <ElAvatar size="small" round class="bg-gray-200" :src="profile?.avatarUrl ?? ''"></ElAvatar>
        <span class="text-xs ml-1.5" v-if="isLogin">{{ profile.nickname }}</span>
    <span class="text-xs ml-1.5" v-else @click="loginBtn">点击登录</span>

  </div>
  <el-dialog v-model="showLogin" title="登录" width="330px" append-to-body>
    <div class="text-main bg-main center flex justify-center items-center" style="">
      <img v-if="!overdue" :src="qrData?.qrimg" style="width: 150px;height: 150px" alt="二维码">
      <div v-else>二维码已过期 <span class="hover:text-emerald-400 cursor-pointer" @click="loginBtn">重新获取</span></div>
      <div v-if="QRUser?.code===802" class="flex justify-center flex-col">
        <div><img :src="QRUser?.avatarUrl"  alt="二维码加载中"/></div>
        <div class="text-emerald-400 text-center">{{QRUser?.nickname}}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
// import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useCheckQRCode } from "@/utils/api";
import { ref } from "vue";
import type { checkQRCode,UserProfile } from "@/models/user";

const router = useRouter()
const {getLoginQRCode,checkLogin} = useUserStore()
const {isLogin, profile, showLogin, qrData, qrKey,cookie} = storeToRefs(useUserStore())
const timer:any = ref(0)
const overdue = ref(false)
const QRUser = ref<checkQRCode>()

const loginBtn = async () => {
  profile.value = {} as UserProfile
  showLogin.value = true
  overdue.value = false
  await getLoginQRCode()
  if (timer.value != 0) clearInterval(timer.value)
  timer.value = setInterval(async () => {
    const result = await useCheckQRCode(qrKey.value)
    console.log(result)
    //二维码过期
    if (result.code == 800) {
      overdue.value = true
      clearInterval(timer.value)
    }else if (result.code == 802){  //待确认
      QRUser.value = result
    }else if (result.code == 803){  //登录成功
      clearInterval(timer.value)
      cookie.value = result.cookie
      isLogin.value = true
      document.cookie = result.cookie
      localStorage.setItem("USER-COOKIE", result.cookie)
      await checkLogin()
    }
    // await checkLoginQRCode()
  }, 2000)
}

</script>

<style lang="scss">
.el-dialog {
  @apply dark:bg-[#171718] ;
}

.el-dialog__title {
  @apply dark:text-white
}
</style>
