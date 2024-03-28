<template>
	<view class="item-UP">
		<u--image class="UP-avatar" shape="circle" width="32px" height="32px" mode="widthFix" :src="UPSrc" :alt="alt" />
		<view class="UP-info">
			<span class="UP-name">{{ name }}</span><span class="UP-lvl">lv.{{ lvl }}</span>
		</view>
		<view class="UP-text">
			{{ text }}</view>
	</view>
</template>

<script>
export default {
	name: "UPInfo",
	props: ['UPSrc', 'name', 'lvl', 'text'],
	computed: {
		alt() {
			return this.name + "的头像"
		}
	},
	methods: {

	},
	data() {
		return {

		};
	}
}
</script>

<style lang="scss">
.item-UP {
	display: grid;
	grid-template-columns: 32px auto;
	grid-auto-columns: auto auto;
	align-items: center;


	.UP-avatar {
		grid-row: 1 / 3;
	}

	.UP-info {
		.UP-name {
			margin-right: $uni-spacing-row-lg;
			font-size: 12px;
			font-weight: 700;
		}

		.UP-lvl {
			// margin-left: 1px;
			font-style: italic;
			font-weight: 700;
			font-size: 9px;
			color: #dfb300;
		}
	}

	.UP-text {
		font-size: 10px;
		color: $uni-text-color-grey;
	}

}
</style>