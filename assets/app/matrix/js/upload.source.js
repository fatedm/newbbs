/**
 * �ϴ�ҳ����
 * xiong_song 2010-09
 * �ȴ��Ƴ������S��D������һ��ȫ�ֱ��� uploadObj����Ϊ�˸�ҳ�е�iframe�����á�
*/

var uploadObj = {};
KISSY.ready(function (S) {
    var D = S.DOM,
        E = S.Event;
    var picList = D.get('#pic-list'),
        selectAllObj = D.query('input.selectAll', picList),
        iframeUpload = D.get('#iframe-upload');
    //���ȶ��巽��
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
                //�Ƴ����һ��LI���±߿�
                var controlObj2 = D.query('p.control', picList);
                D.addClass(D.parent(D.get(controlObj2[controlObj2.length - 1]), 1), 'last');
            }
            //ͳ��ʣ����ϴ�������
            uploadObj.statisticsRemainingNum();
        },

        //ͳ�ƻ������ϴ�������
        statisticsRemainingNum: function () {
            var S = KISSY,
                D = S.DOM,
                picList = D.get('#pic-list'),
                pObj = D.query('p.pic-status'),
                liObj = D.query('li', '#picListItem'),
                iframeObj = D.get('#iframe-upload'),
                length = liObj.length;
            //���û��ͼƬ��������ͼƬ�б�����
            if (length === 0) {
                D.addClass(picList, 'hidden');
            } else {
                D.removeClass(picList, 'hidden');
            }
            //����Ѿ�����30�ţ�������iframe
            if (length == 30) {
                D.addClass(iframeObj, 'hidden');
            } else {
                D.removeClass(iframeObj, 'hidden');
            }
            //���Ϊ��ʾ״̬����ִ�ж���������ᱨ��
			if(!D.hasClass(picList,'hidden')){
				S.all('p.pic-status').animate({
	                'opacity': '0',
	                'height': '0'
	            }, .2, 'easeOut', function () {
	                if (length === 30) {
	                    D.html(pObj, '�Ѵﵽ�ϴ����� 30 �ŵ�����');
	                } else {
	                    D.html(pObj, '�������ϴ���' + (30 - length) + ' ��ͼƬ');
	                }
	                //���޸ģ��˴���Ӧ��Ϊ33px��Ӧ���ǲ㱾���ĸ߶�
	                S.all('p.pic-status').animate({
	                    'opacity': '1',
	                    'height': '33px'
	                }, .2);

	            });
            }
        },

        //��ҳ����ص�ʱ��ͳ��һ������
        resetCharactor: function () {
            var S = KISSY,
                D = S.DOM,
                picList = D.get('#pic-list');
            S.each(D.query('p.des', picList), function (obj) {
                var textArea = D.get('textarea', obj),
                    charactor = D.get('b', obj),
                    sumtotal = D.get('em', obj);
                currentCharactor = textArea.value.length;
                //��������������ض�
                if (currentCharactor > 150) {
                    textArea.value = textArea.value.substring(0, 150);
                }
                currentCharactor = textArea.value.length;
                charactor.innerHTML = currentCharactor;
                sumtotal.innerHTML = 150 - currentCharactor;
            });
        },

        //���ݵ�ǰchecked�����������е���Ԫ���л�
        selectAllPicCheckbox: function (checked) {
            S.each(D.query('input.del', picList), function (obj) {
                obj.checked = checked;
            });
            uploadObj.keepChkStatus();
        },
        //checkbox��Ⱥ�ܹ���ӳ��ȫѡ��ť��
        keepChkStatus: function () {
            //�ж�������Ⱥ��״̬
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
            //��ʼ����ȫѡ��ť
            S.each(selectAllObj, function (obj) {
                obj.checked = status;
            });
        },
        //�˷�������ת��textarea�����ݵ����ص�checkbox��
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
        //�����ܵ�ʵ��
        //��Ҫת�Ƶ����԰���
        //	checkbox��״̬
        //	����ͼ
        //	������Ϣ
        //	���¼�ͷ
        //  �����ص�checkboxû��ʵʱת����Ϣ����Ϊ����Ҫ��textarea��������һЩ��Ϣ��Ҫ����nameֵ����һ����
        //  �����onSubmit�¼��У�ͳһ����
        if (target.nodeName === 'A' && (D.hasClass(target, 'up') || D.hasClass(target, 'down'))) {
            var liObj = D.parent(target, 2),
                NeighborObj;
            //���������
            if (D.hasClass(target, 'up')) {
                NeighborObj = D.prev(liObj);
            }
            if (D.hasClass(target, 'down')) {
                NeighborObj = D.next(liObj);
            }
            if (NeighborObj) {
                //�洢��һ��LI������
                var chk = D.get('input.del', NeighborObj),
                    //�洢�ھӵ���Ϣ
                    addressHidden = D.get('input.address', NeighborObj),
                    des = D.get('textarea', NeighborObj),
                    img = D.get('img', NeighborObj),
					//��¼���дʣ�������ڵĻ���
					sensitive=D.get('del.sensitive-words', NeighborObj),

                    //�洢�Լ�����Ϣ���Ա���ھӽ��н���
                    curChk = D.get('input.del', liObj),
                    curAdressHidden = D.get('input.address', liObj),
                    curDes = D.get('textarea', liObj),
                    curImg = D.get('img', liObj),
					//��¼���дʣ�������ڵĻ���
					curSensitive=D.get('del.sensitive-words', liObj),

                    //���ھӵ���Ϣ��������
                    chkStatus = chk.checked,
                    desValue = des.value,
                    imgSrc = img.src,
                    addressHiddenValue = addressHidden.value,
					//�˴�����������Ϊ�����ھ�û�����дʣ��ں����if�н��п���
					sensitiveHTML,
					//���DOM.create�ڵ㣬���ܻ��õ�
					tempSensitiveNode;

                //��ʼ����
                chk.checked = curChk.checked;
                des.value = curDes.value;
                img.src = curImg.src;
                addressHidden.value = curAdressHidden.value;

                //���õ�ǰLI����Ϣ����ɽ���
                curChk.checked = chkStatus;
                curDes.value = desValue;
                curImg.src = imgSrc;
                curAdressHidden.value = addressHiddenValue;

				//���ﵥ�������дʽ���ת��
				//������Һ��ھӡ��������д�
				if(sensitive && curSensitive){
					sensitiveHTML=D.html(sensitive);
					D.html(sensitive,D.html(curSensitive));
					D.html(curSensitive,sensitiveHTML);
				}
				//���ֻ�С��ھӡ��У���ת�Ƶ��Լ�
				else if(sensitive && !curSensitive){
					//���Ȱ��ھӵ���Ϣ��������һ���ڵ�
					tempSensitiveNode=D.create('<del class=\"sensitive-words\">'+D.html(sensitive)+'</del>');
					//���뵽�ı����ǰ��
					D.insertBefore(tempSensitiveNode,curDes);
					//ɾ���ھ�
					D.remove(sensitive);
				}
				//���ֻ���Լ��У���ôת�Ƶ��ھ���
				else if(!sensitive && curSensitive){
					tempSensitiveNode=D.create('<del class=\"sensitive-words\">'+D.html(curSensitive)+'</del>');
					D.insertBefore(tempSensitiveNode,des);
					D.remove(curSensitive);
				}
            }
            //�������ʱ��ͳ��һ������
            uploadObj.resetCharactor();
            //�ָ�ƽ��
            ev.halt(true);
        }
		//�ж��Ƿ��������д�����
		 if ( target.nodeName === 'DEL' || D.parent(target).nodeName==='DEL' ) {
			if(target.nodeName!=='DEL') {
				target=D.parent(target);
			}
			S.one(target).fadeOut(.1,function(){
				D.remove(target);
			});
			//��textarea��ȡ�������
			D.next(target).focus();
		 }

    });

    //����keyPress�¼�
    //�����¼�����ʽ
    E.on(picList, 'keydown change focusout', function (ev) {
        var obj = ev.target;
        if (obj.nodeName === "TEXTAREA") {
            window.setTimeout(function () {
                var p = D.next(obj),
                    charactor = D.get('b', p),
                    sumtotal = D.get('em', p);
                currentCharactor = obj.value.length;
                //�ж������Ƿ����
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
    //ȫѡ��ʵ��
    E.on(selectAllObj, 'click', function () {
        uploadObj.selectAllPicCheckbox(this.checked);
    });
    //ҳ�����ʱִ��һ�Σ��Ա���ȷ��checkbox������ȫѡcheckbox����״̬
    E.on(picList, 'click', function (ev) {
        var obj = ev.target;
        if (obj.nodeName === "INPUT" && D.hasClass(obj, 'del')) {
            uploadObj.keepChkStatus();
        }
    });
    uploadObj.keepChkStatus();
    //ɾ��ȷ�϶Ի���
    //��Ϊ�п����²���LI�ڵ㣬������¼������������ѱ�������¼����鷳
    E.on(picList, 'click', function (ev) {
        //�˴��ж���ɾ����Ⱥ����ɾ������
        var target = ev.target,
            parentObj = D.parent(target);
        if (parentObj.nodeName == 'P' && D.hasClass(parentObj, 'pic') && D.hasClass(target, 'del')) {
            var parentObj = D.parent(ev.target, 2);
            D.addClass(parentObj, 'del-confirm');
            if (confirm('ȷ��ɾ������ͼƬ��')) {
                //�ü�ͷ�Ƚ���
                S.one(D.get('p.control', parentObj)).slideUp(.2);
                //�����������
                S.one(parentObj).slideUp(.25, function () {
                    D.remove(parentObj);
                    uploadObj.removeFirstEndLi();
                });
            } else {
                D.removeClass(parentObj, 'del-confirm');
                ev.halt(true);
            }
            //���Լ�ѡ��
        }
        //�ж��Ƿ��˶�ѡ
        else if (target.nodeName == 'A' && D.hasClass(target, 'del')) {
            //ͳ��ѡ���˶�����ͼƬ
            var tempArray = [];
            S.each(D.query('input.del', picList), function (obj) {
                if (obj.checked) {
                    tempArray.push(obj);
                }
            });
            if (tempArray.length < 1) {
                alert('����û��ѡ��ͼƬ��');
            } else {
                //�����ʾ����ɫ
                S.each(tempArray, function (obj) {
                    D.addClass(D.parent(obj, 2), 'del-confirm');
                });
                if (confirm('ȷ��ɾ��ѡ�е� ' + tempArray.length + ' ��ͼƬ��')) {
                    S.each(tempArray, function (obj) {
                        //�ҵ���TR
                        var parentObj = D.parent(obj, 2);
                        S.one(parentObj).slideUp(.25, function () {
                            D.remove(parentObj);
                            uploadObj.removeFirstEndLi();
                        });
                    });
                } else {
                    //�������ȡ�������Ƴ�����ɫ
                    S.each(tempArray, function (obj) {
                        D.removeClass(D.parent(obj, 2), 'del-confirm');
                    });
                    ev.halt(true);
                }
            }
        }
    });
    //��Form�ύ��ʱ�򣬽�����ת�Ƶ�checkbox����
    E.on(document.forms['tupianji'], 'submit', function (ev) {
        //ת��ȫ������
        uploadObj.saveDesValue();
        var valCode = D.get('#checkCodeInput'),
            submitInfo = D.get('#submit-info');
        //�ж��Ƿ���7��ͼƬ
        if (D.query('li', picList).length < 7) {
            D.removeClass(submitInfo, 'hidden');
            D.html(D.get('p', submitInfo), '����Ҫ 7 ��ͼƬ���ܹ������ޣ�');
            ev.halt(true);
            return false;
        } else {
            D.addClass(submitInfo, 'hidden');
        }
        //�ж���֤���Ƿ�����
       	//��ͬ���޼ɾ�����ҪJS��֤
		/*
	    if (valCode && valCode.value.replace(/\s/g, '').length < 4) {
            valCode.value = valCode.value.replace(/\s/g, '');
            D.html(D.get('p', submitInfo), '�밴��ʽ������֤�룡');
            D.removeClass(submitInfo, 'hidden');
            ev.halt(true);
            return false;	
        } else {
            D.addClass(submitInfo, 'hidden');
        }
		*/
    });
    //ҳ�������Ϻ����ʾIframe�����ݣ���ֹ�ڲ����ò����ⲿ�ķ���
    D.attr(iframeUpload, 'src', D.attr(iframeUpload, 'dealySrc'));
	//ҳ�������Ϻ������Ƿ���LI���ڣ�����༭ҳ�棩������������Ҳ��ͷ
	uploadObj.removeFirstEndLi();
	
	

	//��֤��Ҫʹ��
	//�ȴ�2010 11�·ݺ��Ƴ�����Ϊ�Ѿ��������ⲿ�����ļ���
	if(D.get('#checkCodeInput')) {
		TB.widget.InputHint.decorate('checkCodeInput', {hintMessage:'���������֤��'});
	}
});
