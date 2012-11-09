/* bangpai2011.JS Document
 * ����
 * ���ڰ�����������Ż���Ŀ
 * ��������2011.2.23
 * ������longjun.zfc@taobao.com
 */ 
(function () {
    var Y = YAHOO,
        U = Y.util,
        D = U.Dom,
        E = U.Event,
        G = U.Get,
        Connect = U.Connect,
        doc = document,
        //������������
        allstatus = D.get('J_allstatus'),
        allstatuslist = D.get('J_allstatuslist'),
        alltype = D.get('J_alltype'),
        alltypelist = D.get('J_alltypelist'),
        allarea = D.get('J_AllArea'),
        allarealist = D.get('J_AllAreaList'),
		gamepagetabs = D.get('J_GamePageTabs'),
        regaindefault = D.get('J_regaindefault');
    handle = {
        //��ʼ������
        init: function () {
            //ҳ�����
            handle.invitationsearch();
        },
        //����ҳ�涥����ɾѡ����
        invitationsearch: function () {
            //��ȡ״̬��ʼ�������б�
            if (allstatus) {
                var allstatusulNode = D.getLastChild(allstatus);
                var allstatusspanNode = D.getFirstChild(allstatus);
                var allstatusspanSonNode = D.getFirstChild(allstatusspanNode);
                var allstatusliNode = D.getChildren(allstatusulNode);
                for (i = 0; i <= allstatusliNode.length - 1; i++) {
                    if (D.hasClass(allstatusliNode[i], 'active')) {
                        var tempSon = D.getFirstChild(allstatusliNode[i]);
                        allstatusspanSonNode.innerHTML = tempSon.innerHTML;
                        D.addClass(allstatusliNode[i], "hidden");
                    }
                }
            }
            if (alltype) {
                var alltypeulNode = D.getLastChild(alltype);
                var alltypespanNode = D.getFirstChild(alltype);
                var alltypespanSonNode = D.getFirstChild(alltypespanNode);
                var alltypeliNode = D.getChildren(alltypeulNode);
                for (i = 0; i <= alltypeliNode.length - 1; i++) {
                    if (D.hasClass(alltypeliNode[i], 'active')) {
                        var tempSon = D.getFirstChild(alltypeliNode[i]);
                        alltypespanSonNode.innerHTML = tempSon.innerHTML;
                        D.addClass(alltypeliNode[i], "hidden");
                    }
                }
            }
            if (allarea) {
                var allareaulNode = D.getLastChild(allarea);
                var allareaspanNode = D.getFirstChild(allarea);
                var allareaspanSonNode = D.getFirstChild(allareaspanNode);
                var allarealiNode = D.getChildren(allareaulNode);
                for (i = 0; i <= allarealiNode.length - 1; i++) {
                    if (D.hasClass(allarealiNode[i], 'active')) {
                        var tempSon = D.getFirstChild(allarealiNode[i]);
                        allareaspanSonNode.innerHTML = tempSon.innerHTML;
                        D.addClass(allarealiNode[i], "hidden");
                    }
                }
            }
            //���������б�
            E.on(allstatus, 'mouseover', function (e) {
                if (D.hasClass(allstatuslist, 'hidden')) {
                    D.removeClass(allstatuslist, 'hidden');
                }
            });
            E.on(allstatus, 'mouseout', function (e) {
                if (!D.hasClass(allstatuslist, 'hidden')) {
                    D.addClass(allstatuslist, 'hidden');
                }
            });
            E.on(alltype, 'mouseover', function (e) {
                if (D.hasClass(alltypelist, 'hidden')) {
                    D.removeClass(alltypelist, 'hidden');
                }
            });
            E.on(alltype, 'mouseout', function (e) {
                if (!D.hasClass(alltypelist, 'hidden')) {
                    D.addClass(alltypelist, 'hidden');
                }
            });
            E.on(allarea, 'mouseover', function (e) {
                if (D.hasClass(allarealist, 'hidden')) {
                    D.removeClass(allarealist, 'hidden');
                }
            });
            E.on(allarea, 'mouseout', function (e) {
                if (!D.hasClass(allarealist, 'hidden')) {
                    D.addClass(allarealist, 'hidden');
                }
            });
        }
    }
    handle.init();
})();