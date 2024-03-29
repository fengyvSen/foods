export default {
	// 状态对象分解为更模块化的结构，提高可维护性
	state: {
        followFeedsList: []
	},
	getters: {},
	mutations: {
		updateFollowFeedsView(state, payload) {
            state.followFeedsList = [...state.followFeedsList,...payload];
		},
	},
	actions: {},
};
