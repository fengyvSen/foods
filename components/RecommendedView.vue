<!--
 * @Author: 风与 11443815+the19thfengyv@user.noreply.gitee.com
 * @Date: 2024-03-14 10:26:55
 * @LastEditors: 风与 11443815+the19thfengyv@user.noreply.gitee.com
 * @LastEditTime: 2024-03-18 08:34:36
 * @FilePath: \foods\components\RecommendedView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view>
    <u-swiper
        :list="banner"
        keyName="i"
        :autoplay="true"
        circular
        previousMargin="50"
        nextMargin="50"
        radius="5"
        bgColor="#ffffff"
		imgMode="heightFix"
		@click="onclick"
    ></u-swiper>
	<view class="" v-for="(l,i) in list" :key="i">
			<!-- 使用component动态切换到底该展示哪个组件 -->
			<!-- 
			<component :is="l.type == 1 ? 'RecommendItem':'NotesItem'" :source="l"></component>
			 -->
			<RecommendItem 
					v-if="l.type == 1" 
					:authorPic="l.r.a.p"
					:authorName="l.r.a.n"
					:lvl="l.r.a.lvl"
					:img='l.r.img'
					:collectUsers="l.r.collect_users"
					:collectCount="l.r.collect_count_text"
					:title="l.r.n"
					>
			</RecommendItem>
			<RecommendItem
					v-if="l.type == 3" 
					:authorPic="l.note.author.p"
					:authorName="l.note.author.n"
					:lvl="l.note.author.lvl"
					:img='l.note.image_u'
					:collectUsers="l.note.collect_users"
					:collectCount="l.note.like_count + '人收藏'"
					:title="l.note.title"
					>
			</RecommendItem>
		</view>
	</view>
</template>

<script>
import { http } from '../apis/http';
import { gotoUrl } from '../utils/utils';
import {RecommendedViewUrl} from '../apis/moudles/index';
import RecommendItem from './items/RecommendItems/RecommendItem.vue'

import {mapState,mapGetters,mapMutations} from 'vuex';

	export default {
		name:"RecommendedView",
		data() {
			return {}
		},
		computed:{
			...mapState({
				banner:state=>state.RecommendedView.banner,
				flt: state=>state.RecommendedView.flt,
				list:state=>state.RecommendedView.list,
				murl: state=>state.RecommendedView.murl,
				slt: state=>state.RecommendedView.slt
			})
		},
		methods:{
			...mapMutations(['updateData']),
			onclick(index){
				gotoUrl(this.banner[index].url)
			},
			fetchData(){
				let timeStamp = new Date().getTime()

				http(RecommendedViewUrl+"?timeStamp="+timeStamp).then(data=>{
					this.updateData({...data.result})
				})
			}
		},
		mounted () {
			console.log(RecommendedViewUrl);
			this.fetchData();
		},
		components:{
			RecommendItem,
		}
	}
</script>

<style lang="scss">

</style>