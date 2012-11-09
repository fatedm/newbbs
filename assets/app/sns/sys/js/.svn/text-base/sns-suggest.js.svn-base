/*
	@ intro:好友搜索,需求说明:  
		1.此组件目前仅能使用在淘江湖的各个应用下(可以跨域),样式依赖于tbsp-sns-min.css,目前并未单独提取,主要使用的几个模块分别是:按钮和弹出层,如日后需要,可单独提取其中部分样式独立,另外脚本依赖截字和登录模块,依赖tbra-sns-min.js.
		2.搜索框内的样式不是很容易调整,修改时需要注意.
		3.在input内输入拼音字母会进行搜索,这里有50ms的延迟,当选择好友或者按enter键或者发生input的blur事件时,会自动将选中的好友插入到框内,不管是单选还是复选,都会有'X'图标在名字后边.
		4.'请输入好友的姓名(支持拼音首字母快捷输入)'提示仅提示一次,不管页面有多少个框,这个提示都只提示一次.
		5.只有在点确定或者取消的时候才将框内的数据完全清空,如果点旁边的话,里边内容不做重置,当成是误点.
		6.直接显示在页面里的形式,在点取消时要将框内数据清空.
		7.全选的规则(目前仅在淘帮派里的邀请好友中有使用,效率比较低,慎用):
		  1)点全选,仅选中当前分组下的所有好友;
		  2)随时监听是否全选,以确定是否要将全选的input选中;
		  3)当前分组下无好友时,需要提示;
		  4)切换分组时不清空已选取的好友,并将已选取的好友input自动选中.
		8.在搜索中出现 ' ','&','#','%'时直接提示无好友.
		9.搜索好友结果格式是:realname(nick),如果realname不存在则显示nick,有截字,鼠标放上显示全部.
		10.全部好友里显示realname,如果没有,则以nick替代,有截字,鼠标放上显示全部.
		11.该组件会在页面里的多个元素上使用,所以尽可能的不要使用全局变量,目前仅使用了三个.
		12.JSON问题请联系'文拓'.
	@ author:shiran
	@ date:090824
	@ require:tbsp-sns-min.css,tbra-sns-min.js.
	@ method:调用方法
		弹出窗口类：SNS.friendSuggest.decorate(continer,{
			type:'pop',
			title:'分享给好友',
			pos:[0,0],
			url:'',
			runnow:false,//是否直接执行
			inputType:'checkbox',
			func:function(para) {
				//para 为userid，格式是：1,2,3
			}
		});
		直接嵌入到页面：SNS.friendSuggest.decorate(continer,{
			type:'show',
			title:'分享给好友',
			url:'',
			haveBtn:true,
			inputType:'checkbox',
			func:function(para) {
				//para 为userid，格式是：1,2,3
			}
		};

		另外pop类型时有onShow和onHide自定义事件.
*/

SNS.friendSuggest = new function() {
	var Y = YAHOO.util, D = Y.Dom, E = Y.Event,
	/*
		@ 判断是否是第一次点击
	*/
	isFirst = true,
	/*
		@ 记录此次input内的内容，以便判断下次keyup发生时，用户是否输入了内容
	*/
	history,
	/*
		@ 记录此次keycode，用来判断是否是中文输入法状态，主要是在退格键按下时调用
	*/
	historykey,
	/*
		@ 输入提示语
	*/
	PROMPTINSERT = '请输入好友的姓名(支持拼音首字母快捷输入)',
	/*
		@ 无好友提示
	*/
	PROMPTNOF = '姓名不在好友列表哦，请重新输入',
	/*
		@ 查看好友时没有任何好友的提示
	*/
	NOFRIEND = '当前查询条件下无好友,赶快去<a href="'+SNS.sys.Helper.getApiURI('http://jianghu.{serverHost}/admin/invite/invite_friend.htm')+'">邀请好友</a>!';
	/*
		@ 定时器,记录是否可以再次输入
	*/
	//_timer;

	//config参数默认值
	var deConfig = {
		type:'pop', //弹出窗口类型,可选参数:pop | show
		title:'分享给好友',//窗口标题,必填,不能为空,否则会出现样式错误
		pos:[0,0],//pop:弹出窗口坐标位移默认右边对齐
		inputType:'checkbox',//全部好友内input框类型,可选参数:checkbox | radio
		haveCheckAll:false,//pop:是否可以全选
		haveBtn:false,//show:是否显示'添加','取消'按钮
		defaultValue:[],//show:默认载入值,类型为数组,格式为:[['1','jolin'],['2','释然'],...](userid和realname)
		urlpara:'',//json url参数,这个是定义在target上的自定义属性名称,将根据此属性去获取url参数.
		url:SNS.sys.Helper.getApiURI('http://jianghu.{serverHost}/json/spell_search_json.htm')//json url参数
	}

	//添加样式
	var addCSS = function(csstext,obj) {
		if(YAHOO.lang.isArray(obj) || (YAHOO.lang.isObject(obj) && obj.length)) {
			TB.common.toArray(obj).forEach(function(el,i) {
				addCSS(csstext,el);
			});
			return;
		}
		var obj = D.get(obj);
		if(YAHOO.env.ua.ie) {
			obj.style.cssText = csstext;
		} else {
			obj.setAttribute('style',csstext);
		}
	}

	//show:插入搜索框
	var insertSearch = function(container,bool) {
		if(!container) return;
		var div = document.createElement('div');
		div.className = 'for-pop act skin-red';
		addCSS('display:inline;',div);
                if(bool&&typeof bool === 'boolean'){
                    bool="确定";
                }
		div.innerHTML = '<span class="s-keyword" id="SF_Search" style="background:#FFF;">' +
							'<span id="SF_InnerName" class="f-inner"></span>' +
							'<input id="SF_SearchInput" style="display:none;" type="text" value=""/>' +
						'</span><span class="down" id="SF_ViewAll" style="margin-right:5px;"></span>' + ( bool ? '<span id="J_SubmitShow" class="btn n-btn" style="vertical-align:middle;margin-left:0;"><button>'+bool+'</button></span>' : '');
		container.appendChild(div);
		//对好友页面做特殊处理,以J_FriendsList为判定条件
		if(D.get('J_FriendsList')) {
			var r1 = D.getRegion(div),r2 = D.getRegion(D.getAncestorByClassName(div,'box-detail'));
			var _pos = [r1.left - r2.left,0];
			addCSS('position:absolute;left:' + _pos[0] + 'px;top:' + _pos[1] + 'px;',div);
		}
	}

	//pop:创建弹出框
	var createPop = function(pos,title,data,inputtype,func,url,isall,context,havebtn) {
		if(!SNS.sys.Helper.checkAndShowLogin()) return;
		var isView = (arguments[9] && arguments[9] == 'view') ? true : false;
		//隐藏提示信息
		isView && D.get('SF_Notice') && D.setStyle('SF_Notice','display','none');
		//创建下拉列表
		var flist = document.createElement('div');
		flist.id = 'SF_FriendsList';
		flist.className = 'sns-popup popup-translucent sharef-pop';
		//好友列表
		var friends = data.friendList,
		ful = '';
		if(friends.length != 0) {
			ful += '<ul id="SF_InnerLists" class="i-list">';
			friends.forEach(function(el,i) {
				var _isChecked = (isView && D.get('SF_F' + el.friendId)) ? 'checked' : '';
				ful += '<li data:gid="' + el.groupIds + '" data:fid="' + el.friendId +'"><label for="Suiji_' + i + '"><input id="Suiji_' + i + '" type="' + inputtype + '" name="friend" value=""' + _isChecked + ' /><span class="name" title="' + (el.friendRealName != '' ? el.friendRealName : el.friendNick) + '">' + (el.friendRealName != '' ? SNS.sys.Helper.cutStr(el.friendRealName,6) : SNS.sys.Helper.cutStr(el.friendNick,6)) + '</span></label></li>';
			});
			ful += '</ul>';
		}
		//分组列表
		var groups = data.groupList,
		gcount = 0,
		gul = '';
		if(groups.length != 0) {
			var gdiv = document.createElement('div');
			gdiv.className = 'sns-popup popup-translucent share-sub';
			gdiv.id = 'SF_GroupList';
			var _temp = '';
			groups.forEach(function(el,i) {
				_temp += '<li data:gid="' + el.groupId + '">' + el.groupName + '(' + el.groupCount + ')</li>';
				gcount += parseInt(el.groupCount);
			});
			gul = '<ul><li>所有好友(' + gcount + ')</li>' + _temp + '</ul>';
			gdiv.innerHTML = '<div class="hd naked"></div><div class="bd">' + gul + '</div>';
		}
		//信息提示
		var msg = '<div class="sns-msg" id="SF_Msg" style="display:none;margin-top:10px;"><p class="tips" style="float:none;">' + NOFRIEND + '</p></div>';
		flist.innerHTML = '<div class="hd naked"></div>' +
								'<div class="bd">' +
									'<h3>' + title + '</h3>' +
									(isView ? '' : '<div class="for-pop"><span class="s-keyword" id="SF_Search"><span class="f-inner" id="SF_InnerName"></span><input type="text" value="" id="SF_SearchInput" /></span></div>') +
									'<div class="f-search-m' + (isView ? ' alone-all' : '') + '"><span class="s-group" id="SF_ViewAllGroup"' + (!isView ? ' style="float:right;margin-right:0;"' : '') + '>所有好友(' + gcount + ')</span>' + ((!isView && isall) ? '<label for="J_CAll"><input id="J_CAll" type="checkbox" />全选</label>' : '') + '</div>' + ful + msg +
									((inputtype == 'radio' && isView) ? '' : '<div class="act skin-blue"> <span class="btn n-btn"><a herf="#" id="SF_ShareFSure">' + (isView ? '添加' : '确定') + '</a></span> <span class="btn n-btn"><a herf="#" id="SF_ShareFCancel">取消</a></span> </div>') +
							'</div>' +
							(TB.bom.isIE6 ? '<iframe src="" width="350" height="400" style="position:absolute;left:0;top:0;filter:Alpha(opacity=0);background:red;z-index:-1;"></iframe>' : '');
		gdiv && flist.appendChild(gdiv);
		document.body.appendChild(flist);
		//为查看分组添加事件
		E.on('SF_ViewAllGroup','click',function(e) {
			var target = E.getTarget(e);
			var _gbox = D.get('SF_GroupList');
			if(D.getStyle(_gbox,'display') != 'none') {
				D.setStyle(_gbox,'display','none');
			} else {
				var pos = D.getRegion(target);
				var opos = D.getRegion('SF_FriendsList');
				addCSS('display:block;overflow:hidden;left:' + (pos.left - opos.left) + 'px;top:' + (pos.bottom - opos.top) + 'px;',_gbox);
			}
		});

		//分组mouseover
		if(TB.bom.isIE6) {
			E.on(D.get('SF_GroupList').getElementsByTagName('li'),'mouseenter',function(e) {
				E.getTarget(e).className = 'hover';
			});
			E.on(D.get('SF_GroupList').getElementsByTagName('li'),'mouseleave',function(e) {
				E.getTarget(e).className = '';
			});
		}

		//分组事件
		E.on('SF_GroupList','click',changeGroup);
		//input事件,添加姓名到input框里

		if(!isall) {
			E.on('SF_InnerLists','click',function(e) {
				var target = E.getTarget(e);
				!isView && D.setStyle('SF_Notice','display','none');
				if(target.tagName.toLowerCase() == 'input' && target.id != 'J_CAll') {
					pushIn(target,func,context,inputtype,havebtn);
				}
			});
		}
		//退出
		var _tempAe = arguments[9];
		E.on('SF_ShareFCancel','click',function(e) {
			D.get('SF_InnerName') && (D.get('SF_InnerName').innerHTML = '');//取消时清空输入
			_tempAe && _tempAe != 'view' && _tempAe.fire();
			var target = E.getTarget(e);
			E.stopEvent(e);
			var parent = D.getAncestorByClassName(target,'sns-popup');
			target.id == 'SF_ShareFCancel' && document.body.removeChild(D.get('SF_FriendsList')) && D.setStyle(parent,'display','none');
		});
		//执行回调
		E.on('SF_ShareFSure','click',function(e) {
			E.stopEvent(e);
			!isView && func.apply(context,[getUserIds()]);
			_tempAe && _tempAe != 'view' && _tempAe.fire();
			document.body.removeChild(D.get('SF_FriendsList'));
		});
		//设置坐标
		addCSS('position:absolute;left:' + pos[0] + 'px;top:' + pos[1] + 'px;','SF_FriendsList');

		//添加input事件
		if(!isView) {
			E.on('SF_Search','click',function() {
				createNotice(PROMPTINSERT)
			});
			//输入框事件
			E.on('SF_SearchInput','keyup',function(e) {
				var target = E.getTarget(e);
				//获取keycode
				var keycode = E.getCharCode(e);
				keyUp(keycode,url,inputtype,func,context,havebtn);
			});
			E.on('SF_SearchInput','keydown',keyDown);
			E.on('SF_SearchInput','blur',function() {
				blurEvent(inputtype,func,context,havebtn);
			});
		}

		//全选,此处效率甚低
		isall && D.get('SF_InnerLists') && TB.form.CheckboxGroup.attach(D.get('SF_InnerLists').getElementsByTagName('input'),{
			checkAllBox: 'J_CAll',
			checkOnInit: false,
			onCheck:function(el){
				var thisli = D.getAncestorByTagName(el,'li');
				if(parseInt(D.getStyle(thisli,'width')) == 0) return false;
				pushIn(el,func,context,inputtype,havebtn);
				allInputCheck();
		}});
	}


	//将选中input插入到框里
	var pushIn = function(target,func,context,inputtype,havebtn) {
		var _id = D.getAncestorByTagName(target,'li').getAttribute('data:fid');
		var _txt = D.getNextSibling(target).firstChild.nodeValue;
		if(inputtype == 'checkbox') {
			if(target.checked == true) {
				!D.get('SF_F' + _id) && createUser(_id,_txt,inputtype,func,context,havebtn);
			} else {
				D.get('SF_F' + _id) && D.get('SF_InnerName').removeChild(D.get('SF_F' + _id));
			}
		} else {
			target.checked == true && createUser(_id,_txt,inputtype,func,context,havebtn);
			if(!D.get('SF_ShareFSure')) {
				D.setStyle('SF_FriendsList','display','none');
				//startTimer();
				func.apply(context,[_id]);
			}
		}
	}

	//读innername的id
	var getUserIds = function() {
		var _l = D.get('SF_InnerName').getElementsByTagName('span');
		var _arr = [];
		TB.common.toArray(_l).forEach(function(el,i) {
			_arr[_arr.length] = el.id.split('SF_F')[1];
		});
		return _arr;
	}

	//查看所有好友时,有无好友的信息提示
	var showMsg = function(s) {
		if(s == 'show') {
			D.setStyle('SF_InnerLists','display','none')
			D.setStyle('SF_Msg','display','block');
		} else {
			D.setStyle('SF_InnerLists','display','block')
			D.setStyle('SF_Msg','display','none');
		}
		//判断是否存在全选
		if(D.get('J_CAll')) {
			if(s == 'show') {
				D.setStyle(D.get('J_CAll').parentNode,'visibility','hidden');
			} else {
				D.setStyle(D.get('J_CAll').parentNode,'visibility','visible');
				return;
			}
		}

	}

	//校验显示或者隐藏
	var showCheck = function(n) {
		if(n == 0) {
			showMsg('show');
			return;
		} else {
			showMsg('hide');
		}
	}

	//校验是否选中
	var inputCheck = function(el) {
		//全选时input校验
		var _fid = D.getAncestorByTagName(el,'li').getAttribute('data:fid');
		D.get('SF_F' + _fid) ? (el.checked = true) : (el.checked = false);
	}

	//判断是否全选
	var allInputCheck = function() {
		//判断
		TB.common.toArray(D.get('SF_InnerLists').getElementsByTagName('input')).some(function(el,i) {
			return el.checked == false && parseInt(D.getStyle(D.getAncestorByTagName(el,'li'),'width')) != 0;
		}) ? (D.get('J_CAll').checked = false) : (D.get('J_CAll').checked = true);
	}

	//分组函数
	var changeGroup = function(e) {
		var target = E.getTarget(e);
		if(target.tagName.toLowerCase() == 'li') {
			//避免脏数据问题,造成点击无效
			if(D.get('SF_InnerLists')) {
				var _flists = D.get('SF_InnerLists').getElementsByTagName('li');
				var _gid = target.getAttribute('data:gid');
				if(!_gid) {
					addCSS('',_flists);
					showCheck(_flists.length);
				} else {
					var _n = 0;
					TB.common.toArray(_flists).forEach(function(el,i) {
						if(!el.getAttribute('data:gid')) return;
						var _gid2 = el.getAttribute('data:gid');
						if(_gid2 != _gid) {
							addCSS('width:0;padding-right:0;margin-bottom:0;',el);
						} else {
							_n += 1;
							addCSS('',el);
							//el.getElementsByTagName('input')[0].checked = false;
						}
					});
					showCheck(_n);
				}

				//如果有全选的时候进行遍历
				if(D.get('J_CAll')) {
					D.getStyle(D.get('J_CAll').parentNode,'visibility') != 'hidden' && TB.common.toArray(D.get('SF_InnerLists').getElementsByTagName('input')).forEach(function(el,i) {
						inputCheck(el);
					});
					//首先判断是否是全选,因为之前的设定在这里会出错,所以重置一次
					if(D.getChildren('SF_InnerName').length == D.get('SF_InnerLists').getElementsByTagName('input').length && !_gid) {
						TB.common.toArray(D.get('SF_InnerLists').getElementsByTagName('input'))	.forEach(function(el,i) {
							el.checked = true;
						});
					} else {
						allInputCheck();
					}
				}
			}
			D.get('SF_ViewAllGroup').innerHTML = target.innerHTML;
		}
		D.setStyle('SF_GroupList','display','none');
	}

	//创建提示框
	var createNotice = function(txt) {
		if(!SNS.sys.Helper.checkAndShowLogin()) return;
		//if(D.get('SF_SearchInput').getAttribute('disabled') == 'disabled') return;
		D.setStyle('SF_SearchInput','display','inline');
		D.get('SF_SearchInput').focus();
		//隐藏结果
		D.get('SF_RList') && D.setStyle('SF_RList','display','none');
		var pos = D.getRegion('SF_Search');
		if(txt == PROMPTINSERT && !isFirst) return;
		var notice = D.get('SF_Notice');
		if(!notice) {
			notice = document.createElement('div');
			notice.className = 'notice-msg';
			notice.id = 'SF_Notice';
			document.body.appendChild(notice);
		}
		notice.innerHTML = txt;
		isFirst = false;
		addCSS('z-index:20;display:block;left:' + (pos.left + 1) + 'px;top:' + pos.bottom + 'px;',notice);
	}

	//keydown事件
	var keyDown = function(e) {
		//记录按键按下时是否已经有内容存在，以确定当按键为退格时是否移除一个user
		history = D.get('SF_SearchInput').value || '';
		var keycode = E.getCharCode(e);
		historykey = keycode;
		if(D.get('SF_RList') && D.getStyle('SF_RList','display') != 'none') {
			if(keycode == 40) {
				flow('next');
			} else if(keycode == 38) {
				flow('prev');
			}
		}
	}

	//keyup事件
	var keyUp = function(keycode,url,inputtype,func,context,havebtn) {
		var input = D.get('SF_SearchInput');
		//获取input内容的长度
		var valuelength = input.value.length;
		//设置input框的宽度
		D.setStyle(input,'width',((valuelength*12 + 10) < 120) ? (valuelength*12 + 10 + 'px') : '120px');

		//倘若输入内容中含空格，直接提示有误并返回
		if(/ |&|%|#/.test(input.value)) {
			//创建无好友搜索提示
			createNotice(PROMPTNOF);
			return false;
		}
		//对keycode进行判断
		switch(keycode) {
			//为回车键时，将选中的姓名放到SF_InnerName中
			case 13:
				if(D.get('SF_RList')) {
					var lis = D.get('SF_RList').getElementsByTagName('li');
					if(lis.length > 0 && input.value == history/*判定是否是中文输入时敲击回车键*/) {
						insertUser(inputtype,func,context,havebtn);
					}
				}
				break;
			//当为退格键时，判断是否启动提示信息
			case 8:
				if(input.value == '' && history == '' && D.getChildren('SF_InnerName').length > 0 && historykey != 229/*判断是否在中文输入状态*/) {
					var lastspan = D.getLastChild('SF_InnerName');
					var lastname = D.get('SF_InnerName').removeChild(lastspan);
					_checkInput(lastspan.id.split('SF_F')[1],false);
					//全选判定
					D.get('J_CAll') && allInputCheck();
					//当radio的时候执行
					!havebtn && inputtype == 'radio' && func.apply(context,getUserIds());
				}
				break;
		}

		//如果内容为空时
		if(input.value == '') {
			createNotice(PROMPTINSERT);
		}

		//判断value值，取值
                
		if(input.value.trim() && keycode != 38 && keycode != 40) {
			url=SNS.sys.Helper.buildURI(url,'nick=' + input.value);
			setTimeout(function() {
					Y.Get.script(url,{
						onSuccess:function() {
							if(typeof _friendJson == 'undefined' || !_friendJson) return;
							_friendJson.friendList.length > 0 ? showResult(_friendJson) : createNotice(PROMPTNOF);
						},
						charset:'GBK'
			});},50);
		}
	}

	//隐藏提示或者搜索结果

	var blurEvent = function(para,func,context,havebtn) {
		insertUser(para,func,context,havebtn);
		D.setStyle('SF_SearchInput','display','none');
		D.get('SF_Notice') && D.setStyle('SF_Notice','display','none');
		D.get('SF_RList') && D.setStyle('SF_RList','display','none');
		D.get('SF_SearchInput') && (D.get('SF_SearchInput').value = '');
	}

	//创建用户
	var createUser = function(_id,_txt,inputtype,func,context,havebtn) {
		var _span = document.createElement('span');
		_span.id = 'SF_F' + _id;
		_span.appendChild(document.createTextNode(_txt));
		//if(inputtype == 'checkbox') {
		var _link = document.createElement('a');
		_link.className = 'sns-icon icon-del-nob';
		_link.href = '#';
		_link.appendChild(document.createElement('关闭'));
		_span.appendChild(_link);
		E.on(_link,'click',function(e) {
			var target = E.getTarget(e);
			E.preventDefault(e);
			removeUser(target,func,context,inputtype,havebtn);
		});
		//}
		inputtype == 'radio' && (D.get('SF_InnerName').innerHTML = '');
		D.get('SF_InnerName').appendChild(_span);
	}

	//定时器

	//var startTimer = function() {
//		if(!_timer) {
//			_timer = YAHOO.lang.later(10,null,function() {
//				if(D.get('SF_InnerName').innerHTML.trim() != '') {
//					D.get('SF_SearchInput').setAttribute('disabled','disabled');
//				} else {
//					if(D.get('SF_SearchInput').getAttribute('disabled') == 'disabled') {
//						D.get('SF_SearchInput').removeAttribute('disabled')	;
//						_timer.cancel();
//					}
//				}
//			});
//		}
//	}

	//插入用户
	var insertUser = function(para,func,context,havebtn) {
		if(!D.get('SF_RList') || D.getStyle('SF_RList','display') == 'none') return;
		var rul = D.get('SF_RList').getElementsByTagName('ul')[0];
		var nowli = D.getChildrenBy(rul,function(el) {
			return el.className == 'hover';
		})[0];
		createUser(nowli.getAttribute('data:fid'),nowli.innerHTML,para,func,context,havebtn);
		if(para == 'radio') {
			//startTimer();
			D.get('SF_SearchInput').value = '';
			setTimeout(function(){
				!havebtn && func.apply(context,[nowli.getAttribute('data:fid')]);
			},50);//防止重复插入
		} else {
			D.get('SF_SearchInput').value = '';
			D.get('SF_SearchInput').focus();
			D.setStyle('SF_RList','display','none');
			createNotice(PROMPTINSERT);
//			if(isDonow) {
//				var _span = D.getChildren('SF_InnerName'),
//				_temp_id = [];
//				TB.common.toArray(_span).forEach(function(el,i) {
//					_temp_id.push(el.id.split('SF_F')[1]);
//				});
//				func(_temp_id);
//			}
		}
		_checkInput(nowli.getAttribute('data:fid'),true);
	}

	//移除用户
	var removeUser = function(target,func,context,inputtype,havebtn) {
		_checkInput(target.parentNode.id.split('SF_F')[1],false);
		D.get('SF_InnerName').removeChild(target.parentNode);
		!havebtn && inputtype == 'radio' && func.apply(context,[getUserIds()]);
	}

	//校验相应input是否应该选中
	var _checkInput = function(id,bool) {
		if(D.get('SF_InnerLists')) {
			var _li = D.get('SF_InnerLists').getElementsByTagName('li');
			TB.common.toArray(_li).forEach(function(el,i) {
				el.getAttribute('data:fid') == id && (el.getElementsByTagName('input')[0].checked = bool);
			});
		}
		//全选判定
		D.get('J_CAll') && allInputCheck();
	}

	//上下键在好友中滚动
	var flow = function(para) {
		var rul = D.get('SF_RList').getElementsByTagName('ul')[0];
		var lis = rul.getElementsByTagName('li');
		//首先获得选中的姓名
		var nowli = D.getChildrenBy(rul,function(el) {
			return el.className == 'hover';
		})[0];
		//获取第一个姓名
		var firstli = D.getFirstChild(rul);
		//获取最后一个姓名
		var lastli = D.getLastChild(rul);
		//获取前一个姓名
		var prevli = D.getPreviousSibling(nowli);
		//获取下一个姓名
		var nextli = D.getNextSibling(nowli);
		//移除当前的选中状态
		D.removeClass(nowli,'hover');
		//判断向上或者向下移动
		para == 'next' ? (nextli ? (nextli.className = 'hover') : (firstli.className = 'hover')) : (prevli ? (prevli.className = 'hover') : (lastli.className = 'hover'));
		//获取最大scrollTop
		var maxtop = rul.scrollHeight - 266;
		var tnum = Math.ceil(maxtop/lis.length);
		//判断滚动
		lis.length > 10 && (para == 'next' ? (nextli ? (rul.scrollTop += tnum) : (rul.scrollTop = 0)) : (prevli ? (rul.scrollTop -= tnum) : (rul.scrollTop = maxtop)));
	}

	//给提示结果添加hover事件
	var liHover = function(e) {
		var target = E.getTarget(e);
		var nowli = D.getChildrenBy(D.get('SF_RList').getElementsByTagName('ul')[0],function(el) {
			return el.className == 'hover';
		})[0];
		if(target.tagName.toLowerCase() == 'li' || D.getAncestorByTagName(target,'li')) {
			var targetli = (target.tagName.toLowerCase() == 'li') ? target : D.getAncestorByTagName(target,'li');
			D.removeClass(nowli,'hover');
			D.addClass(targetli,'hover');
		}
	}

	//显示搜索数据
	var showResult = function(data) {
		var _rlist = D.get('SF_RList');
		if(!_rlist) {
			_rlist = document.createElement('div');
			_rlist.className = 'sns-popup popup-translucent share-sub';
			_rlist.id = 'SF_RList';
			document.body.appendChild(_rlist);
		}
		var rul = '<ul>';
		var _el = _friendJson.friendList;
		//var len = _el.length <10 ? _el.length : 10;
		for(var i=0,_i=0; i<_el.length; i++) {
			//if(i == _el.length) break;
                        if(!_el[i].friendId)continue;
			if(D.get('SF_F' + _el[i].friendId)) {
				//len += 1;
				_i += 1;
				continue;
			}
			rul += '<li' + (i==_i ? ' class="hover"' : '') + ' data:fid="' + _el[i].friendId + '" title="' + (_el[i].friendRealName == '' ? _el[i].friendNick : (_el[i].friendRealName + '(' + _el[i].friendNick + ')')) +'">' + (_el[i].friendRealName == '' ? SNS.sys.Helper.cutStr(_el[i].friendNick,6) : (SNS.sys.Helper.cutStr(_el[i].friendRealName,6) + '(' + SNS.sys.Helper.cutStr(_el[i].friendNick,4) + ')')) + '</li>';
		}
		rul += '</ul>';
		if(rul == '<ul></ul>') {
			createNotice(PROMPTNOF);
			return;
		}
		_rlist.innerHTML = '<div class="hd naked"></div>' +
							'<div class="bd">' + rul +
							'</div>';
		D.setStyle('SF_Notice','display','none');
		addCSS('z-index:20;display:block;left:' + D.getStyle('SF_Notice','left') + ';top:' + D.getStyle('SF_Notice','top') + ';',_rlist);
		_rlist.getElementsByTagName('li').length > 10 && D.setStyle(_rlist.getElementsByTagName('ul')[0],'height','256px');
		//添加mouserover事件
		E.on(_rlist.getElementsByTagName('li'),'mouseover',liHover);
	}

	//校验是否重置
	var resetInputsList = function() {
		if(D.get('SF_InnerName').innerHTML.trim() == '' && D.get('SF_InnerLists')/*by shiran 10.05.04*/) {
			var _ninputs = D.get('SF_InnerLists').getElementsByTagName('input');
			if(_ninputs.length != 0) {
				TB.common.toArray(_ninputs).forEach(function(el,i) {
					el.checked = false;
				});
			}
		}
	}


	this.decorate = function(trigger,userconfig) {
		var _self = this;
		//判断container是否为数组
		if (YAHOO.lang.isArray(trigger) || (YAHOO.lang.isObject(trigger) && trigger.length)) {
			TB.common.toArray(trigger).forEach(function(el,i) {
				new _self.decorate(el,userconfig);
			});
			return false;
		}

		var config = TB.applyIf(userconfig||{}, deConfig);

		var targetbox = D.get(trigger);
		if(config.urlpara) {
			config.url += '?groupId=' + targetbox.getAttribute(config.urlpara);
		}

		_self.target = targetbox;
		_self.config = config;

		var url = config.url + (config.urlpara ? '&' : '?') + 'date=' + new Date().getTime();

		if(config.type == 'show') {
			//判断是否需要立即执行
//			isDonow = config.isDonow;
			insertSearch(targetbox,config.haveBtn);
			if(config.haveBtn) {
				E.on('J_SubmitShow','click',function(e) {
					E.stopEvent(e);
					config.func.apply(_self,[getUserIds()]);
					D.setStyle('SF_FriendsList','display','none');
				});
			}
		} else {
			var onShowPop = new Y.CustomEvent("onShow", config, false, Y.CustomEvent.FLAT),
				onHidePop = new Y.CustomEvent("onHide", config, false, Y.CustomEvent.FLAT),
				onBeforeShowPop = new Y.CustomEvent("onBeforeShow", config, false, Y.CustomEvent.FLAT),
				//绑定事件
				clickEvent = function() {
					if(!SNS.sys.Helper.checkAndShowLogin()) return;
					if(config.onBeforeShow) {
						if(!onBeforeShowPop.fire()) return;
					}
					var _pos = D.getRegion(targetbox),
						pos = [parseInt(_pos.left) + config.pos[0],parseInt(_pos.bottom) + config.pos[1]];
					if(!D.get('SF_FriendsList')) {
						Y.Get.script(url,{
							onSuccess:function() {
								if(typeof _friendJson == 'undefined' || !_friendJson) return;
								config.onHide ? createPop(pos,config.title,_friendJson,config.inputType,config.func,config.url,config.haveCheckAll,_self,true,onHidePop) : createPop(pos,config.title,_friendJson,config.inputType,config.func,config.url,config.haveCheckAll,_self,true);
								config.onShow && onShowPop.fire();
							},
							charset:'GBK'
						});
					} else {
						if(D.getStyle('SF_FriendsList','display') != 'none' && pos[1] == parseInt(D.getStyle('SF_FriendsList','top'))) {
							D.setStyle('SF_FriendsList','display','none');
							config.onHide && onHidePop.fire();
						} else {
							if(pos[1] != parseInt(D.getStyle('SF_FriendsList','top'))) {
								D.get('SF_InnerName').innerHTML = '';
								D.get('SF_GroupList') && (D.get('SF_ViewAllGroup').innerHTML = D.get('SF_GroupList').getElementsByTagName('li')[0].innerHTML);
							}
							addCSS('display:block;position:absolute;left:' + pos[0] + 'px;top:' + pos[1] + 'px;','SF_FriendsList');
							config.onShow && onShowPop.fire();
						}
						D.setStyle('SF_Notice','display','none');
					}	
				};
			config.onShow && onShowPop.subscribe(config.onShow);
			config.onHide && onHidePop.subscribe(config.onHide);
			if(config.runnow) {
				clickEvent();
			} else {
				E.on(targetbox,'click',function(e) {
					E.stopEvent(e);
					clickEvent();
				});
			}
		}

		var input = D.get('SF_SearchInput'),
		inner = D.get('SF_InnerName'),
		viewall = D.get('SF_ViewAll'),
		searchBox = D.get('SF_Search');

		//载入默认值
		if(config.defaultValue.length != 0) {
			config.defaultValue.forEach(function(el,i) {
				el.length !=0 && createUser(el[0],el[1],config.inputType,config.func,_self,config.haveBtn);
			});
		}

		//创建提示框
		E.on(searchBox,'click',function() {
			//隐藏所有好友
			D.get('SF_FriendsList') && D.setStyle('SF_FriendsList','display','none');
			//if(inner.innerHTML.trim() != '' && config.inputType == 'radio') return false;
			createNotice(PROMPTINSERT)
		});

		//查看所有好友
		E.on(viewall,'click',function() {
			if(D.get('SF_FriendsList') && D.getStyle('SF_FriendsList','display') != 'none') {
				D.setStyle('SF_FriendsList','display','none');
			} else {
				var _pos = D.getRegion(searchBox);
				pos = [_pos.right - 342,_pos.bottom];
				if(!D.get('SF_FriendsList')) {
					Y.Get.script(url,{
						onSuccess:function() {
							if(typeof _friendJson == 'undefined' || !_friendJson) return;
							createPop(pos,config.title,_friendJson,config.inputType,config.func,config.url,config.haveCheckAll,_self,config.haveBtn,'view');
						},
						charset:'GBK'
					});
				} else {
					D.get('SF_Notice') && D.setStyle('SF_Notice','display','none');
					resetInputsList();
					addCSS('display:block;position:absolute;left:' + pos[0] + 'px;top:' + pos[1] + 'px;','SF_FriendsList');
				}
			}
	    });

		//输入框事件
		E.on(input,'keyup',function(e) {
			var target = E.getTarget(e);
			//获取keycode
			var keycode = E.getCharCode(e);
			keyUp(keycode,config.url,config.inputType,config.func,_self,config.haveBtn);
		});
		E.on(input,'keydown',keyDown);
		E.on(input,'blur',function() {
			blurEvent(config.inputType,config.func,_self,config.haveBtn);
		});

		//不点击当前弹出层的时候将其关闭
		E.on(document,'click',function(e) {
			var target = E.getTarget(e);
			if(TB.bom.isIE && target.tagName.toLowerCase() == 'body') return;//修正ie问题
			if(D.get('SF_FriendsList') && target != D.get('SF_FriendsList') && D.getStyle('SF_FriendsList','display') != 'none' && target != D.get('SF_ViewAll') && target.className.indexOf('icon-del-nob') < 0 && !D.isAncestor('SF_FriendsList',target) && target != D.get('SF_RList') && !D.isAncestor('SF_RList',target)) {
				D.setStyle('SF_FriendsList','display','none');
				config.onHide && onHidePop.fire();
			}
		});

		E.on('SF_FriendsList','click',function(e) {
			var target = E.getTarget(e);
			target != D.get('SF_GroupList') && target != D.get('SF_ViewAllGroup') && !D.isAncestor('SF_ViewAllGroup',target) && !D.isAncestor('SF_GroupList',target) && D.setStyle('SF_GroupList','display','none');
		});

	}
};
