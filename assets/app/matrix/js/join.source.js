      (function(){
            var U = YAHOO.util, E = U.Event, D = U.Dom;
            //���������ռ�
            TB.namespace('app.Group');
            Group = TB.app.Group;
            Group.popup = function(){
                return{
                    shut:function(el){//�ر�
                        D.setStyle(el, 'display', 'none');
                    },
                    autoShut:function(el,time,refreshFlag){//�Զ��ر�
                        var self = this;
                        E.onDOMReady(function() {
                            setTimeout(function() {
                                self.shut(el);
                                if(refreshFlag) {
                                    self.refresh();
                                }
                            },time);
                        });
                    },
                    refresh:function(){//ˢ��
                        window.location.replace(location.href);
                    }
                };
            }();
            //����pop-up,iframe��id��J_PopUpFrame(js)��class��pop-mask(css)
            E.onDOMReady(function(){
                    var oDiv = document.createElement("div");
                    oDiv.id = 'J_PopUpMask';
                    oDiv.className = "pop-up";
                    oDiv.style.position='absolute';
                    oDiv.style.right='0';
                    oDiv.style.top='0';
                    oDiv.style.zIndex=6667;
                    oDiv.innerHTML="<div class='hd'><h3 id='J_title'></h3></div><div class=\"bd\"><div class=\"inner\"><iframe id=\"J_PopUpFrame\" class=\"pop-mask\" src=\"\" scrolling=\"no\" frameborder=\"0\"></iframe></div></div><p class=\"ft\"><a href=\"#\" class=\"j_close act\" >�ر�</a></p>";
					D.setStyle(D.get('gd'),'position','relative');
					if(D.get('detail')){
						D.get('detail').appendChild(oDiv);
						D.setStyle(D.get('detail'),'position','relative');
					}else{
						D.get('gd').appendChild(oDiv);
					}
                    var oIframe = D.get('J_PopUpFrame');
                    D.setStyle(oDiv,'display','none');
                    //�رհ�,class:j_close
                    var close = D.getElementsByClassName('j_close');
                    E.on(close, 'click', function(e){
                        D.setStyle(oDiv,'display','none');
                        E.stopEvent(e);
                    });
                    E.on('entrance', 'click', function(e) {
                        oIframe.src=D.get('entrance').href;
                        setTimeout(function(){D.setStyle(oDiv,'display','block');},500);//�ӳ���ʾ���壬��������
                        if(D.hasClass(oDiv,'msg24')){//for ff cache
                            setTimeout(function(){D.setStyle(oDiv,'display','none');},3000);
                        }
                        E.stopEvent(e);
                    })
					E.on('j_btn_publish2', 'click', function(e) {
						oIframe.src=D.get('entrance').href;
						setTimeout(function(){D.setStyle(oDiv,'display','block');},500);//�ӳ���ʾ���壬��������
						if(D.hasClass(oDiv,'msg24')){//for ff cache
							setTimeout(function(){D.setStyle(oDiv,'display','none');},3000);
						}
						E.stopEvent(e);
                    })
                }
            );
        }
        )();
