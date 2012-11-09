(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('CheckFileType');
	
	/* CheckFileType 淘宝帮派内部组件,前端判断文件格式是否符合规定
	 * 
	 * Parameters:
	 * list <ary> 数组格式的文件格式名 
	 * 
	 * Returns:
	 * boole <true|false> 合法返回true，不合法返回false
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