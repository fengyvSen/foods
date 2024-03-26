<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-navbar title="菜谱分类" @leftClick="goToIndex" :autoBack="true" leftIconSize="32" :placeholder="true">
			<u-icon name="search" slot="right" size="38" @click="goToSearch"></u-icon>
		</u-navbar>
		<view class="category-menu">
			<view class="menu-left">
				<view class="menu-left-item" v-for="(item, index) in categoryList" :key="index"
					:class="{ 'active': index == currentIndex }" @click="currentIndex = index">
					{{ item.name }}
				</view>
			</view>
			<view class="menu-right">
				<div class="banner" v-if="isBanner">
					<u-icon class="banner-close" name="close-circle-fill" color="rgba(0, 0, 0, 0.4)" size="28" @click="closeBanner"></u-icon>
					<u--image :showLoading="true" :src="bannerSrc" width="80vw" hight="100%" @click="goToBanner"
						mode="widthFix"></u--image>
				</div>
				<view class="menu-right-item">
					<view class="tagsname">

					</view>
					<view class="tagsbox">
						<view class="tag"></view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import { http } from '../../apis/http'
export default {
	data() {
		return {
			currentIndex: 0,
			isBanner: true,
			categoryList: [],
			bannerSrc: '/static/banner.png',
		}
	},
	methods: {
		async fetchDate() {
			let { result } = await http('recipe/flatcatalogs')
			this.categoryList = result.cs
			console.log(result);
		},
		rightClick() {
			console.log('rightClick');
		},
		leftClick() {
			console.log('leftClick');
		},
		goToSearch() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		goToIndex() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		},
		showToast(params) {
			this.$refs.uToast.show({
				...params,
				complete() {
					params.url && uni.navigateTo({
						url: params.url
					})
				}
			})
		},
		goToBanner() {
			this.showToast(
				{
						type: 'default',
						title: '',
						message: "这是一条广告",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
					},
			)
		},
		closeBanner(){
			this.isBanner = false
		}
	},
	compute: {
		subMenuList() {
			let subArr = this.categoryList[this.currentIndex]
			return subArr ? subArr.cs : []
		}
	},
	onLoad() {
		this.fetchDate()
	},
}
</script>

<style lang="scss">
.category-menu {
	position: fixed;
	display: flex;
	margin-top: $uni-spacing-col-base;

	.menu-left {
		flex: 0 0 20vw;
		background-color: $uni-bg-color-grey;
		height: 100vh;
	}

	.menu-left-item {
		position: relative;
		padding: 10px 0;
		line-height: 20px;
		text-align: center;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&.active {
			position: relative;
			background-color: $uni-bg-color;

			&::after {
				display: block;
				position: absolute;
				top: 50%;
				transform: translatey(-50%);
				right: 3px;
				height: 20px;
				width: 3px;
				content: '';
				border-radius: 999px;
				background-color: $uni-color-base;

			}
		}

	}

	.menu-right {
		.menu-right-item {
			margin: 0 $uni-spacing-row-lg;
		}
	}

	.banner {
		position: relative;

		.banner-close {
			z-index: 1;
			position: absolute;
			top: 5px;
			right: 5px;
		}
	}
}
</style>
