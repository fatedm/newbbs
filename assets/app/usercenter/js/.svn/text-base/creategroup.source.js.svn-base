/*
 * 浮动层类- 2010-07-19 @author longxiao 调用方法： 第一个参数是点击调出层的按钮ID；
 * 第二个参数是目标弹出层【默认样式要设置display：none】 第三个参数是关闭弹出层的按钮ID，多个用数组形式表达；
 */
(function() {
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	Y.util.popup = function(btn, target, close) {
		var self=this;
		this.status = 'none';
		this.ffh = parseInt(D.getStyle(target, 'height')) / 2;
		this.w = parseInt(D.getStyle(target, 'width')) / 2;
		this.adjustPostion = function(t) {
			var target=D.get(t);
			if(target){
				D.addClass(target,'supernatant');
				
				var h = D.getDocumentScrollTop() + (D.getViewportHeight()/ 2 - parseInt(D.getStyle(target, 'height')) / 2);
				
				target.style.cssText = 'margin-left:-'+ parseInt(D.getStyle(target, 'width')) / 2 + 'px;top:' + h + 'px;';
			}
		};
		this.adjustBackground = function(h,t) {
			var myshade = D.get('mypopupshadeDiv');
			if (myshade) {
				var iframedoc=myshade.contentWindow.document;
				iframedoc.write('<body></body>');
						iframedoc.body.style.cssText = 'margin:0px;padding:0px;background:#000;';
						D.addClass(myshade,'bigshade');
						myshade.style.cssText = 'height:'+ h + 'px;top:'+ t + 'px;';
			}
		};
		this.createshade = function() {
			var bd = document.getElementsByTagName('body')[0];
			if (!D.get('mypopupshadeDiv')) {
				if (6 == YAHOO.env.ua.ie) {
					var shadeDiv = document.createElement('iframe');
					shadeDiv.allowtranseparency = true;
				}else{
					var shadeDiv = document.createElement('div');
					D.addClass(shadeDiv,'bigshade');
				};
				shadeDiv.id = "mypopupshadeDiv";
				bd.appendChild(shadeDiv);
			};
		};
		this.ie6fn=function(){
			self.adjustPostion(target);
			self.adjustBackground(D.getViewportHeight(),D.getDocumentScrollTop());
		};
		this.hide=function(){
			D.addClass(target,'hidden');
			var bd = document.getElementsByTagName('body')[0],
			shade = D.get('mypopupshadeDiv');
			if(shade){
			bd.removeChild(shade);
			}
			self.status = 'none';
		}
		return {
			// 安装事件
			'int' : function() {
			this.Event(btn);
			if (typeof close === 'string') {
				this.close(close);
			} else {
				for ( var i = 0; i < close.length; i++) {
					this.close(close[i]);
				}
			};
			if (6 == YAHOO.env.ua.ie) {
				E.onDOMReady(function() {
					E.on(window, 'resize',self.ie6fn);
					E.on(window, 'scroll',self.ie6fn);
				});
			}
			return {
				'hide':self.hide
			};
		},
		'Event' : function(btn) {
			var ele = D.get(btn), that = this;
			E.on(ele, 'click', that.trigger);
		},
		'trigger' : function() {
			D.removeClass(target,'hidden');
			self.createshade();
			if (6 == YAHOO.env.ua.ie) {
				self.status = 'block';
				self.ie6fn();
			} else {
				D.addClass(target,'supernatant');
				D.get(target).style.cssText = 'margin-left:-'+ self.w + 'px;margin-top:-' + self.ffh + 'px';
			}
		},
		'close' : function(btn) {
			var ele = D.get(btn);
			E.on(ele,'click',self.hide);
		},
		'fire' : function() {
			this['int']();
			self.createshade();
			this['trigger']();
		}
		}
	};
})();
/*
 * 个人中心创建帮派
 * @longxiao
 * */
(function() {
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;

	if (D.get('catalogRadio')) {
		var radioname = D.get('catalogRadio').value;
	}
	if (D.get('public')) {
		var Fstatus = D.get('public').name;
	}
	var radiolist1 = [ radioname ];
	var radiolist2 = document.getElementsByName(Fstatus);
	if (D.getElementsByClassName('faction-category')[0]) {
		var radiolist3 = D.getElementsByClassName('faction-category')[0]
				.getElementsByTagName('input');
	}
	var result = {
		'name' : false,
		'tag' : false,
		'intro' : false,
		'leimu' : false,
		'rule' : false,
		'status' : false
	};
	var inputlist = {
		'name' : function() {
			result['name'] = false;
			if (checkunmber('faction-name', 1, 31)) {
				result['name'] = true;
				return true;
			}
			return false;
		},
		'tag' : function() {
			result['tag'] = false;
			if (checkunmber('faction-tag', 0, 31)) {
				result['tag'] = true;
				return true;
			}
			return false;
		},
		'intro' : function() {
			result['intro'] = false;
			if (checkunmber('faction-intro', 0, 201)) {
				result['intro'] = true;
				return true;
			}
			return false;
		}
	};
	var checkunmber = function(name, mins, maxs) {
		var v = YAHOO.lang.trim(D.get(name).value).length;
		if (v >= mins && v < maxs)
			return true;
		return false;
	}
	var bprule = 'faction-treaty';
	//检查类目
	var checklist1 = function() {
		var i, j;
		out: for (i = 0; i < radiolist1.length; i++) {
			var nowlist = document.getElementsByName(radiolist1[i]), nl = nowlist.length;
			for (j = 0; j < nl; j++) {
				if (nowlist[j].checked) {
					return (result['leimu'] = true);
				}
			}
		}
		return (result['leimu'] = false);
	}
	checklist1();
	//检查帮派状态
	var checklist2 = function() {
		var i;
		for (i = 0; i < radiolist2.length; i++) {
			if (radiolist2[i].checked) {
				return (result['status'] = true);
			}
		}
		return (result['status'] = false);
	}
	//检查是否阅读条款
	var checkbprule = function() {
		return (D.get(bprule).checked == "") ? result['rule'] = false
				: result['rule'] = true;
	};
	//检查是否全部符合条件进行按钮释放
	var checkresult = function() {
		var creatbtn = D.get('creat-bp');
		for ( var i in result) {
			if (!result[i])
				return function() {
					creatbtn.className = "ph size-l";
					creatbtn.disabled = true;
				}();
		}
		creatbtn.className = "ph h size-l";
		creatbtn.disabled = false;
	};
	var checkready = function() {
		for ( var i in inputlist) {
			inputlist[i]();
		}
		checklist1();
		checklist2();
		checkbprule();
		checkresult();
	}
	var clearatten=function(node){
		D.batch(D.getElementsByClassName('attention','span'),function(ev){
			ev.style.display="none";
		});
		D.batch(D.getElementsByClassName('fasten','div',node),function(ev){
			ev.style.display="none";
		});
	}
	
	var logmsg = function(node, msg, cls) {
		node.style.display = "block";
		node.innerHTML = msg;
		node.className = cls;
	}
	
	var removemsg = function(node) {
		node.style.display = "none";
	}
	
	E.on('faction-name', 'focus', function() {
		var putout = D.getNextSibling(this);
		removemsg(putout);
		clearatten(this.parentNode);
		logmsg(putout, "请输入帮派标题，长度不要超过30个字符", "attention");
	});
	E.on('faction-tag', 'focus', function() {
		var putout = D.getNextSibling(this);
		removemsg(putout);
		clearatten(this.parentNode);
		logmsg(putout, "标签中间用空格隔开，总长度不超过30个字符", "attention");
	});
	E.on('faction-intro', 'focus', function() {
		var putout = D.getNextSibling(this);
		removemsg(putout);
		clearatten(this.parentNode);
		logmsg(putout, "请输入帮派的一些介绍说明文字，不要超过200个字符", "attention");
	});
	
	E.on('faction-name', 'keyup', function() {
		var putout = D.getNextSibling(this);
		removemsg(putout);
		if (!inputlist['name']())
			logmsg(putout, "帮派名称不能为0或者超过30个字符", "error");
		checkready();
	});
	E.on('faction-tag', 'keyup', function() {
		var putout = D.getNextSibling(this);
		removemsg(putout);
		if (!inputlist['tag']())
			logmsg(putout, "帮派标签不能为0或者超过30个字符", "error");
		checkready();
	});
	E.on('faction-intro', 'keyup', function() {
		var putout = D.getNextSibling(this);
		removemsg(putout);
		if (!inputlist['intro']())
			logmsg(putout, "帮派介绍不能为0或者超过200个字符", "error");
		checkready();
	});
	E.on(radiolist3, 'click', function() {
		var putout = D.get('msgcategory');
		checklist1();
		if (result['leimu'])
			removemsg(putout);
		checkready();
	})
	E.on(bprule, 'click', function() {
		var putout = D.get('msgcategory');
		if (!result['leimu']){
			logmsg(putout, "帮派类目至少要选择一个", "error");
		}
		checkready();
	});
	E.on(radiolist2, 'click', function() {
		checkready();
	});
	E.on('privacy', 'click', function() {
		D.get('status-2').style.display = "block";
	});
	E.on( [ 'public', 'semi' ], 'click', function() {
		D.get('status-2').style.display = "none";
		D.get('status-2').getElementsByTagName('input')[0].checked = false;
	});
	var bpbox1 = new Y.util.popup("creat-bp", "popup-msg", 'popup-msg-close');
	bpbox1['int']();
	var Extract = function() {
		var filling = function(str, ele) {
			D.get(ele).innerHTML = str;
		};
		var insertDom = [ 'J_ExtractTitle', 'J_ExtractCategory',
				'J_ExtractClassify', 'J_ExtractStatus', 'J_ExtractState',
				'J_ExtractTags' ];
		//获取值的方法
		var capture = {
			title : D.get('faction-name').value,
			_getcate : function() {
				var radios = D.getElementsByClassName('faction-category')[0]
						.getElementsByTagName('input');
				for ( var i = 0; i < radios.length; i++) {
					if (radios[i].checked) {
						var checkedradio = radios[i];
						var str1 = D.getNextSibling(checkedradio).innerHTML;
						var dl = D.getAncestorByTagName(checkedradio, 'dl');
						var str2 = D.getFirstChild(dl).innerHTML;
						return {
							classif : str1,
							category : str2
						};
					}
				}
			}(),
			_getstatus : function() {
				var radios = [ 'privacy', 'public', 'semi' ];
				for ( var i = 0; i < radios.length; i++) {
					if (D.get(radios[i]).checked) {
						var status = D.getNextSibling(radios[i]);
						var state = D.getNextSibling(status);
						return {
							status : status.innerHTML,
							state : ' (' + state.innerHTML + ')'
						};
					}
				}
				;
			}(),
			tags : function() {
				var v = D.get('faction-tag').value;
				var tags = v.split(/\s|,/);
				return tags.join(',');
			}()
		};
		var str = [ capture.title, capture['_getcate']['category'],
				capture['_getcate']['classif'],
				capture['_getstatus']['status'],
				capture['_getstatus']['state'], capture.tags ];
		for ( var i = 0; i < insertDom.length; i++) {
			filling(str[i], insertDom[i]);
		};
	}
	E.on('creat-bp', 'click', Extract);
})();