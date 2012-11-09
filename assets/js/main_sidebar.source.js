//作用于左侧菜单显示
//注意，此脚本依赖于/tbra/1.0/tbra-aio.js
//by xiong_song 2010-6-2
(function(){
	var D = YAHOO.util.Dom,E = YAHOO.util.Event,menuObj=document.getElementById("sidebar_menu"),hObj=menuObj.getElementsByTagName("h2"),length=hObj.length,ulObj=null;
	for(var i=0;i<length;i++){
		E.on(hObj[i],"click",function(){
			ulObj=this.nextSibling;
			if(!ulObj){return;}
			while(ulObj && ulObj.nodeType>=2){
				if(ulObj.nodeType===1 && ulObj.nodeName==="UL"){break;}
				ulObj=ulObj.nextSibling;
			};
			if(ulObj.nodeName==="UL"){
				if(D.hasClass(ulObj,"hidden")){
					D.removeClass(ulObj,"hidden");
					D.removeClass(this,"show");
				}else{
					D.addClass(ulObj,"hidden");
					D.addClass(this,"show");
				}
			}
		})
	}
})();
