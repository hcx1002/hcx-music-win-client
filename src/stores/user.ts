import { defineStore } from "pinia";
import { useCheckQRCode, useLogin, useLoginStatus, useQRCode, useQRCodeKey } from "@/utils/api";
import type { UserProfile, UserQRCode } from "@/models/user";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: '',
      cookie: '',
      showLogin: false,
      profile: {} as UserProfile,
      setting: {theme: 'light'},
      qrKey: '',
      qrData: {} as UserQRCode
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',  //自定义 Key值
        storage: localStorage,  // 选择存储方式
      },
    ],
  },
  getters: {
    isLogin: state => {
      return state.profile?.userId > 0
    }
  },
  actions: {
    async login(phone: string, password: string) {
      const res = await useLogin(phone, password)
      if (res.code == 200) {
        this.token = res.token
        this.cookie = res.cookie
        document.cookie = res.cookie
        localStorage.setItem("USER-TOKEN", this.token)
        localStorage.setItem("USER-COOKIE", this.cookie)
        await this.checkLogin()
      }
    },
    async checkLogin() {
      const {data} = await useLoginStatus(this.cookie)
      if (data.code === 200) {
        this.profile = data.profile
        this.showLogin = false
      }
    },
    async getLoginQRCodeKey() {
      const {data} = await useQRCodeKey()
      this.qrKey = data.unikey
    },
    async getLoginQRCode() {
      await this.getLoginQRCodeKey()
      this.qrData = await useQRCode(this.qrKey)
    }
  }
})
