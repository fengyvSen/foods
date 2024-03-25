/*
 * @Author: 风与 11443815+the19thfengyv@user.noreply.gitee.com
 * @Date: 2024-03-15 16:14:14
 * @LastEditors: 风与 11443815+the19thfengyv@user.noreply.gitee.com
 * @LastEditTime: 2024-03-15 23:24:42
 * @FilePath: \foods\store\modules\EventsView.js
 */
export default {
  state: {
    banner: [],
    ended: {},
    laid: "",
    ongoing: {}
  },
  getters: {
    bannerText(state) {
      return state.banner.map(item => {
		const nickname=item.nickname.length >= 6?item.nickname.substring(0, 5)+"...":item.nickname
		const name=item.name.length >= 6?item.name.substring(0, 6)+"...":item.name
          return nickname + " 参加了活动 " + name;
      });
    }
  },
  mutations: {
    updateData(state, payload) {
      state.banner = payload.banner || [];
      state.ended = payload.ended || {};
      state.laid = payload.laid || "";
      state.ongoing = payload.ongoing || {};
	  console.log(state);

    }
  },
  actions: {}
};