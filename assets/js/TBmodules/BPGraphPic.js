(function(){var c=YAHOO,b=c.util.Dom,a=c.util.Event;TB.namespace("BPGraphPic");TB.BPGraphPic=function(e,f,d){this.imgID=e;this.minH=f;this.minW=d;this.img=b.get(e)};TB.BPGraphPic.load=false;TB.BPGraphPic.prototype={_EquipCropper:function(){var d=this,g=d.img.offsetHeight,e=d.img.offsetWidth;if(g<=d.minH&&e<=d.minW){return null}var j=d.minH,f=d.minW,l=d.minH,i=d.minW;if(g<=d.minH||e<=d.minW){j=j=l=i=Math.min(g,e)}var k={initialXY:[0,0],minHeight:j,minWidth:j,initHeight:l,initWidth:i,status:false,ratio:true,shiftKeyTick:10};return new YAHOO.widget.ImageCropper(d.imgID,k)},GetCropper:function(){var e=this;var f={require:["imagecropper"],loadOptional:true,onSuccess:function(){TB.BPGraphPic.load=true;TB.BPGraphPic.Crop=e._EquipCropper()},timeout:10000,combine:true};if(!TB.BPGraphPic.load){var d=new YAHOO.util.YUILoader(f);d.insert()}else{e.img.onload=function(){TB.BPGraphPic.Crop=e._EquipCropper()}}},TBBPpreview:function(k,i,f){var d=this,g=d.img.offsetHeight,e=d.img.offsetWidth;var j=function(){var m=k.getCropCoords(),h=m.height,o=m.width,r=m.top,t=m.left,s=(g*d.minH)/h,l=(e*d.minH)/o,n=(s*r)/g,q=(l*t)/e;for(var p=0;p<i.length;p++){b.get(i[p]).style.cssText="height:"+s/(p+1)+"px;width:"+l/(p+1)+"px;top:-"+n/(p+1)+"px;left:-"+q/(p+1)+"px"}f(m)};j();k.on("moveEvent",j);k.on("resizeEvent",j);k._resize.on("endResize",function(){var l=arguments[0];if(l.width!=l.height){var h=Math.min(l.width,l.height);this.resize(null,h,h,0,0);if(!bugfix){bugfix=this.on("dragEvent",function(){imgCrop._setConstraints(true)})||true}}})}}})();