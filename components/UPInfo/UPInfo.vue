<template>
	<view class="item-UP">
		<image class="UP-avatar" mode="widthFix" :src="UPSrc" alt="" />
		<view class="UP-name">
			{{ name }}
		</view>
		<view class="UP-InfoBox">
			<view class="UP-lvl">
				lv.{{ lvl }}
			</view>
			<view class="UP-text">
				{{ text }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "UPInfo",
	props: ['UPSrc', 'name', 'lvl','text'],
	methods: {

	},
	data() {
		return {

		};
	}
}
</script>

<style lang="scss"></style>