(function(){
	var Y=YAHOO,D=Y.util.Dom,E=Y.util.Event;
	TB.namespace('CopyToClipboard');
	
	/* CopyToClipboard ���Ƶ����а幦��
	 * 
	 * Parameters:
	 * txt <str> ���Ƶ����а���ַ���
	 * 
	 * @author longxiao
	 * @date 2010 12 07
	 */
	
	TB.CopyToClipboard=function(txt){
		try{
			if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
            alert("�ɹ��������ӵ����а壬���Խ���Ctrl+Vճ��");
	        }else if (navigator.userAgent.indexOf("Opera") != -1) {
	            window.location = txt;
	        }else if (window.netscape){
	             try {
	                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	             }catch(e){
	                window.prompt("��������ܾ��������������ַ������'about:config'���س�\nȻ��'signed.applets.codebase_principal_support'����Ϊ'true'\n���ֶ������·�����Ȼ��ճ�����������칤�߻���̳��������ȥ��",txt);
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
	                 alert("�ɹ��������ӵ����а壬���Խ���Ctrl+Vճ��");
	        }else{
	        	window.prompt('�����������֧���Զ����ƣ����ֶ������·�����\nȻ��ճ�����������칤�߻���̳��������ȥ��',txt);
	        }
		}catch(e){}
	};
})();