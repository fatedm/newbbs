(function() {
    //定义本页变量
    var Y = YAHOO,
    D = Y.util.Dom,
    E = Y.util.Event,
    Behavior = Y.util.Command.Behavior,
    //allcheck1=D.get('forslider-1'), //旺旺全选按钮
    //allcheck2=D.get('forslider-2'), //江湖全选按钮
    //checkboxs1=D.get('slider-1').getElementsByTagName('input'), //旺旺全部好友input
    //checkboxs2=D.get('slider-2').getElementsByTagName('input'), //江湖全部好友input
    //lis1=D.get('slider-1').getElementsByTagName('li'),
    //lis2=D.get('slider-2').getElementsByTagName('li'),
    //  copyurl = D.get('copy-url'),
    // copytext = D.get('copy-text'),
    trigger = D.getElementsByClassName("J_Trigger"),
    target = D.getElementsByClassName("J_Target");

    //全选反选，li模拟label焦点
    //TB.CheckAllBox(allcheck1,checkboxs1);
    //TB.CheckAllBox(allcheck2,checkboxs2);
    //TB.Customlabel(checkboxs1,lis1);
    //TB.Customlabel(checkboxs2,lis2);
    //复文本制链接功能
    /*
    E.on(copyurl, 'click', function() {
        TB.CopyToClipboard(copytext.value);
    });

    E.on(copytext, 'click', function() {
        this.select();
    });
*/
    var _isOpen = function(ele) {
        if (D.hasClass(ele, 'open')) {
            D.removeClass(ele, 'open');
        } else {
            D.addClass(ele, 'open');
        }
    }

    //折叠功能
    for (var i = 0; i < trigger.length; i++) {
        //修改为指定H4为切换对象
        var parentH = D.getAncestorByTagName(trigger[i], 'h4');
        E.on(parentH, 'click', Y.util.Command.init({
            func: Behavior.toggleHide,
            preventDefault: true,
            target: target[i]
        }));
        E.on(trigger[i], 'click', Y.util.Command.init({
            func: Behavior.toggleHide,
            preventDefault: true,
            target: target[i]
        }));

        E.on(parentH, 'click',
        function() {
            _isOpen(this.getElementsByTagName('i')[0]);
        });

        E.on(trigger[i], 'click',
        function(e) {
            _isOpen(this);
            E.stopEvent(e);
        });

    }

    //只加载一次slider 模拟滚动条
    var _callback = function() {
        /*
      var sliderone=TB.MouseWheel({
          sBGElId:'slider-1',
          sHandleElId:'slider-thumb1',
          iDown:265,
          Maxheight:340,
          callback:function(h){
              if(h<340){
                  D.getAncestorByTagName('slider-1','div').style.height=h+'px';
                  D.getAncestorByTagName('slider-1','div').style.backgroundImage="none";
                  D.get('slider-thumb1').parentNode.removeChild(D.get('slider-thumb1'));
              }
          }
      });

      var slidertwo=TB.MouseWheel({
          sBGElId:'slider-2',
          sHandleElId:'slider-thumb2',
          iDown:265,
          Maxheight:340,
          callback:function(h){
              //加载完成滚动条后执行的动作
              setTimeout(function(){
                  try{
                  var Div=D.get('J_BeforeHidden'),
                      Openi=D.getElementsByClassName('J_Trigger','i',D.getAncestorByTagName('J_BeforeHidden','div'))[0];
                  }catch(e){
                      alert(e);
                  }

                  if (D.hasClass(Openi, 'open')) {
                      D.addClass(Div, 'hidden');
                  }
                  },50);
          }
      });
      */
        //加载旺旺好友
        TB.InviteLoadWw();
    };

    //加载YUI的slider模块,只会加载一次
    var loader = new Y.util.YUILoader({
        require: ["slider"],
        loadOptional: true,
        onSuccess: _callback,
        timeout: 10000,
        combine: true
    });

    loader.insert();

})(); 