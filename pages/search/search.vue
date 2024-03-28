<template>
	<view>
		<view class="nav-bar">
			<view class="search-bar">
				<u--input :focus="focus" v-model="searchStr" placeholder="家常菜" prefixIcon="search"
					prefixIconStyle="font-size: 22px;color: #909399">
					<template slot="suffix">
						<u-icon v-show="searchStr" @click="clearSearchStr" name="close-circle-fill"
							color="#909399"></u-icon>
					</template>
				</u--input>
			</view>
			<view class="cancel-btn" @click="goBack">
				取消
			</view>
		</view>
		<u-list v-show="searchStr">
			<u-list-item v-for="(s, i) in suggests" :key="i">
				<u-cell :title="s.name" @click="goSearch(s.name)">
					<u-tag v-if="s.tag" slot="right-icon" shape="circle" :text="s.tag.name" size="mini"
						:bgColor="s.tag.background_color" :color="s.tag.text_color"
						:borderColor="s.tag.border_color"></u-tag>
				</u-cell>
			</u-list-item>
		</u-list>
		<view class="hot-search-wrap" v-show="!searchStr && searchHistoryArr.length">
			<view class="wrap-title">
				历史搜索
			</view>
			<view class="hot-search-label" v-for="s in searchHistoryArr" :key="s" @click="goSearch(s)">
				{{ s }}
			</view>
		</view>

		<view class="hot-search-wrap" v-show="!searchStr">
			<view class="wrap-title">
				热门搜索
			</view>
			<view class="hot-search-label" v-for="(h, i) in hotSearch" :key="i" @click="goSearch(h.title)"
				:style="{ color: h.color, border: `1px solid ${h.borderColor}`, backgroundColor: h.background_color }">
				{{ h.title }}
			</view>
		</view>
	</view>
</template>

<script>
import { hotSearch, suggestsSearch } from '../../apis/moudles/search'
import {debounce} from '../../utils/utils'
import { http } from '../../apis/http.js'

const SEARCHHISTORY = 'searchHistory'


export default {
	data() {
		return {
			searchStr: '',
			suggests: [],
			hotSearch: [],
			searchHistoryArr: [],
			focus: false
		}
	},
	methods: {
		clearSearchStr() {
			console.log('clear');
			this.searchStr = ''
		},
		goBack() {
			uni.navigateBack()
		},
		getSearchSuggests(kw) {
			// console.log(`"${newValue}"`, `"${kw}"`);
			if (kw) {
				http('recipe/search/suggests?kw=' + kw).then(res => {
					console.log(res.result.suggests);
					// console.log(this.suggests);
					this.suggests = res.result.suggests
				})
			}
		},
		async getHotSearchArr() {
			let {
				result
			} = await http('recipe/search/hot')

			console.log('热门搜索', result.suggestdetails);

			this.hotSearch = result.suggestdetails
		},
		// 进行搜索
		goSearch(kw) {
			// 让输入框的值与点击需要搜索的关键字保持一致
			this.searchStr = kw

			// 将本次搜索的关键字数据持久化到本地，实现历史搜索
			// 保存历史记录需要先取之前保存的值，再存
			// uni.getStorage({
			// 	key: 'searchHistory',
			// 	success(res) {
			// 		console.log('storage',res.data);	
			// 		uni.setStorage({
			// 			key: 'searchHistory',
			// 			data: [...res.data, kw]
			// 		})
			// 	}
			// })

			// 每次存入前先获取之前存入的值
			// 第一次无法获取searchHistory所以第一次时通过"||"运算符返回空数组
			let data = uni.getStorageSync(SEARCHHISTORY) || []
			console.log('storage sync', data);

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
			// 没有考虑页面的渲染，解决方法直接同步更新 searchHistoryArr
			// this.searchHistoryArr = uni.getStorageSync(SEARCHHISTORY)
			this.searchHistoryArr = [kw, ...data]


			// 跳转至搜索详情页
			uni.navigateTo({
				url: '/pages/SearchDetail/SearchDetail?kw=' + kw
			})
		}
	},
	onLoad() {
		/**
		 * 监听 'back' 事件，用于在页面返回时让输入框自动获取焦点。
		 * 无参数和返回值。
		 */
		uni.$on('back', () => {
			// 在下一个tick中设置focus为true，以确保页面返回后输入框能立即获取焦点
			this.$nextTick(() => {
				this.focus = true
			})

		})
	},
	created() {
		/**
		 * 1. 从本地存储中读取搜索历史记录并保存到组件的data中
		 * 2. 创建一个防抖函数，用于延迟获取搜索建议，减少频繁请求
		 * 3. 获取热门搜索词列表
		 */
		this.searchHistoryArr = uni.getStorageSync(SEARCHHISTORY) // 从localstorage中读取搜索历史，保存到searchHistoryArr
		this._getSearchSuggests = debounce(300, this.getSearchSuggests) // 生成一个延迟300毫秒执行的getSearchSuggests防抖函数
		this.getHotSearchArr() // 获取热门搜索词列表
	},
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

.hot-search-wrap {
	padding: 20rpx;

	.wrap-title {
		margin-bottom: 20rpx;
		font-size: 14px;
		font-weight: 600;
	}

	.hot-search-label {
		float: left;
		margin: 0 20rpx 20rpx 0;
		padding: 4px 6px;
		border-radius: 4px;
		background-color: rgb(250, 250, 250);
	}

	&::before,
	&::after {
		display: block;
		clear: both;
		content: '';
	}
}
</style>