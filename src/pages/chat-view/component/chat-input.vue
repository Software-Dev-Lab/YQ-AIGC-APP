<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-18 01:46:15
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-18 10:32:36
 * @Description: chat-input.vue
-->
<template>
  <view class="input-box-area">
    <image @click="inputType = inputType === 'text' ? 'voice' : 'text'" :src="inputType === 'text' ? '../../../static/jianpan.png' : '../../../static/yuyin.png'" mode="widthFix"></image>
    <view class="input-content" v-show="inputType === 'text'">
      <textarea class="textarea-box" placeholder="你有什么想知道的, 快来问问我吧" :auto-height="textareaValue.autoHeight" @linechange="lineChange" maxlength="500" :show-confirm-bar="false" cursor-spacing="20" fixed></textarea>
    </view>
    <view v-show="inputType === 'voice'" class="speech-sound">按住说话</view>
    <image src="../../../static/fasong.png" mode="widthFix"></image>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted } from "vue"

// 切换键盘输入还是语音合成
const inputType = ref("text")

// 存储textarea属性
const textareaValue = reactive({
  autoHeight: true,
  alignItems: 'chenter',
  height: '0px'
})
// 输入框换行时触发
const lineChange = (event:any) => {
  const { detail : { height, lineCount } } = event

  // 如果 >= 2 行
  textareaValue.alignItems = lineCount >= 2 ? 'flex-end' : 'center'

  // 如果 >= 6 行
  if(lineCount >= 6) {
    textareaValue.autoHeight = false
    textareaValue.height = height + 'px'
  } else {
    textareaValue.autoHeight = true
  }
}


// 获取textarea的父级高度
const instance = getCurrentInstance()
const textareaParentHeight = ref<string>('')

onMounted(() => {
  const query = uni.createSelectorQuery().in(instance)
  setTimeout(() => {
    query.select('.input-content').boundingClientRect((res) => {
    textareaParentHeight.value = res.height + 'px'
  }).exec()
  }, 300);
})
</script>
<style lang="scss" scoped>
.input-box-area {
    background-color: #F8F8F8;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
    align-items: v-bind('textareaValue.alignItems');
		padding-bottom: 68rpx;
		padding-top: 20rpx;
		image{
			width: 47rpx;
			margin: 0 20rpx;
		}
    .input-content {
      background-color: #ffffff;
			flex: 1;
			width: 100%;
			border-radius: 15rpx;
			padding: 10rpx;
			.textarea-box{
				width: 100%;
        height: v-bind('textareaValue.height')
			}
    }
    .speech-sound{
			flex: 1;
			background: linear-gradient(to right, #A2C5FE,#C0E7FD);
			text-align: center;
      line-height: v-bind('textareaParentHeight');
			border-radius: 15rpx;
			color: #fff;
      height: v-bind('textareaParentHeight');
		}
}
</style>
