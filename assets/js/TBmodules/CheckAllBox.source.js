(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('CheckAllBox');
	
	/* CheckAllBox ��ʼ��ȫѡȫ��checkbox����
	 * 
	 * Parameters:
	 * btn <ele> ȫѡ���߶�ѡ�İ�ť
	 * boxs <eles> ��Ҫ�����İ�ťeles����
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.CheckAllBox=function(btn,boxs){
		var _check=function(){
			var boole=this.checked;
			D.batch(boxs,function(i){
				i.checked = boole;
			});
		};
		var _F;
		var _callbtn=function(){
			var c=0;
			for(var i=0;i<boxs.length;i++){
				if(!boxs[i].checked) {
					_F=false;
					break;
				}else{
					c++;
				}
			}
			if(c==boxs.length) _F=true;
			D.get(btn).checked=_F;
		};
		E.on(btn,'click',_check);
		E.on(boxs,'click',_callbtn);
	};
})();