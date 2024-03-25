export default {
	state: {
		banner:[],
		flt: "有0条更新",
		list: [],
		murl: "",
		slt: ""
	},
	getters: {
		
	},
	mutations: {
		updateData(state,payload) {
			console.log(payload),
		  state.banner=payload.banner?payload.banner:[],
		  state.flt=payload.flt?payload.flt:"有0条更新",
		  state.list=payload.list?payload.list:[],
		  state.murl=payload.murl?payload.murl:"",
		  state.slt=payload.slt?payload.slt:""
		  console.log(state);
		}
	},
	actions: { 
		
	}
}