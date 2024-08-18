<template>
	<view class="login-page">
		<image class="login-image" src="/static/login.png" mode="widthFix"></image>
		<text class="login-tips">登录体验更多AI功能</text>
		<view class="login-view">
			<button open-type="chooseAvatar" id="avatar-button">
			  <image class="avatar" src="/static/touxiang.png"></image>
			</button>
			<form class="form-submit">
				<input type="nickname" class="weui-input" name="input" placeholder="请输入昵称"/>
				<button form-type="submit" class="submit-button">登录</button>
			</form>
		</view>
	</view>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"

</script>
<style lang="scss" scoped>
	.login-page{
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: #ffffff;
		z-index: 9999;
		.login-image{
			width: 100%;
			margin-top: 110rpx;
		}
		.login-tips{
			font-weight: bold;
			padding: 40rpx 20rpx;
		}
		.login-view{
			display: flex;
			flex-direction: column;
			align-items: center;
			#avatar-button,.avatar{
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
			.form-submit{
				width: 100%;
				.weui-input{
					padding: 20rpx;
					margin: 20rpx;
					border-bottom: 1rpx solid #f2f2f2;
				}
				.submit-button{
					background:linear-gradient(to right,#A2C5FE, #C0E7FD);
					padding: 30rpx 0;
					margin: 55rpx 20rpx 0 20rpx;
				}
			}
		}
	}
</style>
