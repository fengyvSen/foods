<template>
	<LoadingBar @scrollTolower="scrolltolowerHandle">
		{{ list }}
	</LoadingBar>
</template>

<script>
import { VideosViewUrl } from '../apis/moudles/index';
import { http } from '../apis/http';
import { gotoUrl } from '../utils/utils';
import LoadingBar from './items/LoadingBar'

import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
	name: "VideosView",
	data() {
		return {
			loading:false,
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

			http(VideosViewUrl(this.list.length)).then(data => {
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
		LoadingBar
	},
	mounted () {
		this.fetchData()
	}
}
</script>

<style lang="scss"></style>