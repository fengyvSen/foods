<template>
	<scroll-view class="note-view" :scroll-y="true" :lower-threshold="0" @scrolltolower="$emit('scrolltolower')">
		<slot></slot>
		<u-gap height="80"></u-gap>
		<view class="loading-text">
			<u-loading-icon size="48"></u-loading-icon>
			<text>加载更多</text>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: "LoadingBar",
	data() {
		return {

		};
	}
}
</script>

<style lang="scss">
.loading-text {
	display: flex;
	justify-content: center;
	align-items: center;
	color: #666;
	font-weight: 600;

	text {
		font-size: 14px;
		margin-left: 10px;
	}
}

.note-view {
	position: fixed;
	top: 77px;
	bottom: 50px;
}
</style>