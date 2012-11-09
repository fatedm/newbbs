var MIL = {};
MIL.util = {};
MIL.impl = {};
MIL.debug = false;
MIL.sysImageSize = [30,40,60,120];

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
	var idsjson = YAHOO.lang.JSON.stringify(ids);
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
	YAHOO.util.Connect.asyncRequest('POST', url, callback, queryData);
};

MIL.impl.onSuccessFun = function(o) {
	/*parse data*/
	var data = o.responseText;
	var prod = null;
	try {
		prod = YAHOO.lang.JSON.parse(data);
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
		var filterString = MIL.impl.createFilterString(uid);
		var nodes = YAHOO.util.Selector.query(filterString);
		MIL.impl.setImagesSrc(nodes, url);
	}
};

MIL.impl.createFilterString = function(uid) {
	return "img[uid="+ uid +"]";
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