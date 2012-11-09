(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('Customlabel');
	
	/* Customlabel 许多无ID的label处理
	 * 
	 * Parameters:
	 * target <eles> 被触发元素的集合
	 * trigger <eles> 触发label元素集合 
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.Customlabel=function(target,trigger){
		var i=0;
		for(;i<trigger.length;i++){
			(function(j){
			E.on(trigger[j],'click',function(){
				target[j].checked = !target[j].checked ?  true : false;
			});
			})(i);
			E.on(target[i],'click',function(ev){
				E.stopPropagation(ev);
			});
		}
	}
})();