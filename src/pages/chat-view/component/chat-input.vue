<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-08-18 01:46:15
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09
 * @Description: chat-input.vue
-->
<template>
  <view class="input-box-area">
    <image @click="inputType = inputType === 'text' ? 'voice' : 'text'" :src="inputType === 'text' ? '../../../static/jianpan.png' : '../../../static/yuyin.png'" mode="widthFix"></image>
    <view class="input-content" v-show="inputType === 'text'">
      <textarea v-model="inputContent" class="textarea-box" placeholder="你有什么想知道的, 快来问问我吧" :auto-height="textareaValue.autoHeight" @linechange="lineChange" maxlength="500" :show-confirm-bar="false" cursor-spacing="20" fixed></textarea>
    </view>
    <view v-show="inputType === 'voice'" class="speech-sound">按住说话</view>
    <image src="../../../static/fasong.png" mode="widthFix" @click="sendIng"></image>
  </view>
  <!-- 录制语音弹窗 -->
  <view class="mask-view" v-if="showAudio"></view>
  <view class="record-text" v-if="showAudio">语音转换的文字</view>
  <view class="recording-pop-up" v-if="showAudio">
    <text class="release">松开 发送</text>
    <text class="in-recognition">正在识别声音...</text>
    <view class="audio-wave">
      <text class="audio-wave-text" v-for="(item, index) in barData" :key="index" :style="{ 'animation-delay': item }"></text>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onMounted, toRefs } from "vue"
import { useChatbotMessageStore } from '@/store'


const chatbotMessageStore = useChatbotMessageStore()

const { inProgress } = toRefs(chatbotMessageStore)

// 切换键盘输入还是语音合成
const inputType = ref("text")

// 存储textarea属性
const textareaValue = reactive({
  autoHeight: true,
  alignItems: 'chenter',
  height: '0px'
})
// 输入框换行时触发
const lineChange = (event: any) => {
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
    query.select('.input-content').boundingClientRect((res: any) => {
    textareaParentHeight.value = res.height + 'px'
  }).exec()
  }, 300);
})

// 声波动画数据
const barData = ref([
  '1s', '0.9s', '0.8s', '0.7s', '0.6s', '0.5s', '0.4s', '0.3s', '0.2s', '0.1s','1s', '0.9s', '0.8s', '0.7s', '0.6s', '0.5s', '0.4s', '0.3s', '0.2s', '0.1s'
])

// 显示隐藏语音录制区域
const showAudio = ref(false)

// 输入框的值
const inputContent = ref('')

// 发送
const sendIng = () => {
  if(!inputContent.value.trim() || inputContent.value === '') {
    return
  }
  console.log(inputContent.value, inProgress.value);
  if(inProgress.value) {
    uni.showToast({
      title: '正在发送消息',
      icon: 'none',
    })
    return
  }
  useChatbotMessageStore().startSending(inputContent.value.trim())
  // 清空输入框
  inputContent.value = ''
}
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
    .speech-sound {
			flex: 1;
			background: linear-gradient(to right, #A2C5FE,#C0E7FD);
			text-align: center;
      line-height: v-bind('textareaParentHeight');
			border-radius: 15rpx;
			color: #fff;
      height: v-bind('textareaParentHeight');
		}
}

.mask-view {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8);
  z-index: 999;
}

.record-text {
  position: fixed;
  bottom: 500rpx;
  left: 10rpx;
  right: 10rpx;
  color: #ffffff;
  height: 300rpx;
  line-height: 1.4;
  overflow: auto;
  padding: 10rpx;
  z-index: 1000;
}

.recording-pop-up {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to right, #07D280, #16CBDC);
  height: 500rpx;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  .release {
    color: #ffffff;
    font-size: 33rpx;
    padding: 30rpx 0;
    font-weight: bold;
  }
  .in-recognition {
    color: #ffffff;
    font-size: 40rpx;
    padding: 30rpx 0;
    font-weight: bold;
  }
  // 声波动画
  .audio-wave {
    padding-top: 50rpx;
    .audio-wave-text {
      background-color: #ffffff;
      width: 7rpx;
      height: 10rpx;
      margin: 0 5rpx;
      border-radius: 5rpx;
      display: inline-flex;
      border: none;
      animation: wave 0.2s ease-in-out;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }
    @keyframes wave {
      from {
        transform: scaleY(1);
      }
      to {
        transform: scaleY(4);
      }
    }
  }
}
</style>
