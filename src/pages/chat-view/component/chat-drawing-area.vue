<template>
	<view class="style-title">生成风格</view>
	<scroll-view class="scroll-view_H" scroll-x scroll-with-animation enable-passive>
		<view class="style-content" v-for="(item,index) in generateStylesData" :key="index"
		:class="{'select-style':selectIndex === index}"
		>
			<view class="style-list" @click="selectIndex = index">
				<image :src="item.icon" mode="aspectFill"></image>
				<text :style="{'backgroundColor':item.color}">{{item.style}}</text>
			</view>
		</view>
	</scroll-view>
	<view class="keyword-title">画面关键词</view>
	<view class="textarea-view">
		<textarea
		placeholder="请输入中文描述,比如画一位女子,身穿汉服,手拿佩剑,眼神凌厉"
		:show-confirm-bar="false"
		class="textarea-style"
		v-model="content"
		></textarea>
	</view>
  <!-- 生成效果 -->
  <view class="creative-tips">AI正在绘图中...</view>
  <view class="creative-image">
    <image src="../../../static/logo.png" mode="widthFill"></image>
  </view>
  <!-- 提交生成 -->
  <button class="submit-creation">生成图片</button>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import type { IGenerateStylesData } from '../../../types/pages/chat-view.vue'
import { generateStylesData } from '../../../settings/index.ts'

const selectIndex = ref(0)
</script>
<style lang="scss" scoped>
	.style-title{
		padding: 20rpx;
	}
	.scroll-view_H{
		white-space: nowrap;
		height: 130rpx;
		.style-content{
			height: 130rpx;
			width: 130rpx;
			margin-left: 20rpx;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			.style-list{
				position: relative;
				image{
					width: 110rpx;
					height: 110rpx;
					border-radius: 15rpx;
					position: relative;
				}
				text{
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0;
					font-size: 22rpx;
					border-bottom-left-radius: 15rpx;
					border-bottom-right-radius: 15rpx;
					text-align: center;
					padding: 5rpx 0;
					color: #ffffff;
				}
			}
		}
		.style-content:last-child{
			margin-right: 20rpx;
		}
		// 选中加上边框
		.select-style{
			border: 4rpx solid #E23256;
			border-radius: 15rpx;
			box-sizing: border-box;
		}
	}
	.keyword-title{
		padding: 50rpx 20rpx 20rpx 20rpx;
	}
	.textarea-view{
		background-color: #ffffff;
		margin: 0 20rpx;
		border-radius: 15rpx;
		padding: 10rpx;
		.textarea-style{
			width: 100%;
			line-height: 1.4;
		}
	}
	// ai绘图生成效果
	.creative-tips{
		text-align: center;
		padding: 30rpx 20rpx;
		color: darkorange;
		font-weight: bold;
		line-height: 1.5;
	}
	.creative-image{
		margin: 0 20rpx;
		image{
			width: 100%;
			border-radius: 5rpx;
		}
	}
	.submit-creation{
		position: fixed;
		bottom: 68rpx;
		left: 20rpx;
		right: 20rpx;
		padding: 40rpx 0;
		border-radius: 40rpx;
		background: linear-gradient(to right,#A2C5FE,#C0E7FD);
	}
</style>
