
export function http(url, method = 'GET', data = {}) {
	return new Promise(reslove=>{
		uni.request({
			url: 'https://apis.netstart.cn/douguo/'+url,
			data,
			method,
			success(res) {
				console.log(res);
				reslove(res.data)
			},
			error(res){
				reject(res)
			}
		})
	})
}