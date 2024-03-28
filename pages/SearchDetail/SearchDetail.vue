<template>
	<view>
		<view class="nav-bar">
			<view class="search-bar" @click="goBack">
				<u--input :value="searchStr" disabled disabledColor="#eee" placeholder="家常菜" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399">
				</u--input>
			</view>
			<view class="cancel-btn" @click="goBack">
				取消
			</view>
		</view>

		<view class="order-selecter">
			<view class="select-tab" :class="{ 'active': order === 0 }" @click="order = 0">
				综合
			</view>
			<view class="select-tab" :class="{ 'active': order === 2 }" @click="order = 2">
				收藏高
			</view>
			<view class="select-tab" :class="{ 'active': order === 3 }" @click="order = 3">
				学做多
			</view>
		</view>

		<u-list @scrolltolower="scrolltolowerHandle">
			<u-list-item v-for="l in resultList" v-if="l.type == 13" :key="l.r.id">
				<view class="result-list-item">
					<image class="item-pic" :src="l.r.img"></image>
					<view class="result-content">
						<view class="result-desc">
							<view class="result-name">
								{{ l.r.n }}
							</view>
							<view v-if="l.r.rate" class="result-rate">
								{{ intToFloatStr(l.r.rate) }}分
							</view>
							<view class="result-tags" v-for="(r, i) in l.r.recipe_list_tags" :key="i"
								:style="{ color: r.text_color, background: r.background_start_color }">
								{{ r.text }}
							</view>
						</view>

						<view class="result-author">
							<image class="author-avatar" :src="l.r.a.p"></image>
							<view class="author-name">
								{{ l.r.a.n }}
							</view>
						</view>
					</view>
				</view>
			</u-list-item>
			<u-list-item>
				<LoadingBar></LoadingBar>
			</u-list-item>
		</u-list>

	</view>
</template>

<script>
import { http } from '../../apis/http.js'

import LoadingBar from '../../components/LoadingBar.vue'

export default {
	data() {
		return {
			searchStr: '',
			order: 0, // 0 综合排序 2收藏最多 3学做最多
			resultList: []
		}
	},
	onLoad({
		kw
	}) {
		console.log(kw);
		this.searchStr = kw
		this.getSearchDetail()
	},
	methods: {
		// 上拉加载更多
		scrolltolowerHandle() {
			console.log('上拉加载');
			this.getSearchDetail(this.resultList.length)
		},
		goBack() {
			uni.navigateBack({
				success() { // 回退成功，成功的回到上一个页面
					// 使用uni提供的页面通讯
					uni.$emit('back')
				}
			})
		},
		async getSearchDetail(offset = 0, oldArr = this.resultList) {

			console.log(offset);
			const {
				result
			} = await http('recipe/search?keyword=' + this.searchStr + '&order=' + this.order +
				'&type=0&offset=' + offset + '&limit=20')
			console.log('搜索结果', result.list);
			this.resultList = [...oldArr, ...result.list]
		},
		intToFloatStr(num) {
			if (num % 1 == 0) {
				return num + '.0'
			}
			return num
		}
	},
	watch: {
		order() {
			this.getSearchDetail(0, [])
		}
	},
	components: {
		LoadingBar
	}
}
</script>

<style lang="scss">
.nav-bar {
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 20rpx;

	.search-bar {
		flex: 1;
		background: #eee;
	}

	.cancel-btn {
		margin-left: 15px;
		font-size: 12px;
		color: #666;
	}
}

.order-selecter {
	display: flex;
	padding: 0px 20rpx;

	.select-tab {
		padding: 5px;
		font-size: 12px;
		font-weight: 600;
		color: #999;

		&.active {
			color: black;
		}
	}
}

.result-list-item {
	display: flex;
	padding: 20rpx;

	.item-pic {
		flex: 0 0 275rpx;
		display: block;
		margin-right: 10px;
		width: 260rpx;
		height: 260rpx;
		border-radius: 14px;
	}

	.result-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: 10px 0;

		.result-name {
			font-size: 14px;
			font-weight: 600;
			white-space: nowrap;
			max-width: 380rpx;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.result-rate {
			margin-top: 5px;
			font-size: 12px;
			font-weight: 600;
		}

		.result-tags {
			margin-top: 2px;
			display: inline-block;
			padding: 6px 5px;
			font-size: 12px;
			line-height: 14px;

		}
	}

	.result-author {
		display: flex;
		align-items: center;

		.author-avatar {
			display: block;
			width: 16px;
			height: 16px;
			border-radius: 999px;
		}

		.author-name {
			margin-left: 4px;
			color: #666;
			font-size: 12px;
		}
	}
}
</style>