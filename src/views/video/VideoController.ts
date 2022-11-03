import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

interface IVIdeoMenu {
  label: string,
  name: string,
}

export function useVideoMenu() {
  const menus: IVIdeoMenu[] = [
    {
      label: '推荐',
      name: 'recommend',
    },
    {
      label: '排行榜',
      name: 'topList',
    },
    {
      label: '视频库',
      name: 'videoLibrary',
    },
  ];

  const router = useRouter();

  const route = useRoute();
  const currentMenu = ref(route.name)

  watch(() => route.name, m => {
    currentMenu.value = m
  })


  const onTabClick = ({props}: { props: IVIdeoMenu }) => {
    router.push({name: props.name, replace: true,})
  }

  return {
    menus,
    currentMenu,
    onTabClick,
  }
}
