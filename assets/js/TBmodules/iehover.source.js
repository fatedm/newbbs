(function() {
    var Y = YAHOO,D = Y.util.Dom,E = Y.util.Event;
    TB.namespace('iehover');
    /*
     * iehover |IE��hoverģ��
     * parameter
     * eles,��Ҫ��ӵ�eles
     * clsname ��Ҫ��Ӻ��Ƴ���classname
     */
    TB.iehover=function(eles,clsname){
    	if (YAHOO.env.ua.ie==6) {
            var bangpais = D.getElementsByClassName(eles);
          
            E.on(bangpais, 'mouseover',function() {
                D.addClass(this, clsname);
            });

            E.on(bangpais, 'mouseout',function() {
                D.removeClass(this, clsname);
            });
        }
    }
})();