(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event,DOC=document;
	TB.namespace('checknum');
	/*
	 * 检查邀请人数并限制
	 * 帮派邀请模块私用
	 * 只在旺旺邀请处和回调处使用
	 */
	TB.checknum=function(eles,num){
		var n=0;
		D.batch(eles,function(el){
			if(el.checked) n++;
		});
		
		if(n>=num){
			D.batch(eles,function(el){
				if(!el.checked){
					el.disabled=true;
					E.removeListener(el.parentNode.getElementsByTagName('label')[0]);
				}
			});
		}else{
			D.batch(eles,function(el){
				if(el.disabled){
					TB.Customlabel([el],[el.parentNode.getElementsByTagName('label')[0]]);
					E.on(el.parentNode.getElementsByTagName('label')[0],'click',function(){
						TB.checknum(eles,num);
					});
					el.disabled=false;
				} 
			});
		}
	};
})();