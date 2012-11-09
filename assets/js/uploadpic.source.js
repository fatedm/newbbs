/*
 * 上传帮徽功能
 * @longxiao
 * */
(function() {
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event, loadflg = false;

	E.onDOMReady(function() {

				var bfile = D.get('upload-badge-file'), ifile = D
						.get('imitate-file'), upbtn = D.get('upload-btn'), cimg = D
						.get('compress-img'), copr80 = D.get('cropper-80'), copr160 = D
						.get('cropper-160'), AvatarWidth = D
						.get('J_AvatarWidth'), AvatarHeight = D
						.get('J_AvatarHeight'), AvatarTop = D
						.get('J_AvatarTop'), AvatarLeft = D.get('J_AvatarLeft'), AvatarUrl = D
						.get('J_AvatarUrl'), Avatarobsole = D
						.get('J_Avatarobsole'), mblock = [ 20, 20 ], uploadurl = "ajaxUploadLogo.htm";

				// 检测上传控件是否含有上传文本
				var upbtncheck = function(text, fun) {
					var ct = setTimeout(function() {
						if (text.value.length != 0) {
							clearTimeout(ct);
							fun();
						} else {
							upbtncheck(text);
						}
					}, 500)
				};

				// 模拟上传控件
				E.on(bfile, 'change', function() {
					ifile.value = this.value;
					upbtncheck(this, function() {
						upbtn.disabled = "";
						upbtn.value = "上传";
						// 这里需要中断ajax上传

						});
				});

				// 上传功能
				E.on(upbtn,'click',function() {
									//检查cookies，是否登录状态，如果没登录重新刷新页面
									var islogin=TB.bom.getCookie('uc1').toQueryParams()['cookie15'] && TB.bom.getCookie('_nk_');
									if(islogin==undefined){
										window.location.reload();
									};
					
									// 图片前端规格检测函数
									var imgtype=['.jpg','.gif','.png','.jpeg'],
									v=ifile.value,
									s=v.lastIndexOf('.'),
									extension=v.substring(s,v.length).toLowerCase(),eflg=false;
									imgtype.forEach(function(i){
										if(extension==i){eflg=true;}
									});
									
									if(!eflg){
										alert('文件类型不正确,只允许上传jpeg,jpg,gif,png类型图片文件');
										return;
									}
									// 图片前端规格检测函数

									var btn = this;
									btn.value = "加载中";
									btn.disabled = true;
									var file = D.get('uploadform');

									// 装载imagecropper模块到容器
									var loadcropper = function(o) {
										var c80 = D.get("copr80"), c160 = D
												.get("copr160"), crop = D
												.get("cropper"), imgCrop, w, h;

										var scale, ew, eh;

										function reloadimgstyle() {
											var cropArea = imgCrop
													.getCropCoords();

											var ch = cropArea.height, cw = cropArea.width, ct = cropArea.top, cl = cropArea.left, dh = (h * 160)
													/ ch, dw = (w * 160) / cw, dt = (dh * ct)
													/ h, dl = (dw * cl) / w;

											c160.style.cssText = "height:" + dh
													+ "px;width:" + dw
													+ "px;top:-" + dt
													+ "px;left:-" + dl + "px";
											c80.style.cssText = "height:" + dh
													/ 2 + "px;width:" + dw / 2
													+ "px;top:-" + dt / 2
													+ "px;left:-" + dl / 2
													+ "px";

											AvatarWidth.value = ch;
											AvatarHeight.value = cw;
											AvatarTop.value = ct;
											AvatarLeft.value = cl;
											AvatarUrl.value = o.picUrl;
											Avatarobsole.value = o.obsoletePicUrl;

										}
										;

										var bindcrop = function() {
											h = crop.offsetHeight;
											w = crop.offsetWidth;
											imgCrop = new YAHOO.widget.ImageCropper(
													'cropper',
													{
														initialXY : [ 0, 0 ],
														minHeight : mblock[0],
														minWidth : mblock[1],
														initHeight : h <= 160 ? h
																: 160,
														initWidth : w <= 160 ? w
																: 160,
														status : false,
														ratio : true,
														shiftKeyTick : 10
													});
											reloadimgstyle();

											imgCrop.on('moveEvent', function() {
												reloadimgstyle();
											});

											imgCrop.on('resizeEvent',
													function() {
														reloadimgstyle();
													});
										}
										if (!loadflg) {
											bindcrop();
										}
										E.on(crop, 'load', bindcrop);

									}

									// 上传图片的回调
									var callback = {
										upload : function(o) {
										if (o.responseText != undefined) {
											var callbackobj = eval('(' + o.responseText + ')');
											
											if(callbackobj.error!=""){
												alert(callbackobj.error);
												btn.value = "上传";
												btn.disabled = "";
												return;
											}
											
											if(callbackobj.picUrl==""){
												alert('上传失败，没有获得上传图片地址');
												btn.value = "上传";
												btn.disabled = "";
												return;
											}
											cimg.innerHTML = copr80.innerHTML = copr160.innerHTML = '<img src="' + callbackobj.picUrl + '_310x310.jpg">';

											cimg.getElementsByTagName('img')[0].id = "cropper";
											copr80.getElementsByTagName('img')[0].id = "copr80";
											copr160.getElementsByTagName('img')[0].id = "copr160";

											btn.value = "上传";
											btn.disabled = "";

											// 判断如果成功上传，返回，家在圈图控件
											var loader = new Y.util.YUILoader( {

												require : [ "imagecropper" ],

												loadOptional : true,

												onSuccess : function() {
													loadcropper(callbackobj);
													loadflg = true;
												},

												timeout : 10000,

												combine : true
											});

											loader.insert();
											// 完成imagecropper的加载

											// 重新装载圈图
											if (loadflg)
												loadcropper(callbackobj);
										}
									},
									timeout : 10000,
									failure : function(o) {
										alert('上传请求超时或图片过大,请重新上传');
										btn.value = "上传";
										btn.disabled = "";
									}
									};

									// 开始ajax图片上传
									
									Y.util.Connect.setForm(file, true, true);
									
									Y.util.Connect.asyncRequest('POST',uploadurl, callback);

								});

				E.on('J_AvatarSave', 'click', function(e) {
					if (cimg.getElementsByTagName('img').length == 0) {
						alert('请上传图片');
						E.stopEvent(e);
					}
				});

			});
})();