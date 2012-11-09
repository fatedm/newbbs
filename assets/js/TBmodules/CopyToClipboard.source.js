(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('CopyToClipboard');
	
	/* CopyToClipboard 复制到剪切板功能
	 * 
	 * Parameters:
	 * txt <str> 复制到剪切板的字符串
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.CopyToClipboard=function(txt){
		try{
			if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
            alert("成功复制链接到剪切板，可以进行Ctrl+V粘贴");
	        }else if (navigator.userAgent.indexOf("Opera") != -1) {
	            window.location = txt;
	        }else if (window.netscape){
	             try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	             }catch(e){
	                window.prompt("被浏览器拒绝！请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'\n请手动复制下方链接然后粘贴到您的聊天工具或论坛、博客中去！",txt);
	             }
	             var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
	             if (!clip)  return;
	             var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
	             if (!trans) return;
	             trans.addDataFlavor('text/unicode');
	             var str = new Object(),
	             	 len = new Object(),
	                 str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	             var copytext = txt;
	                 str.data = copytext;
	                 trans.setTransferData("text/unicode", str, copytext.length * 2);
	             var clipid = Components.interfaces.nsIClipboard;
	             if (!clip)  return false;
	                 clip.setData(trans, null, clipid.kGlobalClipboard);
	                 alert("成功复制链接到剪切板，可以进行Ctrl+V粘贴");
	        }else{
	        	window.prompt('您的浏览器不支持自动复制，请手动复制下方链接\n然后粘贴到您的聊天工具或论坛、博客中去！',txt);
	        }
		}catch(e){}
	};
})();