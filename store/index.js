// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

import RecommendedView from './modules/RecommendedView.js'
import EventsView from './modules/EventsView.js'


Vue.use(Vuex);//vue的插件机制

console.log(RecommendedView)

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		"username":"foo",
		"age":18,
	},
	modules:{
		RecommendedView,
		EventsView
	}
})
export default store