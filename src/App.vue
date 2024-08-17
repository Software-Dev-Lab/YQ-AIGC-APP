<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-15 20:07:12
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-17 17:25:55
 * @Description: App.vue
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  const buttonBoundingClientPosition = uni.getStorageSync('buttonBoundingClientPosition')
  if(!buttonBoundingClientPosition) {
      // 获取胶囊按钮的位置
      const res = uni.getMenuButtonBoundingClientRect()
      // 调试1
      console.log("胶囊按钮的位置:", res)
      // 进行本地缓存
      uni.setStorageSync('buttonBoundingClientPosition', res)
  }
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
page {
  background: #F3F3F3;
}
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

.text-show {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
