<template>
  <view class="chat-loading">
    <text class="circle"></text>
    <text class="circle"></text>
    <text class="circle"></text>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"

</script>
<style lang="scss" scoped>
.chat-loading {
  display: flex;
  padding: 20rpx 0;
  align-items: center;

  .circle {
    width: 18rpx;
    height: 18rpx;
    border-radius: 50%;
    background-color: #777A8D;
    margin-right: 10rpx;
    animation: colorChage 1s linear infinite;
  }

  @keyframes colorChage {
    0% {
      background-color: #ffcc00;
    }
    66.67% {
      background-color: #ffcc00;
    }
    33.33% {
      background-color: #ffcc00;
    }
  }

  .circle:nth-child(1) {
    animation-delay: 0s;
  }
  .circle:nth-child(2) {
    animation-delay: 0.33s;
  }
  .circle:nth-child(3) {
    animation-delay: 0.67s;
  }
}
</style>
