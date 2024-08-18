<template>
  <view class="modal-backdrop"></view>
  <view class="personal-center">
    <view class="user-info">
        <image src="../../static/logo.png" mode="aspectFill"></image>
        <text>昵称</text>
    </view>
    <text class="new-dialog">开启新对话</text>
    <text class="history">对话历史</text>
    <!-- 消息列表 -->
    <scroll-view scroll-y type="list" class="scroll-height" enhanced enable-passive>
        <view class="history-list">
            <text class="text-show">消息消息消息消息消息消息消息消息消息消息消息消息</text>
            <text>2024-10-1</text>
        </view>
    </scroll-view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import { useGetButtonBoundingClientPosition } from '../../hooks/useGetButtonBoundingClientPosition'

const { button_bottom, button_top, button_height } = useGetButtonBoundingClientPosition()
</script>
<style lang="scss" scoped>
.modal-backdrop {
    position: fixed;
    top: v-bind('button_bottom');
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
}

.personal-center {
    background-color: #F8F8F8;
    position: fixed;
    left: -80%;
    bottom: 0;
    top: v-bind('button_bottom');
    width: 80%;
    animation: slideInFromLeft 0.5s forwards;

    @keyframes slideInFromLeft {
            from {
                left: -80%;
            }
            to {
                left: 0;
            }
        }
    }
    .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30rpx 0;
        image {
            width: 90rpx;
            height: 90rpx;
            border-radius: 50%;
        }
        text {
            font-size: 35rpx;
            font-weight: bold;
            padding-top: 10rpx;
        }
    }
    .new-dialog {
        margin: 45rpx 20rpx;
    }
    .history {
        margin: 30rpx 20rpx;
        border-bottom: 1rpx solid rgba(218,218,218,0.8);
        padding-bottom: 20rpx;
    }
    .scroll-height {
        height: 800rpx;

        .history-list {
            background-color: #ffffff;
            border-radius: 20rpx;
            margin: 20rpx;
            padding: 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .history-list text:nth-child(1) {
            flex: 1;
        }

        .history-list text:nth-child(2) {
            color: #9D9EAB;
            font-size: 26rpx;
            padding-left: 20rpx;
        }
    }
</style>
