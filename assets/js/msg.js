/*
 * 消息中心，全选事件代码，批量操作消息
 * 2011-12-20
 */
KISSY.app('MSGCenter');

MSGCenter.add('batchEvent', function(M){
	var S = KISSY, D = KISSY.DOM, E = KISSY.Event;

	var selectors,allSelectors, checkTotal, checkCount, msgForm, actionMethod;
	
	selectors = D.query('.selector');
	allSelectors = D.query('.all-selector');
	checkTotal = selectors.length;
	checkCount = 0;
	msgForm = D.get('#msgForm');
	actionMethod = D.get('#J_action_method');
	
	checkSelected();
	
	S.each(allSelectors, function(item, index){
		item.checked = false;
	})
	function onCheck(tar){
		if(tar.checked){
			checkCount ++;
		}else{
			checkCount --;
		}
		listenCheck();
	}
	function loop(arr, flag){
		if(flag){
			for(var i=0, iLen = arr.length; i < iLen; i++){
				arr[i].checked = true;
			}
		}else{
			for(var j = 0, jLen = arr.length; j < jLen; j++){
				arr[j].checked = false;						
			}
		}
	}
	
	function allCheck(tar){
		if(tar.checked){			
			loop(selectors, true);
			loop(allSelectors, true);
			checkCount = checkTotal;
		}else{
			loop(selectors);
			loop(allSelectors);
			checkCount = 0;
		}
	}
	
	function listenCheck(){
		if(checkCount >= checkTotal){
			loop(allSelectors, true);
		}else {
			loop(allSelectors);
		}		
	}
	
	function checkSelected(){
		if(!D.get("#messagesIds")) return;
		S.each(selectors, function(item){
			if(item.checked) {
				checkCount ++;
			}
			listenCheck();
		});
		
	}
	
	E.on('.J_msgFilter', 'change', function(ev){
		D.get('.posts-filter').submit();
	})
	
	E.on('#main-content', 'click', function(ev){
		var target = ev.target;
		if(D.hasClass(target, 'all-selector')){//点击全选按钮
			allCheck(target);
		}else if(D.hasClass(target, 'selector')){//点击多选按钮
			onCheck(target);
		}else if(D.hasClass(target, 'J_Handle')){		
			checkSelected();
			var num = 0,str;
			S.each(selectors, function(item){
				if(item.checked){
					str = num == 0 ? item.value : str + ',' + item.value;
					num++;
				}
			})
			D.get("#messagesIds").value = str;
			if(num < 1 && D.attr(target, 'data-check')){
				alert('当前没有选中任何消息!');
			}else if (selectors.length == 0){
				alert('没有消息！');
			}else{
				var warning = D.attr(target, 'data-warn');
				
				if(warning) {
					if(window.confirm('你确定要' + D.html(target)  + '？删除不能恢复哦！')){
						actionMethod.name = D.attr(target, 'data-method');
						setTimeout(function(){
							msgForm.submit();
						}, 0)
						
					}					
				}else{
					actionMethod.name = D.attr(target, 'data-method');
					setTimeout(function(){
							msgForm.submit();
					}, 0)
				}
			}
		}else if(D.hasClass(target, 'J_DeleteMsgDetail')){
			if(window.confirm('你确定要删除这条消息吗？删除后不能恢复哦！')){			
				setTimeout(function(){
					D.get('#msgDetailForm').submit();
				}, 0)
			}
			
		}
	});
});