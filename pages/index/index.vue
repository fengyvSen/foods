<template>
	<view class="page">
		<u-navbar :safeAreaInsetTop="false">
			<view class="nav-left" slot="left">
				+
			</view>
			<view  @click="goToSearch" slot="center">
				<u-search placeholder="菜谱" v-model="inputwords"></u-search>
			</view>
			<view class="nav-right" slot="right">
				<view class="more nav-btn" @click="goToCategory"></view>
				<view class="notify nav-btn">
					 <u-badge type="error" max="99" :value="2"></u-badge>
				</view>
			</view>
		</u-navbar>
		<view class="select-tabs">
			<view class="tabs-item"  v-for="(item,index) in tabs" :key="index" :class="{active:isselected===index}" @click="selectTabs(index)">
				{{item.title}}
			</view>
		</view>
		<keep-alive>
			<component ref="childComp" @changeRefresh="changeRefreshHandle" :refresh="refresh" :is="tabs[isselected].component"></component>
		</keep-alive>
	</view>
</template>

<script>
	import {http} from '../../apis/http.js'
	// import store from '@/store/index.js';//需要引入store

	import EventsView from '../../components/EventsView.vue'
	import NotesView from '../../components/NotesView.vue'
	import VideosView from '../../components/VideosView.vue'
	import FollowFeedsView from '../../components/FollowFeedsView.vue'
	import RecommendedView from '../../components/RecommendedView.vue'
	
	export default {
		data() {
			return {
				isselected:3,
				inputwords:"",
				tabs: [{
						title: '关注',
						url: 'home/ffeeds/0/20',
						component: FollowFeedsView.name
					},
					{
						title: '推荐',
						url: 'home/recommended/0/20',
						component: RecommendedView.name
					},
					{
						title: '笔记',
						url: 'home/notes/0/20',
						component: NotesView.name
					},
					{
						title: '视频',
						url: 'home/videos/0/20',
						component: VideosView.name
					},
					{
						title: '活动',
						url: 'home/events/getlists',
						component: EventsView.name
					}
				],
			}
		},
		onLoad() {
			http(this.tabs[this.isselected].url)
		},
		// 存方法的地方
		methods: {
			goToSearch() {
				// url: '/pages/search/search'
				uni.navigateTo({
					url: '/pages/SearchDetail/SearchDetail'
				})
			},
			goToCategory(){
				uni.navigateTo({
					url: '/pages/category/category'
				})
			},
			selectTabs(selectedIndex){
				if(this.isselected!=selectedIndex){
					this.isselected=selectedIndex
				}
			}
		},
		watch: {
			isselected(newValue) {
				console.log('监听到index发生改变了');
				// 发送网络请求
				http(this.tabs[newValue].url)
			}
		},
		computed: {
		},
		components: {
			EventsView,
			RecommendedView,
			FollowFeedsView,
			NotesView,
			VideosView
		}
	}
</script>

<style lang="scss">
.page{
	padding-top: 45px;
	min-height: 50vh;
}
	
.nav-left {
	width: 24px;
	height: 24px;
	border-radius: 999px;
	font-size: 20px;
	font-weight: 700;
	text-align: center;
	line-height: 20px;
	background-color: $uni-color-base;
}

.nav-search {
	background-color: #eef;
	// uni自带响应式单位 750rpx刚好是屏幕的宽度 
	width: 375rpx;
	height: 26px;
	border-radius: 999px;
}

.nav-right {
	display: flex;
	
	.nav-btn {
		margin-left: 5px;
		width: 26px;
		height: 26px;
	}
	
	.more {
		background-image: url(@/static/icons/_w.png);
		background-size: cover;
	}
	
	.notify {
		background-image: url(@/static/icons/_z.png);
		background-size: cover;
	}
}

.select-tabs{
	display: flex;
	align-items: flex-end;
	margin:$uni-spacing-col-lg*2 $uni-spacing-row-base;
	
	.tabs-item{
		flex:1;
		margin: 0 5px;
		font-size: $uni-font-size-base;
		text-align: center;
		color: $uni-text-color-placeholder;
		
		&.active{
			position: relative;
			color:black;
			font-weight:700 ;
			font-size: $uni-font-size-lg;
			
			&::after{
				display: block;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				width: 24px;
				height: 2px;
				background-color: #fc0;
				content: '';
			}
		}
	}
}

</style>