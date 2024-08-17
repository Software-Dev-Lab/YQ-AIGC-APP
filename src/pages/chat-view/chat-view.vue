<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-15 23:37:11
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-17 10:36:06
 * @Description: chat-view
-->
<template>
  <view class="chat-view">
    <view class="button-top"></view>
    <view class="menu-style">
        <text v-for="item in menuList" :key="item.id">{{ item.name }}</text>
    </view>
  </view>
  <view class="menu-view-height"></view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useGetButtonBoundingClientPosition } from '../hooks/useGetButtonBoundingClientPosition'
import {  menuList } from '../settings/index'

const { button_bottom, button_top, button_height } = useGetButtonBoundingClientPosition()

</script>

<style scoped lang="scss">
page {
  background-color: #F3F3F3;
}
.chat-view {
  height: v-bind(button_bottom);
  background: linear-gradient(#FCE7CC, #F3F3F3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .button-top {
    height: v-bind(button_top);
  }
  .menu-style {
    display: flex;
    align-items: center;
    height: v-bind(button_height);
    padding-left: 20rpx;

    text {
      color: #9D9486;
      font-weight: bold;
    }
  }

  .menu-style text:nth-child(2) {
    padding: 0 40rpx;  
  }
}

.menu-view-height {
  height: v-bind(button_bottom);
}
</style>