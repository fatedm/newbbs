 
(function () {
	var D = YAHOO.util.Dom,E=YAHOO.util.Event;
	var sum=0;
	var _sub=function(){
		sum=0;
    	var _tr=D.getChildrenBy(D.get('vote-post'),function(el){
    			return el.tagName=='TR' && ( el.style.display !='none');
    		});
    	var arr="";
    	for(var i=0;i<_tr.length;i++){
			var imglink="";
			var title=_tr[i].getElementsByTagName('input')[0].value;
			var href=_tr[i].getElementsByTagName('a')[_tr[i].getElementsByTagName('a').length-3].title;
			if(title=="" && href!=""){
				_empty=true;
				sum++;
			}
			var j_close=D.getFirstChild(D.getFirstChild(D.getFirstChild(_tr[i]))).className;
    		if(_tr[i].style.display!='none' && j_close=="j_close"){
    			arr+=title+"\u0010"+ (href=="" ? " " : href) +"\u0010"+ (imglink == "" ? " " :  imglink)+"\u0011";
    		}
    	}
		return arr;
	}
	
	var _getMaxAnswer = function(){
		var j_radio1 = D.get('j_radio1');
		if (j_radio1.checked) {
			return 1;
		} else {
			return D.get('j_multiple').value;
		}
	}
	
	var _getEndDate = function() {
		var time = "";
		time = time + D.get('J_Year').value + "-";
		time = time + D.get('J_Month').value + "-";
		time = time + D.get('J_Date').value + " ";
		time = time + D.get('J_Hour').value;
		return time;
	}
	
	E.on('j_submit','click',function(ev){
		D.get('j_options').value=_sub();
		if(sum>0){
			if(!confirm("您有未填写的选项描述，是否继续发表?")){
				//alert('否');
				E.stopEvent(ev);
				return;
			}else{
				//alert('选择了是');
				D.get('maxAnswer').value = _getMaxAnswer();
				D.get('endDate').value = _getEndDate();
			//	document.all["pollForm"].submit();
			}
		}else{
			//alert('没有空表单');
			D.get('maxAnswer').value = _getMaxAnswer();
			D.get('endDate').value = _getEndDate();
			//document.all["pollForm"].submit();
		}
	});

	if(D.get('j_radio2').checked==true){
		D.get('j_multiple_span').style.display='inline-block';
	}
	E.on('j_radio2','click',function(){
		if(this.checked==true){
			D.get('j_multiple_span').style.display='inline-block';
		}
	 })
	E.on('j_radio1','click',function(){
		if(this.checked==true){
			D.get('j_multiple_span').style.display='none';
		}
	})
	if(D.get('j_radio2').checked==true){
		D.get('j_multiple_span').style.display='inline-block';
	}
	
})();