(function(){
	/*
	 * �������������ͳ��iframe ���ַ:bangpai.linezing.com
	 * daily�������Ϊ longyue.tongji.linezing.com (��ȷ�����Ժ󲻻��)
	 */
	
	var proxyUrl='http://bangpai.taobao.com/proxy.htm'; //ȷ������û���⣬��ʼ��������ַΪ���ϵ�ַ
	
	if(window.location.host!='bangpai.linezing.com'){
		proxyUrl='http://bangpai.daily.taobao.net/proxy.htm'; //������ò�Ϊ���ϵģ����´����ַΪdaily�µ�
	}
	//��������iframe
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