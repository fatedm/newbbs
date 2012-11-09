(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('wordcountdown');
		/* wordcountdown 帮派字符标红函数
		 * 
		 * Parameters:
		 * ele <ele> 计数器所处在的input或者textarea
		 * target <ele> 显示字数的容器
		 * max <num> max字数
		 * 
		 * @author longxiao
		 * @date 2010 12 21
		 */
	TB.wordcountdown.bind=function(ele,target,max){
		//初始化字数
		var targetnum=D.hasClass(ele,'tb-input-hint')?max-Y.lang.trim(D.get(ele).value).length+D.get(ele).title.length:max-Y.lang.trim(D.get(ele).value).length;
		var targetparent=D.getAncestorByTagName(D.get(target),'span');
		D.get(target).innerHTML=targetnum;
		//change函数
		var _change=function(){
			var size=D.hasClass(ele,'tb-input-hint')?max-Y.lang.trim(D.get(ele).value).length+D.get(ele).title.length:max-Y.lang.trim(D.get(ele).value).length;
			targetparent.innerHTML= size>=0 ? '还能输入<em id="J_Bpnum">'+size+'</em>个字':'您的输入已超出<em id="J_Bpnum" class="cause">'+max+'</em>个字'
		};
		_change();
		//绑定事件
		E.on(ele,'keyup',_change);
	};
})();