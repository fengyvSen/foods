<template>
	<LoadingBar @scrollTolower="scrolltolowerHandle">
		<view class="followitem" v-for="(item, index) in followFeedsList" :key="item.id">
			<view class="upinfo">
				<UPInfo :UPSrc="item.u.p" :name="item.u.n" :lvl="item.u.lvl" :text="upinfoText[index]"></UPInfo>
				<view class="button"> <u-button text="关注" style="width: 52rpx;" color="#fc0" size="mini"
						throttleTime="1"></u-button>
				</view>
			</view>
			<view class="itemshow" v-if="item.type === 1">
				<image :src="item.img" style="width: 100%;" mode="widthFix" :alt="item.t + '图片'" />
			</view>
			<ContentInfo class="contentinfo" :text="item.collect_count_text" :usersList="item.collect_users"
				:ifShare="true" :ifChat="true" :ifStar="true"></ContentInfo>
			<view class="title">
				<p>{{ item.t }}</p>
			</view>
			<view class="tagsbox" v-for="event in item.events" :key="event.id">
				<view class="tag" @click="clickUrl(event.u)">
					<u-icon class="icon" name="tags" color="#299faa" size="12px"></u-icon>
					<text>{{ event.c }}</text>
				</view>
			</view>
		</view>
	</LoadingBar>
</template>

<script>
import UPInfo from "./items/UPInfo/UPInfo.vue";
import LoadingBar from './items/LoadingBar'
import ContentInfo from "./items/UPInfo/ContentInfo.vue";
import { FollowFeedsViewUrl } from '../apis/moudles/index';
import { http } from '../apis/http';
import { gotoUrl } from '../utils/utils';
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: "FollowFeedsView",
	data() {
		return {
			loading: false,
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
		}
	},
	methods: {
		...mapMutations(['updateFollowFeedsView']),

		fetchData() {
			http(FollowFeedsViewUrl(this.followFeedsList.length)).then(data => {
				this.updateFollowFeedsView([...data.result.rfs])
			})
		},
		clickUrl(url) {
			gotoUrl(url)
		},
		scrolltolowerHandle() {
			if (!this.loading) {
				console.log('note滑动到底部了');
				this.fetchData()
			}
		}
	},
	components: {
		UPInfo,
		ContentInfo,
		LoadingBar
	},
	mounted() {
		this.fetchData()
	}
}
</script>

<style lang="scss">
.followitem{
	margin-bottom: $uni-spacing-col-lg;
}
.upinfo {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	// padding: $uni-spacing-col-lg $uni-spacing-row-lg*2;
}

.tag,.contentinfo,.upinfo,.title {
	padding: $uni-spacing-col-lg $uni-spacing-row-lg*2;
}

.tagsbox{
	display: flex;
	color: $uni-link-color;
	font-size: 12px;
	.tag{
		display: flex;
	}
}
</style>