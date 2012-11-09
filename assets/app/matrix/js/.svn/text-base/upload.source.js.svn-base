/**
 * 上传页所需
 * xiong_song 2010-09
 * 等待移除多余的S，D，用了一个全局变量 uploadObj，是为了该页中的iframe来调用。
*/

var uploadObj = {};
KISSY.ready(function (S) {
    var D = S.DOM,
        E = S.Event;
    var picList = D.get('#pic-list'),
        selectAllObj = D.query('input.selectAll', picList),
        iframeUpload = D.get('#iframe-upload');
    //首先定义方法
    uploadObj = {
        removeFirstEndLi: function () {
            var S = KISSY,
                D = S.DOM,
                picList = D.get('#pic-list'),
                aUp, aDown, controlObj = D.query('p.control', picList);
            if (controlObj.length > 0) {
                var firstA = D.get('a.up', controlObj[0]),
                    lastA = D.get('a.down', controlObj[controlObj.length - 1]);
                S.each(controlObj, function (obj) {
                    aUp = D.get('a.up', obj);
                    aDown = D.get('a.down', obj);
                    if (aUp !== firstA) {
                        D.css(aUp, {
                            'opacity': '1',
                            'height': '42px'
                        });
                    }
                    if (aDown !== lastA) {
                        D.css(aDown, {
                            'opacity': '1',
                            'height': '42px'
                        });
                    }
                });
                S.Anim(firstA, {
                    'opacity': '0',
                    'height': '0'
                }, .3, 'easeOut').run();
                S.Anim(lastA, {
                    'opacity': '0',
                    'height': '0'
                }, .3, 'easeOut').run();
                //移除最后一个LI的下边框
                var controlObj2 = D.query('p.control', picList);
                D.addClass(D.parent(D.get(controlObj2[controlObj2.length - 1]), 1), 'last');
            }
            //统计剩余可上传的张数
            uploadObj.statisticsRemainingNum();
        },

        //统计还可以上传多少张
        statisticsRemainingNum: function () {
            var S = KISSY,
                D = S.DOM,
                picList = D.get('#pic-list'),
                pObj = D.query('p.pic-status'),
                liObj = D.query('li', '#picListItem'),
                iframeObj = D.get('#iframe-upload'),
                length = liObj.length;
            //如果没有图片，则隐藏图片列表容器
            if (length === 0) {
                D.addClass(picList, 'hidden');
            } else {
                D.removeClass(picList, 'hidden');
            }
            //如果已经满了30张，则隐藏iframe
            if (length == 30) {
                D.addClass(iframeObj, 'hidden');
            } else {
                D.removeClass(iframeObj, 'hidden');
            }
            //如果为显示状态，才执行动画，否则会报错
			if(!D.hasClass(picList,'hidden')){
				S.all('p.pic-status').animate({
	                'opacity': '0',
	                'height': '0'
	            }, .2, 'easeOut', function () {
	                if (length === 30) {
	                    D.html(pObj, '已达到上传数量 30 张的限制');
	                } else {
	                    D.html(pObj, '还可以上传：' + (30 - length) + ' 张图片');
	                }
	                //待修改，此处不应该为33px，应当是层本来的高度
	                S.all('p.pic-status').animate({
	                    'opacity': '1',
	                    'height': '33px'
	                }, .2);

	            });
            }
        },

        //当页面加载的时候，统计一次数字
        resetCharactor: function () {
            var S = KISSY,
                D = S.DOM,
                picList = D.get('#pic-list');
            S.each(D.query('p.des', picList), function (obj) {
                var textArea = D.get('textarea', obj),
                    charactor = D.get('b', obj),
                    sumtotal = D.get('em', obj);
                currentCharactor = textArea.value.length;
                //如果文字溢出，则截断
                if (currentCharactor > 150) {
                    textArea.value = textArea.value.substring(0, 150);
                }
                currentCharactor = textArea.value.length;
                charactor.innerHTML = currentCharactor;
                sumtotal.innerHTML = 150 - currentCharactor;
            });
        },

        //根据当前checked，来决定所有的子元素切换
        selectAllPicCheckbox: function (checked) {
            S.each(D.query('input.del', picList), function (obj) {
                obj.checked = checked;
            });
            uploadObj.keepChkStatus();
        },
        //checkbox集群能够反映到全选按钮上
        keepChkStatus: function () {
            //判断整个集群的状态
            var delObj = D.query('input.del', picList),
                status = true,
                length = delObj.length;
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    if (!delObj[i].checked) {
                        status = false;
                        break;
                    }
                }
            } else {
                status = false;
            }
            //开始控制全选按钮
            S.each(selectAllObj, function (obj) {
                obj.checked = status;
            });
        },
        //此方法负责转移textarea的数据到隐藏的checkbox中
        saveDesValue: function () {
            S.each(D.query('p.des', picList), function (obj) {
                var textArea = D.get('textarea', obj),
                    desHidden = D.get('input.des', obj);
                desHidden.value = textArea.value.substring(0, 150);
            });
        }
    }
    E.on(picList, 'click', function (ev) {
        var target = ev.target;
        //排序功能的实现
        //需要转移的属性包括
        //	checkbox的状态
        //	缩略图
        //	描述信息
        //	更新箭头
        //  而隐藏的checkbox没有实时转移信息，因为开发要求textarea和其它的一些信息，要求其name值必须一样。
        //  因此在onSubmit事件中，统一更新
        if (target.nodeName === 'A' && (D.hasClass(target, 'up') || D.hasClass(target, 'down'))) {
            var liObj = D.parent(target, 2),
                NeighborObj;
            //如果是向上
            if (D.hasClass(target, 'up')) {
                NeighborObj = D.prev(liObj);
            }
            if (D.hasClass(target, 'down')) {
                NeighborObj = D.next(liObj);
            }
            if (NeighborObj) {
                //存储上一个LI的内容
                var chk = D.get('input.del', NeighborObj),
                    //存储邻居的信息
                    addressHidden = D.get('input.address', NeighborObj),
                    des = D.get('textarea', NeighborObj),
                    img = D.get('img', NeighborObj),
					//记录敏感词（如果存在的话）
					sensitive=D.get('del.sensitive-words', NeighborObj),

                    //存储自己的信息，以便和邻居进行交换
                    curChk = D.get('input.del', liObj),
                    curAdressHidden = D.get('input.address', liObj),
                    curDes = D.get('textarea', liObj),
                    curImg = D.get('img', liObj),
					//记录敏感词（如果存在的话）
					curSensitive=D.get('del.sensitive-words', liObj),

                    //把邻居的信息拷贝出来
                    chkStatus = chk.checked,
                    desValue = des.value,
                    imgSrc = img.src,
                    addressHiddenValue = addressHidden.value,
					//此处不拷贝，因为可能邻居没有敏感词，在后面的if中进行拷贝
					sensitiveHTML,
					//存放DOM.create节点，可能会用到
					tempSensitiveNode;

                //开始交接
                chk.checked = curChk.checked;
                des.value = curDes.value;
                img.src = curImg.src;
                addressHidden.value = curAdressHidden.value;

                //设置当前LI的信息，完成交接
                curChk.checked = chkStatus;
                curDes.value = desValue;
                curImg.src = imgSrc;
                curAdressHidden.value = addressHiddenValue;

				//这里单独对敏感词进行转换
				//如果“我和邻居”都有敏感词
				if(sensitive && curSensitive){
					sensitiveHTML=D.html(sensitive);
					D.html(sensitive,D.html(curSensitive));
					D.html(curSensitive,sensitiveHTML);
				}
				//如果只有“邻居”有，则转移到自己
				else if(sensitive && !curSensitive){
					//首先把邻居的信息，来创建一个节点
					tempSensitiveNode=D.create('<del class=\"sensitive-words\">'+D.html(sensitive)+'</del>');
					//插入到文本框的前面
					D.insertBefore(tempSensitiveNode,curDes);
					//删除邻居
					D.remove(sensitive);
				}
				//如果只有自己有，那么转移到邻居上
				else if(!sensitive && curSensitive){
					tempSensitiveNode=D.create('<del class=\"sensitive-words\">'+D.html(curSensitive)+'</del>');
					D.insertBefore(tempSensitiveNode,des);
					D.remove(curSensitive);
				}
            }
            //交换完成时，统计一次字数
            uploadObj.resetCharactor();
            //恢复平静
            ev.halt(true);
        }
		//判断是否点击了敏感词区域
		 if ( target.nodeName === 'DEL' || D.parent(target).nodeName==='DEL' ) {
			if(target.nodeName!=='DEL') {
				target=D.parent(target);
			}
			S.one(target).fadeOut(.1,function(){
				D.remove(target);
			});
			//让textarea获取到焦点框
			D.next(target).focus();
		 }

    });

    //监听keyPress事件
    //采用事件处理方式
    E.on(picList, 'keydown change focusout', function (ev) {
        var obj = ev.target;
        if (obj.nodeName === "TEXTAREA") {
            window.setTimeout(function () {
                var p = D.next(obj),
                    charactor = D.get('b', p),
                    sumtotal = D.get('em', p);
                currentCharactor = obj.value.length;
                //判断文字是否溢出
                if (currentCharactor > 150) {
                    uploadObj.resetCharactor();
                } else {
                    charactor.innerHTML = currentCharactor;
                    sumtotal.innerHTML = 150 - currentCharactor;
                }
            }, 0);
        }
    });

	uploadObj.resetCharactor();
    //全选的实现
    E.on(selectAllObj, 'click', function () {
        uploadObj.selectAllPicCheckbox(this.checked);
    });
    //页面加载时执行一次，以便于确定checkbox（包括全选checkbox）的状态
    E.on(picList, 'click', function (ev) {
        var obj = ev.target;
        if (obj.nodeName === "INPUT" && D.hasClass(obj, 'del')) {
            uploadObj.keepChkStatus();
        }
    });
    uploadObj.keepChkStatus();
    //删除确认对话框
    //因为有可能新插入LI节点，因此用事件代理来处理，已避免添加事件的麻烦
    E.on(picList, 'click', function (ev) {
        //此处判断是删除集群还是删除单张
        var target = ev.target,
            parentObj = D.parent(target);
        if (parentObj.nodeName == 'P' && D.hasClass(parentObj, 'pic') && D.hasClass(target, 'del')) {
            var parentObj = D.parent(ev.target, 2);
            D.addClass(parentObj, 'del-confirm');
            if (confirm('确认删除此张图片？')) {
                //让箭头先渐隐
                S.one(D.get('p.control', parentObj)).slideUp(.2);
                //随后主体隐藏
                S.one(parentObj).slideUp(.25, function () {
                    D.remove(parentObj);
                    uploadObj.removeFirstEndLi();
                });
            } else {
                D.removeClass(parentObj, 'del-confirm');
                ev.halt(true);
            }
            //让自己选中
        }
        //判断是否按了多选
        else if (target.nodeName == 'A' && D.hasClass(target, 'del')) {
            //统计选中了多少张图片
            var tempArray = [];
            S.each(D.query('input.del', picList), function (obj) {
                if (obj.checked) {
                    tempArray.push(obj);
                }
            });
            if (tempArray.length < 1) {
                alert('您还没有选择图片！');
            } else {
                //添加提示背景色
                S.each(tempArray, function (obj) {
                    D.addClass(D.parent(obj, 2), 'del-confirm');
                });
                if (confirm('确认删除选中的 ' + tempArray.length + ' 张图片？')) {
                    S.each(tempArray, function (obj) {
                        //找到父TR
                        var parentObj = D.parent(obj, 2);
                        S.one(parentObj).slideUp(.25, function () {
                            D.remove(parentObj);
                            uploadObj.removeFirstEndLi();
                        });
                    });
                } else {
                    //如果点了取消，则移除背景色
                    S.each(tempArray, function (obj) {
                        D.removeClass(D.parent(obj, 2), 'del-confirm');
                    });
                    ev.halt(true);
                }
            }
        }
    });
    //当Form提交的时候，将数据转移到checkbox上面
    E.on(document.forms['tupianji'], 'submit', function (ev) {
        //转移全部数据
        uploadObj.saveDesValue();
        var valCode = D.get('#checkCodeInput'),
            submitInfo = D.get('#submit-info');
        //判断是否满7张图片
        if (D.query('li', picList).length < 7) {
            D.removeClass(submitInfo, 'hidden');
            D.html(D.get('p', submitInfo), '最少要 7 张图片才能够发表噢！');
            ev.halt(true);
            return false;
        } else {
            D.addClass(submitInfo, 'hidden');
        }
        //判断验证码是否输入
       	//叔同、无忌决定不要JS验证
		/*
	    if (valCode && valCode.value.replace(/\s/g, '').length < 4) {
            valCode.value = valCode.value.replace(/\s/g, '');
            D.html(D.get('p', submitInfo), '请按格式输入验证码！');
            D.removeClass(submitInfo, 'hidden');
            ev.halt(true);
            return false;	
        } else {
            D.addClass(submitInfo, 'hidden');
        }
		*/
    });
    //页面加载完毕后才显示Iframe的内容，防止内部调用不到外部的方法
    D.attr(iframeUpload, 'src', D.attr(iframeUpload, 'dealySrc'));
	//页面加载完毕后检查下是否有LI存在（例如编辑页面），如果有则处理右侧箭头
	uploadObj.removeFirstEndLi();
	
	

	//验证码要使用
	//等待2010 11月份后移除，因为已经存在与外部公用文件中
	if(D.get('#checkCodeInput')) {
		TB.widget.InputHint.decorate('checkCodeInput', {hintMessage:'点击输入验证码'});
	}
});
