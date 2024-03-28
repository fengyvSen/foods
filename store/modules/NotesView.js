export default {
	// 状态对象分解为更模块化的结构，提高可维护性
	state: {
        "btmid":"",
		"list":[],
		"topics":[],
	},
	getters: {},
	mutations: {
		updateNotesView(state, payload) {
            state.list = [...state.list,...payload.list];
            state.topics = [...payload.topics];
            state.btmid = payload.btmid;
		},
	},
	actions: {},
};
