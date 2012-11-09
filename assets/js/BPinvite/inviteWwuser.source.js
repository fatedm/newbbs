(function() {
    var Y = YAHOO,
    D = Y.util.Dom,
    E = Y.util.Event,
    DOC = document;

    TB.namespace('InviteLoadWw');
    /* inviteLoaduser 邀请Ww好友模块异步加载数据
      *
      * Parameter
      *
      * @author longxiao
      * @date 2010 12 21
      *
      */

    TB.InviteLoadWw = function() {
        var INTWW = "J_INITWW",
        ZNUM = "J_ZNUM",
        ANUM = "J_ANUM",
        InviteWw = "J_InviteWw",
        InviteWwUl = "J_InviteWwUl",
        InviteWwHTML = "J_InviteWwHTML";
        var _f = {
            tips: function(msg) {
                var STRHTML = '<div class="msg">' + '<p class="notice invite-error">' + msg + '</p>' + '</div>';
                D.get(InviteWw).innerHTML = STRHTML;
            },
            structureWW: function(data, num) {
                var STR = D.get(InviteWwHTML).value;
                D.get(InviteWw).innerHTML = STR;
                D.get(ZNUM).innerHTML = data.length;
                D.get(ANUM).innerHTML = num;
                if(D.get(InviteWwUl)){ //如果不存在状态容器则不进行下面的构造
	                var dataary = [];
	                for (var i = 0; i < data.length; i++) {
	                    var li = '<li><input type="checkbox" value="' + data[i]['ID'] + '" name="friendid" style="float:left;margin-top:3px;"><span class="J_WangWang" data-icon="small" data-nick="' + data[i]['nick'] + '" style="float:left;margin:-4px 5px 0px 5px;"></span><label style="line-height:17px;">' + data[i]['nick'] + '</label></li>';
	                    dataary.push(li);
	                }
	                var ULHTML = dataary.join("");
	                D.get(InviteWwUl).innerHTML = ULHTML;
	
	                //配置滚动条
	                var sliderone = TB.MouseWheel({
	                    sBGElId: 'slider-1',
	                    sHandleElId: 'slider-thumb1',
	                    iDown: 265,
	                    Maxheight: 340,
	                    callback: function(h) {
	                        if (h < 340) {
	                            D.getAncestorByTagName('slider-1', 'div').style.height = h + 'px';
	                            D.getAncestorByTagName('slider-1', 'div').style.backgroundImage = "none";
	                            D.get('slider-thumb1').parentNode.removeChild(D.get('slider-thumb1'));
	                        }
	                    }
	                });
	
	                var lis1 = D.get('slider-1').getElementsByTagName('label'),
	                //旺旺部分模仿label
	                checkboxs1 = D.get('slider-1').getElementsByTagName('input');
	
	                TB.Customlabel(checkboxs1, lis1);
	
	                //加载邀请机制
	                TB.InviteWw();
	
	                TB.checknum(checkboxs1, num);
	                
	                E.on(lis1, 'click',function() {
	                    TB.checknum(checkboxs1,num);
	                });
	
	                E.on(checkboxs1, 'click',function() {
	                    TB.checknum(checkboxs1,num);
	                });
	                
	                //加载旺旺水晶头
	                TB.ww.lightAll(D.get(InviteWwUl));
                }
            }
        };

        var _callback = {
            success: function(o) {
                var Data = YAHOO.lang.JSON.parse(o.responseText);

                var _resulthandle = {
                    'success': function() {
                        if (Data.data.length == 0) {
                            _f.tips('您暂时没有旺旺好友，无法邀请好友加入帮派');
                        } else {
                            _f.structureWW(Data['data'], Data['allownum']);
                        }
                    },
                    'error': function() {
                        _f.tips(Data['msg']);
                    }
                }

                _resulthandle[Data['status']]();
            },
            failure: function() {
                _f.tips("很抱歉，目前暂时无法取得旺旺好友信息，请稍后再试!<a href='javascript:;' onclick='window.location.reload();'>重试</a>");
            },
            timeout: 60000 //超时时间为1分钟
        }
        if (D.get(INTWW) && D.get(InviteWwHTML)) {
            Y.util.Connect.setForm(INTWW);
            Y.util.Connect.asyncRequest('POST', '/json/getWangWangFriendsList.htm', _callback);
        }

    };

    TB.namespace('InviteWw');
    /* inviteWwuser 邀请Ww好友模块
      *
      * Parameter
      *
      * @author longxiao
      * @date 2010 12 21
      *
      */
    TB.InviteWw = function() {
        var InviteWwForm = D.get('J_InviteWwForm'),
        AjaxUrl = "/json/inviteWangWangResult.htm",
        Ajaxtype = InviteWwForm.method,
        MSGPARENT = D.getElementsByClassName('J_Target', 'div', 'J_InviteWwWarp')[0],
        RETURNMSG = "WWUSERVINET",
        BTN = "J_InviteWwSub",
        PROGRESSBAR = "WWPROGRESSBAR",
        AJAXFLG = true;

        var _f = {
            tips: function(status, str) {
                var _createmsg = function() {
                    var msg = DOC.createElement('div');
                    msg.id = RETURNMSG;
                    msg.className = 'msg';
                    msg.innerHTML = "<p class='" + status + "'>" + str + "</p>";
                    D.get(MSGPARENT).appendChild(msg);
                }
                if (D.get(RETURNMSG)) {
                    D.get(RETURNMSG).parentNode.removeChild(D.get(RETURNMSG));
                    _createmsg();
                } else {
                    _createmsg();
                }
            },
            //创建进度条
            createprogressbar: function(str) {
                if (!D.get(PROGRESSBAR)) {
                    var progress = DOC.createElement('div');
                    progress.id = PROGRESSBAR;
                    progress.innerHTML = "<img src='http://img01.taobaocdn.com/tps/i1/T1G_BTXn4DXXXXXXXX-16-16.gif' /> " + str + "，请耐心等待...";
                    D.insertAfter(progress, BTN);
                }
            },
            //删除进度条
            clearprogressbar: function() {
                var BAR = D.get(PROGRESSBAR);
                if (BAR) BAR.parentNode.removeChild(BAR);
            },
            //修改当前允许人数
            revampallownum: function(num) {
                var lis1 = D.get('slider-1').getElementsByTagName('label'),
                //旺旺部分模仿label
                checkboxs1 = D.get('slider-1').getElementsByTagName('input');

                D.get('J_ANUM').innerHTML = num; //修改显示数
                //清空所有选择
                D.batch(checkboxs1,function(ev) {
                    ev.checked = "";
                    ev.disabled = "";
                });
                //移除之前的绑定事件
                E.removeListener(lis1);
                E.removeListener(checkboxs1);
                //重新初始化检查
                TB.Customlabel(checkboxs1, lis1);
                TB.checknum(checkboxs1, num);

                //重新绑定选择事件与参数
                E.on(lis1, 'click',function() {
                    TB.checknum(checkboxs1, num);
                });
                E.on(checkboxs1, 'click',function() {
                    TB.checknum(checkboxs1, num);
                });
            }
        };

        //回调处理
        var _callback = {
            success: function(o) {
                var Data = YAHOO.lang.JSON.parse(o.responseText);
                //清楚进度条
                _f.clearprogressbar();

                var _resulthandle = {
                    'success': function() {
                        _f.tips('ok', Data.msg);
                        _f.revampallownum(Data.allownum);
                    },
                    'error': function() {
                        _f.tips('error', Data.msg);
                        _f.revampallownum(Data.allownum);
                    }
                }

                _resulthandle[Data.status]();

                //开启下次请求
                AJAXFLG = true;
            },
            failure: function() {
                _f.tips('error', '服务器请求相应超时！');
                AJAXFLG = true;
            },
            timeout: 60000 //超时时间为1分钟
        };

        //异步请求
        E.on(InviteWwForm, 'submit',function(ev) {
            E.stopEvent(ev);
            AJAXFLG = false; //锁死
            _f.createprogressbar('正在邀请您的旺旺好友');
            D.get('allowNumber').value= D.get('J_ANUM').innerHTML; //添加允许成员数到表单域
            Y.util.Connect.setForm(InviteWwForm);
            Y.util.Connect.asyncRequest(Ajaxtype, AjaxUrl, _callback);
        });

    };
})();