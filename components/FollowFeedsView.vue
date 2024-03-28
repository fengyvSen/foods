<template>
	<view>
		<view class="followitem" v-for="(item, index) in followFeedsList" :key="item.id">
			<view class="upinfo">
				<UPInfo :UPSrc="item.u.p" :name="item.u.n" :lvl="item.u.lvl" :text="upinfoText[index]"></UPInfo>
				<view class="button"> <u-button text="关注" style="width: 52rpx;" color="#fc0" size="mini"
						throttleTime="1"></u-button>
				</view>
			</view>
			<view class="itemshow" v-if="item.type === 1">
				<image :src="item.img" style="width: 100%;" mode="widthFix" :alt="item.t+'图片'" />
			</view>
		</view>
	</view>
</template>

<script>
import UPInfo from "./items/UPInfo/UPInfo.vue";
import { FollowFeedsViewUrl } from '../apis/moudles/index';
import { http } from '../apis/http';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: "FollowFeedsView",
	data() {
		return {

		};
	},
	computed: {
		...mapState({
			followFeedsList: state => state.FollowFeedsView.followFeedsList
		}),
		upinfoText() {
			return this.followFeedsList.map(item => {
				return item.u.followers_count_text + " · " + item.u.recipes_count_text;
			});
		},
		// itemshowAlt(type,data){
		// 	switch(type){
		// 		case 1:
		// 			return data+"图片";
		// 		default:
		// 			return "";
		// 	}
		// }
	},
	methods: {
		...mapMutations(['updateFollowFeedsView']),

		fetchData() {
			let timeStamp = new Date().getTime()
			http(FollowFeedsViewUrl + "?timeStamp=" + timeStamp).then(data => {
				this.updateFollowFeedsView([...data.result.rfs])
			})
		}
	},
	components: {
		UPInfo,
	},
	mounted() {
		this.fetchData()
	}
}
</script>

<style lang="scss">
.upinfo {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: $uni-spacing-col-lg $uni-spacing-row-lg*2;
}
</style>