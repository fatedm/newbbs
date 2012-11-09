(function(){
	var Y = YAHOO, D = Y.util.Dom, E = Y.util.Event;
	
	TB.namespace('BPGraphPic');
	
	/* BPGraphPic 淘宝帮派内部组件，直接给容器加载头像图片圈图的功能
	 * 
	 * Parameters:
	 * imgID <ele> 需要加载圈图的imgID
	 * minH <number> 圈图的最小高度
	 * minW <number> 圈图的最小宽度
	 * 
	 * Returns:
	 * imagecropper <object> 对象
	 * 
	 * 需要依赖YUI的imagecropper组件，不需要外部加载，组件内部使用getscript方法自己获取。
	 * 
	 * @author longxiao
	 * @date 2010 12 13
	 */
	
	TB.BPGraphPic=function(imgID,minH,minW){
		this.imgID=imgID;
		this.minH=minH;
		this.minW=minW;
		this.img=D.get(imgID);
	};
	
	TB.BPGraphPic.load=false;
	
	TB.BPGraphPic.prototype={
		//触发装备圈图的事件
		'_EquipCropper':function(){
		//创建crop默认对象
			
			var _self=this,
				h = _self.img.offsetHeight,
				w = _self.img.offsetWidth;
			
			if(h<=_self.minH && w<=_self.minW){
				return null;
			}
			
			var minh=_self.minH,
				minw=_self.minW,
				inth=_self.minH,
				intw=_self.minW;
			
			if(h<=_self.minH || w<=_self.minW){
				minh=minh=inth=intw=Math.min(h,w);
			};

			var _config={
					initialXY:[0, 0],
					minHeight:minh,
					minWidth:minh,
					initHeight:inth,
					initWidth:intw,
					status:false,
					ratio:true,
					shiftKeyTick:10
			};
			return new YAHOO.widget.ImageCropper(_self.imgID,_config);
			
		},
		//远程加载圈图
		'GetCropper':function(){
			var _self=this;
			//LOADER IMAGECROPPER
			var _config={
					require : ["imagecropper"],
					loadOptional:true,
					onSuccess:function(){
						TB.BPGraphPic.load=true;
						TB.BPGraphPic.Crop=_self._EquipCropper();
					},
					timeout :10000,
					combine :true
			};
			if(!TB.BPGraphPic.load){
				var loader = new YAHOO.util.YUILoader(_config);
				loader.insert();
			}else{
				_self.img.onload=function(){
					TB.BPGraphPic.Crop=_self._EquipCropper();
				}
			}
		},
		/*圈图后的操作图片预览 为帮派统一通用
		 * Parameters:
		 * o <object> 需要加载圈图的imgID
		 * previewlist <ary> 预览的图片ID数组
		 * postdata <ary> 需要相应改变的hidden变量数据数组
		 * 
		 */
		'TBBPpreview':function(o,previewlist,fun){
			var _self=this,
				h = _self.img.offsetHeight,
				w = _self.img.offsetWidth;
			
			var _init=function(){
				
				var _o=o.getCropCoords(),
				ch = _o.height,
				cw = _o.width,
				ct = _o.top,
				cl = _o.left,
				dh = (h * _self.minH)/ ch,
				dw = (w * _self.minH) / cw,
				dt = (dh * ct)/ h,
				dl = (dw * cl) / w;
				
				for(var i=0;i<previewlist.length;i++){
					D.get(previewlist[i]).style.cssText= "height:" + dh/(i+1)+ "px;width:" + dw/(i+1)+ "px;top:-" + dt/(i+1)+ "px;left:-" + dl/(i+1) + "px";
				};
				
				fun(_o);
			};
			
			_init();
			
			o.on('moveEvent',_init);

			o.on('resizeEvent',_init);
			
			o._resize.on('endResize', function() {
				var ev = arguments[0];
				if (ev.width != ev.height) {
					var adjustXY = Math.min(ev.width, ev.height);
					this.resize(null, adjustXY, adjustXY, 0, 0);
					if(!bugfix){
						bugfix = this.on('dragEvent',function(){
							imgCrop._setConstraints(true);
						})||true;
					}
				}
			});
		}
	};
})();