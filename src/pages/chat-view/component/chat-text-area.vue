<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-17 18:03:47
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-17 19:23:05
 * @Description: chat-text-area.vue
-->
<template>
  <view class="chat-text-area">
    <view class="user-message">用户发送的文字</view>
    <view class="ai-message">
      <text>这里接受 ai 回复的内容</text>
      <chat-loading></chat-loading>
      <!-- 联网查询的数据 -->
      <view>
        <text class="recommend-tips">我还为你推荐以下内容</text>
        <view class="recommend-content">
          <text class="recommend-item text-show">123456</text>
          <text class="recommend-item text-show">123456</text>
          <text class="recommend-item text-show">123456</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import ChatLoading from "./chat-loading.vue"

</script>
<style lang="scss" scoped>
.user-message {
  background-color: #20C57D;
  border-radius: 4rpx;
  color: #fff;
  padding: 15rpx;
  margin: 30rpx 20rpx 0 20rpx;
  display: inline-block; /*文字与盒子大小进行自适应 */
}
.ai-message {
  background-color: #ffffff;
  border-radius: 4rpx;
  color: #333;
  padding: 15rpx;
  margin: 30rpx 20rpx 0 20rpx;
}

.recommend-tips {
  background-color: #F3F3F3;
  border-radius: 10rpx;
  margin: 20rpx 0;
  padding: 15rpx;
  font-weight: bold;
}

.recommend-content {
  background-color: #F3F3F3;
  border-radius: 10rpx;
  padding: 15rpx;
  .recommend-item {
    margin-bottom: 15rpx;
    color: #006C45;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
