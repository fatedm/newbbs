(function(){
	/*
	 * 线上引入的量子统计iframe 域地址:bangpai.linezing.com
	 * daily下引入的为 longyue.tongji.linezing.com (不确保他以后不会变)
	 */
	
	var proxyUrl='http://bangpai.taobao.com/proxy.htm'; //确保线上没问题，初始定义代理地址为线上地址
	
	if(window.location.host!='bangpai.linezing.com'){
		proxyUrl='http://bangpai.daily.taobao.net/proxy.htm'; //如果引用不为线上的，重新代理地址为daily下的
	}
	//创建代理iframe
	function Loaderproxy(url){
		var doc=document,
			iframe=doc.createElement('iframe');
			var hashH;
			if(window.navigator.userAgent.indexOf("Chrome")>=1){
			hashH = doc.documentElement.scrollHeight;
			}else{
			hashH = doc.body.scrollHeight;
			}
			iframe.src=url+'#'+hashH;
			iframe.name="J_ProxyIframe";
			iframe.id="J_ProxyIframe";
			iframe.style.display="none";
			doc.body.appendChild(iframe);
	};
	window.onload = function(){
		Loaderproxy(proxyUrl);
	};
	
})();