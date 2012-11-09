/**
 * ��̳detailҳJS����
 * Author: fatedm
 * Desc: 1.��kissy��1.1.6������1.2.0
 *       2.ȥtbra
 *       3.�ļ����ϣ���ԭ����bbs-detail.js,author-reply.js,bbs-editor.js,fload.v2.js����Ϊһ����
 *          A.��¶ȫ�ֱ���Detail����4��js�ļ������ܷ�Ϊ��ͨ�û������ߡ��༭����ҳ��չʾ4�����֡�
 *          B.TODO��������ȡ��������iframe��������ʱ������
 *          C.��ԭ���ر�¶Ϊȫ�ֵغ�������ΪDetail�ط�����TODO:���߿����޸ĵĵط�
 *
 * Time: 12-10-22 10:38
 */
KISSY.add('detail', function (S) {
    var D = S.DOM,
        E = S.Event,
        IO = S.IO,
        Cookie = S.Cookie,
        UA = S.UA,
        IE = UA.ie,
        win = window;
    function Detail () {
        this.init();
    }
    S.augment(Detail, {
        init: function () {
            /**
             *ҳ��չ��
             */
            //IEԲ��
            this.borderRadius();
            //�ظ���¥�������Ǻ�̨��Ⱦ��2�ݣ�һ����ѹ����һ��δѹ�����صء��������ʾδѹ����
            this.citation();
            //��z��index����·�ͷ�񱻸�ס
            this.cover();
            //�Ҳ൯����
//            this.popup();
            /**
             *��ͨ�û�
             */
            //��ʾ������
            this.zhuwei();
            //�ղ�
            this.collect();
            //ͶƱ����
            this.vote();
            //����
            this.share();
            //ͼƬ������
            this.whiteList();

            /**
             * ����
             */
            this.authorReply();

            /**
             * �༭��
             */
//            this.editor();


        },
        borderRadius: function () {
            if(!!IE && IE < 9){
                var subChannel = D.get('.J_SubChannel'),
                    initChannel;
                if (!subChannel) { // ��Щҳ��û����Ƶ������
                    return;
                } else {
                    initChannel = D.children(subChannel, '.ext-sub-channel-selected')[0];
                }
                S.each(D.children(subChannel, 'a'), function(item) {
                    var cornerLeft = D.create('<span>'),
                        cornerRight = D.create('<span>');
                    D.css(item, 'position', 'relative');
                    D.addClass(cornerLeft, 'ext-channel-item-l');
                    D.append(cornerLeft, item);
                    D.addClass(cornerRight, 'ext-channel-item-r');
                    D.append(cornerRight, item);
                });
                E.on(subChannel, 'mouseover', function(ev) {
                    if (ev.target.tagName.toLowerCase() === 'a' && ev.target !== initChannel) {
                        D.addClass(ev.target, 'ext-sub-channel-selected');
                    }
                });
                E.on(subChannel, 'mouseout', function(ev) {
                    if (ev.target.tagName.toLowerCase() === 'a' && ev.target !== initChannel) {
                        D.removeClass(ev.target, 'ext-sub-channel-selected');
                    }
                });
            }
        },
        citation: function () {
            var triggers = D.query('.slide-citation');
            if(!triggers.length) return false;
            S.each(triggers, function(item){
                E.on(item, 'click', function () {
                    var sup = D.parent(D.parent(item, 'p'), 2),
                        ori =  D.next(sup, '.citation')
                    D.remove(sup);
                    D.css(ori, 'display', 'block');
                })
            })
        },
        cover: function () {
            var detailPosts = D.query('.detail-post');
            for(var i = 0, len = detailPosts.length; i < len; i++){
                D.css(detailPosts[i], 'z-index', 50 - i)
            }
        },
        popup: function () {
            var cookie = Cookie.get('showPopup'),
                domain = window.location.hostname;
            (cookie) ? '' : Cookie.set('showPopup','0',1,domain,'/');

            if (cookie == '3') return true;

            var head = document.getElementsByTagName('HEAD')[0];
            var style = D.create('<link>');
            D.attr(style, {
                href: 'http://a.tbcdn.cn/app/matrix/css/fload.v2.css',
                rel: 'stylesheet'
            })
            head.appendChild(style);

            var showHide = function () {
                var popup = D.get('#J_popup'),
                    rebuildClass = function (el, str, action) {
                        if (!D.hasClass(el, str) && (action == 'add')){
                            D.addClass(el, str);
                        }else if (D.hasClass(el, str) && (action == 'remove')) {
                            D.removeClass(el, str);
                        }
                    }

                if (cookie == '1') {
                    rebuildClass(popup, 'collapsed', 'add');
                    rebuildClass(D.get('#J_collapse'), 'hidden', 'add');
                    rebuildClass(D.get('#J_expand'), 'hidden', 'remove');
                } else if (cookie == '2') {
                    rebuildClass(popup, 'collapsed', 'remove');
                    rebuildClass(D.get('#J_expand'), 'hidden', 'add');
                    rebuildClass(D.get('#J_collapse'), 'hidden', 'remove');
                }else if (cookie == '3'){
                    rebuildClass(popup, 'hidden', 'add');
                }

                E.on(popup, 'click', function(e){
                    var el = e.target;
                    switch(el.id) {
                        case 'J_close':
                            rebuildClass(popup, 'hidden', 'add');
                            Cookie.set('showPopup', '3', 1, domain, '/');
                            break;
                        case 'J_expand':
                            rebuildClass(popup, 'collapsed', 'remove');
                            rebuildClass(el, 'hidden', 'add');
                            rebuildClass(D.get('#J_collapse'), 'hidden', 'remove');
                            Cookie.set('showPopup', '2', 1, domain,'/');
                            break;
                        case 'J_collapse':
                            rebuildClass(popup, 'collapsed', 'add');
                            rebuildClass(el, 'hidden', 'add');
                            rebuildClass(D.get('#J_expand'), 'hidden', 'remove');
                            Cookie.set('showPopup', '1', 1, domain, '/');
                            break;
                    }
                });
            }
            IO({
                type: 'get',
                url: f_url,
                type: 'json',
                success: function(d){
                    var div = document.createElement('div');
                    document.body.appendChild(div);
                    div.innerHTML = d.responseText;
                    showHide();
                    E.on(window,'scroll',function(){
                        if("\v"=="v" && D.get("#J_popup")) {
                            D.get("#J_popup").className = D.get("#J_popup").className;
                        }
                    });
                }
            })
        },
        zhuwei: function () {
            E.on(".J_zhuweiBtns", "click", function(e){
                e.halt();
                var url = D.attr(e.target, "data-url");
                Detail.overlay.showDialog({
                    'src': url,
                    'width': 470,
                    'headerContent': '����'
                });
            });
        },
        collect: function () {
            var url = D.attr('#J_collection', 'data-url');
            if(!url) return;
            E.on('#J_collection', 'click', function(ev) {
                ev.halt();
                Detail.overlay.showDialog({
                    'src' : url,
                    'width' : 470,
                    'headerContent' : '�ղ�'
                });
            });
        },
        vote: function () {
            if (!D.get('#J_vote')) return;
            var jVote = D.get('#J_vote'),
                maxAnswer, url,
                getCheckedNumber = function (list) { // ��ȡѡ��ͶƱ��ĸ���
                    for (var sum = 0, i = 0, l = list.length; i < l; i++) {
                        list[i].checked && sum++;
                    }
                    return sum;
                },
                voteUrl = function (href) { // Ҫ�ύ�ı�����
                    var params = '', node, i, l, t,
                        nodes = document.getElementById('choiceForm').getElementsByTagName('*');
                    for (i = 0, l = nodes.length; i < l; i++) {
                        node = nodes[i];
                        if (node.name) {
                            t = node.type && node.type.toLowerCase();
                            if (t === 'checkbox' || t === 'radio') {
                                if (!node.checked) {
                                    continue;
                                }
                            }
                            params += '&' + node.name + '=' + node.value;
                        }
                    }
                    return href + '?' + params.substring(1);
                };
            if (D.attr(jVote, 'data-votable') === 'true') {
                maxAnswer = D.attr(jVote, 'data-maxanswer');
                url = D.attr(jVote, 'data-url');
                var list = D.query('#J_vote input'), timestamp = 0;

                E.on(list, 'click', function() { // ��֤���������ͶƱ��
                    if (getCheckedNumber(list) > maxAnswer) {
                        this.checked = false;
                        alert('���ֻ��ѡ��' + maxAnswer + '��');
                    }
                });

                E.on('#J_submit', 'click', function(e) { // ���ͶƱ��ť
                    e.halt();
                    var now = new Date().getTime();
                    if (now - timestamp < 2000) {
                        return;
                    }
                    timestamp = now;
                    if (getCheckedNumber(list) === 0) {
                        alert('�ˣ��㵽��ͶƱ����һ��ѽ��');
                    } else {
                        Detail.overlay.showDialog({
                            'src' : voteUrl(url),
                            'width' : 345,
                            'headerContent' : 'ͶƱ'
                        });
                    }
                });
            }
        },
        share: function () {
            SNS.ui("sharebtn",{"element":"#sns-widget-sharebtn","skinType":"2", "title": "�Ա���̳","app_id":"12076894", "comment": document.title});
        },
        whiteList: function () {
            var e,
                replyAreas = D.get('#J_FastReply') ? [] : D.query('.replyArea'),
                e = D.get('#quick_hf');
                e && replyAreas.push(e);
                e = D.get('#topreply');
                e && replyAreas.push(e);
            E.on(replyAreas, 'click', function(e) {
                win.location.href = '#publishreply';
                e.halt();
            });
            var wl = D.attr('#whitelist', 'value');
            if (wl) {
                wl = wl.split('_');
                S.use('sizzle', function() {
                    S.each(D.query('.substance img'), function(img) {
                        try {
                            var src = D.attr(img, 'src') || D.attr(img, 'data-ks-lazyload'),
                                domain = src.split('/')[2].split(':')[0],
                                isFit = false;
                            S.each(wl, function(w) {
                                if (domain.substring(domain.length - w.length) === w) {
                                    isFit = true;
                                    return false;
                                }
                            });
                            if (!isFit) {
                                D.attr(img, {
                                    'src' : 'http://img07.taobaocdn.com/tps/i7/T1aoxtXhtCXXXXXXXX-170-120.jpg',
                                    'width' : 170,
                                    'height' : 120
                                });
                                D.css(img, 'display', 'inline');
                            }
                        } catch (e) {}
                    });
                });
            }
        },
        authorReply: function () {
            /*¥���ظ�����*/
            function authorReply(ev){
                ev.halt();
                var url = D.attr(ev.target,"data-url");
                Detail.overlay.showDialog({
                    'src' : url,
                    'width' : 345,
                    'headerContent' : '¥���ظ�'
                });
            }

            /*�ظ�ĳ¥���û�����*/
            function userReply(ev){
                ev.halt();
                if(typeof(editor) != undefined){
                    var data = D.attr(ev.target,"data-url").split(','),
                        userNick = data[0],
                        floorId = data[1],
                        str = '[ANSWER]��' + floorId + '¥��' + userNick + '��������---[/ANSWER]<p></p>';
                    win.location.href = '#publishreply';
                    editor.focus();
                    editor.insertHtml(str);

                }else{
                    win.location.href = D.attr(ev.target,"href") + '#publishreply';
                }
            }

            /*ɾ�����ӡ��ظ���¥���ظ���
             *@ev: �¼�����
             *@formId: form����
             *@tipStr: ��ʾ�İ�
             */
            function submitData(ev, formId, tipStr){
                ev.halt();
                var form = D.get(formId);
                if(!form) {
                    return;
                }
                if(form.replyId) {
                    form.replyId.value = D.attr(ev.target, 'data-url');
                }
                if(!tipStr){
                    form.submit();
                }else if(window.confirm(tipStr)){
                    form.submit();
                }
            }

            //�¼�����
            E.on("#detail", "click", function(e){
                var tar = e.target;
                if(D.hasClass(tar, 'J_authorReply')){
                    authorReply(e);
                }else if(D.attr(tar, 'id') == 'replyFromreplyArea'){
                    D.scrollIntoView('#publishreply');
                }
                else if(D.hasClass(tar, 'J_replyUser')){
                    userReply(e);
                }else if(D.hasClass(tar, 'J_delAuReply')){
                    submitData(e, '#authorReplyForm', '��ȷ��Ҫɾ��¥���ظ���ɾ��֮���ָܻ�Ŷ��');
                }else if(D.hasClass(tar, 'J_delThread')){
                    submitData(e, '#deleteThreadForm','��ȷ��Ҫɾ�������ӣ�ɾ��֮���ָܻ�Ŷ��');
                }else if(D.hasClass(tar, 'J_delReply')){
                    submitData(e, '#replyForm', '��ȷ��Ҫɾ���ûظ���ɾ��֮���ָܻ�Ŷ��');
                }else if(D.hasClass(tar, 'J_floatThread')){
                    submitData(e,'#floatThread');
                }else if(D.hasClass(tar, 'J_sinkThread')){
                    submitData(e,'#sinkThread');
                }
            });

        }

    })
    Detail.zhuwei_success = function() {
        function zhuweiSuccess(data){
            zhuweiSuccessAction(data, data.zhuweiId);
            if(D.get('#' + data.zhuweiId + '-top')){
                zhuweiSuccessAction(data, data.zhuweiId + '-top');
            }
        }
        /*����ö��ظ����ݺ�ҳ������ظ�id*/
        function zhuweiSuccessAction(data, zhuweiId){
            var cur_list = D.get('#'+ zhuweiId + ' .J_zhuweiList');
            if(!cur_list) return;
            var cur_table = D.get('#'+ zhuweiId + ' .J_zhuweiTables');
            if(!cur_table) return;
            var zw_sum = D.get('#'+ zhuweiId + ' .zhuweicounts');

            var rows = D.query("tr",cur_table),maxrow;
            D.css(cur_list,"display","block");

            if(data.zhuweiId == 'replay0'){
                maxrow = 5;
            }else{
                maxrow = 3;
            }

            if(rows.length >= maxrow) {
                cur_table.deleteRow(maxrow - 1);
            }

            if(rows.length==0){
                var newRow = cur_table.insertRow(0);
                newRow.insertCell(0).className="username";
                newRow.insertCell(1);
                newRow.insertCell(2).className="content";
            }else{
                var newRow = rows[0].cloneNode(true);
                rows[0].parentNode.insertBefore(newRow,rows[0]);
            }

            if(data.coin>0){
                newRow.cells[1].className="plus";
            }else{
                newRow.cells[1].className="neg";
            }

            newRow.cells[0].innerHTML="<a target='_blank' href='"+data.userCenterLink+"'>"+data.username+"</a>";
            newRow.cells[1].innerHTML="<s></s>"+data.coin;
            newRow.cells[2].innerHTML=data.content;

            zw_sum.innerHTML = zw_sum.innerHTML*1 + data.coin*1;
            Detail.overlay.hide();
            //D.get("content").className='';
            //window.location.replace(TB.common.parseUri(location.href)["prePath"]+TB.common.parseUri(location.href)["path"]+'?t='+Math.random()+'#'+data.zhuweiId);
        }

    }
    /*ɾ�����Ӻͻظ�*/
    Detail.deleteThread = function () {
        if(win.confirm('��ȷ��Ҫɾ�������ӣ�ɾ��֮���ָܻ�Ŷ��')){
            var form = D.get("#deleteThreadForm");
            form.submit();
        }
    }
    Detail.sinkThread = function () {
        var form = D.get("#sinkThread");
        form.submit();
    }
    Detail.floatThread = function () {
        var form = D.get("#floatThread");
        form.submit();
    }
    Detail.deleteReply = function (replyId) {
        if(win.confirm('��ȷ��Ҫɾ���ûظ���ɾ��֮���ָܻ�Ŷ��')){
            var form = D.get("#replyForm");
            form.replyId.value=replyId;
            form.submit();
        }
    }

    Detail.overlay = {

        /**
         * ��ʾ�Ի���
         *
         * @param cfg {src:��ܵ�·��,width:�Ի�����,headerContent:�Ի������}
         */
        _dialog: null,
        _overlay: null,
        _isMessageShow: false,
        'showDialog' : function(cfg) {
            var that = this;
            cfg = cfg || {};
            console.log(cfg);
            S.use('overlay,dd', function() {
                if (!that._dialog) {
                    that._dialog = new S.Dialog({
                        'width' : cfg.width || 470,
                        'headerContent' : cfg.headerContent || '',
                        'bodyContent' : '<iframe id="dialogFrm" src="' + cfg.src + '" width="' + (cfg.width - 2 || 343) + '" height="250" frameborder="0" scrolling="no"></iframe>',
                        'draggable': true,
                        'mask': true,
                        'zIndex': 10003
                    });
                    that._dialog.render();
                } else {
                    D.attr('#dialogFrm', 'src', cfg.src);
                    if (cfg.width) {
                        that._dialog.set('width', cfg.width);
                        D.attr('#dialogFrm', 'width', cfg.width - 2);
                    }
                    cfg.headerContent && that._dialog.set('headerContent', cfg.headerContent);
                }
                Detail.overlay.hide();
                setTimeout(function() {
                    if (!that._isMessageShow) { // ����Ϣ�����ʱ���ֹ�Ի��򵯳�
                        Detail.overlay.hide();
                        that._dialog.center();
                        that._dialog.show();
                    }
                }, 500);
            });
        },

        /**
         * ���ص�ǰ����
         */
        'hide' : function() {
            this._dialog && this._dialog.hide();
            this._overlay && this._overlay.hide();
        },

        /**
         * ��ʾ������Ϣ
         *
         * @param html ��������
         * @param delay ��ʱ����
         * @param reload �Ƿ�ˢ��ҳ��
         */
        'showMessage' : function(html, delay, reload) {
            var that = this;
            S.use('overlay,dd', function() {
                if (!that._overlay) {
                    if (6 === S.UA.ie) {
                        that._overlay = new S.Overlay({
                            'width' : 360
                        });
                    } else {
                        that._overlay = new S.Overlay();
                    }
                    that._overlay.render();
                    that._overlay.get('contentEl').addClass('msg24');
                }
               that._overlay.get('contentEl').html(html);
                overlay.hide();
                that._overlay.center();
                that._overlay.show();
                that._isMessageShow = true;
                delay && setTimeout(function() {
                    overlay.hide();
                    reload && (location.href = location.href.split('#')[0]);
                    that._isMessageShow = false;
                }, delay);
            });
        },

        /**
         * ���ô��ڿ��
         *
         * @param width ���
         */
        'setWidth' : function(width) {
            if (this._dialog) {
                this._dialog.set('width', width);
                D.attr('#dialogFrm', 'width', width - 2);
                this._dialog.center();
            }
        },
        'setHeight' : function(height) {
            if (this._dialog) {
                this._dialog.set('height', height);
                D.attr('#dialogFrm', 'height', height - 2);
                this._dialog.center();
            }
        }
    };

    //�༭��ǩ���ܣ�Ŀǰֻ��־Ը���й���
    //���캯������Ҫʵ����
    function Tag(){
        if(!D.get('#tags-edit')) return;
        this.init();
    }
    S.augment(Tag, {
        allTags: [],//��tms��ȡ�����еı�ǩ�б�
        exitTags: [],//ͬtms�ȽϺ����ı�ǩ
        init: function(){
            this.getAllTags();
            this.getExitTags();
            this.render();
            this.editStart();
            this.click();
            this.submit();
        },
        getAllTags: function(){
            var that = this;

            if(!D.get('#tms-tags p')) return;
            S.each(D.query('#tms-tags p'), function(item){

                that.allTags.push(D.html(item));
            });

        },
        getExitTags: function(){
            var con = D.get('.the-tags'),
                links = D.query('a', con) || [],
                _i, _l = this.allTags.length,
                that = this;

            if(!_l || !links.length) {
                D.hide(con);
                return;
            }
            S.each(links, function(item){
                var _html = D.html(item);
                for(_i = 0; _i < _l; _i++){
                    if(_html == that.allTags[_i]){
                        that.exitTags.push(_html);
                    }
                }
            })
            D.val('#J_Tags', that.exitTags.join(' '))
        },
        editStart: function(){
            if(!D.get('.tags-edit-trigger')) return;
            var that = this;
            E.on(D.get('.tags-edit-trigger'), 'click', function(){
                if(D.css('#tags-edit', 'display') === 'block'){
                    D.css('#tags-edit', 'display', 'none')
                }else{
                    if(!that.allTags.length) {
                        alert('TMS����ʧ��');
                        return;
                    }
                    D.css('#tags-edit', 'display', 'block');
                }
            })
        },
        render: function(){
            var con = D.get('#tags-edit .tags-edit-box'),
                html = '',
                nonExit = [],
                exitTags = this.exitTags,
                allTags = this.allTags;
            if(allTags.length == 0){
                return;
            }
            if(!exitTags.length ){
                nonExit = allTags;
            }else{
                for(var m = 0, mLen = allTags.length; m < mLen; m++){
                    for(var n = 0, nLen = exitTags.length;  n < nLen; n++){
                        if(exitTags[n] == allTags[m]){
                            break;
                        }else{
                            if(n == (nLen - 1)){
                                nonExit.push(allTags[m]);
                            }
                        }
                    }
                }
                for(var _i = 0, _len = this.exitTags.length; _i < _len; _i++){
                    html += '<span class="selected">' + exitTags[_i] + '</span>'
                }
            }

            for(var j = 0, len = nonExit.length; j < len; j++){
                html += '<span>' + nonExit[j] + '</span>';
            }
            D.html(con, '');
            D.html(con, html);
        },
        click: function(){
            var el = D.get('#tags-edit .tags-edit-box'),
                that = this;
            E.on(el, 'click', function(e){
                var tar = e.target;
                if(tar.nodeName.toLowerCase() === 'span'){

                    try{
                        var len = D.query('#tags-edit .selected').length;
                    }catch(e){
                        var len = 0;
                    }
                    if(D.hasClass(tar, 'selected')){
                        D.removeClass(tar, 'selected');
                    }else{
                        if(len == 5){
                            alert('���ֻ��5����ǩ');
                            return;
                        };
                        D.addClass(tar, 'selected');
                    }
                    that.synchro();
                }
            })
        },
        synchro: function(){
            var input = D.get('#J_Tags'),
                val = '';
            try{
                S.each(D.query('#tags-edit .tags-edit-box span'), function(item, index){
                    if(D.hasClass(item, 'selected')){
                        if(index == 0){
                            val = D.html(item);
                        }else{
                            val += ' ' + D.html(item);
                        }
                    }
                })
                D.val(input, val);
            }catch(e){
                return;
            }
        },
        submit : function(){
            var btn = D.get('.J_TagsSubmit'),
                form = D.get('#tagsForm');
            E.on(btn, 'click', function(){
                if(IE == 6){
                    setTimeout(function(){
                        form.submit();
                    }, 0)
                }else{
                    form.submit();
                }
            });
        }
    })

    Detail.Tag = Tag;

    win['Detail'] = Detail;
    return Detail;
})
/**
 *�����ó����Ҳ�ػص�������ť
 */
KISSY.add('fixed', function(S){
    var D = S.DOM,
        E = S.Event;
    function Fixed(id){
        if(!D.get(id)) return;
        E.on(D.get(id), 'click', function(e){
            e.preventDefault();
            window.scroll(0, 0);
        })
        if (S.UA.ie != 6){
            E.on(window, 'scroll resize', function(){
                var scrollTop = D.scrollTop();

                if(scrollTop > 10){
                    D.css(id, 'display', 'block');
                }else{
                    D.css(id, 'display', 'none');
                }
            });
            return;
        }
        var el = D.get(id),
            conHeight = D.height('#content'),
            winHeight = D.viewportHeight(),
            offset = D.offset('#content'),
            offsetH = offset.top,
            top = winHeight - offsetH -115,
            start = conHeight - top;

        D.css(el, 'bottom', start);
        E.on(window, 'scroll resize', function(){
            var scrollTop = D.scrollTop();
            if(scrollTop > 10){
                D.css(el, 'display', 'block');
                var t = start - D.scrollTop();
                t = t > -217 ? t : -217;
                D.css(el, 'bottom', t + 'px');
            }else{
                D.css(el, 'display', 'none');
            }
        })
    }
    S.ready(function(S){
        Fixed('#toTop');
    })
    return Fixed;
});


/**
 * ��̳�༭��
 *
 * ��Ҫ��ҳ�����ṩ����ֵ(��nameָ���ı�ǩ���ж��,��idָ����ֻ����һ��):
 * 1)��Ҫ���صĲ��:<input type="hidden" id="J_EditorPlugins" value="����б�(���ŷָ����ַ���)"/>
 * 2)��Ҫ�ύ���������Ĳ���:<input type="hidden" name="J_EditorServerParams" data-name="������" data-value="����ֵ"/>
 * 3)�༭�������������<input type="hidden" id="J_EditorWordCount" value="�������"/>
 * 4)�Ƿ���ձ༭�����ݵı��<input type="hidden" id="J_EditorClearFlag" value="true������"/>
 *
 * �ɰ󶨵�¼�ɹ���Ļص�����window['loginSuccess'].callback
 *
 * @author ck0123456@gmail.com
 * @date 2011-11-7
 *
 * @modifier: fatedm
 * @date 2012-10-26
 * @�ϰ汾ҳ���õ�1.1.6���༭���õ�1.1.7,ȫ��������1.2.0
 * @���༭����Ϊ��̬���롣
 * @����ͳ����1.2.0��Ϊ�Լ���д�������Ҫ������д���ļ���
 */
//KISSY.add({
//    editor:{
//        fullpath:"http://a.tbcdn.cn/s/kissy/1.2.0/??editor-min.js,editor/biz/ext/editor-plugin-pkg-min.js"
//    }
//})
/*
 ����ͳ�Ʋ��
 @author ��Х,����<yiminghe@gmail.com>
 */

KISSY.ready(function(S) {
    S.namespace('EditorPlugins.Wordcount');

    //������������������༭��editor����
    KISSY.EditorPlugins.Wordcount.bind = function(max, editor) {
        var textarea = new S.Node(editor.textarea);
        //�ڵ�ǰtext�༭�������������ڵ�
        var size = 0;
        S.DOM.insertAfter(S.DOM.create('<div class="J_WS">Դ��:������ ' +
            '<em class="J_WordSize">' + size + '</em>/������� ' +
            '<em class="J_WsMax">' + max + '</em> <span class="J_WsTips"></span></div>'),
            textarea.parent('.ke-editor-wrap'));
        var wordsizenode = textarea.parent('.ke-editor-wrap').next('.J_WS')
            .children('.J_WordSize');
        var tips = "�����Դ�������������޷������ɹ�";
        S.DOM.css('.J_WordSize', {'font-weight':'bold','color':'green'});
        S.DOM.css('.J_WsMax', 'font-weight', 'bold');
        S.DOM.css('.J_WS', {'font-size':'13px','padding-left':'5px'});
        S.DOM.css('.J_WsTips', 'color', 'red');
        var _change = function(node, s) {
            if (s <= max) {
                node.text(s).css('color', 'green');
                node.siblings('.J_WsTips').text('');
            }
            else {
                node.text(s).css('color', 'red');
                node.siblings('.J_WsTips').text(tips);
            }
        }, timer;
        //��save�¼�
        editor.ready(function() {
            _change(wordsizenode, editor.getData().length);
            editor.on('save restore', function(ev) {

                if (ev.buffer) {
                    timer && clearTimeout(timer);
                    timer = setTimeout(function() {
                        _change(wordsizenode, editor.getData().length);
                    }, 500);
                } else {
                    _change(wordsizenode, editor.getData().length);
                }
            });
        });
    };

    //�༭��ʵ����
    S.use('editor', function(S) {
        var D = S.DOM,
            E = S.Event,
            KE = KISSY.Editor,
            IO = S.io,
        // ��Ҫ���صĲ��
            plugins = D.val('#J_EditorPlugins'),

        // ��������ַ���
            wordCount = D.val('#J_EditorWordCount'),

        // ��Ŀ¼
            baseUrl = location.protocol + '//' + location.host,

        // ��Ҫ�ύ���������Ĳ���
            serverParams = function(waterMark) {
                var params = {
                    'cookie' : document.cookie,
                    'waterMark' : function() {
                        return D.get(waterMark).checked;
                    }
                }, inputs = document.getElementsByName('J_EditorServerParams');
                for (var i = 0; i < inputs.length; i++) {
                    params[inputs[i].getAttribute('data-name')] = inputs[i].getAttribute('data-value');
                }
                return params;
            },

        // �����ֺ����ö���
            fontSizeItem = function(name, value) {
                return {
                    'value' : value,
                    'attrs' : { 'style' : 'position:relative;border:1px solid #DDDDDD;margin:2px;padding:2px' },
                    'name' : '<span style="font-size:' + value + '">' + name + '</span><span style="position:absolute;top:1px;right:3px">' + value + '</span>'
                };
            },

        // �����������ö���
            fontFamilyItem = function(name, value) {
                return { 'name' : name, 'value' : value };
            },

        // ��Ƶ��ַ���ö���
            videoProdiver = function(reg, detect) {
                return { 'reg' : reg, 'width' : 480, 'height' : 400, 'detect' : detect };
            },

        // �����༭��
            editor = KE('#msgpost', {
                'attachForm' : true,
                'baseZIndex' : 10000,
                'pluginConfig' : {
                    'bgcolor' : false,
                    'image' : {
                        'upload' : { // ����ͼƬ�ϴ�����
                            'serverUrl' : baseUrl + '/json/batchImageUpload.htm',
                            'serverParams' : serverParams('#ke_img_up_watermark_1'), // �������Ƿ��ˮӡѡ���id
                            'fileInput' : 'imgFile',
                            'sizeLimit' : 1000, // KB
                            'extraHtml' : '<p style="margin-top:5px"><input type="checkbox" checked="checked" id="ke_img_up_watermark_1" style="vertical-align:middle">ͼƬ��ˮӡ����ֹ���˵���</p>'
                        }
                    },
                    'font-size' : { // �ֺ�����
                        'items' : [ fontSizeItem('��׼',		'14px'),
                            fontSizeItem('��',		'16px'),
                            fontSizeItem('�ش�',		'18px'),
                            fontSizeItem('����',		'20px') ],
                        'width' : '115px'
                    },
                    'font-family' : { // ��������
                        'items' : [ fontFamilyItem('����',				'SimSun'),
                            fontFamilyItem('����',				'SimHei'),
                            fontFamilyItem('����',				'KaiTi_GB2312'),
                            fontFamilyItem('΢���ź�',			'Microsoft YaHei'),
                            fontFamilyItem('Times New Roman',	'Times New Roman'),
                            fontFamilyItem('Arial',				'Arial'),
                            fontFamilyItem('Verdana',			'Verdana') ]
                    },
                    'draft' : { // �ݸ�����
                        'interval' : 5,
                        'limit' : 10,
                        'helpHtml' : '<div style="width:200px"><div style="padding:5px">�ݸ����ܹ��Զ����������±༭�����ݣ�����������ݶ�ʧ��ѡ��ָ��༭��ʷ</div></div>'
                    },
                    'multi-upload' : { // ���ͼƬ�ϴ�����
                        'holder' : '#imgup1',
                        'previewSuffix' : '_80x80.jpg',
                        'previewWidth' : '80px',
                        'serverUrl' : baseUrl + '/json/batchImageUpload.htm',
                        'serverParams' : serverParams('#ke_img_up_watermark_2'), // �������Ƿ��ˮӡѡ���id
                        'fileInput' : 'imgFile',
                        'sizeLimit' : 1000, // KB
                        'numberLimit' : 15,
                        'extraHtml' : '<p style="margin-top:10px"><input type="checkbox" style="vertical-align:middle;margin:0 5px" checked="checked" id="ke_img_up_watermark_2"><span style="vertical-align:middle">ͼƬ��ˮӡ����ֹ���˵���</span></p>'
                    },
                    'video' : { // ��Ƶ����
                        'urlCfg' : [ { // TODO ��֪����ʲô��,ȥ��Ҳ��Ӱ�칦��
                            'reg' : /tudou\.com/i,
                            'url' : baseUrl + '/json/getTudouVideo.htm?url=@url@&callback=@callback@' // ��ַ���ú����ѯ:ʯ��
                        } ],
                        'urlTip' : '�������ſ���������������6������Ƶ����ҳ����...',
                        'providers' : [ videoProdiver(/youku\.com/i, function(url) { // �ſ�
                            var m = url.match(/id_([^.]+)\.html$/);
                            if (m) {
                                return 'http://player.youku.com/player.php/sid/' + m[1] + '/v.swf';
                            } else if (url.match(/v_playlist\/([^.]+)\.html$/)) {
                                return;
                            } else {
                                return url;
                            }
                        }),
                            videoProdiver(/tudou\.com/i, function(url) { // ����
                                return url;
                            }),
                            videoProdiver(/ku6\.com/i, function(url) { // ��6
                                var m = url.match(/show[^\/]*\/([^.]+)\.html$/);
                                if (m) {
                                    return 'http://player.ku6.com/refer/' + m[1] + '/v.swf';
                                } else {
                                    return url;
                                }
                            }) ]
                    }, // ��Ƶ����
                    'xiami-music' : {
                        'musicPlayer' : KE.Config.base + 'music/niftyplayer.swf'
                    },
                    'resize' : {
                        'direction' : [ 'y?' ]
                    }
                } // pluginConfig
            }).use(plugins || 'undo', function() {

                    // ������(ȥ��html�б���ɫ�Ķ���)
                    var dataFilter = this.htmlDataProcessor && this.htmlDataProcessor.dataFilter;
                    dataFilter && dataFilter.addRules({
                        'attribute' : {
                            'style' : function(value) {
                                value = value.replace(/background[a-z\-]*\s*:[^;]+(;|$)/g, '');
                                return value ? value : false;
                            }
                        }
                    });

                    // ��֪��ʲô��˼
                    if (S.Cookie.get('cookie1') || S.Cookie.get('_l_g_')) {
                        editor.document.body.id = 'editorbodyid';
                        UA_Opt.attachEvents(editor);
                    }

                    // ����ͳ��
                    KISSY.EditorPlugins.Wordcount.bind(2000, editor);
                    //ճ��ʱȥ����ʽ
                    editor.on('paste', function(e){
                        var html = e.html,
                            body = document.getElementsByTagName('body')[0],
                            div = document.createElement('div');

                        div.id = 'bookmark';
                        div.innerHTML = html;
                        div.style.display = 'none';
                        body.appendChild(div);
                        children = div.getElementsByTagName('*');
                        for( var i = 0, len = children.length; i < len; i++){
                            D.removeAttr(children[i], 'class');
                            D.removeAttr(children[i], 'style');
                            D.removeAttr(children[i], 'width');
                            D.removeAttr(children[i], 'height');
                            D.removeAttr(children[i], 'align');
                            D.removeAttr(children[i], 'valign');
                            D.removeAttr(children[i], 'hspace');
                        }

                        html = D.html(div);

                        D.remove(div);

                        return html;  // �����޸ĺ��ճ������

                    })

                    // ������Detailҳ��
                    if (window['Detail']) {
                        var submitBtn = D.get('#submitBtn');

                        // ��Ҫ���textarea����
                        D.val('#J_EditorClearFlag') === 'true' && (editor.textarea.value = '');

                        // �д���ʱ�����ύ��ť��λ��
                        S.ready(function() {
                            D.get('.error') && window.scrollTo(0, D.offset(submitBtn).top - 500);
                        });

                        // δ��¼ʱ������¼��
                        if (!plugins) {
                            var domain = location.hostname.indexOf('daily.taobao.net') !== -1 ? 'daily.taobao.net' : 'taobao.com',
                                src = 'http://login.' + domain + '/member/login.jhtml?style=mini&redirect_url=http://' + location.hostname + '/json/loginSuccess.htm&full_redirect=false&is_ignore=false';

                            submitBtn.disabled = true;

                            // ��¼�ɹ���Ļص�����
                            window['loginSuccess'] = function() {
                                submitBtn.disabled = false;
                                Detail.overlay.hide();
                                IO.get('/json/getLoginInfo.htm', {
                                    'groupId': document.getElementsByName('groupId')[0].value,
                                    'threadId': document.getElementsByName('threadId')[0].value,
                                    'noFont': D.get('#replyNoFont') == null ? false : true,
                                    '_': new Date().getTime()
                                }, function(data) {
                                    data = eval('(' + data + ')');
                                    data = data.data[0];
                                    if (data.errorMsg) {
                                        editor.destroy();
                                        var editorContainer = D.get('.J_KEditor');
                                        editorContainer.id = 'publishreply';
                                        editorContainer.className = 'msg24';
                                        editorContainer.innerHTML = '<p class="attention">' + data.errorMsg + '</p>';
                                    } else {
                                        D.val('#J_EditorPlugins', data.plugins);
                                        editor.use(data.plugins);
                                        if(data.picUrl){
                                            var domain = location.hostname.indexOf('daily.taobao.net') !== -1 ? 'img04.taobaocdn.net' : 'img04.taobaocdn.com';
                                            D.attr('#J_CurUserHead img', 'src', 'http://' + domain + '/sns_logo/' + data.picUrl);
                                        }
                                        if(data.official == "false"){
                                            D.remove('#checkCodeInput');
                                        }
                                        loginSuccess.callback && loginSuccess.callback();
                                    }
                                });
                            }; // ��¼�ɹ���Ļص�����

                            // �Ի����ý���ʱ������¼��
                            editor.on('focus', function(evt) {
                                if (!submitBtn.disabled) {
                                    return;
                                }
                                evt.halt();
                                Detail.overlay.showDialog({
                                    'src' : src,
                                    'width' : 345,
                                    'headerContent' : '��¼'
                                });
                            });
                        } // δ��¼ʱ������¼��
                    } // ������Detailҳ��
                });
        // ����ͳ��

        window['editor'] = editor; // TODO �������ϴ����ϣ����Ҫ����ȫ�ֱ���
    });

    //datalazyload
    S.use('datalazyload', function(S, DataLazyLoad){
        new DataLazyLoad({ mod: 'auto' });
    })

    new Detail();
    new Detail.Tag();
});
