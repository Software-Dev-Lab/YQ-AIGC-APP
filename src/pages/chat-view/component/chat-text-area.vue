<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-17 18:03:47
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: chat-text-area.vue
-->
<template>
  <block v-for="(item, index) in chatbotMessageStore.messages" :key="index">
    <view class="chat-text-area">
      <view class="user-message" v-if="item.role === 'user'">{{ item.content }}</view>
      <view class="ai-message" v-if="item.role === 'assistant'">
        <towxml :nodes="appContext.$towxml(item.content, 'markdown')"></towxml>
        <chat-loading v-if="item.finish_reason === 'start'"></chat-loading>
        <!-- 联网查询的数据 -->
        <view v-if="item.web_search!.length > 0">
          <text class="recommend-tips">我还为你推荐以下内容</text>
          <view class="recommend-content">
            <text class="recommend-item text-show"
              v-for="(itemInner, indexInner) in item.web_search"
              :key="indexInner"
            >
              {{indexInner + 1}}.{{ itemInner.title }}——{{ itemInner.media }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </block>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from "vue"
import ChatLoading from "./chat-loading.vue"
import { useChatbotMessageStore } from '@/store'

const chatbotMessageStore = useChatbotMessageStore()
const instance = getCurrentInstance()

const appContext = ref(null)
appContext.value = instance.appContext.config.globalProperties

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
