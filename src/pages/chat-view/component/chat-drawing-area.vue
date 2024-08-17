<template>
  <view class="chat-drawing-area">
    <view class="style-title">生成风格</view>
    <scroll-view class="scroll-view_X" scroll-x scroll-with-animation enable-passive>
      <view class="style-content" v-for="(item, index) in generateStylesData" :key="index" :class="{'select-style': selectIndex === index}">
        <view class="style-item" @click="selectIndex = index">
          <image :src="item.icon" mode="aspectFill"></image>
          <text :style="{ backgroundColor: item.color }">{{ item.style }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import type { IGenerateStylesData } from '../../../types/pages/chat-view.vue'
import { generateStylesData } from '../../../settings/index.ts'

const selectIndex = ref(0)
</script>
<style lang="scss" scoped>
.style-title {
  padding: 20rpx;
}
.scroll-view_X {
  white-space: nowrap;
  height: 130rpx;
  
  .style-content {
    height: 130rpx;
    width: 130rpx;
    margin-left: 20rpx;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:last-child {
      margin-right: 20rpx;
    }

    .style-item {
      position: relative;

      image {
        width: 110rpx;
        height: 110rpx;
        border-radius: 15rpx;
      }

      text {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 22rpx;
        padding: 5rpx 0;
        text-align: center;
        color: #ffffff;
        border-bottom-left-radius: 15rpx;
        border-bottom-right-radius: 15rpx;
      }
    }

  }

}


// 选中的边框样式
.select-style {
  border: 4rpx solid #E23256;
  border-radius: 15rpx;
  box-sizing: border-box;
}
</style>
