<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-15 23:37:11
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: chat-view.vue
-->
<template>
  <view class="chat-view">
    <view class="button-top"></view>
    <view class="menu-style">
        <text 
          v-for="item in menuList" 
          :key="item.id" 
          :class="{'select-item': navTopIndex === item.id}" 
          @click="changeNav(item.id)"
        >
          {{ item.name }}
        </text>
    </view>
  </view>
  <view class="menu-view-height"></view>
  <chat-start-card v-show="navTopIndex === 1 && chatbotMessageStore.messages.length === 0"></chat-start-card>
  <chat-text-area class="chat-text-area" v-show="navTopIndex === 1 && chatbotMessageStore.messages.length > 0"></chat-text-area>
  <chat-drawing-area v-show="navTopIndex === 2"></chat-drawing-area>
  <chat-input v-show="navTopIndex === 1"></chat-input>
  <personal-view v-show="navTopIndex === 0"></personal-view>
  <login-view v-if="false"></login-view>
  <view style="height: 300rpx;"></view>
</template>

<script lang="ts" setup>
import { ref, watch, getCurrentInstance } from 'vue'
import { menuList } from '../../settings'
import ChatStartCard from './component/chat-start-card.vue'
import ChatTextArea from './component/chat-text-area.vue'
import chatDrawingArea from './component/chat-drawing-area.vue'
import chatInput from './component/chat-input.vue'
import personalView from '../personal-view/personal-view.vue'
import LoginView from '../login-view/login-view.vue'
import { useGetButtonBoundingClientPosition } from '../../hooks/useGetButtonBoundingClientPosition'
import { useChatbotMessageStore } from '../../store/index'

const { button_bottom, button_top, button_height } = useGetButtonBoundingClientPosition()
const navTopIndex = ref(1)
const chatbotMessageStore = useChatbotMessageStore()
const instance = getCurrentInstance()

const changeNav = (val: number) => {
  navTopIndex.value = val
}

// 监听组件高度, 始终滚动底部
watch(chatbotMessageStore.messages, () => {
  setTimeout(() => {
    const query = uni.createSelectorQuery().in(instance)
    query.select('.chat-text-area').boundingClientRect()
    query.exec(rect => {
      console.log(rect)
      uni.pageScrollTo({
        scrollTop: rect[0].height + 200,
      })
    })
  }, 500)
}, {
  deep: true,
})
</script>

<style scoped lang="scss">
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

    .select-item {
      color: #333!important;
    }

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