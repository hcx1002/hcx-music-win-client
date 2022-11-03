import { defineStore } from "pinia";
import { useAlbumList, useDetail1, useLikeList, useSongList } from "@/utils/api";
import { useUserStore } from "@/stores/user";
import type { PlayList, Song } from "@/models/song";
import type { AlbumList } from "@/models/album";

export const useUserLikeStore = defineStore("userLike", {
  state: () => {
    return {
      musicLike: [] as Song[],
      songList: [] as PlayList[],
      albumList: [] as AlbumList[]
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'userLike',  //自定义 Key值
        storage: localStorage,  // 选择存储方式
      },
    ],
  },
  actions: {
    async getMusicLikeList() {
      const {profile} = useUserStore()
      if (this.musicLike.length > 0) return

      const list = await useLikeList(profile.userId);
      this.musicLike = await useDetail1(list.toString())
    },
    async getSongList() {
      if (this.songList.length > 0) return
      const {profile} = useUserStore()
      this.songList = await useSongList(profile.userId);
    },
    async getAlbumList(limit: number, offset: number) {
      if (this.albumList.length > 0) return
      this.albumList = await useAlbumList(limit, offset)
    }
  }
})
