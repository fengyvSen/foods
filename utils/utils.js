export function gotoUrl(url){
    if (window.plus) {
        plus.runtime.openURL(url);
      } else {
        // 处理在非APP平台的情况
        window.open(url)
      }
	  return window.plus?"plus":"open"
}

export function debounce(delay, fn) {
	// 使用闭包创建变量用于缓存每次床的延迟执行方法的timer标识
	let timer = null;
	// 返回一个将原始方法防抖加工后的防抖函数出来
	return function(...args) {
		
		timer != null && clearTimeout(timer) // 清除上一次的timer
		timer = setTimeout(() => {
			fn(...args)
			timer = null // 如果防抖函数正常执行完毕我们清空本次生成的timer
		}, delay)
	}
}