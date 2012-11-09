(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('wordcountdown');
		/* wordcountdown �����ַ���캯��
		 * 
		 * Parameters:
		 * ele <ele> �����������ڵ�input����textarea
		 * target <ele> ��ʾ����������
		 * max <num> max����
		 * 
		 * @author longxiao
		 * @date 2010 12 21
		 */
	TB.wordcountdown.bind=function(ele,target,max){
		//��ʼ������
		var targetnum=D.hasClass(ele,'tb-input-hint')?max-Y.lang.trim(D.get(ele).value).length+D.get(ele).title.length:max-Y.lang.trim(D.get(ele).value).length;
		var targetparent=D.getAncestorByTagName(D.get(target),'span');
		D.get(target).innerHTML=targetnum;
		//change����
		var _change=function(){
			var size=D.hasClass(ele,'tb-input-hint')?max-Y.lang.trim(D.get(ele).value).length+D.get(ele).title.length:max-Y.lang.trim(D.get(ele).value).length;
			targetparent.innerHTML= size>=0 ? '��������<em id="J_Bpnum">'+size+'</em>����':'���������ѳ���<em id="J_Bpnum" class="cause">'+max+'</em>����'
		};
		_change();
		//���¼�
		E.on(ele,'keyup',_change);
	};
})();