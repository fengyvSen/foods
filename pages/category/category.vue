<template>
	<view>
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
				<view class="menu-right-item"></view>
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
			categoryList: [],
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
		goToIndex(){
			uni.switchTab({
				url: '/pages/index/index'
			})
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

	.menu-left {
		flex: 0 0 80px;
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
				right: 0;
				top: 12px;
				content: '';
				height: 24px;
				width: 2px;
				background-color: $uni-color-base;
				
			}
		}

	}
}
</style>
