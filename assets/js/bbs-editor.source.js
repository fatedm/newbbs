/**
 * ��̳�༭��(��ֱ�г�ͳһ����һ��,����̳�����Ժ�Ҳ����һ���ļ�) 
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
 */

KISSY.add('editor', {
	'fullpath' : 'http://a.tbcdn.cn/??s/kissy/1.1.7/kissy-min.js,s/kissy/1.1.7/uibase/uibase-pkg-min.js,s/kissy/1.1.7/dd/dd-pkg-min.js,s/kissy/1.1.7/overlay/overlay-pkg-min.js,s/kissy/1.1.7/editor/editor-all-pkg-min.js,s/kissy/1.1.7/editor/biz/ext/editor-plugin-pkg-min.js,apps/bbs/js/word-count.js'
}).use('editor', function(S) {
	var D = S.DOM,
	E = S.Event,
	KE = S.Editor,
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
				'direction' : [ 'y' ]
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
		S.wordcount.bind('#msgpost', wordCount, editor);
		
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

	window['editor'] = editor; // TODO �������ϴ����ϣ����Ҫ����ȫ�ֱ���
});
  