/**
 * 论坛编辑器(垂直市场统一用这一个,老论坛建议以后也用这一个文件) 
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
 */

KISSY.add('editor', {
	'fullpath' : 'http://a.tbcdn.cn/??s/kissy/1.1.7/kissy-min.js,s/kissy/1.1.7/uibase/uibase-pkg-min.js,s/kissy/1.1.7/dd/dd-pkg-min.js,s/kissy/1.1.7/overlay/overlay-pkg-min.js,s/kissy/1.1.7/editor/editor-all-pkg-min.js,s/kissy/1.1.7/editor/biz/ext/editor-plugin-pkg-min.js,apps/bbs/js/word-count.js'
}).use('editor', function(S) {
	var D = S.DOM,
	E = S.Event,
	KE = S.Editor,
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
				'direction' : [ 'y' ]
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
		S.wordcount.bind('#msgpost', wordCount, editor);
		
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

	window['editor'] = editor; // TODO 清理完老代码后希望不要再用全局变量
});
  