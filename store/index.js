// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

import RecommendedView from './modules/RecommendedView.js'
import EventsView from './modules/EventsView.js'
import FollowFeedsView from './modules/FollowFeedsView.js'
import NotesView from './modules/NotesView.js'



Vue.use(Vuex);//vue的插件机制

console.log(RecommendedView)

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
	},
	modules:{
		RecommendedView,
		EventsView,
		FollowFeedsView,
		NotesView
	}
})
export default store