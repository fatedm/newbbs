(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('CheckFileType');
	
	/* CheckFileType �Ա������ڲ����,ǰ���ж��ļ���ʽ�Ƿ���Ϲ涨
	 * 
	 * Parameters:
	 * list <ary> �����ʽ���ļ���ʽ�� 
	 * 
	 * Returns:
	 * boole <true|false> �Ϸ�����true�����Ϸ�����false
	 * 
	 * @author longxiao
	 * @date 2010 12 13
	 */
	
	TB.CheckFileType=function(value,list){
		var s=value.lastIndexOf('.'),
		extension=value.substring(s+1,value.length).toLowerCase();
		
		for(var i=0;i<list.length;i++){
			if(extension==list[i]) return true;
		}
		
		return false;
	};
})();