(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('Customlabel');
	
	/* Customlabel �����ID��label����
	 * 
	 * Parameters:
	 * target <eles> ������Ԫ�صļ���
	 * trigger <eles> ����labelԪ�ؼ��� 
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