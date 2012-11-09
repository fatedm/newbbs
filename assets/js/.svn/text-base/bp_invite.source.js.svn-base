/*
 @intro 帮派邀请js
 @author shiran
 @date 2009.07.30
*/


(function() {
	var Y = YAHOO.util,E = Y.Event,D = Y.Dom,
	/*groupid*/
	gid,
	/*判断是否第一次*/
	isFirst = true,
	/*暂存html内容*/
	temphtml = '',
	handle = {
		//判断登录
		login:function() {
			if(TB.bom.getCookie('cookie1') == '' && TB.bom.getCookie('_l_g_') == '') {
				D.setStyle('J_InvitePop','display','none');
				D.setStyle('J_InvitePop','visibility','hidden');
				if(!$('J_PopUpMask')) {
					var oDiv = document.createElement("div");
					oDiv.id = 'J_PopUpMask';
					oDiv.className = "pop-up";
					oDiv.style.position='absolute';
					oDiv.style.left = D.getStyle('J_InvitePop','left');
					oDiv.style.top = D.getStyle('J_InvitePop','top');
					D.setStyle(oDiv,'z-index','100000');
					oDiv.innerHTML="<div class='hd'><h3 id='J_title'></h3></div><div class=\"bd\"><div class=\"inner\"><iframe id=\"J_PopUpFrame\" class=\"pop-mask\" src=\"\" scrolling=\"no\" frameborder=\"0\"></iframe></div></div><p class=\"ft\"><a href=\"#\" class=\"j_close act\" >关闭</a></p>";
					document.body.appendChild(oDiv);
					var oIframe = D.get('J_PopUpFrame');
					D.setStyle(oIframe,'height','auto');
					D.setStyle(oDiv,'display','block');
					oIframe.setAttribute('src','/invitation/sns_friends.htm?group_id=' + gid + '&t=' + new Date().getTime());

					//关闭绑定,class:j_close
					var close = D.getElementsByClassName('j_close');
					E.on(close, 'click', function(e) {
						D.setStyle(oDiv,'display','none');
						D.setStyle('J_InvitePop','display','none');
						_timer.cancel();
						E.stopEvent(e);
					});
				} else {
					var oDiv = $('J_PopUpMask');	
				}

				D.setStyle(oDiv,'display','block');
				
				//检查是否登录，并隐藏登录框
				var _timer = YAHOO.lang.later(1,window,function() {	
					if ((TB.bom.getCookie('cookie1') || TB.bom.getCookie('_l_g_')) != '') {
						D.setStyle(oDiv,'display','none');
						//执行函数
						handle.viewAll();
						_timer.cancel();
						return true;
					}												 
				},null,true);
				return true;
			}
			return false;
		},
		
		//显示结果
		viewAll:function() {
			//判断是否登录
			if(handle.login()) return;
			var gUrl = '/invitation/sns_friends.htm?group_id=' + gid + '&t=' + new Date().getTime();
			var _ajaxDat = Y.Get.script(gUrl,{
				onSuccess:function(req) {
					if(!(typeof _result == 'undefined') && _result) {
						var group = _result.groupList;
						var friends = _result.friendList;
						
						var area = D.getElementsByClassName('f-area','div','J_InvitePop')[0];
						
						//错误信息提示
						if(_result.message != '') {
							temphtml = area.innerHTML;
							area.innerHTML = '<p>' + _result.message + '</p>';
							return false;
						}
						
						//提示无好友
						if(friends.length == 0) {
							temphtml = area.innerHTML;
							area.innerHTML = '<p>还只身一人在江湖飘着？你目前一个好友都没有！快去<a href="' + $('J_InvitePop').getAttribute('data:jhurl') + '" target="_blank">邀请好友</a></p>';
							return false;
						}
						
						if(!$('J_AllFri') && temphtml != '') {
							area.innerHTML = temphtml;
							E.on('J_SureInvite','click',handle.submitForm);
							var closebtn = D.getElementsByClassName('act-cancel','button','J_InvitePop');
							E.on(closebtn,'click',function(e) {
								var target = E.getTarget(e);
								var parent = D.getAncestorByClassName(target,'invite-f');
								D.setStyle(parent,'display','none');
								E.preventDefault(e);
							});
						}
						
						//创建分组
						$('J_AllGroup').innerHTML = '';
						var tempfrag = document.createDocumentFragment();
						var allop = document.createElement('option');
						allop.setAttribute('value','all');
						allop.appendChild(document.createTextNode('全部好友'));
						tempfrag.appendChild(allop);
						for(var i=0;i<group.length;i++) {
							_op = document.createElement('option');
							_op.setAttribute('value',group[i].groupId);
							_op.appendChild(document.createTextNode(group[i].groupName));
							tempfrag.appendChild(_op);
						}
						$('J_AllGroup').appendChild(tempfrag);
						//添加事件
						E.on('J_AllGroup','change',handle.changeGroup);
						
						
						//添加好友列表
						$('J_AllFri').innerHTML = '';
						var tempfrag2 = document.createDocumentFragment(),checked;
						for(var j=0; j<friends.length; j++) {
							var _li = document.createElement('li');
							_li.setAttribute('data:fid',friends[j].friendId);
							_li.setAttribute('data:gid',friends[j].groupIds);
							_li.innerHTML = '<label for="f_' + j + '"><input id="f_' + j + '" value="' + friends[j].friendId + '" type="checkbox" />'+friends[j].friendNick + '</label>';
							tempfrag2.appendChild(_li);
						}
						$('J_AllFri').appendChild(tempfrag2);
						//清除全选事件
						E.removeListener('c_all');
						//全选
						var _inputs = $('J_AllFri').getElementsByTagName('input');
						E.removeListener(_inputs);
						E.on(_inputs,'click',handle.checkInput);
						var checkall = TB.form.CheckboxGroup.attach(_inputs,{checkAllBox:'c_all',checkOnInit:true});
					}
				},
				onFailure:function(req) {
					alert('未知错误');
				},
				charset:'GBK'
			});
			
			if(isFirst) {
				isFirst = false;
				//提交
				E.on('J_SureInvite','click',handle.submitForm);
			}
			
			D.setStyle('J_InvitePop','visibility','visible');
			D.setStyle('J_InvitePop','display','block');
			D.setStyle('J_InvitePop','z-index','100000');
		},
		
		//校验是否全选
		checkInput:function() {
			var _inputs = D.getElementsBy(function(el) {
				return D.isAncestor('J_AllFri',el) && el.tagName.toLowerCase() == 'input' && D.getAncestorByTagName(el,'li').style.display != 'none';
			});	
			var isAll = TB.common.toArray(_inputs).every(function(el,i) {
				return el.checked == true;							   
			});
			setTimeout(function() {
				isAll ? ($('c_all').checked = true) : ($('c_all').checked = false);
			},100);
		},
		
		//分组改变时取值
		changeGroup:function(e) {
			var target = E.getTarget(e);
			var gid = target.value;
			var lis = D.get('J_AllFri').getElementsByTagName('li');
			if(gid == 'all') {
				D.setStyle(lis,'display','block');
			} else {
				TB.common.toArray(lis).forEach(function(el,i) {
					D.setStyle(el,'display','block');
					if(el.getAttribute('data:gid').split(',').indexOf(gid) < 0) D.setStyle(el,'display','none');
				});
			}
			//取消全选
			var _inputs = $('J_InvitePop').getElementsByTagName('input');
			TB.common.toArray(_inputs).forEach(function(el,i) {
				el.checked = false;											
			});
		},
		
		//提交表单		
		submitForm:function(e) {
			E.preventDefault(e);
			//判断是否登录
			if(handle.login()) return;
			var _inputs = $('J_AllFri').getElementsByTagName('input');
			var _fid = [];
			TB.common.toArray(_inputs).forEach(function(el,i) {
				//获取已选id
				D.getStyle(D.getAncestorByTagName(el,'li'),'display') != 'none' && el.checked == true &&_fid.push(el.value);
				//清除非当前input
				D.getStyle(D.getAncestorByTagName(el,'li'),'display') == 'none' && (el.checked = false);
			});
			if(_fid.length == 0) {
				alert('请选择好友');	
				return;
			}
			var postData = 'friends=' + _fid.join(',') + '&action=invitation_action&event_submit_do_invite_sns_friends=anything&groupId=' + gid + '&tbToken=' + $('J_InvitePop').getAttribute('data:tbToken');
			var url = $('J_InvitePop').getAttribute('data:submitUrl') + '?_input_charset=utf-8';
			Y.Connect.asyncRequest('POST', url, {
				success: function(req) {
					var ret = YAHOO.lang.JSON.parse(req.responseText);
					var area = D.getElementsByClassName('f-area','div','J_InvitePop')[0];
					temphtml = area.innerHTML;
					ret.result == 0 ? (area.innerHTML = '<p class="success">恭喜你！已经成功向好友发出邀请！</p>') : (area.innerHTML = '<p class="error">' + ret.result + '</p>');
					
					setTimeout(function() {
						location.reload(true) || location.reload();
					},3000);
				},
				failure: function(req) {
					commonAjaxFailure(req);
				}
			}, postData);
		},

		init:function() {
			if(!$('J_InvitePop')) return;
			//close
			var closes = D.getElementsByClassName(/act-close|act-cancel/,'*','J_InvitePop');
			E.on(closes,'click',function(e) {
				var target = E.getTarget(e);
				var parent = D.getAncestorByClassName(target,'invite-f');
				D.setStyle(parent,'display','none');
				D.setStyle(parent,'visibility','hidden');
				E.preventDefault(e);
			});
			
			//避免闪烁
			D.setStyle('J_InvitePop','visibility','hidden');
			
			//弹出
			var popEls = $('J_InviteFri') ? $('J_InviteFri') : D.getElementsByClassName('J_InviteFri');
			E.on(popEls,'click',function(e) {
				gid = E.getTarget(e).getAttribute('data:groupId'); 							 
			});
			TB.widget.SimplePopup.decorate(popEls,'J_InvitePop',{position:'top',eventType:'click',width:390,align:'right',offset:[-150,-130],onShow:function() {
				setTimeout(function() {
					handle.viewAll();
				},100);
			}});
		}
	};
	handle.init();
})();