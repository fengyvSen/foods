<template>
	<view>
		<LoadingBar @scrollTolower="scrolltolowerHandle">
			<scroll-view class="topics-row" :scroll-with-animation="true" :scroll-x="true" v-for="(tArr, i) in topics"
				:key="'tArr_' + i">
				<view class="label-item" v-for="t in tArr" :key="t.id">#{{ t.name }}</view>
			</scroll-view>
			<view class="notes-list">
				<view class="notes-item" v-for="(l, i) in list" :key="i">
					<view v-if="l.type == 2">
						<image class="item-image" :src="l.activity.image" mode="widthFix"></image>
						<view class="activity-name">
							{{ l.activity.name }}
						</view>
						<view class="item-bottom">
							<view class="item-author">
								<image class="author-avatar" :src="l.activity.author.p" mode="aspectFill"></image>
								<view class="author-name">{{ l.activity.author.n }}</view>
							</view>
							<view class="item-right">
								<image class="action-icon" :src="l.activity.action_icon" mode="widthFix"></image>
								<view class="action-title">{{ l.activity.action_title }}</view>
							</view>
						</view>
					</view>
					<view v-else-if="l.type == 1">
						<image class="item-image" :src="l.note.image_u" mode="widthFix"></image>
						<view v-if="l.note.straight_text" class="straight-text">
							{{ l.note.straight_text }}
						</view>
						<view class="activity-name">
							{{ l.note.title }}
						</view>
						<view class="item-bottom">
							<view class="item-author">
								<image class="author-avatar" :src="l.note.author.p" mode="aspectFill"></image>
								<view class="author-name">{{ l.note.author.n }}</view>
							</view>
							<view class="item-right">
								<image class="action-icon" src="/static/icons/hO.png" mode="widthFix"></image>
								<view class="action-title">{{ l.note.like_count }}</view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</LoadingBar>
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

			http(NotesViewUrl(this.list.length)).then(data => {
				this.updateNotesView({ ...data.result })
				this.$nextTick(() => {
					this.loading = false
				})
			})
		},
		// 上拉到底部实现加载更多功能
		scrolltolowerHandle() {
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

<style lang="scss">
.note-view {
	position: fixed;
	top: 77px;
	bottom: 50px;
}

.topics-row {
	margin: 10px 0;
	padding: 2px 0;
	width: 750rpx;
	white-space: nowrap;
	// 	overflow: auto;
}

.label-item {
	display: inline-block;
	margin-right: 5px;
	padding: 0 10px;
	border-radius: 999px;
	font-size: 12px;
	line-height: 28px;
	white-space: nowrap;
	background-color: #299faa33;
	color: #299faa;
}

.notes-list {
	padding: 0 20rpx;
	column-count: 2;
	column-gap: 20rpx;

}
/* 定义一个名为.notes-item的样式类，用于规范笔记项的显示 */
.notes-item {
	/* 避免在分页时在元素内部中断 */
	break-inside: avoid;
	margin-bottom: 10px; /* 设置底部外边距 */
	width: 345rpx; /* 设置宽度 */
	border-radius: 8px; /* 设置圆角 */
	overflow: hidden; /* 隐藏溢出内容 */
	background: #efefef; /* 设置背景色 */

	/* 定义图片样式 */
	.item-image {
		display: block; /* 确保作为块级元素显示 */
		margin-bottom: 5px; /* 设置底部外边距 */
		width: 100%; /* 宽度占父元素100% */
	}

	/* 定义连续打卡文本样式 */
	.straight-text {
		margin-left: 5px; /* 设置左边距 */
		font-size: 20px; /* 设置字体大小 */
		font-weight: 600; /* 设置字体粗细 */
		line-height: 14px; /* 设置行高 */
		white-space: nowrap; /* 避免文本换行 */
		transform-origin: 0 center; /* 设置变换的原点 */
		transform: scale(.5); /* 缩小显示 */
	}

	/* 定义活动名称的样式 */
	.activity-name {
		padding: 5px; /* 设置内边距 */
		font-size: 14px; /* 设置字体大小 */
		font-weight: 600; /* 设置字体粗细 */
		line-height: 18px; /* 设置行高 */
		max-height: 32px; /* 设置最大高度 */
		overflow: hidden; /* 隐藏溢出内容 */
	}

	/* 定义底部项的样式 */
	.item-bottom {
		display: flex; /* 使用弹性布局 */
		justify-content: space-between; /* 项目在主轴上均匀分布 */
		align-items: center; /* 项目在交叉轴上居中对齐 */
	}

	/* 定义作者信息的样式 */
	.item-author {
		display: flex; /* 使用弹性布局 */
		align-items: center; /* 项目在交叉轴上居中对齐 */
		padding: 5px; /* 设置内边距 */

		/* 定义作者头像样式 */
		.author-avatar {
			display: block; /* 确保作为块级元素显示 */
			margin-right: 2px; /* 设置右边距 */
			width: 14px; /* 设置宽度 */
			height: 14px; /* 设置高度 */
			border-radius: 999px; /* 设置圆角 */
		}

		/* 定义作者名称的样式 */
		.author-name {
			flex: 0 0 170rpx; /* 设置弹性大小 */
			white-space: nowrap; /* 避免文本换行 */
			width: 170rpx; /* 设置宽度 */
			overflow: hidden; /* 隐藏溢出内容 */
			text-overflow: ellipsis; /* 显示省略符号 */
			font-size: 20px; /* 设置字体大小 */
			font-weight: 600; /* 设置字体粗细 */
			color: #666; /* 设置颜色 */
			transform-origin: 0 center; /* 设置变换的原点 */
			transform: scale(.5); /* 缩小显示 */
		}
	}

	/* 定义右侧操作区域的样式 */
	.item-right {
		display: flex; /* 使用弹性布局 */
		align-items: center; /* 项目在交叉轴上居中对齐 */

		/* 定义操作图标的样式 */
		.action-icon {
			display: block; /* 确保作为块级元素显示 */
			width: 14px; /* 设置宽度 */
			height: 14px; /* 设置高度 */
		}

		/* 定义操作标题的样式 */
		.action-title {
			font-size: 20px; /* 设置字体大小 */
			font-weight: 600; /* 设置字体粗细 */
			white-space: nowrap; /* 避免文本换行 */
			transform-origin: 4px center; /* 设置变换的原点 */
			transform: scale(.5); /* 缩小显示 */
		}
	}


}
</style>