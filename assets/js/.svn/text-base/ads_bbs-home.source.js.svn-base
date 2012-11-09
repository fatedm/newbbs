/* Copyright (c) 2010, fahai@taobao.com. All rights reserved. */

/**
 * This script includes setting form, form validation, img crop and other logic.
 *
 * @author      fahai <fahai@taobao.com>
 * @version     1.0.0 build 2010-11-21
 */

/*
 * General wrapper.
 */
(function() {

    /*
     * Quick alias.
     */
    var Util = YAHOO.util,
            Dom = Util.Dom,
            Event = Util.Event,
            Con = Util.Connect,
            Command = Util.Command,
            Behavior = Command.Behavior;

    /**
     * A new namespace as the main container.
     *
     * @namespace   TB.UserCenter
     * @module      SilverCoin
     */
    var sc = TB.namespace("UserCenter.SilverCoin");

    /**
     * Add ImageCropper. It's a static object.
     *
     * @namespace   TB.UserCenter.SilverCoin
     * @class       ImageCropper
     * @static
     */
    sc.ImageCropper = {

        /**
         * Initialize.
         *
         * @method      init
         * @param       {HTMLImageElement}  cropperEl   The img to crop.
         * @param       {HTMLImageElement}  previewEl   A container to hold the crop result.
         * @private
         */
        _init:function(cropperEl, previewEl) {

            /* div#ad-cropper is the main container */
            if (!Dom.get("ad-cropper")) {
                return;
            }

            /*
             * Load imageCropper component if necessary. Then perform other logic.
             */
            sc.load("imagecropper", function() {
                var crop = sc.ImageCropper.decorate(cropperEl);
                sc.ImageCropper.main(cropperEl, previewEl, crop);
            });
        },

        /**
         * Main logic after cropper initialized.
         *
         * @method  main
         * @param   {HTMLImageElement}  cropperEl   The img to crop.
         * @param   {HTMLImageElement}  previewEl   A container to hold the crop result.
         * @param   {Object}            crop        The cropper instance.
         */
        main:function(cropperEl, previewEl, crop) {

            var imgEl = Dom.get("img-cropper");

            // get the wrapper's size
            var wrapEl = Dom.get(previewEl.id + "-wrapper"),
                    w = wrapEl.clientWidth,
                    h = wrapEl.clientHeight,
                    ow = imgEl.clientWidth,
                    oh = imgEl.clientHeight;

            sc.ImageCropper.setForm(crop);

            // refresh preview image
            crop.on("moveEvent", function() {
                var region = crop.getCropCoords(),
                        ratio = w / region.width;

                Dom.setStyle(previewEl, "left", "-" + region.left * ratio + "px");
                Dom.setStyle(previewEl, "top", "-" + region.top * ratio + "px");
                Dom.setStyle(previewEl, "width", ow * ratio + "px");

                sc.ImageCropper.setForm(crop);
            });

        },

        setForm: function(crop) {
            var region = crop.getCropCoords();
            var fields = {
                "field-pic-url": Dom.get("img-cropper").src,
                "field-width": region.width,
                "field-height": region.height,
                "field-left": region.left,
                "field-top": region.top
            };

            // set form values
            for (var prop in fields) {
                Dom.get(prop).value = fields[prop];
            }
        },

        /**
         * Build cropper on elements.
         *
         * @method      decorate
         * @param       {HTMLImageElement}  cropperEl   The img to crop.
         * @private
         */
        decorate:function(cropperEl) {
            var config = {
                ratio: 1,
                initialXY: [0, 0],
                status: false,
                minHeight: 75,
                minWidth: 75,
                initHeight: 75,
                initWidth: 75
            };

            return sc.ImageCropper.oldCrop = (new YAHOO.widget.ImageCropper(cropperEl, config));
        },

        oldCrop: null
    };

    /**
     * Manage pop-ups' behavior.
     *
     * @namespace   TB.UserCenter.SilverCoin
     * @class       PopUpMgr
     * @static
     */
    sc.PopUpMgr = {

        /**
         * Initialize.
         *
         * @method  init
         * @param   {HTMLElement} popUpContainer    container of pop-ups.
         * @private
         */
        _init:function(popUpContainer) {
            var con;
            if (!(con = Dom.get(popUpContainer))) {
                return;
            }

            // show full-mask
            var mask = Dom.getElementsByClassName("full-mask", "div")[0];
            Behavior.show(mask);

            // listener to close pop-up
            Event.on(con, "click", Command.init({
                func:function(target) {
                    Behavior.hide([target, mask]);
                },
                filter:function(trigger) {
                    return Dom.hasClass(trigger, "cancel");
                },
                target:con
            }));
        }
    };

    /**
     * Manage form's behavior.
     *
     * @namespace   TB.UserCenter.SilverCoin
     * @class       FormMgr
     * @static
     */
    sc.FormMgr = {

        /**
         * An array including validation methods to parse form fields.
         *
         * @property    validationMethods
         * @type        {Object}
         */
        validationMethods: {},

        /**
         * transfer particular element's value to a form field
         *
         * @property    fieldTranslator
         * @type        {Object}
         */
        fieldTranslator: {
            fieldMap: {}
        },

        /**
         * attach event listener to form fields.
         *
         * @method  addListener
         * @param   {HTMLElement}   form    the form element.
         * @param   {Array<string>} formFields
         * @private
         */
        addListener: function(form, formFields) {

            // validation
            for (var i = 0, l = formFields.length; i < l; i++) {
                var formField = formFields[i];

                Event.on(formField, "focus", Command.init({
                    func: function(target) {
                        Dom.removeClass(target, "error");
                        Dom.removeClass(target, "ok");

                        Dom.addClass(target, "attention");
                    },
                    getTarget: function(trigger) {
                        return Dom.getAncestorByClassName(trigger, "form-field");
                    }
                }));
                Event.on(formField, "blur", (function() {
                    var field = formField;

                    return Command.init({
                        func: function(target) {
                            Dom.removeClass(target, "attention");

                            var valid = sc.FormMgr.validationMethods[field](field);
                            valid && (Dom.addClass(target, "ok"));
                            !valid && (Dom.addClass(target, "error"));
                        },
                        getTarget: function(trigger) {
                            return Dom.getAncestorByClassName(trigger, "form-field");
                        }
                    });
                })());
            }

            // image upload (NOW I AM HARD CODING...! I'm sorry for the future maintainer.)
            (function() {
                var targetForm = Dom.get("img-upload-form"),
                        targetBrowse = Dom.get("ad-img"),
                        targetField = Dom.getAncestorByClassName(targetBrowse, "form-field"),
                        targetSubmit = targetForm.getElementsByTagName("button")[0],
                        cropperEl = Dom.get("img-cropper"),
                        previewEl = Dom.get("img-preview");

                var DEFAULT_ERROR_MSG = "上传文件出错，请重新上传！";

                Event.on(targetBrowse, "click", function() {
                    Dom.removeClass(targetField, "error");
                    Dom.removeClass(targetField, "ok");
                    Dom.addClass(targetField, "attention");
                });

                Event.on(targetSubmit, "click", Command.init({
                    func: function(target) {

                        !sc.CookieMgr.isLogin() && sc.CookieMgr.redirect(true);

                        try {
                            sc.FormMgr.uploadFile(target, true, {
                                upload: function(o) {
                                    var r = {};
                                    if (!o.responseText) {
                                        return;
                                    }
                                    try {
                                        r = YAHOO.lang.JSON.parse(o.responseText);
                                    } catch(e) {
                                    }
                                    if (r["success"] && r["success"] == "true") {

                                        // destroy old crop
                                        sc.ImageCropper.oldCrop && (sc.ImageCropper.oldCrop.destroy());

                                        Event.on(previewEl, "load", function() {
                                                                                 
                                            // reset preview
                                            Dom.setStyle(previewEl, "left", "0");
                                            Dom.setStyle(previewEl, "top", "0");

                                            Dom.setStyle(previewEl, "width", "auto");
                                            Dom.setStyle(previewEl, "height", "auto");

                                            // reset wrap
                                            Dom.setStyle("img-cropper_wrap", "width", "auto");
                                            Dom.setStyle("img-cropper_wrap", "height", "auto");
                                        });

                                        // show the image and preview
                                        cropperEl.src = previewEl.src = r["picUrl"];
                                        
                                        // show ok message
                                        Dom.removeClass(targetField, "attention");
                                        Dom.removeClass(targetField, "error");

                                        Dom.addClass(targetField, "ok");
                                        // then initial cropper
                                        sc.ImageCropper.oldCrop = sc.ImageCropper._init(cropperEl, previewEl);

                                        if(YAHOO.env.ua.ie) {
                                            targetBrowse.focus();
                                            targetBrowse.blur();
                                        }

                                    } else {

                                        // alert error message
                                        alert(r["message"] || DEFAULT_ERROR_MSG);

                                        // show error message
                                        Dom.removeClass(targetField, "attention");
                                        Dom.removeClass(targetField, "ok");
                                        Dom.addClass(targetField, "error");
                                    }

                                }
                            });
                        } catch(e) {
                            Dom.addClass(targetField, "error");
                            Dom.removeClass(targetField, "ok");
                            Dom.removeClass(targetField, "attention");
                        }
                    },
                    target: targetForm
                }));
            })();

            // save image preview
            (function() {

                var targetForm = Dom.get("img-preview-container"),
                        targetSubmit = targetForm.getElementsByTagName("button")[0];

                var DEFAULT_IMG = Dom.get("img-cropper").src;

                Event.on(targetSubmit, "click", Command.init({
                    func: function(target) {

                        var DEFAULT_ERROR_MSG = "保存图片出错，请稍后重试",
                                previewEl = Dom.get("img-preview");
                        !sc.CookieMgr.isLogin() && sc.CookieMgr.redirect(true);

                        if (Dom.get("img-cropper").src == DEFAULT_IMG) {
                            alert("请先上传图片");
                            return;
                        }

                        // post
                        sc.FormMgr.uploadFile(target, true, {
                            upload: function(o) {
                                var r = {};

                                if (!o.responseText) {
                                    return;
                                }
                                try {
                                    r = YAHOO.lang.JSON.parse(o.responseText);
                                } catch(e) {
                                }

                                if (r["success"] && r["success"] == "true") {

                                    // set preview image's url to field
                                    // previewEl.src = r["picUrl"];
                                    Dom.get("field-final-pic-url").value = r["picUrl"];

                                    // force user's behavior
                                    // sc.ImageCropper.oldCrop.destroy();
                                    // sc.ImageCropper.oldCrop = null;
                                    // targetSubmit.disabled = true;

                                    alert("保存图片成功！");
                                } else {
                                    alert(r["message"] || DEFAULT_ERROR_MSG);
                                }
                            }
                        });
                    },
                    target: targetForm
                }));
            })();

            // final submit
            (function() {
                var targetForm = Dom.get("ad-cropper-submit"),
                        targetSubmit = targetForm.getElementsByTagName("button")[0];

                Event.on(targetSubmit, "click", Command.init({
                    func: function() {
                        var fields = {
                            "field-ad-text": Dom.get("ad-text").value,
                            "field-ad-href": Dom.get("ad-href").value
                            // "field-final-pic-url": Dom.get("img-preview").src
                        };

                        // set form values
                        for (var prop in fields) {
                            Dom.get(prop).value = fields[prop];
                        }

                        var valid = true;

                        // validation
                        for (var i = 0, l = formFields.length; i < l; i++) {
                            var formField = formFields[i];
                            if (!sc.FormMgr.validationMethods[formField](formField)) {
                                var wrap = Dom.getAncestorByClassName(formField, "form-field");
                                Dom.addClass(wrap, "error");
                                Dom.removeClass(wrap, "ok");
                                valid = false;
                            }
                        }

                        var saveImg = Dom.get("img-preview-container").getElementsByTagName("button")[0];
                        if (valid && !Dom.get("field-final-pic-url").value) {
                            valid = false;
                            alert("请保存上传图片！");
                        }

                        // submit
                        valid && targetForm.submit();
                    }
                }));
            })();
        },

        /**
         * Upload file asynchronously.
         *
         * @method  uploadFile
         * @param   {HTMLFormElement}   form            the form element.
         * @param   {boolean}           fileIncluded    whether a file is included.
         * @param   {Object}            callback        callback.
         */
        uploadFile: function(form, fileIncluded, callback) {
            var url = form.getAttribute("action");
            Con.setForm(form, fileIncluded);
            Con.asyncRequest('POST', url, callback);
        }
    };

    sc.CookieMgr = {
        isLogin: function() {
            return !!TB.bom.getCookie("_l_g_");
        },
        redirect: function(withRefer) {
            var CURRENT_URL = window.location.href,
                    URL_PRE = window.location.protocol + "//",
                    HOST = window.location.host,
                    LOGIN_PATH = "/member/login.jhtml";

            var ar = HOST.split(".");
            ar.shift(ar[0]);
            ar.unshift("login");
            HOST = ar.join(".");

            var url = URL_PRE + HOST + LOGIN_PATH;
            if (withRefer) {
                url += "?redirectURL=" + encodeURIComponent(CURRENT_URL);
            }
            window.location.href = url;
        }
    };

    /**
     * Load module dependencies dynamically.
     * Including YUI components and custom components.
     *
     * @method  load
     * @param   {Object|Array.<string>}  config     module name or custom configuration.
     * @param   {Function}              onSuccess   callback on success.
     * @param   {?Function}             onFailure   callback on failure.
     * @static
     */
    sc.load = function(config, onSuccess, onFailure) {

        /*
         * default config
         */
        var _config = {
            base: "http://a.tbcdn.cn/s/yui/2.8.1/build/",
            require: [],
            loadOptional: true
        }, c, loader;

        // divided entrances
        switch (typeof config) {

            // single YUI component
            case "string":
                c = YAHOO.lang.merge(_config, {
                    require: [config]
                });
                break;

            case "object":

                // a list of YUI components
                if (config instanceof Array) {
                    c = YAHOO.lang.merge(_config, {
                        require: config
                    });
                } else { // custom components
                    c = undefined;
                }
                break;
        }

        try {

            // initial instance
            loader = new YAHOO.util.YUILoader(c);

            // config for custom components
            if (config.name) {
                loader.addModule(config);
                loader.require(config.name);
            }

            // set callback
            loader.onSuccess = onSuccess;
            loader.onFailure = onFailure;

            // insert assets
            loader.insert();
        } catch(e) {
            throw new Error(e);
        } finally {
            delete loader;
        }
    };

    /**
     * Initialize.
     *
     * @method  init
     * @private
     */
    sc._init = function() {

        /*
         * Elements references.
         */
        var body = document.body,
                popUpContainer = Dom.get("popup-container"),
                adForm = Dom.get("ad-form");

        sc.PopUpMgr._init(popUpContainer);

        // define validating functions
        sc.FormMgr.validationMethods = {
            "ad-text": function(el) {
                el = Dom.get(el);
                var regexp = /^.+$/i;
                return regexp.test(el.value);
            },
            "ad-href": function(el) {
                el = Dom.get(el);
                var regexp = /^http:\/\/.*\.(taobao|tmall)\.com.*$/i;
                return regexp.test(el.value);
            },
            "ad-img": function(el) {
                el = Dom.get(el);
                return el.value;
            }
        };

        // define element-field mapping
        sc.FormMgr.fieldTranslator.fieldMap = {
            "ad-text": "",
            "ad-href": "",
            "img-preview": ""
        };

        // attach event listener to form fields
        sc.FormMgr.addListener(adForm, ["ad-text", "ad-href"]);
    };

    /*
     * Init when ready.
     */
    Event.onDOMReady(sc._init);
})();