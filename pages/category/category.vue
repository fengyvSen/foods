<template>
	<view>
		<u-navbar title="菜谱分类" @rightClick="rightClick" :autoBack="true" leftIconSize="32" :placeholder="true">
			<u-icon name="search" slot="right" size="38" @click="goToSearch"></u-icon>
		</u-navbar>
		<view class="category-menu">
			<view class="menu-left">
				<veiw class="menu-left-item"></veiw>
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

<style></style>
