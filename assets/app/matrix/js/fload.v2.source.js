 (function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event, L = Y.lang;
	E.onDOMReady(function(){
		var cookie = TB.bom.getCookie('showPopup');
		var domain = window.location.hostname;
		(cookie) ? '' : TB.bom.setCookie('showPopup','0',1,domain,'/');

		
		if (cookie == '3') return true;

		var head = document.getElementsByTagName('HEAD').item(0); 
		var style = document.createElement('link'); 
		style.href = "http://a.tbcdn.cn/app/matrix/css/fload.v2.css";
		style.rel = 'stylesheet';
		style.type = 'text/css'; 
		head.appendChild(style);

		var showHide = function () {
			var popup = D.get('J_popup');

			var rebuildClass = function (el, str, action) {
				if (!D.hasClass(el,str) && (action == 'add')){
					D.addClass(el,str);
				}else if (D.hasClass(el,str) && (action == 'remove')) {
					D.removeClass(el,str);
				}
			}

			if (cookie == '1'){
				rebuildClass(popup,'collapsed', 'add');
				rebuildClass(D.get('J_collapse'),'hidden', 'add');
				rebuildClass(D.get('J_expand'),'hidden', 'remove');
			}else if (cookie == '2'){
				rebuildClass(popup,'collapsed', 'remove');
				rebuildClass(D.get('J_expand'),'hidden', 'add');
				rebuildClass(D.get('J_collapse'),'hidden', 'remove');
			}else if (cookie == '3'){
				rebuildClass(popup,'hidden', 'add');
			}

			E.on(popup,'click',function(e){
				var el = E.getTarget(e);
				switch(el.id) {
					case 'J_close':
						rebuildClass(popup,'hidden', 'add');
						TB.bom.setCookie('showPopup','3',1,domain,'/');
						break;
					case 'J_expand':
						rebuildClass(popup,'collapsed', 'remove');
						rebuildClass(el,'hidden', 'add');
						rebuildClass(D.get('J_collapse'),'hidden', 'remove');
						TB.bom.setCookie('showPopup','2',1,domain,'/');
						break;
					case 'J_collapse':
						rebuildClass(popup,'collapsed', 'add');
						rebuildClass(el,'hidden', 'add');
						rebuildClass(D.get('J_expand'),'hidden', 'remove');
						TB.bom.setCookie('showPopup','1',1,domain,'/');
						break;
				}
			});
		}

		YAHOO.util.Connect.asyncRequest('GET',f_url,{
			success: function(req) {
				var div = document.createElement('div'); 
				document.body.appendChild(div);
				div.innerHTML = req.responseText;
				showHide();
				E.on(window,'scroll',function(){
					if("\v"=="v" && D.get("J_popup")) {
						D.get("J_popup").className=D.get("J_popup").className;
					}
				});
			}
		//	failure: function() { alert('������ϣ����Ժ�����'); }
		});

	});
})()