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
        var KE = KISSY.Editor;

        window.editor = KE("#msgpost", {
            attachForm:true,
            baseZIndex:10000,

            pluginConfig: {
                bgcolor:false,
                "image":{
                    upload:{
                        serverUrl:"http://bbs.taobao.com/json/batchImageUpload.htm",
                        serverParams:{
                            groupId:'1338197',uuid:'AB9FBF8DAC17B1B172673456B2BC4592',
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
                        groupId:'1338197',uuid:'AB9FBF8DAC17B1B172673456B2BC4592',
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

KISSY.ready(function(S){
    var D = S.DOM,
        E = S.Event,
        ccCodeInputArea = 'checkCodeInput',
        codeUrl = "http://regcheckcode.taobao.com/auction/checkcode?sessionID=d680bcad1f6e46e69a8cad8fe1f019b0&_ts=1351499104143&r=";
        onecrsh = false,
        timestamp = new Date().getTime(),
        ccCodeImgId = "ccCodeImgId" + timestamp,
        ccCodeUpdateId = "ccCodeUpdateId" + timestamp,
        refreshCc = function(){
            D.attr('#' + ccCodeImgId, 'src', codeUrl + new Date().getTime());
        },
        ccCodeImg = function() {
            D.insertAfter(D.create('<img>', {
                'id' : ccCodeImgId,
                'src' : codeUrl + new Date().getTime()
            }), D.get('#' + ccCodeInputArea));
        },

        refreshCcCode = function() {
            var link = D.create('<a>', {
                'id' : ccCodeUpdateId,
                'href' : '#'
            });

            D.html(link, '看不清验证码？');
            D.insertAfter(link, D.get('#' + ccCodeImgId));

            E.on(link, 'click', function(e) {
                refreshCc();
                e.halt();
            });
        };

    E.on('#' + ccCodeInputArea, 'focus', function(e){
        if(!onecrsh){
            ccCodeImg();
            refreshCcCode();
            refreshCc();
        }
        onecrsh=true;
        e.halt();
    });

    if(D.get('#' + ccCodeInputArea)) {
        var input=D.get('#' + ccCodeInputArea),
            tip = '点击输入验证码',
            tipColor = 'silver';
        E.on(input, 'focus', function() {
            if (this.value === tip) {
                this.value = '';
                this.style.color = '';
            }
        });
        E.on(input, 'blur', function() {
            if (!this.value) {
            this.value = tip;
            this.style.color = tipColor;
            }
        });
        input.value = tip;
        input.style.color = tipColor;

        var form=D.parent(input,'form');
        E.on(form,'submit',function(e){
            if(input.value==tip){
            input.value="";
            };
        });
    }
});

/**
 *multi_images_loader.source.js
 */
(function (S, global) {
    var D = S.DOM,
        E = S.Event,
        JSON = S.JSON,
        IO = S.IO;
    global.MIL = {};
    MIL.util = {};
    MIL.impl = {};
    MIL.debug = false;
    MIL.sysImageSize = [30, 40, 60, 120];

    MIL.loadByUID = function(url, domsHasUIDAttr) {
        var ids = MIL.impl.doms2Ids(domsHasUIDAttr);
        if(!ids || ids.length === 0) {
            return;
        }
        return MIL.load(url, ids);
    };

    MIL.load = function(url, ids) {
        /*create request data*/
        var queryData = MIL.impl.createQueryData(ids);
        /*load image urls*/
        MIL.impl.loadFromServer(url, queryData, MIL.impl.onSuccessFun);
    };

    MIL.impl.doms2Ids = function(domsHasUIDAttr) {
        if(MIL.util.isEmpty(domsHasUIDAttr) || (!domsHasUIDAttr.length) ) {
            return null;
        }
        var ret = new Array();
        for(var i = 0; i < domsHasUIDAttr.length; ++i) {
            var node = domsHasUIDAttr[i];
            var uid = node.getAttribute("uid");
            if(MIL.util.isNotEmpty(uid)) {
                ret.push(uid);
            }
        }
        return ret;
    };

    MIL.impl.createQueryData = function(ids) {
        var idsjson = JSON.stringify(ids);
        return "ids=" + idsjson;
    };

    MIL.impl.loadFromServer = function(url, queryData, onSuccessFun) {
        var callback = {
            success: onSuccessFun,
            failure: function() {
                MIL.util.msg('connect failed!');
            }
        };
        MIL.util.msg(url);
        MIL.util.msg(queryData);
        IO({
            type: 'post',
            url: url,
            success: callback,
            data: queryData
        });
    };

    MIL.impl.onSuccessFun = function(o) {
        /*parse data*/
        var data = o.responseText;
        var prod = null;
        try {
            prod = JSON.parse(data);
        } catch(e) {
            MIL.util.msg("parse json data failed!");
            return;
        }
        /*update images*/
        MIL.impl.updateImages(prod);
    };

    MIL.impl.updateImages = function(prod) {
        for(var i = 0; i < prod.length; ++i) {
            var uid = prod[i].id;
            var url = prod[i].url;
            var nodes = MIL.impl.getElementsByAttr('img', 'uid', uid);
            MIL.impl.setImagesSrc(nodes, url);
        }
    };

    MIL.impl.getElementsByAttr = function(node, name, value) {
        var nodes = D.query(node),
            result = [],
            i, len = nodes.length,
            attr;
        for (i = 0; i < len; i++) {
            attr = D.attr(nodes[i], name);
            if (attr && attr == value) {
                result.push(nodes[i]);
            }
        }
        return result;
    };
    MIL.impl.setImagesSrc = function(nodes, url) {
        if(MIL.util.isEmpty(nodes) || (!nodes.length) ) {
            return;
        }
        for(var i = 0; i < nodes.length; ++i) {
            var node = nodes[i];
            var imageUrl = url;
            var imageSize = node.getAttribute("imageSize");
            imageUrl = MIL.impl.appendImageSize(imageUrl, imageSize);
            node.src = imageUrl;
        }
    };

    MIL.impl.appendImageSize = function(url, value) {
        if(MIL.util.isEmpty(url)) {
            return null;
        }
        if(MIL.util.isEmpty(value)) {
            return url;
        }
        if(MIL.impl.isSysImageUrl(url)) {
            return url;
        }
        return url + '_' + value + ".jpg";
    };

    MIL.impl.isSysImageUrl = function(url) {
        var lastSlashIndex = url.lastIndexOf('/');
        var lastDotIndex = url.lastIndexOf('.');
        var imgName = url.substring(lastSlashIndex + 1, lastDotIndex);
        if(isNaN(imgName)) {
            return false;
        }
        var num = parseInt(imgName, 10);
        for(var i = 0; i < MIL.sysImageSize.length; ++i) {
            if(num == MIL.sysImageSize[i]) {
                return true;
            }
        }
        return false;
    };

    /*================utils=========================*/
    MIL.util.isEmpty = function(obj) {
        if(obj === null || (typeof obj == "undefined") || obj == "") {
            return true;
        }
        return false;
    };

    MIL.util.isNotEmpty = function(obj) {
        return !MIL.util.isEmpty(obj);
    };

    MIL.util.msg = function(m) {
        if(MIL.debug) {
            window.alert(m);
        }
    };
})(KISSY, this);
