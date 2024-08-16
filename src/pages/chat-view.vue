<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-15 23:37:11
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-16 09:10:15
 * @Description: chat-view
-->
<template>
  <view class="chat-view">
    <view></view>
    <view>
        <text v-for="item in menuList" :key="item.id">{{ item.name }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useGetButtonBoundingClientPosition } from '../hooks/useGetButtonBoundingClientPosition'
import {  menuList } from '../settings/index'

const { button_bottom, button_top, button_height } = useGetButtonBoundingClientPosition()

console.log(button_bottom, button_top, button_height)

</script>

<style scoped lang="scss">
page {
  background-color: #F3F3F3;
}
.chat-view {
  background: linear-gradient(#FCE7CC, #F3F3F3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>../hooks/useGetButtonBoundingClientPosition