(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('CheckLG');
	
	/* CheckLG 淘宝帮派内部组件,判断cookie是否登录状态
	 * 
	 * Returns:
	 * boole <true|false> 合法返回true，不合法返回false
	 * 
	 * @author longxiao
	 * @date 2010 12 13
	 */
	
	TB.CheckLG=function(){
		return LG=TB.bom.getCookie('uc1').toQueryParams()['cookie15'] && TB.bom.getCookie('_nk_') != undefined ? true : false;
	};
})();