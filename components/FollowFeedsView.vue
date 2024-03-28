<template>
	<view>
		<view class="followitem">
			<view class="upinfo">
			</view>
			<view class="itemcontent"></view>
		</view>
	</view>
</template>

<script>
import UPInfo from "./UPInfo/UPInfo.vue";
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
		})
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

<style></style>