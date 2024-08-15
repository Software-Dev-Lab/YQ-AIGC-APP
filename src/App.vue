<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-15 20:07:12
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-15 22:42:13
 * @Description: App.vue
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch 🚀");
});
onShow(() => {
  console.log("App Show 🎉");
});
onHide(() => {
  console.log("App Hide 😢");
});
</script>
<style>
/* 每个页面的公共样式 */
view, text {
  display: block;
  font-size: 33rpx;
}
image {
  display: block;
}
button::after {
  border: none;
}
button {
  padding: 0;
  margin: 0;
  line-height: 0;
  background-color: #fff;
}
</style>
