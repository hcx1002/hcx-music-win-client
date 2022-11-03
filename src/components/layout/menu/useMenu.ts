import { Computer, DownloadThree, Fm, Like, Music, Planet, PlayTwo, VideoOne } from "@icon-park/vue-next";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";

type IMenu = {
  name: string
  key: string
  icon: any
  theme: 'outline' | 'filled' | 'two-tone' | 'multi-color',
}
type IMenus = {
  name: string
  menus: IMenu[]
}

export function useMenu() {
  const menus: IMenus[] = [
    {
      name: "幻彩希音乐盒子",
      menus: [
        {
          name: "推荐",
          key: "discover",
          icon: Planet,
          theme: 'outline',
        },
        {
          name: "音乐馆",
          key: "music",
          icon: Music,
          theme: 'outline',
        },
        {
          name: "视频",
          key: "video",
          icon: VideoOne,
          theme: 'outline',
        },
        {
          name: "电台",
          key: "dj",
          icon: Fm,
          theme: 'outline',
        },
      ]
    },
    {
      name: "我的音乐",
      menus: [
        {
          name: "我喜欢",
          key: "myLike",
          icon: Like,
          theme: 'outline',
        },
        {
          name: "本地歌曲",
          key: "local",
          icon: Computer,
          theme: 'outline',
        },
        {
          name: "下载歌曲",
          key: "download",
          icon: DownloadThree,
          theme: 'outline',
        },
        {
          name: "最近播放",
          key: "recently",
          icon: PlayTwo,
          theme: 'outline'
        },
      ]
    }
  ];
  const router = useRouter()
  const route = useRoute()
  const currentKey = ref(route.meta.menu);
  const click = async (menu: IMenu) => {
    await router.push({name: menu.key, replace: true,})
  }
  watch(
      ()=>route.meta.menu,
      (menu) => {
        currentKey.value = menu;
      }
  );
  return {
    menus,
    click,
    currentKey
  }
}
