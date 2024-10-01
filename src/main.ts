/*
 * @Author: ZRMYDYCG
 * @Date: 2024-08
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09
 * @Description: main.ts
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import { useTowxml } from "./wxcomponents/towxml/index.js"
import { createPinia } from "pinia";
export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$towxml = useTowxml;
  app.use(createPinia());
  return {
    app,
  };
}
