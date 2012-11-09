(function(){
			
	/*	
	 *	BBS Detail
	 *	LastModifiedDate: 2010-8-3
	 *	Author: Sunlixu <lixu.sunshine@gmail.com>
	 */

	TB.namespace('bbsDetail');

	var D = YAHOO.util.Dom,E=YAHOO.util.Event,Anim=YAHOO.util.Anim;
	
	TB.bbsDetail = (function(){

		//发表帖子或投票等有下拉效果的层针对IE６写了悬浮效果，其它浏览器用HOVER实现
		var initHoverMenu = function(menu) {
			if(!menu) return;

			var menulist = D.getElementsByClassName('menu-bd', 'div', menu)[0];
			if (!menulist) return;

			menu.menulist = menulist;

			E.on(menu,'mouseover',function(){
				D.addClass(menu,'hover');
				D.addClass(menu.parentNode,'phover');
			});
			E.on(menu,'mouseout',function(){
				D.removeClass(menu,'hover');
				D.removeClass(menu.parentNode,'phover');
			});
			E.on(menulist,'mouseover',function(){
				D.addClass(menu,'hover');
				
			});
			E.on(menulist,'mouseout',function(){
				D.removeClass(menu,'hover');
				
			});
		}


		var iePosition = function(){
			var isIE6 = !window.XMLHttpRequest; 
			var _obj1 = D.get('J_weiwang');
			_obj1.style.position = isIE6 ? 'absolute' : 'fixed';
			var _objs = D.getElementsByClassName('pop-up');

			if (isIE6) {
				var _y = parseInt((D.getDocumentScrollTop()+(D.getViewportHeight()/2)),10) + 'px';
				 if(_obj1) {
					D.setStyle(_obj1,'top',_y);
				 }
				 if(_objs.length>0){
					 for(var i=0;i<_objs.length;i++){
						D.setStyle(_objs[i],'top',_y);
						_objs[i].style.position = isIE6 ? 'absolute' : 'fixed';
					 }

				 }
				 window.onscroll = function() { 
					var _y = parseInt((D.getDocumentScrollTop()+(D.getViewportHeight()/2)),10) + 'px';
					 if(_obj1) {
						D.setStyle(_obj1,'top',_y);
					 }
				 if(_objs.length>0){
					 for(var i=0;i<_objs.length;i++){
						D.setStyle(_objs[i],'top',_y);
					 }

				 }
				 }; 
			} 
		}


		return{
			init:function(){

				// 添加悬浮事件
				initHoverMenu('J_publish');
				var sorts = D.getElementsByClassName('J_sort');
				for(var i=0; i<sorts.length;i++){
					initHoverMenu(sorts[i]);
				}
				initHoverMenu('J_sort');
				var userheads = D.getElementsByClassName('J_userHead');
				for(var i=0; i<userheads.length;i++){
					initHoverMenu(userheads[i]);
				}


				//兼容IE6弹出框垂直居中
				iePosition();

	
				

			}//end init

		}//end return

	
	})();//end TB.bbsDetail 


})();

