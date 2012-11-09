KISSY.namespace('App');
KISSY.add('search', function(S){
    var D = S.DOM,
        E = S.Event;
    function Search(cfg){
        var config = {
            navCls: 'current',
            moreCls:'a-show',
            submitCls: 'ts-hover',
            searchCls:'ts-show',
            searchId:'hiz'
        };
        this.config = S.merge(config, cfg);
        this.init();
    }

    S.augment(Search, {
        init : function(){
            this._switch();
            this._placeHolder();
            this._submit();
        },
        //切换搜索地址
        _switch : function(){
            var tabWrap = S.one('.J_Type');
            var tabList = tabWrap.all('li');
            var tabUl = D.get('#J_Type ul');
            var input = D.get('#J_ShopSearch');

            if(!tabUl || !input) return;
            tabWrap.on("mouseenter mouseleave", function(ev) {
                tabWrap[(ev.type == 'mouseenter') ? "addClass" : "removeClass"]('hover');
            });
            //
            S.each(tabList, function(tab) {
                E.on(tab, 'click', function(ev) {
                    var tar = ev.target,
                        condition = D.attr(tar, 'data-condition');
                    D.val('#condition', condition);
                    D.removeClass(tabWrap, 'hover');
                    D.prepend(tar, tabUl);
                });
            });
        },
        //搜索框内的搜索按钮
        _placeHolder : function(){
            var self = this,
                wrap = D.get('#J_searchForm'),
                cfg = self.config

            if (!wrap) return;

            var holder = D.get('label.J_Placeholder', wrap),
                inputEl = D.get('input.J_KeyWord', wrap),
                submitBt = D.get('.J_SearchMarket', wrap);

            if (!holder || !inputEl || !submitBt) return;

            setTimeout(function () {
                if (!S.trim(inputEl.value)) {
                    D.addClass(holder, cfg.searchCls);
                }
            }, 0);

            E.on(inputEl, 'focus blur', function (ev) {
                if (!S.trim(inputEl.value)) {
                    D.toggleClass(holder, cfg.searchCls);
                }
            });
            E.on(submitBt, 'mouseenter mouseleave', function(ev) {
                D.toggleClass(submitBt, cfg.submitCls);
            });
        },
        _submit : function(){
            var form = D.get('#J_searchForm');
            E.on(form, 'submit', function(){
                var val = D.val('#ts-keyword');
                if(!val){
                    alert('搜索内容不能为空');
                    return false;
                }else{
                    return true;
                }
            })
        }
    });
    S.App.Search = Search;
    return Search;
})

//消息提示
KISSY.add('msg', function(S){
    var D = S.DOM,
        E = S.Event,
        IO = S.IO;
    var isLogin = S.Cookie.get('_l_g_') && S.Cookie.get('_nk_') || S.Cookie.get('ck1') && S.Cookie.get('tracknick'),
        loc = window.location.href,
        isDaily = loc.indexOf('bbs.daily.taobao.net') !== -1 ?  1 : 0,
        URL = isDaily ? 'http://bbs.daily.taobao.net/json/get_message_count.htm':'http://bbs.taobao.com/json/get_message_count.htm',
        PURL = isDaily ? 'http://bbs.daily.taobao.net/forum/pc/my_message_list.htm?message_status=0' : 'http://bbs.taobao.com/forum/pc/my_message_list.htm?message_status=0';
    function Msg(){
        this.init();
    }
    S.augment(Msg,{
        init : function(){
            if(!isLogin) return;
            var self = this;
            this.ajax();
            S.later(function(){
                self.ajax();
            }, 60000, true, null)
        },
        ajax : function(){
            S.io({
                dataType:'jsonp',
                url:URL,
                jsonpCallback:"getMessageCount",
                success:function (d) {

                    if(d.count && d.isLogin){
                        var container = D.get('.msg-tip'),
                            html = ['<a target="_blank" href="', PURL, '"><b>', '</b> 条未读信息</a><s class="msg-tip-close"></s>'],

                            str = html[0] + html[1] + html[2] + d.count + html[3];
                        D.css(container, 'display', 'block');
                        D.html(container, str);

                        E.on(container, 'click', function(e){
                            var tar = e.target;
                            if(D.hasClass(tar, 'msg-tip-close')){
                                D.html(container, '');
                                D.css(container, 'display', 'none');
                            }else if(D.hasClass(tar, 'msg-link')){
                                D.css(container, 'display', 'none');
                            }
                        })
                    }
                }
            });
        }
    });
    S.App.Msg = Msg;
    return 	Msg;
})
/**
 * 导航交互
 */
KISSY.add('nav', function(S) {
    var D = S.DOM, E = S.Event,
        CURRENTCLS = 'current', SUBCURRENTCLS = 'current-sub',
        SELECTCLS = 'nav-select', HOVERCLS = 'nav-hover',
        HOVER = 'hover';
    /**
     * 导航交互
     * @param {Node} container
     * @param {Object} config
     */
    function Nav(container, config) {
        var self = this;

        self.config = S.merge(Nav.Config, config || {});
        self.container = D.get(container);
        self._init();
    }

    Nav.Config = {
        navLight: '',
        subnavLight: '',
        subnavId: '#sub-nav',
        curIndex: -1
    };

    S.augment(Nav, S.EventTarget, {
        /* 初始化 */
        _init: function() {
            var self = this, cfg = self.config;

            self._light();

            self.subnavArr = D.filter('#single-nav a', function(item) {
                var str = item.id.match(/J_Nav_(\w+)/) ? item.id.match(/J_Nav_(\w+)/)[1] : '',
                    tem = D.get('#J_Sub_' + str);

                if(tem && D.children(tem).length != 0) {
                    return true;
                } else {
                    return false;
                }
            });

            E.on(self.subnavArr, 'mouseenter mouseleave', function(ev) {
                var me = this, str, sub;
                if(D.hasClass(me, CURRENTCLS)) return;

                str = me.id.match(/J_Nav_(\w+)/)[1];
                sub = D.get('#J_Sub_' + str);

                if(ev.type === 'mouseenter') {

                    D.addClass(me, HOVER);

                    if(D.css(self.subContainer, 'display') == 'block') {
                        D.removeClass(self.subContainer, SELECTCLS);
                    }
                    S.each(D.query('.J_IsSubnav'), function(item){
                        D.css(item, 'display', 'none');
                    })
                    D.addClass(self.subContainer, HOVERCLS);

                    D.css(sub, 'display', 'inline');
                    //self.countLeft(me, sub);
                    self.currentSubnav && D.hide(self.currentSubnav);

                    E.on(sub, 'mouseleave', function(eev) {
                        self._recoverNav(me, sub);
                        E.remove(this, 'mouseleave', arguments.callee);
                    });

                } else {
                    var toElem = S.UA.ie ? ev.toElement : ev.relatedTarget;
                    if(!D.parent(toElem, '.J_IsSubnav') && !D.hasClass(toElem, 'J_IsSubnav')) {
                        self._recoverNav(me, sub);
                    }


                }
            });
        },
        /* 高亮 */
        _light: function() {
            var self = this, cfg = self.config;

            self.headerWrap = D.parent(self.container);
            self.subContainer = D.get(cfg.subnavId);
            //高亮一级
            if(cfg.navLight.length > 0) {
                self.highLightLine = 1;//当前页面有高亮时，2级导航的line显示
                self.current = D.get('#' + cfg.navLight, self.container);
                self.currentSubnav = D.get('#J_Sub_' + cfg.navLight.match(/J_Nav_(\w+)/)[1]);
                if(!self.current) return;

                D.addClass(self.current, CURRENTCLS);

                if(self.currentSubnav) {
                    self._showSubnav(self.currentSubnav);
                    //self.countLeft(self.current, self.currentSubnav);
                    if(self.headerWrap) {

                        D.css(self.headerWrap, 'margin-bottom', '48px');
                    }
                }
            }else{
                self.higLightLine = 0;
            }

            //高亮二级
            if(cfg.subnavLight.length > 0) {
                if(!self.subContainer) return;

                self.currentSub = D.get('#' + cfg.subnavLight, self.subContainer);
                if(!self.currentSub) return;

                D.addClass(self.currentSub, SUBCURRENTCLS);
            }
        },
        /* 显示二级导航 */
        _showSubnav: function(subnav) {
            var self = this;

            D.addClass(self.subContainer, SELECTCLS);
            D.css(self.subContainer, 'display', 'block');
            D.css(subnav, 'display', 'inline');
            //self.countLeft(self.current, subnav);
        },
        /* 恢复默认导航状态 */
        _recoverNav: function(navLi, subnav) {
            var self = this;

            D.removeClass(navLi, HOVER);
            D.removeClass(self.subContainer, HOVERCLS);

            if(D.css(self.subContainer, 'display') == 'block') {
                D.addClass(self.subContainer, SELECTCLS);
            }

            //self.countLeft(navLi, subnav);
            D.hide(subnav);

            self.currentSubnav && D.show(self.currentSubnav);
        },
        /* 计算二级导航left */
        countLeft: function(navLi, subnav) {
            var docWidth = document.documentElement.clientWidth > 990 ? document.documentElement.clientWidth : 990,
                side = (docWidth - 990) / 2 ,
                navLiWidth = D.width(navLi),
                subnavWidth = D.width(subnav),
                pos = D.offset(navLi).left,
                mid = pos - side + navLiWidth/2,
                left = mid - subnavWidth/2;
            if( subnavWidth/2 > mid || (mid + subnavWidth/2) > 990){
                left = 0;
            }
            D.css(subnav, 'margin-left', left + 'px');

        }
    });
    S.App.Nav = {
        init : function(){
            S.ready(function() {
                var navNode = D.get('#nav'),
                    navLight = D.get('#J_NavLight'),
                    subnavLight = D.get('#J_SubnavLight');

                if(!navNode) return;

                var myNav = new Nav(navNode, {
                    navLight: navLight ? navLight.value : '',
                    subnavLight: subnavLight ? subnavLight.value : ''
                });
            });
        }
    }
    return Nav;
});
KISSY.App.SlideAllChl = function(){
    var S = KISSY,
        D = S.DOM,
        E = S.Event;

    //导航下拉
    var nav = D.get('.multi-nav'),
        trigger = D.get('.nav-trigger'),
        con = D.get('.category');

    E.on(nav, 'mouseenter mouseleave', function(e){
        var viewport = document.documentElement.clientWidth < 990 ? 990 : document.documentElement.clientWidth,
            left = -1*(parseInt((viewport-990)/2));
        //设置导航下拉框的宽度
        D.css(con,{
            width : viewport  + 'px',
            left : left + 'px'
        });
        if(e.type == 'mouseenter'){
            D.addClass(trigger, 'nav-trigger-on');
            D.css(con, 'display', 'block');
        }else if(e.type == 'mouseleave'){
            D.removeClass(trigger, 'nav-trigger-on');
            D.css(con, 'display', 'none');
        }
    });

}
KISSY.ready(function(S){
    //异步请求消息数
    new S.App.Msg();
    //搜索
    new S.App.Search();
    //全部频道
    S.App.SlideAllChl();
    //导航
    S.App.Nav.init();
    //问卷调查
    (function(el, topV){
        var D = S.DOM,
            E = S.Event;
        if (S.UA.ie != 6 || !D.get(el)) return;

        var obj = D.get(el);

        D.css(obj, {'position' : 'absolute', top : topV + 'px'});

        E.on(window, 'scroll resize', function(ev) {
            D.css(obj, 'top', (topV+D.scrollTop())+'px');
        });
    })('.J_siteFeedback', 200);

})