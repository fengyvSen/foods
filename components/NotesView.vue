<template>
	<view>
		<LoadingBar @scrollTolower="scrolltolowerHandle">
			<scroll-view class="topics-row">{{ topics }}</scroll-view>
			<view class="notes-list">{{ list }}</view>
			<u-gap height="80"></u-gap>
		</LoadingBar>
		{{ loading }}
	</view>
</template>

<script>
import { NotesViewUrl } from '../apis/moudles/index';
import { http } from '../apis/http';
import { gotoUrl } from '../utils/utils';
import LoadingBar from './items/LoadingBar'


import { mapState, mapGetters, mapMutations } from 'vuex';


export default {
	name: "NotesView",
	data() {
		return {
			loading: false
		};
	},
	computed: {
		...mapState({
			list: state => state.NotesView.list,
			topics: state => state.NotesView.topics,
		}),
	},
	methods: {
		...mapMutations(['updateNotesView']),
		fetchData() {
			this.loading = true

			let timeStamp = new Date().getTime()
			http(NotesViewUrl(this.list.length) + "?timeStamp=" + timeStamp).then(data => {
				this.updateNotesView({ ...data.result })
				this.$nextTick(() => {
					this.loading = false
				})
			})
		},
		// 上拉到底部实现加载更多功能
		scrolltolowerHandle() {
			console.log(111);
			if (!this.loading) {
				console.log('note滑动到底部了');
				this.fetchData()
			}
		}
	},
	mounted() {
		this.fetchData();
	},
	components: {
		LoadingBar,
	}
}
</script>

<style></style>