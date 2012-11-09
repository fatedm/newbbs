  (function(){
        YAHOO.util.Event.onDOMReady(function() {
            new KISSY.Editor("msgpost", {
                base: "http://a.tbcdn.cn/kissy/1.0.0/build/editor/",
                toolbar: [
                    "source",
                    "",
                    "fontName", "fontSize", "bold", "italic", "underline", "strikeThrough", "foreColor", "backColor",
                    "",
                    "link", "smiley", "image",
                    "",
                    "insertOrderedList", "insertUnorderedList", "outdent", "indent", "justifyLeft", "justifyCenter", "justifyRight"
                ],
                statusbar: [
		            "resize"
		        ],
                pluginsConfig: {
                    image: {
                        tabs        : ["local","link"],
                         upload: {
                            actionUrl      : "/json/image_upload.htm",
                            //enableXdr      : true,
                            extraCode      : '<label><input name="waterMark" type="checkbox" checked="checked" />Õº∆¨º”ÀÆ”°£¨∑¿µ¡”√</label>'
                        }
                    },
                    smiley: {
                        tabs        : ["wangwang"]
                    }
                }
            });
        });
    })();

