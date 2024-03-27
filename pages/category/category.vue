<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-navbar title="菜谱分类" @leftClick="goToIndex" :autoBack="true" leftIconSize="32" :placeholder="true">
			<u-icon name="search" slot="right" size="38" @click="goToSearch"></u-icon>
		</u-navbar>
		<view class="category-menu">
			<view class="menu-left">
				<view class="menu-left-item" v-for="(item, index) in categoryList" :key="item.id"
					:class="{ 'active': index == currentIndex }" @click="currentIndex = index">
					{{ item.name }}
				</view>
			</view>
			<scroll-view class="menu-right" :scroll-y="true">
				<view class="banner" v-if="isBanner">
					<u-icon class="banner-close" name="close-circle-fill" color="rgba(0, 0, 0, 0.4)" size="28"
						@click="closeBanner"></u-icon>
					<image :showLoading="true" :src="bannerSrc" @click="goToBanner" mode="widthFix"></image>
				</view>
				<view class="menu-right-item" v-for="item in subMenuList" :key="item.id">
					<view class="tagsname">
						<image class="tagsname-image" :showLoading="true" :src="item.image_url" @click="goToBanner"
							mode="widthFix"></image>
					</view>
					<view class="tagsbox">
						<view class=" tagsbox-tag" v-for="tagitem in item.cs" :key="tagitem.id"
							@click="goSearchDetail(tagitem.name)">
							{{ tagitem.name }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
import { http } from '../../apis/http'
import { gotoUrl } from '../../utils/utils';

const SEARCHHISTORY = 'searchHistory'

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
		closeBanner() {
			this.isBanner = false
		},
		goSearchDetail(kw) {
			let data = uni.getStorageSync(SEARCHHISTORY) || []
			// console.log('storage sync', data);

			// let newArr = []				
			// 考虑去重，本次搜索的是曾经搜素过的，进行去重
			// for (let i = 0; i < data.length; i++) {
			// 	   if(data[i] !== kw) {
			// 		   newArr.push(data[i])
			// 	   }
			// }
			// es6提供的filter方法，过滤方法遍历当前数组生成新的数组
			data = data.filter(item => item !== kw)	// 返回值为真保留，为假删除

			// 存到localstorage 并不会引起vue的监听
			uni.setStorage({
				key: SEARCHHISTORY,
				data: [kw, ...data]
			})


			uni.navigateTo({
				url: '/pages/SearchDetail/SearchDetail?kw=' + kw
			})
		}
	},
	computed: {
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
		width: 80vw;

		.banner {
			position: relative;
			width: 100%;

			.banner-close {
				z-index: 1;
				position: absolute;
				top: 5px;
				right: 5px;
			}
		}

		.menu-right-item {
			padding: 0 $uni-spacing-row-lg;
			margin-bottom: $uni-spacing-col-lg*2;

			.tagsname {
				width: 100%;
				margin-bottom: $uni-spacing-col-lg;

				.tagsname-image {
					width: 100%;
				}
			}

			.tagsbox {
				display: grid;
				justify-content: center;
				grid-template-columns: 1fr 1fr 1fr;
				grid-gap: $uni-spacing-col-sm $uni-spacing-row-sm;

				.tagsbox-tag {
					box-sizing: border-box;
					padding: 4px 10px;
					border: 1rpx solid rgba(7, 17, 27, .1);
					border-radius: 8px;
					white-space: nowrap;
					font-size: 12px;
					text-align: center;
				}
			}
		}


	}


}
</style>
