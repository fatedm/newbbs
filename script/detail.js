/**
 * 论坛detail页JS整合
 * Author: fatedm
 * Desc: 1.将kissy从1.1.6升级到1.2.0
 *       2.去tbra
 *       3.文件整合：将原来地bbs-detail.js,author-reply.js,bbs-editor.js,fload.v2.js整合为一个。
 *          A.暴露全局变量Detail，将4个js文件按功能分为普通用户、作者、编辑器、页面展示4个部分。
 *          B.TODO：将来会取出助威地iframe，现在暂时不动。
 *          C.将原来地暴露为全局地函数调整为Detail地方法。TODO:告诉开发修改的地方
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
             *页面展现
             */
            //IE圆角
            this.borderRadius();
            //回复该楼：现在是后台渲染了2份，一份是压缩，一份未压缩隐藏地。点击后显示未压缩。
            this.citation();
            //用z－index解决下方头像被盖住
            this.cover();
            //右侧弹出框
//            this.popup();
            /**
             *普通用户
             */
            //显示助威框
            this.zhuwei();
            //收藏
            this.collect();
            //投票功能
            this.vote();
            //分享
            this.share();
            //图片白名单
            this.whiteList();

            /**
             * 作者
             */
            this.authorReply();

            /**
             * 编辑器
             */
//            this.editor();


        },
        borderRadius: function () {
            if(!!IE && IE < 9){
                var subChannel = D.get('.J_SubChannel'),
                    initChannel;
                if (!subChannel) { // 有些页面没有子频道导航
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
                    'headerContent': '助威'
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
                    'headerContent' : '收藏'
                });
            });
        },
        vote: function () {
            if (!D.get('#J_vote')) return;
            var jVote = D.get('#J_vote'),
                maxAnswer, url,
                getCheckedNumber = function (list) { // 获取选中投票项的个数
                    for (var sum = 0, i = 0, l = list.length; i < l; i++) {
                        list[i].checked && sum++;
                    }
                    return sum;
                },
                voteUrl = function (href) { // 要提交的表单数据
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

                E.on(list, 'click', function() { // 验证不超过最多投票数
                    if (getCheckedNumber(list) > maxAnswer) {
                        this.checked = false;
                        alert('最多只能选择' + maxAnswer + '项');
                    }
                });

                E.on('#J_submit', 'click', function(e) { // 点击投票按钮
                    e.halt();
                    var now = new Date().getTime();
                    if (now - timestamp < 2000) {
                        return;
                    }
                    timestamp = now;
                    if (getCheckedNumber(list) === 0) {
                        alert('嗨，你到底投票给哪一项呀？');
                    } else {
                        Detail.overlay.showDialog({
                            'src' : voteUrl(url),
                            'width' : 345,
                            'headerContent' : '投票'
                        });
                    }
                });
            }
        },
        share: function () {
            SNS.ui("sharebtn",{"element":"#sns-widget-sharebtn","skinType":"2", "title": "淘宝论坛","app_id":"12076894", "comment": document.title});
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
            /*楼主回复函数*/
            function authorReply(ev){
                ev.halt();
                var url = D.attr(ev.target,"data-url");
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
                    var data = D.attr(ev.target,"data-url").split(','),
                        userNick = data[0],
                        floorId = data[1],
                        str = '[ANSWER]回' + floorId + '楼（' + userNick + '）的帖子---[/ANSWER]<p></p>';
                    win.location.href = '#publishreply';
                    editor.focus();
                    editor.insertHtml(str);

                }else{
                    win.location.href = D.attr(ev.target,"href") + '#publishreply';
                }
            }

            /*删除帖子、回复、楼主回复等
             *@ev: 事件对象
             *@formId: form对象
             *@tipStr: 提示文案
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

            //事件代理
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
                    submitData(e, '#authorReplyForm', '你确认要删除楼主回复？删除之后不能恢复哦！');
                }else if(D.hasClass(tar, 'J_delThread')){
                    submitData(e, '#deleteThreadForm','你确认要删除该帖子？删除之后不能恢复哦！');
                }else if(D.hasClass(tar, 'J_delReply')){
                    submitData(e, '#replyForm', '你确认要删除该回复？删除之后不能恢复哦！');
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
        /*解决置顶回复内容后页面存在重复id*/
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
    /*删除帖子和回复*/
    Detail.deleteThread = function () {
        if(win.confirm('你确认要删除该帖子？删除之后不能恢复哦！')){
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
        if(win.confirm('你确认要删除该回复？删除之后不能恢复哦！')){
            var form = D.get("#replyForm");
            form.replyId.value=replyId;
            form.submit();
        }
    }

    Detail.overlay = {

        /**
         * 显示对话框
         *
         * @param cfg {src:框架的路径,width:对话框宽度,headerContent:对话框标题}
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
                    if (!that._isMessageShow) { // 有消息浮层的时候禁止对话框弹出
                        Detail.overlay.hide();
                        that._dialog.center();
                        that._dialog.show();
                    }
                }, 500);
            });
        },

        /**
         * 隐藏当前浮层
         */
        'hide' : function() {
            this._dialog && this._dialog.hide();
            this._overlay && this._overlay.hide();
        },

        /**
         * 显示浮层消息
         *
         * @param html 浮层内容
         * @param delay 延时毫秒
         * @param reload 是否刷新页面
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
         * 设置窗口宽度
         *
         * @param width 宽度
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

    //编辑标签功能：目前只有志愿者有功能
    //构造函数，需要实例化
    function Tag(){
        if(!D.get('#tags-edit')) return;
        this.init();
    }
    S.augment(Tag, {
        allTags: [],//从tms获取的所有的标签列表
        exitTags: [],//同tms比较后保留的标签
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
                        alert('TMS引入失败');
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
                            alert('最多只能5个标签');
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
 *单独拿出来右侧地回到顶部按钮
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
 * 论坛编辑器
 *
 * 需要在页面上提供以下值(由name指定的标签可有多个,由id指定的只可有一个):
 * 1)需要加载的插件:<input type="hidden" id="J_EditorPlugins" value="插件列表(逗号分隔的字符串)"/>
 * 2)需要提交到服务器的参数:<input type="hidden" name="J_EditorServerParams" data-name="参数名" data-value="参数值"/>
 * 3)编辑器限制最大字数<input type="hidden" id="J_EditorWordCount" value="最大字数"/>
 * 4)是否清空编辑器内容的标记<input type="hidden" id="J_EditorClearFlag" value="true或其他"/>
 *
 * 可绑定登录成功后的回调方法window['loginSuccess'].callback
 *
 * @author ck0123456@gmail.com
 * @date 2011-11-7
 *
 * @modifier: fatedm
 * @date 2012-10-26
 * @老版本页面用的1.1.6，编辑器用的1.1.7,全部升级至1.2.0
 * @将编辑器改为静态引入。
 * @字数统计在1.2.0改为自己编写插件，需要将代码写入文件。
 */
//KISSY.add({
//    editor:{
//        fullpath:"http://a.tbcdn.cn/s/kissy/1.2.0/??editor-min.js,editor/biz/ext/editor-plugin-pkg-min.js"
//    }
//})
/*
 字数统计插件
 @author 龙啸,承玉<yiminghe@gmail.com>
 */

KISSY.ready(function(S) {
    S.namespace('EditorPlugins.Wordcount');

    //参数：最大限制数，编辑器editor对象
    KISSY.EditorPlugins.Wordcount.bind = function(max, editor) {
        var textarea = new S.Node(editor.textarea);
        //在当前text编辑器后面加入操作节点
        var size = 0;
        S.DOM.insertAfter(S.DOM.create('<div class="J_WS">源码:已输入 ' +
            '<em class="J_WordSize">' + size + '</em>/最多输入 ' +
            '<em class="J_WsMax">' + max + '</em> <span class="J_WsTips"></span></div>'),
            textarea.parent('.ke-editor-wrap'));
        var wordsizenode = textarea.parent('.ke-editor-wrap').next('.J_WS')
            .children('.J_WordSize');
        var tips = "请减少源码数量，否则无法发布成功";
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
        //绑定save事件
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

    //编辑器实例化
    S.use('editor', function(S) {
        var D = S.DOM,
            E = S.Event,
            KE = KISSY.Editor,
            IO = S.io,
        // 需要加载的插件
            plugins = D.val('#J_EditorPlugins'),

        // 限制最大字符数
            wordCount = D.val('#J_EditorWordCount'),

        // 根目录
            baseUrl = location.protocol + '//' + location.host,

        // 需要提交到服务器的参数
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

        // 创建字号配置对象
            fontSizeItem = function(name, value) {
                return {
                    'value' : value,
                    'attrs' : { 'style' : 'position:relative;border:1px solid #DDDDDD;margin:2px;padding:2px' },
                    'name' : '<span style="font-size:' + value + '">' + name + '</span><span style="position:absolute;top:1px;right:3px">' + value + '</span>'
                };
            },

        // 创建字体配置对象
            fontFamilyItem = function(name, value) {
                return { 'name' : name, 'value' : value };
            },

        // 视频地址配置对象
            videoProdiver = function(reg, detect) {
                return { 'reg' : reg, 'width' : 480, 'height' : 400, 'detect' : detect };
            },

        // 创建编辑器
            editor = KE('#msgpost', {
                'attachForm' : true,
                'baseZIndex' : 10000,
                'pluginConfig' : {
                    'bgcolor' : false,
                    'image' : {
                        'upload' : { // 单个图片上传配置
                            'serverUrl' : baseUrl + '/json/batchImageUpload.htm',
                            'serverParams' : serverParams('#ke_img_up_watermark_1'), // 参数是是否加水印选框的id
                            'fileInput' : 'imgFile',
                            'sizeLimit' : 1000, // KB
                            'extraHtml' : '<p style="margin-top:5px"><input type="checkbox" checked="checked" id="ke_img_up_watermark_1" style="vertical-align:middle">图片加水印，防止别人盗用</p>'
                        }
                    },
                    'font-size' : { // 字号配置
                        'items' : [ fontSizeItem('标准',		'14px'),
                            fontSizeItem('大',		'16px'),
                            fontSizeItem('特大',		'18px'),
                            fontSizeItem('极大',		'20px') ],
                        'width' : '115px'
                    },
                    'font-family' : { // 字体配置
                        'items' : [ fontFamilyItem('宋体',				'SimSun'),
                            fontFamilyItem('黑体',				'SimHei'),
                            fontFamilyItem('楷体',				'KaiTi_GB2312'),
                            fontFamilyItem('微软雅黑',			'Microsoft YaHei'),
                            fontFamilyItem('Times New Roman',	'Times New Roman'),
                            fontFamilyItem('Arial',				'Arial'),
                            fontFamilyItem('Verdana',			'Verdana') ]
                    },
                    'draft' : { // 草稿配置
                        'interval' : 5,
                        'limit' : 10,
                        'helpHtml' : '<div style="width:200px"><div style="padding:5px">草稿箱能够自动保存您最新编辑的内容，如果发现内容丢失请选择恢复编辑历史</div></div>'
                    },
                    'multi-upload' : { // 多个图片上传配置
                        'holder' : '#imgup1',
                        'previewSuffix' : '_80x80.jpg',
                        'previewWidth' : '80px',
                        'serverUrl' : baseUrl + '/json/batchImageUpload.htm',
                        'serverParams' : serverParams('#ke_img_up_watermark_2'), // 参数是是否加水印选框的id
                        'fileInput' : 'imgFile',
                        'sizeLimit' : 1000, // KB
                        'numberLimit' : 15,
                        'extraHtml' : '<p style="margin-top:10px"><input type="checkbox" style="vertical-align:middle;margin:0 5px" checked="checked" id="ke_img_up_watermark_2"><span style="vertical-align:middle">图片加水印，防止别人盗用</span></p>'
                    },
                    'video' : { // 视频配置
                        'urlCfg' : [ { // TODO 不知道做什么的,去掉也不影响功能
                            'reg' : /tudou\.com/i,
                            'url' : baseUrl + '/json/getTudouVideo.htm?url=@url@&callback=@callback@' // 地址配置后端咨询:石冲
                        } ],
                        'urlTip' : '请输入优酷网、土豆网、酷6网的视频播放页链接...',
                        'providers' : [ videoProdiver(/youku\.com/i, function(url) { // 优酷
                            var m = url.match(/id_([^.]+)\.html$/);
                            if (m) {
                                return 'http://player.youku.com/player.php/sid/' + m[1] + '/v.swf';
                            } else if (url.match(/v_playlist\/([^.]+)\.html$/)) {
                                return;
                            } else {
                                return url;
                            }
                        }),
                            videoProdiver(/tudou\.com/i, function(url) { // 土豆
                                return url;
                            }),
                            videoProdiver(/ku6\.com/i, function(url) { // 酷6
                                var m = url.match(/show[^\/]*\/([^.]+)\.html$/);
                                if (m) {
                                    return 'http://player.ku6.com/refer/' + m[1] + '/v.swf';
                                } else {
                                    return url;
                                }
                            }) ]
                    }, // 视频配置
                    'xiami-music' : {
                        'musicPlayer' : KE.Config.base + 'music/niftyplayer.swf'
                    },
                    'resize' : {
                        'direction' : [ 'y?' ]
                    }
                } // pluginConfig
            }).use(plugins || 'undo', function() {

                    // 过滤器(去掉html中背景色的定义)
                    var dataFilter = this.htmlDataProcessor && this.htmlDataProcessor.dataFilter;
                    dataFilter && dataFilter.addRules({
                        'attribute' : {
                            'style' : function(value) {
                                value = value.replace(/background[a-z\-]*\s*:[^;]+(;|$)/g, '');
                                return value ? value : false;
                            }
                        }
                    });

                    // 不知道什么意思
                    if (S.Cookie.get('cookie1') || S.Cookie.get('_l_g_')) {
                        editor.document.body.id = 'editorbodyid';
                        UA_Opt.attachEvents(editor);
                    }

                    // 字数统计
                    KISSY.EditorPlugins.Wordcount.bind(2000, editor);
                    //粘贴时去掉样式
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

                        return html;  // 返回修改后的粘贴内容

                    })

                    // 以下在Detail页用
                    if (window['Detail']) {
                        var submitBtn = D.get('#submitBtn');

                        // 需要清空textarea内容
                        D.val('#J_EditorClearFlag') === 'true' && (editor.textarea.value = '');

                        // 有错误时跳到提交按钮的位置
                        S.ready(function() {
                            D.get('.error') && window.scrollTo(0, D.offset(submitBtn).top - 500);
                        });

                        // 未登录时弹出登录框
                        if (!plugins) {
                            var domain = location.hostname.indexOf('daily.taobao.net') !== -1 ? 'daily.taobao.net' : 'taobao.com',
                                src = 'http://login.' + domain + '/member/login.jhtml?style=mini&redirect_url=http://' + location.hostname + '/json/loginSuccess.htm&full_redirect=false&is_ignore=false';

                            submitBtn.disabled = true;

                            // 登录成功后的回调方法
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
                            }; // 登录成功后的回调方法

                            // 对话框获得焦点时弹出登录框
                            editor.on('focus', function(evt) {
                                if (!submitBtn.disabled) {
                                    return;
                                }
                                evt.halt();
                                Detail.overlay.showDialog({
                                    'src' : src,
                                    'width' : 345,
                                    'headerContent' : '登录'
                                });
                            });
                        } // 未登录时弹出登录框
                    } // 以上在Detail页用
                });
        // 字数统计

        window['editor'] = editor; // TODO 清理完老代码后希望不要再用全局变量
    });

    //datalazyload
    S.use('datalazyload', function(S, DataLazyLoad){
        new DataLazyLoad({ mod: 'auto' });
    })

    new Detail();
    new Detail.Tag();
});
