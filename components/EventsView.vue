<!--
 * @Author: 风与 11443815+the19thfengyv@user.noreply.gitee.com
 * @Date: 2024-03-14 10:08:44
 * @LastEditors: 风与 11443815+the19thfengyv@user.noreply.gitee.com
 * @LastEditTime: 2024-03-16 00:53:13
 * @FilePath: \foods\components\EventsView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="events-view">
		<view class="events-noticeBar">
			<u-notice-bar :text="bannerText" color="black" direction="column" bgColor="#f8f8f8" fontSize="30">111</u-notice-bar>
		</view>
		<view class="events-title"><p>热门活动上线中</p></view>
		<view class="events-list" v-for="item in ongoing.events" :key="item.id">
			<EventsViewItem :type="ongoing" :url="item.url" :title="item.name" tagText="征集中" tagColor="#fc0" fontColor="black" guideText="立即参与" :imageUrl="item.image"></EventsViewItem>
		</view>
		<view style="height: 40rpx;"></view>
		<view class="events-title"><p>往期回顾</p></view>
		<view class="events-list" v-for="item in ended.events" :key="item.id">
			<EventsViewItem :type="ongoing" :url="item.url" :title="item.name" tagText="已结束" tagColor="#c0c0c0" fontColor="#fff" guideText="查看详细" :imageUrl="item.image"></EventsViewItem>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { http } from '../apis/http';
import { EventsViewUrl } from '../apis/moudles/index';


import EventsViewItem from './items/EventsViewItems/EventsViewItem.vue';

export default {
	name: "EventsView",
	data() {
		return {

		};
	},
	computed: {
		...mapState({
			banner: state => state.EventsView.banner,
			ended: state => state.EventsView.ended,
			laid: state => state.EventsView.laid,
			ongoing: state => state.EventsView.ongoing
		}),
		...mapGetters(['bannerText'])
	},
	methods: {
		...mapMutations(['updateData']),
		fetchData(){
			http(EventsViewUrl).then(data=>{
				console.log(data.data)
				this.updateData({...data.data})
			})
		}
	},
	components: {
		EventsViewItem
	},
	created(){
		this.fetchData()
	},

}
</script>

<style lang="scss">
.events-view{
	margin:  0 $uni-spacing-row-lg*2;
}

.events-title{
	margin: $uni-spacing-row-base*2 0;
	p{
		font-size: $uni-font-size-lg;
	}
	
}
</style>