(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('listenCallback');
	
	/* listenBack �Ա������ڲ����,��ѯ���,�����첽��Ӧ��
	 * 
	 * Parameters:
	 * filter <function> return false | true;
	 * fun <function> ��filter����ֵ�����Ϊtrue��ִ��fun������500������ѯһ��
	 * 
	 * Returns:
	 * boole <true|false> �Ϸ�����true�����Ϸ�����false
	 * 
	 * @author longxiao
	 * @date 2010 12 13
	 */
	
	TB.listenBack=function(filter,fun){
		setTimeout(function(){
			if(filter()){
				fun();
			}else{
				TB.listenBack(filter,fun);
			}
		},200);
	};
})();