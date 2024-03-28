<template>
	<view>
		<LoadingBar @scrollTolower="scrolltolowerHandle">
			<view class="videos-list" v-for="(l, i) in list" :key="i">
					<RecommendItem v-if="l.type == 1" :authorPic="l.r.a.p" :authorName="l.r.a.n" :lvl="l.r.a.lvl"
						:img='l.r.img' :collectUsers="l.r.collect_users" :collectCount="l.r.collect_count_text"
						:title="l.r.n">
					</RecommendItem></view>
		</LoadingBar>
	</view>

</template>

<script>
import { VideosViewUrl } from '../apis/moudles/index';
import { http } from '../apis/http';
import { gotoUrl } from '../utils/utils';
import LoadingBar from './items/LoadingBar'
import RecommendItem from './items/RecommendItems/RecommendItem.vue'

import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: "VideosView",
	data() {
		return {
			loading: false,
		};
	},
	computed: {
		...mapState({
			list: state => state.VideosView.list,
		}),
	},
	methods: {
		...mapMutations(['updateVideosView']),
		fetchData() {
			this.loading = true

			console.log(VideosViewUrl(this.list.length));
			http(VideosViewUrl(this.list.length)).then(data => {
				console.log(data);
				this.updateVideosView({ ...data.result })
				this.$nextTick(() => {
					this.loading = false
				})
			})
		},
		scrolltolowerHandle() {
			if (!this.loading) {
				console.log('note滑动到底部了');
				this.fetchData()
			}
		}
	},
	components: {
		LoadingBar,
		RecommendItem
	},
	mounted() {
		this.fetchData()
	}
}
</script>

<style lang="scss">
.video-page {
	position: fixed;
	top: 77px;
	bottom: 50px;
}
</style>