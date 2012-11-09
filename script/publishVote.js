/**
 * Created with JetBrains PhpStorm.
 * User: dmm
 * Date: 12-10-30
 * Time: 上午10:26
 * To change this template use File | Settings | File Templates.
 */

/**
 * editor
 */
KISSY.ready(function(S){
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
    S.use('editor', function(S) {
        var KE = S.Editor;

        window.editor = KE("#msgpost", {
            attachForm:true,
            baseZIndex:10000,

            pluginConfig: {
                bgcolor:false,
                "image":{
                    upload:{
                        serverUrl:"http://bbs.taobao.com/json/batchImageUpload.htm",
                        serverParams:{
                            groupId:'1338197',uuid:'AF74CFCBAC17B1B1726734565A636625',
                            cookie:document.cookie,
                            waterMark:function() {
                                return S.one("#ke_img_up_watermark_1")[0].checked;
                            }
                        },
                        fileInput:"imgFile",
                        sizeLimit:1000,//k
                        extraHtml:"<p style='margin-top:5px;'><input type='checkbox' checked='checked' id='ke_img_up_watermark_1' style='vertical-align:middle;'> 图片加水印，防止别人盗用</p>"
                    }
                },
                "font-size":{
                    items:[
                        {
                            value:"14px",
                            attrs:{
                                style:'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                            },
                            name:"" +
                                " <span style='font-size:14px'>标准</span>" +
                                "<span style='position:absolute;top:1px;right:3px;'>14px</span>"
                        },
                        {
                            value:"16px",
                            attrs:{
                                style:'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                            },
                            name:"" +
                                " <span style='font-size:16px'>大</span>" +
                                "<span style='position:absolute;top:1px;right:3px;'>16px</span>"
                        },
                        {
                            value:"18px",
                            attrs:{
                                style:'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                            },
                            name:"" +
                                " <span style='font-size:18px'>特大</span>" +
                                "<span style='position:absolute;top:1px;right:3px;'>18px</span>"
                        },
                        {
                            value:"20px",
                            attrs:{
                                style:'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
                            },
                            name:"" +
                                " <span style='font-size:20px'>极大</span>" +
                                "<span style='position:absolute;top:1px;right:3px;'>20px</span>"
                        }
                    ],
                    width:"115px"
                }
                ,"font-family":{
                    items:[
                        {name:"宋体",value:"SimSun"},
                        {name:"黑体",value:"SimHei"},
                        {name:"楷体",value:"KaiTi_GB2312"},
                        {name:"微软雅黑",value:"Microsoft YaHei"},
                        {name:"Times New Roman",value:"Times New Roman"},
                        {name:"Arial",value:"Arial"},
                        {name:"Verdana",value:"Verdana"}
                    ]
                },
                "draft":{
                    interval:5,
                    limit:10,
                    helpHtml: "<div " +
                        "style='width:200px;'>" +
                        "<div style='padding:5px;'>草稿箱能够自动保存您最新编辑的内容," +
                        "如果发现内容丢失" +
                        "请选择恢复编辑历史</div></div>"
                }
                ,"multi-upload":{
                    holder:"#imgup1",
                    previewSuffix:"_80x80.jpg",
                    previewWidth:"80px",
                    serverUrl:"http://bbs.taobao.com/json/batchImageUpload.htm",
                    serverParams:{
                        groupId:'1338197',uuid:'AF74CFCBAC17B1B1726734565A636625',
                        cookie:document.cookie,
                        waterMark:function() {
                            return S.one("#ke_img_up_watermark_2")[0].checked;
                        }
                    },
                    fileInput:"imgFile",
                    sizeLimit:1000//k,
                    ,numberLimit:15,
                    extraHtml:"<p style='margin-top:10px;'>" +
                        "<input type='checkbox' " +
                        "style='vertical-align:middle;margin:0 5px;' " + "checked='checked'"+
                        "id='ke_img_up_watermark_2'>" +
                        "<span style='vertical-align:middle;'>图片加水印，防止别人盗用</span></p>"
                },
                "video":{
                    urlCfg:[
                        {
                            reg:/tudou\.com/i,
                            url:"http://bbs.taobao.com/json/getTudouVideo.htm?" +
                                "url=@url@&callback=@callback@"//"&rand=@rand@"
                        }
                    ],
                    urlTip:"请输入优酷网、土豆网、酷7网的视频播放页链接...",
                    providers:[
                        {
                            reg:/youku\.com/i,
                            width:480,
                            height:400,
                            detect:function(url) {
                                var m = url.match(/id_([^.]+)\.html$/);
                                if (m) {
                                    return "http://player.youku.com/player.php/sid/" + m[1] + "/v.swf";
                                }
                                m = url.match(/v_playlist\/([^.]+)\.html$/);
                                if (m) {
                                    return;
                                    //return "http://player.youku.com/player.php/sid/" + m[1] + "/v.swf";
                                }
                                return url;
                            }
                        },
                        {
                            reg:/tudou\.com/i,
                            width:480,
                            height:400,
                            detect:function(url) {
                                return url;
                            }
                        },
                        {
                            reg:/ku6\.com/i,
                            width:480,
                            height:400,
                            detect:function(url) {
                                var m = url.match(/show[^\/]*\/([^.]+)\.html$/);
                                if (m) {
                                    return "http://player.ku6.com/refer/" + m[1] + "/v.swf";
                                }
                                return url;
                            }
                        }/*,
                         {
                         reg:/taobaocdn\.com/i,
                         width:480,
                         height:400,
                         detect:function(url) {
                         return url;
                         }
                         }*/
                    ]
                },"xiami-music":{
                    //必须和网址url同域而不是类库同域
                    musicPlayer:KE.Config.base + "music/niftyplayer.swf"
                },
                "resize":{
                    direction:["y"]
                }
            }
        }).use("htmldataprocessor,enterkey,clipboard,preview,separator,undo,separator,removeformat,font,color,separator,list,indent,justify,separator,image,multi-upload,video,xiami-music,smiley,separator,table,resize,draft,maximize"
            , function() {
                var self = this,
                    htmlDataProcessor = self.htmlDataProcessor,
                    dataFilter = htmlDataProcessor && htmlDataProcessor.dataFilter;
                if (dataFilter) {
                    dataFilter.addRules({
                        attributes:{
                            style:function(value) {
                                value = value.replace(/background-color\s*:[^;]+(;|$)/g, "")
                                    .replace(/background\s*:[^;]+(;|$)/g, "");
                                if (!value) return false;
                                return value;
                            }
                        }
                    });
                }
                if ((KISSY.Cookie.get('cookie1') || KISSY.Cookie.get('_l_g_')) != '')
                {
                    editor.document.body.id='editorbodyid';
                    UA_Opt.attachEvents(window.editor);
                }

            });


    });
    // 字数统计
    KISSY.EditorPlugins.Wordcount.bind(2000, editor);
});

/**
 *bangpai.mask.js
 *
 * @author: fatedm
 * @class: masklayer
 * @return: {object} 显示隐藏浮层
 */
KISSY.add('masklayer', function(S){
    var D = S.DOM,
        E = S.Event,
        doc = document,
        _option = {
            color: "#000",
            timer: 1000,
            zIndex: 9991,
            opacity: 0.2,
            maskDiv: '_flowerDiv',
            maskIframe: '_flowIFRAME',
            openDiv: function(){}
        };
    function MaskLayer(option) {
        option = S.merge(_option, option);
        var _height = Math.max(doc.documentElement.scrollHeight, doc.documentElement.clientHeight),
            _width = doc.documentElement.scrollWidth,
            _cssText = "margin:0px; background:"
                + _option.color
                + "; opacity:"
                + _option.opacity
                + "; filter:alpha(opacity="
                + _option.opacity * 100
                + "); position:absolute; left:0; top:0; overflow:hidden; display:none",
            _div = D.create("<div>"),
            _iframe = D.create("<iframe>");

        _div.id = option.maskDIV;
        _div.style.cssText = _cssText;
        D.css(_div, {
            width: _width + 'px',
            height: _height + 'px',
            zIndex: option.zIndex
        });
        D.append(_div, 'body');

        _iframe.id = option.maskIframe;
        _iframe.style.cssText = _cssText;
        D.css(_iframe, {
            width: (parseInt(_width, 10) - 5) + 'px',
            height: _height + 'px',
            zIndex: option.zIndex - 1
        });
        option.openDiv();

        //处理窗口大小变化时的bug
        E.on(window, 'resize', function(){
            var docWidth = doc.documentElement.scrollWidth - 5,
                docHeight = Math.max(doc.documentElement.scrollHeight,doc.documentElement.clientHeight);
            D.css('#' + option.maskDiv, {
                width: docWidth + 'px',
                height: docHeight + 'px'
            });
            D.css('#' + option.maskIframe, {
                width: docWidth + 'px',
                height: docHeight + 'px'
            })
        });
        return {
            show: function (_method) {
                var height = Math.max($.documentElement.scrollHeight,$.documentElement.clientHeight),
                    width = $.documentElement.scrollWidth - 5;
                D.css('#' + option.maskDiv, {
                    width: width + 'px',
                    height: height + 'px',
                    display: 'block'
                });
                D.css('#' + option.maskIframe, {
                    width: width + 'px',
                    height: height + 'px',
                    display: 'block'
                });
                _method && _method();
            },
            showInterval: function (speed, _method) {
                var _iframe = D.get('#' + option.maskIframe),
                    _div = D.get('#' + option.maskDiv),
                    ts = 0.1,
                    timer = function () {};
                D.css(_iframe, 'display', 'block');
                D.css(_div, 'display', 'block');

                if (!document.all) {
                    _div.style.opacity = _iframe.style.opacity = ts;
                } else {
                    _div.filters.Alpha.opacity = _iframe.filters.Alpha.opacity = 1;
                }
                timer = setInterval(function () {
                    if (!document.all)  {
                        _div.style.opacity = _iframe.style.opacity = ts;
                    } else {
                        _div.filters.Alpha.opacity = _iframe.filters.Alpha.opacity = ts * 100;
                    }
                    if (ts >= 1.00) {
                        clearInterval(timer);
                        ts = 0.01;
                        eval(acc.OK)();
                    }
                    ts = ts + 0.1;
                }, speed);

            },
            hide: function (_method) {
                D.hide('#' + option.maskDiv);
                D.hide('#' + option + maskIframe);
                _method && _method();
            },
            hideInterval: function (speed, _method) {
                var _iframe = D.get('#' + option.maskIframe),
                    _div = D.get('#' + option.maskDiv),
                    max = speed || 250,
                    cur = max / 4,
                    timer = setInterval(function () {
                        var width = _iframe.offsetWidth - max,
                            height = _iframe.offsetHeight - max,
                            marginLeft = parseInt(_iframe.style.marginLeft) + (max / 2),
                            marginTop = parseInt(_iframe.style.marginTop) + (max / 2);
                        D.css(_iframe, {
                            width: width + 'px',
                            height: height + 'px',
                            marginLeft: marginLeft + 'px',
                            marginTop: marginTop + 'px'
                        });
                        D.css(_div, {
                            width: width + 'px',
                            height: height + 'px',
                            marginLeft: marginLeft + 'px',
                            marginTop: marginTop + 'px'
                        });
                        if ( _iframe.offsetWidth < 500) {
                            max = cur;
                        };
                        if (_iframe.offsetWidth < (max / 4)) {
                            clearInterval(timer);
                            D.hide(_iframe);
                            D.hide(_div);
                            _method && _method();
                        };
                    }, 10);
            },
            color: function (color) {
                D.css('#' + option.maskIframe, 'backgroundColor', color);
                D.css('#' + option.maskDiv, 'backgroundColor', color);
            }
        }
    }

})

/**
 * 投票项目 (从文字投票处 打开图片投票地址 的操作)
 * @author ziya@taobao.com
 * @date   2009-12-20
 *
 * @modifier fatedm
 * @date     2012-10-30
 */
KISSY.add('textVote', function(S){
    var D = S.DOM,
        E = S.Event,
        IO = S.IO;
    return (function(){
        var j_text = D.get('#j_open'),/*触发显示tips涂层的事件的Dom元素*/
            j_parent = j_text.parentNode.parentNode,/*父节点，相对定位*/
            pointX = -30,/*定义坐标变量*/
            pointY = -75,
            mouse_tip = D.get('.mouse_tip'),/*鼠标移上去显示的tips层*/
            click_tip = D.get('.click_tip'),/*鼠标点击后显示的tips层*/
            handle = {
                /**
                 * 初始化
                 * @url ajax成功请求后，打开的图片投票链接地址
                 * @link 访问的ajax地址
                 */
                init: function (url, link) {
                    D.css(j_parent, {
                        position: 'relative',
                        zIndex: 3334
                    });
                    D.css('#header', {
                        zIndex: 3333
                    });
                    this.mouseBind();
                    this.clickBind(url, link);
                },
                mouseBind: function () {
                    var ctrl; /*显示隐藏控制*/
                    /*设置mouse_tip图层的展现位置*/
                    E.on(j_text, 'mouseover', function(){
                        ctrl = false;
                        D.css(mouse_tip, {
                            right: pointX + 'px',
                            top: pointY + 'px',
                            display: 'block'
                        })
                    });

                    /*鼠标离开后关闭 mouse_tip 层*/
                    E.on(j_text, 'mouseout', function(){
                        ctrl = true;
                        S.later(function(){
                            D.css(mouse_tip,'display') != 'none' && ctrl &&  D.css(mouse_tip,'display','none');
                        }, 5000, false, null, false);
                    });
                },
                /**
                 * @url ajax成功请求后，打开的图片投票链接地址
                 * @link 访问的ajax地址
                 */
                clickBind: function (url, link) {
                    E.on(j_text, 'click', function(){
                        IO({
                            type: 'get',
                            url: link + "?time=" + new Date(),
                            dataType: 'json',
                            success: function(json){
                                /**
                                 * 约定:
                                 * json.status==1 权限等级不够 不能打开图片投票
                                 * json.status==0 权限等级足够 能打开图片投票
                                 */
                                var ctrl;

                                /*权限不满足*/
                                if (json.status == 1){
                                    /*设置点击后 click_tip 的展示位置 并更换样式 */

                                    D.hide(mouse_tip);
                                    D.css(click_tip, {
                                        right: pointX + 'px',
                                        top: pointY + 'px',
                                        display: 'block'
                                    });
                                    D.addClass(j_text.parentNode, 'open-img-v2');
                                    /*移除事件*/
                                    E.detach(j_text);

                                    /*重新渲染元素内容*/
                                    j_text.parentNode.innerHTML = '<a id="j_open" style="color:#999" >打开发表图片投票</a>';

                                    /*绑定新的事件*/
                                    j_text = D.get('j_open');
                                    E.on(j_text, 'mouseover', function(){
                                        ctrl = false;
                                        D.css(click_tip, {
                                            right: pointX + 'px',
                                            top: pointY + 'px',
                                            display: 'block'
                                        });
                                    });

                                    E.on(j_text, 'mouseout', function(){
                                        ctrl = true;
                                        S.later(function(){
                                            D.css(click_tip, 'display') != 'none' && ctrl &&  D.css(click_tip, 'display', 'none');
                                        }, 5000);
                                    });

                                    /*权限满足*/
                                } else if (json.status == 0){
                                    window.open(url, '_blank');
                                    S.later(function(){
                                        D.css(click_tip, 'display', 'none');
                                    }, 5000);
                                }
                            }
                        });

                    });
                }
            }
        return handle;
    })();
});

/**
 * @picVoteUrl ajax成功请求后，打开的图片投票链接地址
 * @checkUrl 访问的ajax地址
 * 页面初始化调用例: TB.textVote.open.init(picVoteUrl,checkUrl);
 */


/**
 *bangpai.vote.time.js
 */
(function(S){
    var D = S.DOM,
        E = S.Event,
        selects = D.query('#j_time select'),
        yearSelect = selects[0],
        monthSelect = selects[1],
        daySelect = selects[2],
        hourSelect = selects[3],
    //定义当前的时间，年，月，日，小时
        myDate = new Date(),
        y = myDate.getFullYear(),
        m = myDate.getMonth() + 1,
        d = myDate.getDate(),
        h = myDate.getHours(),
    //定义k为选中月的 day (天数)
        k = 0,
        Matrix = {
            //判断是否是闰年;
            isLeapYear: function (year) {
                return (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)));
            },
            //获取选中月的天数
            getK: function (m, y) {
                if (this.isLeapYear(y) && m == 2){
                    k = 29;
                } else {
                    if ( m == 2 ) {
                        k = 28;
                    } else {
                        if( m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
                            k = 31;
                        } else {
                            k = 30;
                        }
                    }
                }
                return k;
            },
            //设置年份 今年和明年
            setYear: function () {
                yearSelect.options[0] = new Option(y, y);
                yearSelect.options[1] = new Option(y + 1, y + 1);
            },
            //年份选择器事件
            yearchange: function () {
                var monthSelect = selects[1];
                if (this.value != 0){
                    if ( selects[0].value == y) {
                        monthSelect.options.length = 0;
                        for (var i = m; i < 13; i++) {
                            monthSelect.options.add(new Option(i, i));
                        }
                    } else {
                        monthSelect.options.length = 0;
                        for (var i = 1; i < 13; i++) {
                            monthSelect.options.add(new Option(i, i));
                        }
                    }
                }
            },
            //月份选择器事件
            yuechange: function () {
                if (this.value != 0) {
                    if (yearSelect.value == y && monthSelect.value == m) {
                        daySelect.options.length = 0;
                        for(var i = d; i < Matrix.getK(monthSelect.value, yearSelect.value) + 1; i++){
                            daySelect.options.add(new Option(i, i));
                        }
                    } else {
                        daySelect.options.length = 0;
                        for (var i = 1; i < Matrix.getK(monthSelect.value, yearSelect.value) + 1; i++){
                            daySelect.options.add(new Option(i, i));
                        }
                    }
                }
            },
            //日期天数选择器事件
            daychange: function () {
                var self = this;
                if (this.value != 0) {
                    if (daySelect.value == d && yearSelect.value == y && monthSelect.value == m){
                        hourSelect.options.length = 0;
                        for(var i = h + 1; i < 24; i++){
                            hourSelect.options.add(new Option(i + "时", i));
                        }
                    } else {
                        hourSelect.options.length = 0;
                        for (var i = 0; i < 24; i++) {
                            hourSelect.options.add(new Option(i + "时", i));
                        }
                    }
                }
            },
            //绑定select选择器事件
            bind: function () {
                var self = this;
                E.on(yearSelect, 'change', function(){
                    self.yearchange();
                    self.yuechange();
                    self.daychange();
                });
                E.on(monthSelect, 'change', function(){
                    self.yuechange();
                    self.daychange();
                });
                E.on(daySelect, 'change', function(){
                    self.daychange();
                });
            },
            //初始化
            init: function () {
                this.bind();
                this.setYear();
                this.yearchange();
                this.yuechange();
                this.daychange();
                yearSelect.value = yearSelect.options[0].value;
                var k2 = this.getK(monthSelect.value, yearSelect.value);
                var d2 = d + 15;
                if ( d2 > k2) {
                    d2 = d2 - k2;
                    if ( m + 1 < 13) {
                        monthSelect.value = m + 1;
                    } else {
                        yearSelect.value = yearSelect.options[1].value;
                        this.yearchange();
                        monthSelect.value = 1;
                    }
                    this.yuechange();
                    daySelect.value = d2;
                    this.daychange();
                }else{
                    this.yearchange();
                    this.yuechange();
                    hourSelect.options.length = 0;
                    for(var i = 0; i < 24; i++){
                        hourSelect.options.add(new Option(i + "时", i));
                    }
                    daySelect.value = d + 15;
                    hourSelect.value = h + 1;
                }
            }
        };
    Matrix.init();
})(KISSY);

/**
 *bangpai.select.js
 */
/**
 * 投票项目 (文字和图片投票中的 最大可选项组件)
 * @author ziya@taobao.com
 * @date   2009-12-20
 */
KISSY.add('select', function(S){
        var D = S.Dom,
            E = S.Event,
            handle = {
                /*初始值，最小值，最大值*/
                config: {
                    normal: 2,
                    min: 2,
                    max: 60
                },
                /*初始化控件*/
                init: function(name, config){
                    var _config,
                        _arr = [];

                    /*如果限定范围则改换默认配置*/
                    _config = config ? config : this.config;

                    /*传入多个数组初始化*/
                    if ( typeof name != "string" && name.length){
                        for (var i = 0; i < name.length; i++) {
                            handle.bind(name[i], _config);
                            _arr.push(D.get(name[i]));
                        }
                        return handle.fn.apply(_arr);
                    } else {
                        /*单个控件初始化*/
                        handle.bind(name, _config);
                        return handle.fn.apply(D.get(name));
                    }
                },
                bind: function (el, config) {
                    var txt = D.get(el + ' input'),
                        up = D.next(txt),
                        down = D.next(up),
                        config = config || this.config;
                    /*txt:输入数字的 input 元素 ,up:按上增加值的 a 元素,down:按下减值的 a 元素*/

                    /*定义控件的初始值*/
                    if(typeof parseInt(txt.value) != "number" || typeof parseInt(txt.value)!=""){
                        txt.value = config.normal;
                    }

                    /*绑定加法*/
                    E.on(up, 'click', function(){
                        handle.plus(txt, config);
                    });

                    /*绑定减法*/
                    E.on(down,'click',function(){
                        handle.minus(txt, config);
                    });

                    /*只能输入数字和退后键*/
                    E.on(txt,'keydown',function(e){
                        if (!(e.keyCode > 47 && e.keyCode < 58 || e.keyCode > 95 && e.keyCode < 106 || e.keyCode == 8 || e.keyCode == 110)){
                            e.preventDefault && e.preventDefault();
                            e.returnValue = false;
                        }
                    });
                },

                /*控件的值加一*/
                plus: function(txt,config){
                    var config = config || this.config;
                    if (typeof parseInt(txt.value) == "number" && parseInt(txt.value) < config.max && txt.disabled == false){
                        txt.value = parseInt(txt.value) + 1;
                    }
                },

                /*控件的值减一*/
                minus: function(txt, config) {
                    var config = config || this.config;
                    if(typeof parseInt(txt.value) == "number" && parseInt(txt.value) > config.min && txt.disabled == false) {
                        txt.value = parseInt(txt.value) - 1;
                    }
                },

                fn: function () {
                    var self = this;
                    return {
                        /*清除控件的值或重置值*/
                        clear: function (num, index) {
                            if (self.length) {
                                if (index) {
                                    for (var i = 0; i < self.length; i++) {
                                        if(index == i) {
                                            D.children(self[i], 'input')[0].value = num || 0
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < self.length; i++) {
                                        D.children(self[i], 'input')[0].value = num || 0;
                                    }
                                }
                            } else {
                                D.getFirstChild(self).value = num || 0;
                            }
                        },

                        /*绑定方法*/
                        bind: function (pme, fn) {
                            E.on(self, pme, fn);
                        },

                        /*设置控件不可编辑*/
                        close: function (num) {
                            if (self.length) {
                                if (num) {
                                    for (var i = 0; i < self.length; i++) {
                                        if (num == i) {
                                            D.children(self[i], 'input')[0].disabled = true;
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < self.length; i++) {
                                        D.children(self[i], 'input')[0].disabled = true;
                                    }
                                }
                            }else{
                                D.children(self, 'input')[0].disabled = true;
                            }
                        },

                        /*获取控件的值*/
                        getValue: function () {
                            if (self.length) {
                                var _arr = [];
                                for (var i = 0; i < self.length; i++) {
                                    _arr.push( D.children(self[i], 'input')[0].value );
                                }
                                return _arr;
                            } else {
                                var _value = D.children(self, 'input')[0].value;
                                return _value;
                            }
                        }
                    }
                }
            }
        return handle;

});



/**
 * 调用方法
 * 页面初始化调用例:
 *                   TB.select.init('j_select');
 *                   TB.select.init('j_select',{normal:2,min:2,max:60});
 *                   TB.select.init(['j_select1','j_select2','j_select3']);
 *                   TB.select.init(['j_select1','j_select2','j_select3'],{normal:2,min:2,max:60});
 *
 * 重置或修改数据:
 * @num 被赋予的值
 * @index 索引值 第几个组件对象
 * clear(num,index)
 *                   var flower=TB.select.init('j_select');
 *						 flower.clear(999,0);
 *
 * 关闭组件 不能修改
 *                   var flower=TB.select.init('j_select');
 *                   flower.close();
 * 获取组件的值
 *                   var flower=TB.select.init('j_select');
 *                   flower.getValue();
 * 绑定事件
 *                   var flower=TB.select.init('j_select');
 *                   flower.bind('click',function(){
 *						//...
 *					 });
 */


/**
 *post.js
 */

(function (S) {
    var D = S.DOM,
        E = S.Event,
        sum = 0,
        _sub = function () {
            var _tr = (function() {
                var _arr = [],
                    trs = D.query('#vote-post tr');
                for (var i = 0, len = trs.length; i < len; i++) {
                    if (D.css(trs[i], 'display') !== 'none') {
                        _arr.push(trs[i]);
                    }
                }
                return _arr;
            })(),
            arr = '',
            imglink = '',
            title = '',
            href = '',
            j_close;
            for (var i = 0; i < _tr.length; i++) {
                title = _tr[i].getElementsByTagName('input')[0].value;
                href = _tr[i].getElementsByTagName('a')[_tr[i].getElementsByTagName('a').length - 3].title;
                if (title == "" && href != ""){
//                    _empty = true;
                    sum++;
                }
                j_close = D.get('.j_close', _tr[i]).className;
                if (_tr[i].style.display != 'none' && j_close == "j_close") {
                    arr += title + "\u0010" + (href == "" ? " " : href) + "\u0010" + (imglink == "" ? " " :  imglink) + "\u0011";
                }
            }
            return arr;
        },
        _getMaxAnswer = function () {
            return D.prop('#j_radio1', 'checked') ? 1 : D.val('#j_multiple');
        },
        _getEndDate = function() {
            var time = "";
            time = time + D.val('#J_Year') + "-";
            time = time + D.val('#J_Month') + "-";
            time = time + D.val('#J_Date') + " ";
            time = time + D.val('#J_Hour');
            return time;
        };

    E.on('#j_submit', 'click', function(ev){
        D.val('#j_options', _sub());
        if (sum > 0) {
            if (!confirm("您有未填写的选项描述，是否继续发表?")) {
                //alert('否');
                ev.halt();
                return;
            } else {
                //alert('选择了是');
                D.val('#maxAnswer', _getMaxAnswer());
                D.val('#endDate', _getEndDate());
                //	document.all["pollForm"].submit();
            }
        } else {
            //alert('没有空表单');
            D.val('#maxAnswer', _getMaxAnswer());
            D.val('#endDate', _getEndDate());
            //document.all["pollForm"].submit();
        }
    });

    if(D.prop('#j_radio2', 'checked')){
        D.css('#j_multiple_span', 'display', 'inline-block');
    }
    E.on('#j_radio2', 'click', function () {
        if (this.checked == true) {
            D.css('#j_multiple_span', 'display', 'inline-block');
        }
    })
    E.on('#j_radio1', 'click', function() {
        if (this.checked == true) {
            D.css('#j_multiple_span', 'display', 'none');
        }
    })
    if (D.prop('#j_radio2', 'checked')) {
        D.css('#j_multiple_span', 'display', 'inline-block');
    }

})(KISSY);

/**
 *post.vote.js
 */
/*
 * @intro 文字投票帖(增加,编辑,删除)模块
 * @author ziya
 * @date 2009.12.01
 */
KISSY.add('vote', function(S, Overlay){
    var D = S.DOM,
        E = S.Event,
        $ = S.Node.all,
        IO = S.IO,
        Cookie = S.Cookie,
        hasShowedTip = false,
        DEFAULTROW = 5,//默认投票最大选项
//        j_link = $('.j_link'),
//        j_close = $('.j_close'),
//        j_false = $('.j_false'),
//        j_true = $('.btn-true'),
//        j_edit = $('.j_showlink_edit'),
//        j_del = $('.j_showlink_del'),
//        j_addItem = $('.j_add_item'),
        vote_table = D.get('.vot-table'),
        obj = D.get('#vote-post'),
        tr = D.query('#vote-post tr'),
        sum = 0,
        handler = {
            init: function () {
                var that = this;
                //提示框
                that.showTip();
                //最多100个选项，超过将添加按钮隐藏
                //监听tr的hover事件
                S.each(tr, function(item){
                    if (D.css(item, 'display') !== 'none') {
                        sum++;
                    }
                    E.on(item, 'mouseover mouseout', function(e){
                        if (e.type === 'mouseover') {
                            that.showAction(this);
                        } else {
                            that.hideAction(this);
                        }
                    })
                });

                that.checkSum();
                //事件代理
                E.on(vote_table, 'click', function (e) {
                    var tar = e.target;
                    if (D.hasClass(tar, 'j_close')) {
                        that.removeTr(tar);
                    } else if (D.hasClass(tar, 'j_link')) {
                        that.showEdit(tar);
                    } else if (D.hasClass(tar, 'j_false')) {
                        that.cancelLink();
                    } else if (D.hasClass(tar, 'j_true')) {
                        that.confirmLink();
                    } else if (D.hasClass(tar, 'j_showlink_edit')) {
                        that.editLink();
                    } else if (D.hasClass(tar, 'j_add_item')) {
                        that.addItem();
                    } else if (D.hasClass(tar, 'J_showlink_del')) {
                        that.delLink();
                    } else if (D.hasClass(tar, 'close-tip')) {
                        D.get('#j_tip') && D.hide('#j_tip');
                    }
                });

                //
            },
            checkSum: function () {
                if (sum >= 100) {
                    D.hide('.j_add-item');
                    sum = null;
                }
            },
            showTip: function () {
                if (hasShowedTip || D.query('.j_link2').length) {
                    return;
                }
                var div = D.creat('<div></div>'),
                    bd = D.get('.bd', obj);
                D.css(div, {
                    id: 'j_tip',
                    width: '173px',
                    height: '58px',
                    background: 'url(http://img04.taobaocdn.com/tps/i4/T1Gc0pXgdXXXXXXXXX-173-58.gif) no-repeat 0 0',
                    position: 'absolute',
                    top: '-32px',
                    left: '482px'
                });
                D.html(div, '<a class="close-tip" href="javascript:void(0)" style="display:block;width:18px;height:18px;float:right"><a/>');

                D.css(bd, 'position', 'relative');
                D.append(div, bd);

                hasShowedTip = true;

            },
            showAction: function (item) {
                D.css(item, 'background', '#f2f2f2');
                D.css(D.get('.j_close', item), 'visibility', 'visible');
                if (D.attr(item, 'data-edited')) {
                    D.css(D.get('.j_showlink_edit'), 'display', 'inline');
                    D.css(D.get('.j_showlink_del'), 'display', 'inline');
                }
            },
            hideAction: function (item) {
                D.css(item, 'background', '#fff');
                D.css(D.get('.j_close', item), 'visibility', 'visible');
                if (D.attr(item, 'data-edited')) {
                    D.css(D.get('.j_showlink_edit'), 'display', 'none');
                    D.css(D.get('.j_showlink_del'), 'display', 'none');
                }
            },
            removeTr: function (tar) {
                if (!confirm('是否删除此选项？')) return false;

                var trNum = D.query('#vote-post tr').length - 1,  //第一个tr隐藏
                    tr = D.parent(tar, 'tr');
                if (trNum < 2) {
                    D.html('#add_msg', '<p class="error" >不能少于最小选项数</p>');
                    D.show('#add_msg');
                    S.later(function(){
                        D.hide('#add_msg');
                    }, 2000);
                    return false;
                }
                D.remove(tr);
                S.each(D.query('.j_name'), function(item, index){
                    D.html(item, '选项' + index + '：');
                })
                D.show('#j_add_item');
            },
            delLink: function (tar) {
                var con = D.parent(tar, '.con'),
                    parent = D.parent(tar),
                    text = D.get('.j_showlink_text', parent),
                    input = D.query('input', con)[1],
                    img = D.get('img', con);
                D.hide(parent);
                D.html(text, '')
                D.attr(text, 'title', '');
                D.val(input,'');
                D.css(img, 'display', 'inline');
                try {
                    var msgBox = D.next(D.parent(con)),
                        msgBoxDiv = D.query('div', msgBox),
                        len = msgBoxDiv.length;
                    D.hide(msgBoxDiv[len - 1]);
                } catch (e) {}
            },
            showEdit: function (tar) {
                var edit = D.next(D.parent(tar), '.j_edit'),
                    input = D.get('input', edit);
                D.get('#j_tips') && D.hide('#j_tips');

                if (D.val(D.prev(tar)) == '') {
                    alert('请先输入选项的内容，再设置链接');
                } else {
                    D.val(input, 'http://');
                    D.hide(tar);
                    D.show(edit);
                }
            },
            // 取消设置链接
            cancelLink: function (tar) {
                var parent = D.parent(tar, '.j_edit'),
                    con = D.parent(parent, '.con'),
                    text = D.get('.j_showlink_text', parent),
                    td = D.parent(D.parent(con)),
                    msgBox = D.get('.msg-box', td),
                    img = D.get('img', con),
                    showLink = D.next(parent, '.j_showlink');
                D.hide(parent);
                if (D.attr(text, 'title') == '') {
                    D.css(img, 'display', 'inline');
                } else {
                    D.css(showLink, 'display', 'block');
                }
                D.hide(msgBox);
            },
            // 确定设置链接
            confirmLink: function (tar) {
                var val = D.val(D.prev(tar)),
                    val = val.substring(0, 7) === 'http://' ? val: ('http://' + val),
                    _val = val.replace(/[A-Z]g/, function(a){
                        return String.fromCharCode(a.charCodeAt(0) + 32);
                    }),
                    val = val.replace(/<[^>]+>/g, ""),
                    con = D.parent(tar, '.con'),
                    showLink = D.get('.j_showlink', con),
                    img = D.get('img', con),
                    td = D.parent(D.parent(con)),
                    children = D.children(td),
                    childrenLen = children.length,
                    text = D.get('.j_showlink_text', con),
                    title = '';
                if (val != "") {
                    if (this.checkUrl(_val)) {
                        if (children[childrenLen - 2].className == 'msg-box') {
                            D.hide(children[childrenLen - 1]);
                            //TODO 这里是干啥的。。。
                        } else {
                            D.show(child[childrenLen - 1]);
                        }
                        return false;
                    }
                    D.attr(text, 'title', val);
                    val = val.length > 32 ? val.substring(0, 32): val;
                    D.html(text, val);
                    D.show(showLink);
                } else {
                    D.css(img, 'display', 'inline');
                }
                D.hide(D.parent(D.parent(tar)));
                D.hide(children[childrenLen - 1]);
            },
            // 修改链接
            editLink: function (tar) {
                var prev = D.prev(tar),
                    parent = D.parent(tar),
                    prevParent = D.prev(parent),
                    input = D.get('input', prev);
                D.hide(parent);
                D.show(prevParent);
                D.val(input, D.attr(prev, 'title'));
            },
            //验证url
            checkUrl: function (str) {
                var reg = /\.taobao\.com|\.tmall\.com|\.juhuasuan\.com|\.etao\.com/;
                return reg.test(str) && (str.substring(0, 7) === 'http://');
            },
            //预览
            preview: function () {
                var slice = Array.prototype.slice,
                    _max = D.prop('#j_radio1', 'checked') ? 1 : D.val('#j_multiple'),
                    _date = D.val('#J_Year') + '-' + D.val('#J_Month') + '-' + D.val('#J_Date') + '-' + D.val('#J_Hour'),
                    _sub = (function(){
                        var trs = slice.call(D.query('#vote-post', 1)),
                            html =  '',
                            title,
                            href,
                            i, //todo:这里去掉了检测是否是j_close，待测试
                            len = trs.length;
                        for (i = 0; i < len; i++) {
                            title = D.get('input',trs[i]).value;
                            href = D.get('.j_showlink_text', trs[i]).title,
                            href = href ? href : ' ';
                            html += title + '\u0010' + href + '\u0010' + ' ' + '\u0011';
                        }
                        return html;
                    })();
                E.on('#j_preview', 'click', function(){
                    var cook = Cookie.get('cookie1') || Cookie.get('_l_g_') || Cookie.get('ck1'),
                        _div,
                        url;
                    if(!cook) return;
                    D.val('#maxAnswer', _max);
                    D.val('#endDate', _date);
                    D.val('#j_previewKey', 'true');
                    D.val('#j_options', _sub)
                    D.val('#msgpost', editor.getData());

                    if(!D.get('#j_text-preview')) {
                        //TODO: 页面中创建overlay的钩子div，方便创建浮层
                       /* _div = D.create('<div></div>');
                        D.attr(_div, {
                            id: 'j_text-preview',
                            class: 'text-preview'
                        });
                        D.css(_div, 'display', 'none');
                        D.append(_div, 'body');*/

                        url = D.val('#J_PreviewLink') + '?_input_charset=utf-8&time=' + new Date();
                        IO({
                            type: 'post',
                            url: url,
                            form: '#publishVote',
                            success: function (data) {
                                var response = data.responseText,
                                    html;
                                if (response.indexOf('page-feedback-msg') > -1) {
                                    D.html('#j_msgBox', response);
                                } else {
                                    html = '<p class="p-v1"><a class="close"></a></p>'
                                        + response
                                        + '<p class="p-v2"><button class="close-v2" type="button"></button></p>';
                                    D.html('#j_text-preview', html);
                                    D.html('#j_msgBox', '');
                                }

                                new Overlay.dialog({
                                    srcNode: 'J_Overlay',
                                    width: 750,
                                    height: 740,
                                    align: {
                                        points: ['cc', 'cc']
                                    },
                                    draggable: true,
                                    elStyle: {
                                        color: '#000',
                                        zIndex: 6666
                                    },
                                    bodyContent: html,
                                    headContent: '预览',
                                    trigger: '#j_preivew'
                                });


                            }
                        });
                     }
                });
            },
            addItem: function () {
                var votePost = D.get('#vote-post'),
                    trs = D.query('#vote-post tr'),
                    len = trs.length,
                    first = trs[0]
                    clone = D.clone(first, false, true),
                    i = 0,
                    MAX = 100;
                for(; i < 5; i++) {
                    D.append(clone, votePost);
                }
                if (D.query('#vote-post').lenght > MAX) {
                    D.hide('#j_add_item');
                }

            }
        };
    return handler;
}, {requires: ['overlay']});

KISSY.use('textVote', function(S, TextVote){
    var D = S.DOM,
        E = S.Event;

    //TODO 日期的选择
    TextVote.init(D.val('#J_PicVoteUrl'), D.val('#J_CheckUrl'));
})





