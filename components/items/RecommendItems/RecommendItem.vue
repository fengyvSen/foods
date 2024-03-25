<template>
	<view class="recommended-item">
		<view class="item-author">
			<image class="author-avatar" mode="widthFix" :src="authorPic" alt="" />
			<view class="author-name">
				{{ authorName }}
			</view>
			<view class="author-lvl">
				lv.{{ lvl }}
			</view>
		</view>
		<image class="content-img" mode="aspectFill" :src="img"></image>
		<view class="favorite-wrap">
			<view class="collect-avatar" :class="{ fix: i == 0 }" v-for="(u, i) in collectUsers" :key="i">
				<image :src="u.p" mode="widthFix"></image>
			</view>

			<view class="collect-count">{{ collectCount }}</view>
		</view>
		<view class="item-name">
			{{ title }}
		</view>
	</view>
</template>

<script>
	export default {
		name: "RecommendItem",
		//props配置定义当前组件有哪些自定义属性
		props: ['authorPic','authorName','lvl','img', 'collectUsers','collectCount','title'],
		data() {
			return {

			};
		}
	}
</script>
<style>
.recommended-item {
	padding: 4px 0 8px;
}
.item-author {
	display: flex;
	align-items: center;
	padding: 4px;


	.author-avatar {
		display: block;
		width: 32px;
		height: 32px;
		border-radius: 999px;
	}

	.author-name {
		margin-left: 4px;
		font-size: 12px;
		font-weight: 700;
	}

	.author-lvl {
		// margin-left: 1px;
		font-style: italic;
		font-weight: 700;
		font-size: 18px;
		transform: scale(.5);
		color: #dfb300;
	}
}

.content-img {
	display: block;
	width: 750rpx;
}

.favorite-wrap {
	display: flex;
	padding: 8px 4px;

	.collect-avatar {
		position: relative;
		margin-left: -4px;
		border: 2px solid #000;
		width: 12px;
		height: 12px;
		border-radius: 999px;
		background: #fff;
		overflow: hidden;

		&.fix {
			margin-left: 0;
		}

		image {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	.collect-count {
		margin-left: 4px;
		font-size: 12px;
		font-weight: 700;
	}
}

.item-name {
padding: 0 4px;
	margin-top: 4px;
	font-size:  14px;
	font-weight: 700;
}
</style>
