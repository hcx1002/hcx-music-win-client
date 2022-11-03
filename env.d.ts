/// <reference types="vite/client" />
// declare module '*.vue' {
//     import { DefineComponent } from 'vue';
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//     const component: DefineComponent<{}, {}, any>;
//     export default component;
// }
//使用import的形式引入图片，ts无法识别非代码资源
declare module '*.png'
declare module 'vue3-video-play'
declare module ''
