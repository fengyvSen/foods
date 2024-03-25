export function gotoUrl(url){
    if (window.plus) {
        plus.runtime.openURL(url);
      } else {
        // 处理在非APP平台的情况
        window.open(url)
      }
	  return window.plus?"plus":"open"
}