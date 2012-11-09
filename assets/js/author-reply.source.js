var DOM = KISSY.DOM, Event = KISSY.Event;

/*用户点击事件*/ 
Detail.add("userEvent", function(Detail){
	Event.on("#detail", "click", function(ev){
		var tar = ev.target;
		if(DOM.hasClass(tar, 'J_authorReply')){
			authorReply(ev);
		}else if(DOM.attr(tar, 'id') == 'replyFromreplyArea'){
			DOM.scrollIntoView('#publishreply');
		}
		else if(DOM.hasClass(tar, 'J_replyUser')){			
			userReply(ev);
		}else if(DOM.hasClass(tar, 'J_delAuReply')){
			submitData(ev, '#authorReplyForm', '你确认要删除楼主回复？删除之后不能恢复哦！');
		}else if(DOM.hasClass(tar, 'J_delThread')){
			submitData(ev, '#deleteThreadForm','你确认要删除该帖子？删除之后不能恢复哦！');
		}else if(DOM.hasClass(tar, 'J_delReply')){
			submitData(ev, '#replyForm', '你确认要删除该回复？删除之后不能恢复哦！');
		}else if(DOM.hasClass(tar, 'J_floatThread')){
			submitData(ev,'#floatThread');
		}else if(DOM.hasClass(tar, 'J_sinkThread')){
			submitData(ev,'#sinkThread');
		}
	});

});

/*楼主回复函数*/
function authorReply(ev){
	ev.halt();
	var url = DOM.attr(ev.target,"data-url");
	Detail.overlay.showDialog({
		'src' : url,
		'width' : 345,
		'headerContent' : '楼主回复'
	});
}

/*回复某楼层用户函数*/
function userReply(ev){
	ev.halt();
	if(typeof(editor) != undefined){
		data = DOM.attr(ev.target,"data-url").split(',');
		userNick = data[0];
		floorId = data[1];
		str = '[ANSWER]回' + floorId + '楼（' + userNick + '）的帖子---[/ANSWER]<p></p>';
		window.location.href = '#publishreply';
		editor.focus();
		editor.insertHtml(str);
		
	}else{
		window.location.href = DOM.attr(ev.target,"href") + '#publishreply';
	}
}

/*删除帖子、回复、楼主回复等
 *@ev: 事件对象
 *@formId: form对象
 *@tipStr: 提示文案
*/
function submitData(ev, formId, tipStr){
	ev.halt();
	var form = DOM.get(formId);
	if(!form) {
		return;
	}
	if(form.replyId) {
		form.replyId.value = DOM.attr(ev.target, 'data-url');
	}
	if(!tipStr){
		form.submit();
	}else if(window.confirm(tipStr)){
        form.submit();
    }
}


/*楼主回复成功操作函数*/
Detail.add("reply_success",function(Detail){
	function replySuccess(data){
		var preNode = DOM.get("#" + data.replyId + " .last-edit") || DOM.get("#" + data.replyId + " .article");
		
		var aimNode = DOM.create('<div class="author-reply"></div>');
		aimNode.innerHTML = '<strong>楼主回复：</strong>'
			+'<p>' + data.content + '</p>'
			+'<a href="javascript:void(0)" class="del J_delAuReply" data-url="' + data.replyId.substr(5) + '">删除</a>';
		DOM.insertAfter(aimNode, preNode);
		Detail.overlay.hide();
		
	}
	return Detail.replySuccess = replySuccess;
});

