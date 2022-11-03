<template>
  <el-drawer v-model="showPlayView" direction="btt" :with-header="false" size="100%" custom-class="play-list"
             @open="loadLyric">
    <div class="bgImage" :style="{backgroundImage: `url('${song?.al.picUrl}')`}"></div>
    <div class="card">
      <div class="text-white flex">
        <IconPark :icon="Down" size="35" :stroke-width="3" class="hover-text" @click="showPlayView=false"/>
      </div>
      <div class="flex flex-1 overflow-auto">
        <div class="w-1/2 flex justify-center items-center">
          <img :src="song?.al.picUrl" class="w-1/2" :alt="song?.al.name">
        </div>
        <div class="w-1/2">
          <ul class="lyric" v-show="list" ref="lyricEl">
            <li :class="{each:true, choose: (index===lyricIndex)}" v-for="(item, key, index) in list" :key="key">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full">
        <Footer/>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { Down } from '@icon-park/vue-next'
import IconPark from "@/components/common/IconPark.vue";
import Footer from '@/components/layout/footer/Footer.vue'
import { useSongLyric } from '@/utils/api'
import { ref, watch } from "vue";
import type { lyric } from "@/models/playlist";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";

const lyrics = ref<lyric>()
const {showPlayView, id, song, currentTime} = storeToRefs(usePlayerStore())
const list = ref<any>()
const lyricEl = ref<null | HTMLElement>(null)
const lyricIndex = ref<number>(0)
//监听当前播放时间
watch(currentTime, (newValue, oldValue) => {
  let i = 0
  for (let key in list.value) {
    if (+key == newValue) {
      lyricIndex.value = i
      if (i > 6) {
        lyricEl.value!.scrollTop = 30 * (i - 6)
      }
    }
    i++
  }
})


const loadLyric = async () => {
  lyrics.value = await useSongLyric(id.value)
  const data: string = lyrics.value?.lyric
  list.value = formatLrc(data)
}
const formatLrc = (data: string): any => {
  let lrcObj: any = {};
  let lyricArr = data.split('[').slice(1); // 先以[进行分割
  lyricArr.forEach(item => {
    let arr = item.split(']');	// 再分割右括号
    // 时间换算成秒
    let time = arr[0].split(':')
    let m = parseInt(time[0])
    let s = parseInt(time[1])
    arr[0] = m * 60 + s + "";
    if (arr[1] != '\n') { // 去除歌词中的换行符
      lrcObj[arr[0]] = arr[1];
    }
  })
  return lrcObj
}
</script>

<style scoped lang="scss">
.play-list {
  .el-drawer__body {
    padding: 0;
  }
}

.bgImage {
  @apply bg-no-repeat bg-cover absolute;
  filter: blur(20px);
  overflow: hidden;
  top: -30px;
  left: -30px;
  width: 110%;
  height: 110%;

  &::after {
    background-color: rgba(173, 170, 170, 0.11);
  }
}

.card {
  @apply px-10 pt-10 absolute top-0 left-0 w-full h-full flex;
  flex-direction: column;

  .lyric {
    width: 100%;
    height: 100%;
    // 滚动条
    overflow: auto;
    color: #ddd;
    font-size: 15px;
    font-weight: normal;
    transition: all 0.2s;
    position: relative;

    .each {
      height: 30px;
      // border: 1px solid #000;
      line-height: 30px;
      text-align: center;
      transition: all 0.2s;
    }

    .choose {
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      color: #34d399;
    }

    // 修改滚动条样式
    &::-webkit-scrollbar {
      width: 3px;
      height: 1px;
    }

    // 滑块部分
    &::-webkit-scrollbar-thumb {
      background-color: #eee;
    }

    // 轨道部分
    &::-webkit-scrollbar-track {
      background-color: #333;
    }
  }

}
</style>
