export default {
	// 状态对象分解为更模块化的结构，提高可维护性
	state: {
        list: []
	},
	getters: {},
	mutations: {
		updateVideosView(state, payload) {
            state.list = [...payload.list];
		},
	},
	actions: {},
};
