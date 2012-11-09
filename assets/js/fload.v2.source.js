KISSY.ready(function(S){
    var D = S.DOM,
        E = S.Event,
        Cookie = S.Cookie,
        IO = S.IO,
        cookie = Cookie.get('showPopup'),
        domain = window.location.hostname;
    (cookie) ? '' : Cookie.set('showPopup','0',1,domain,'/');

    if (cookie == '3') return true;

    var head = document.getElementsByTagName('HEAD')[0];
    var style = D.create('<link>');
    D.attr(style, {
        href: 'http://a.tbcdn.cn/app/matrix/css/fload.v2.css',
        rel: 'stylesheet'
    })
    head.appendChild(style);

    var showHide = function () {
        var popup = D.get('#J_popup'),
            rebuildClass = function (el, str, action) {
                if (!D.hasClass(el, str) && (action == 'add')){
                    D.addClass(el, str);
                }else if (D.hasClass(el, str) && (action == 'remove')) {
                    D.removeClass(el, str);
                }
            }

        if (cookie == '1') {
            rebuildClass(popup, 'collapsed', 'add');
            rebuildClass(D.get('#J_collapse'), 'hidden', 'add');
            rebuildClass(D.get('#J_expand'), 'hidden', 'remove');
        } else if (cookie == '2') {
            rebuildClass(popup, 'collapsed', 'remove');
            rebuildClass(D.get('#J_expand'), 'hidden', 'add');
            rebuildClass(D.get('#J_collapse'), 'hidden', 'remove');
        }else if (cookie == '3'){
            rebuildClass(popup, 'hidden', 'add');
        }

        E.on(popup, 'click', function(e){
            var el = e.target;
            switch(el.id) {
                case 'J_close':
                    rebuildClass(popup, 'hidden', 'add');
                    Cookie.set('showPopup', '3', 1, domain, '/');
                    break;
                case 'J_expand':
                    rebuildClass(popup, 'collapsed', 'remove');
                    rebuildClass(el, 'hidden', 'add');
                    rebuildClass(D.get('#J_collapse'), 'hidden', 'remove');
                    Cookie.set('showPopup', '2', 1, domain,'/');
                    break;
                case 'J_collapse':
                    rebuildClass(popup, 'collapsed', 'add');
                    rebuildClass(el, 'hidden', 'add');
                    rebuildClass(D.get('#J_expand'), 'hidden', 'remove');
                    Cookie.set('showPopup', '1', 1, domain, '/');
                    break;
            }
        });
    }
    IO({
        type: 'get',
        url: f_url,
        type: 'json',
        success: function(d){
            var div = document.createElement('div');
            document.body.appendChild(div);
            div.innerHTML = d.responseText;
            showHide();
            E.on(window,'scroll',function(){
                if("\v"=="v" && D.get("#J_popup")) {
                    D.get("#J_popup").className = D.get("#J_popup").className;
                }
            });
        }
    })

});
