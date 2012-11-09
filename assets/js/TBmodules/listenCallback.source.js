(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('listenCallback');
	
	/* listenBack 淘宝帮派内部组件,轮询检查,监听异步响应等
	 * 
	 * Parameters:
	 * filter <function> return false | true;
	 * fun <function> 看filter返回值，如果为true则执行fun，否则500毫秒轮询一次
	 * 
	 * Returns:
	 * boole <true|false> 合法返回true，不合法返回false
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