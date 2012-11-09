<?php
/**
 * Fileoverview:
 * User: dmm
 * Date: 12-10-30
 * Time: 上午10:17
 */
?>
<?php
    $page = "publishVote";
    $title = "发帖";
    include ("inc/hd.php");
?>
<!--[if lt IE 8]>
<link href="http://a.tbcdn.cn/s/kissy/1.2.0/editor/theme/cool/editor-pkg-sprite-min.css" rel="stylesheet"/>
<![endif]-->
<!--[if gte IE 8]><!-->
<link href="http://a.tbcdn.cn/s/kissy/1.2.0/editor/theme/cool/editor-pkg-min-datauri.css" rel="stylesheet"/>
<!--<![endif]-->
<link href="../style/publishThread.css" rel="stylesheet">
<script>window.g_config={appId:9};</script>
<script>
    var UA_Opt = new Object;
    UA_Opt.LogTarget = ['j_title', 'boradId', 'msgpost','editorbodyid', 'j_submit'];
    UA_Opt.FormId = "publishVote";
    UA_Opt.MaxMCLog = 5;
    UA_Opt.MaxKSLog = 5;
    UA_Opt.MaxMPLog=5;
    UA_Opt.SendMethod=1;
    UA_Opt.Flag=14222;
    UA_Opt.Token = '1351563399116:0.5281810969853299';
</script>
<script language="javascript" src="http://uaction.aliyuncdn.com/actionlog/js/ua.js"></script>

<div id='content'><!--content start-->
<div id="crumb">
    <a class="bbs-index" href="http://bbs.taobao.com/index.htm" target="_top">淘宝论坛</a>
    <span>&gt;</span>
    <a href="http://bbs.taobao.com/catalog/963001.htm">
        网商论剑
    </a>
    <span>&gt;</span>
    发表投票帖

</div>
<div id='bd'><!--bd start-->
<form method="post" action="" name="pollForm" id="publishVote">
<input type="hidden" name="action" value="forum/forum_thread_action" />
<input type="hidden" name="event_submit_do_publish_vote" value="anyting" />
<input type="hidden" name="type" value="plain" />
<input type="hidden" id="tbToken" name="tbToken" value="e6fb8ee6e338e"/>
<input type="hidden" id="maxAnswer" name="_fmw.publishfo._0.m" />
<input type="hidden" id="endDate" name="_fmw.publishfo._0.e" />
<input type="hidden" name="_fmw.publishfo._0.g" value="1338197" />
<input type="hidden" name="threadId" value="" />
<input type="hidden" name="groupId" value="1338197" />
<input type="hidden" id="request_path" name="requestPath" value=""/>
<input type="hidden" name="_fmw.publishfo._0.u" value="AF74CFCBAC17B1B1726734565A636625" />
<input type="hidden" id="j_previewKey" name="_fmw.publishfo._0.p" value="false" />
<div class='main'>
<div class='title' style="margin-top:16px;">
    <h3>?发表投票帖 <a href="http://bbs.taobao.com/catalog/thread/1092001-259404853.htm?spm=0.0.0.1.d03055" target="_blank" style="color:red; font-weight: normal;">《淘宝论坛用户发帖规则》新手必读</a></h3>
    <div class='open-img' >
        <a id='j_open' href='javascript:void(0)'>打开发表图片投票</a>
    </div>
    <div class='mouse_tip' id='j_mouse_tip' style='z-index:6667'>
        <div>灰常强大的功能,可以在选项中直接插入图片哦!目前仅对<a href="http://bangpai.taobao.com/group/thread/12011-310776.htm" target="_blank"> 登堂入室 </a>以上级别的会员开放哦~</div>
    </div>
    <div class='click_tip' style='z-index:6668'>
        <div>对不起,您的等级还不够,目前还不能使用此功能哦~先修炼到<a href="http://bangpai.taobao.com/group/thread/12011-310776.htm" target="_blank"> 登堂入室 </a>再来尝试吧!</div>
    </div>
</div>
<div class='post'>
    <table cellspacing="0" cellpadding="0" class="new">
        <tbody>
        <tr><th>帖子标题：</th>
            <td>
                <input type="text" class='text-long' id="j_title" name='_fmw.publishfo._0.s' value=''/>
            </td>
        </tr>
        <tr><th>发表版面：</th>
            <td>
                <select name="_fmw.publishfo._0.b" id="boradId">
                    <option  value="1062098">【版务公告】</option>
                    <option  value="1061105">【实战经验】</option>
                    <option  value="1060588">【网商业界】</option>
                    <option  value="1060587">【网商思想】</option>
                    <option  value="11755510">【网商故事】</option>
                    <option  value="11633510">【网商活动】</option>
                    <option  value="11870014">【网商议事】</option>
                    <option  value="12986011">【店铺诊断】</option>
                    <option  value="11906512">【网商访谈】</option>
                    <option  value="11596010">【热点观察】</option>
                    <option  value="11632011">【SNS营销】</option>
                    <option  value="12933510">【每日播报】</option>
                    <option  value="11435512">【皇冠俱乐部】</option>
                    <option  value="11632510">【玩转淘金币】</option>
                    <option  value="11545010">【网商评选】</option>
                    <option  value="11622510">【派代网出品】</option>
                    <option  value="11912010">【淘宝直播间】</option>
                    <option  value="13215010">【四合院培训】</option>
                    <option  value="12271010">【数据营销学院】</option>
                    <option  value="12832012">【淘宝美妆类目】</option>
                    <option  value="12832013">【淘宝服饰类目】</option>
                    <option  value="12830511">【淘宝家居类目】</option>
                    <option  value="12829011">【淘宝母婴类目】</option>
                </select>
            </td>
        </tr>
        <tr><th>内容正文：</th>
            <td><textarea name="_fmw.publishfo._0.c" id="msgpost" style="width: 760px; height: 300px"></textarea>
                <div style="float:right;margin-top:-20px">使用有问题？请看<a target="_blank" href="http://bbs.taobao.com/catalog/thread/1093005-250544615.htm">这里</a></div>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<div class='bd'>
    <div class='tb'>
        <table cellspacing="0" cellpadding="0" class="vote-table" >
            <tbody id='vote-post'>
            <tr style='display:none' >
                <td>
                    <div class='edit' id='j_one'>
                        <div class='j_close' title='移除该选项'></div>
                        <div class='con'>
                            <div class='j_text'><span class='j_name'>选项0：</span>
                                <input type="text" class='text-long' />
                                <img src='http://img07.taobaocdn.com/tps/i7/T1_d4pXk0BXXXXXXXX-26-22.png' border=0 class='j_link' />
                            </div>
                            <div class='j_edit'><span class='j_edit_bg'></span>
                                <div class='j_edit_con'>
                                    链接到：<input type='text' class='texthref' value='http://'><input type='button' value='确定' class='btn_true'/>
                                    <a class='j_false' href='javascript:void(0)'>取消</a>
                                </div>
                            </div>
                            <div class='j_showlink'>链接到： <a title='' class='j_showlink_text'></a>
                                <a href="javascript:void(0)" class='j_showlink_edit' >修改</a><a href="javascript:void(0)" class='j_showlink_del'>移除</a>
                            </div>
                        </div>
                    </div>
                    <div class='msg-box msg'><p class="error">链接不正确或者包含外链及淘宝店铺、商品、淘客等链接</p></div>
                </td>
            </tr>



            <tr>
                <td>
                    <div class='edit'>
                        <div class='j_close' title='移除该选项'></div>
                        <div class='con' >
                            <div class='j_text'><span class='j_name'>选项1：</span>
                                <input type="text" class='text-long' maxlength='60' value=""/>
                                <img src='http://img07.taobaocdn.com/tps/i7/T1_d4pXk0BXXXXXXXX-26-22.png' border=0 class='j_link' />
                            </div>
                            <div class='j_edit'><span class='j_edit_bg'></span>
                                <div class='j_edit_con'>
                                    链接到：<input type='text' class='texthref' value='http://'><input type='button' value='确定' class='btn_true'/>
                                    <a class='j_false' href='javascript:void(0)'>取消</a>
                                </div>
                            </div>
                            <div class='j_showlink'>链接到：<a title='' class='j_showlink_text'></a>
                                <a href="javascript:void(0)" class='j_showlink_edit'>修改</a><a href="javascript:void(0)" class='j_showlink_del'>移除</a>
                            </div>
                        </div>
                    </div>
                    <div class='msg-box msg'><p class="error">链接不正确或者包含外链及淘宝店铺、商品、淘客等链接</p></div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class='edit'>
                        <div class='j_close' title='移除该选项'></div>
                        <div class='con' >
                            <div class='j_text'><span class='j_name'>选项2：</span>
                                <input type="text" class='text-long' maxlength='60' value=""/>
                                <img src='http://img07.taobaocdn.com/tps/i7/T1_d4pXk0BXXXXXXXX-26-22.png' border=0 class='j_link' />
                            </div>
                            <div class='j_edit'><span class='j_edit_bg'></span>
                                <div class='j_edit_con'>
                                    链接到：<input type='text' class='texthref' value='http://'><input type='button' value='确定' class='btn_true'/>
                                    <a class='j_false' href='javascript:void(0)'>取消</a>
                                </div>
                            </div>
                            <div class='j_showlink'>链接到：<a title='' class='j_showlink_text'></a>
                                <a href="javascript:void(0)" class='j_showlink_edit'>修改</a><a href="javascript:void(0)" class='j_showlink_del'>移除</a>
                            </div>
                        </div>
                    </div>
                    <div class='msg-box msg'><p class="error">链接不正确或者包含外链及淘宝店铺、商品、淘客等链接</p></div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class='edit'>
                        <div class='j_close' title='移除该选项'></div>
                        <div class='con' >
                            <div class='j_text'><span class='j_name'>选项3：</span>
                                <input type="text" class='text-long' maxlength='60' value=""/>
                                <img src='http://img07.taobaocdn.com/tps/i7/T1_d4pXk0BXXXXXXXX-26-22.png' border=0 class='j_link' />
                            </div>
                            <div class='j_edit'><span class='j_edit_bg'></span>
                                <div class='j_edit_con'>
                                    链接到：<input type='text' class='texthref' value='http://'><input type='button' value='确定' class='btn_true'/>
                                    <a class='j_false' href='javascript:void(0)'>取消</a>
                                </div>
                            </div>
                            <div class='j_showlink'>链接到：<a title='' class='j_showlink_text'></a>
                                <a href="javascript:void(0)" class='j_showlink_edit'>修改</a><a href="javascript:void(0)" class='j_showlink_del'>移除</a>
                            </div>
                        </div>
                    </div>
                    <div class='msg-box msg'><p class="error">链接不正确或者包含外链及淘宝店铺、商品、淘客等链接</p></div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class='edit'>
                        <div class='j_close' title='移除该选项'></div>
                        <div class='con' >
                            <div class='j_text'><span class='j_name'>选项4：</span>
                                <input type="text" class='text-long' maxlength='60' value=""/>
                                <img src='http://img07.taobaocdn.com/tps/i7/T1_d4pXk0BXXXXXXXX-26-22.png' border=0 class='j_link' />
                            </div>
                            <div class='j_edit'><span class='j_edit_bg'></span>
                                <div class='j_edit_con'>
                                    链接到：<input type='text' class='texthref' value='http://'><input type='button' value='确定' class='btn_true'/>
                                    <a class='j_false' href='javascript:void(0)'>取消</a>
                                </div>
                            </div>
                            <div class='j_showlink'>链接到：<a title='' class='j_showlink_text'></a>
                                <a href="javascript:void(0)" class='j_showlink_edit'>修改</a><a href="javascript:void(0)" class='j_showlink_del'>移除</a>
                            </div>
                        </div>
                    </div>
                    <div class='msg-box msg'><p class="error">链接不正确或者包含外链及淘宝店铺、商品、淘客等链接</p></div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class='edit'>
                        <div class='j_close' title='移除该选项'></div>
                        <div class='con' >
                            <div class='j_text'><span class='j_name'>选项5：</span>
                                <input type="text" class='text-long' maxlength='60' value=""/>
                                <img src='http://img07.taobaocdn.com/tps/i7/T1_d4pXk0BXXXXXXXX-26-22.png' border=0 class='j_link' />
                            </div>
                            <div class='j_edit'><span class='j_edit_bg'></span>
                                <div class='j_edit_con'>
                                    链接到：<input type='text' class='texthref' value='http://'><input type='button' value='确定' class='btn_true'/>
                                    <a class='j_false' href='javascript:void(0)'>取消</a>
                                </div>
                            </div>
                            <div class='j_showlink'>链接到：<a title='' class='j_showlink_text'></a>
                                <a href="javascript:void(0)" class='j_showlink_edit'>修改</a><a href="javascript:void(0)" class='j_showlink_del'>移除</a>
                            </div>
                        </div>
                    </div>
                    <div class='msg-box msg'><p class="error">链接不正确或者包含外链及淘宝店铺、商品、淘客等链接</p></div>
                </td>
            </tr>

            <tfoot class='tfoot'>
            <tr><td>
                <div style="display: none;" id="add_msg" class="msg"><p class="error"/></div>
                <a href='javascript:void(0)' id='j_add_item' ><img src='http://img06.taobaocdn.com/tps/i6/T1w8BoXd0jXXXXXXXX-16-16.png'>增加选项</a></td></tr>
            </tfoot>
        </table>
    </div>
    <div class='mode'>
        <span class="mode-title">投票方式：</span>
        <input type='radio' name='mode' checked='true'  id='j_radio1'/>单选

        <input type='radio' name='mode'   id='j_radio2' />多选
<span id='j_multiple_span'> <span class='mode-text'>最多可选&nbsp</span>
<div id='j_select' class='sp_select'>
    <input type='text' class='select-text' value="2" name='tb_select' id='j_multiple' />
    <a class='up'></a><a class='down'></a>
</div><span class='mode-text'>项</span>
</span>
    </div>
    <div class='result'>
        <span class="result-title">投票结果：</span><input  name="_fmw.publishfo._0.v" value="true" type='checkbox' checked="true"/> 只有投票才能查看结果
    </div>
    <div class='bd-time' id='j_time'><div class='bd-time-opt'>结束时间：
        <select id="J_Year" name="year" >
        </select>
        <select id="J_Month" name="month" >
        </select>
        <select id="J_Date" name="date" >
        </select>
        <select id="J_Hour" name="hour" >
        </select>
    </div>
    </div>
    <div id='j_msgBox'>
    </div>
    <input type='hidden' value="" name='vote_options' id='j_options'/>

    <div class='bd-post post'>
        <p class="verify">
            <input id="checkCodeInput" type="text" class="text" maxlength="4" name="_fmw.publishfo._0.ch" />
        </p>
        <p style="clear:both;">
            <button name="button_publish" type="submit" title="发表" class="btn-m" id='j_submit'>发 表</button>
            <button class="btn-bm" name="button_preview" title="预览" id="j_preview" type="button" >预 览</button>
        </p>
    </div>
</div>
</div>
</form>
</div><!--bd end-->

</div><!--content end-->
<!--隐藏 用于提供url-->
<input type="hidden" id="J_PreviewLink" value="http://bbs.taobao.com/forum/preview_vote.htm">
<input type="hidden" id="J_PicVoteUrl" value="http://bbs.taobao.com/catalog/publish_pic_vote/1338197.htm">
<input type="hidden" id="J_CheckUrl" value="http://bbs.taobao.com/json/check_pic_vote_permission.htm">
<script>
    var preview_link="";
</script>


<script>
    (function (S) {
        var D = S.DOM;
        var E = S.Event;

        var refreshCc = function() {
            var ccImg = D.get('#checkCodeImg');
            if (ccImg){
                nowTime = new Date();
                ccImg.src = ccImg.src + '&r=' + nowTime.getTime();
            }
        }

        E.on('#update-code', 'click', function(e) {
            refreshCc();
            e.halt();
        })
    })(KISSY);
</script>
<script type="text/javascript">
    KISSY.ready(function(S){

        var ccCodeInputArea = 'checkCodeInput',
                codeUrl = "http://regcheckcode.taobao.com/auction/checkcode?sessionID=d680bcad1f6e46e69a8cad8fe1f019b0&_ts=1351563399118&r=";

        var D = S.DOM,
                E = S.Event;

        var onecrsh = false,
                timestamp = new Date().getTime(),
                ccCodeImgId = "ccCodeImgId" + timestamp,
                ccCodeUpdateId = "ccCodeUpdateId" + timestamp;

        var refreshCc = function(){
            D.attr('#' + ccCodeImgId, 'src', codeUrl + new Date().getTime());
        };

        var ccCodeImg = function() {
            D.insertAfter(D.create('<img>', {
                'id' : ccCodeImgId,
                'src' : codeUrl + new Date().getTime()
            }), D.get('#' + ccCodeInputArea));
        };

        var refreshCcCode = function() {
            var link = D.create('<a>', {
                'id' : ccCodeUpdateId,
                'href' : '#'
            });
            D.html(link, '看不清验证码？');
            D.insertAfter(link, D.get('#' + ccCodeImgId));

            E.on(link, 'click', function(e) {
                refreshCc();
                e.halt();
            });
        };

        E.on('#' + ccCodeInputArea, 'focus', function(e){
            if(!onecrsh){
                ccCodeImg();
                refreshCcCode();
                refreshCc();
            }
            onecrsh=true;
            e.halt();
        });

        if(D.get('#' + ccCodeInputArea)) {
            var input=D.get('#' + ccCodeInputArea),
                    tip = '点击输入验证码',
                    tipColor = 'silver';
            E.on(input, 'focus', function() {
                if (this.value === tip) {
                    this.value = '';
                    this.style.color = '';
                }
            });
            E.on(input, 'blur', function() {
                if (!this.value) {
                    this.value = tip;
                    this.style.color = tipColor;
                }
            });
            input.value = tip;
            input.style.color = tipColor;

            var form=D.parent(input,'form');
            E.on(form,'submit',function(e){
                if(input.value==tip){
                    input.value="";
                };
            });
        }
    });
</script>
<div id="J_Overlay" class="text-preview"></div>
<script src="http://a.tbcdn.cn/s/kissy/1.2.0/??uibase-min.js,component-min.js,dd-min.js,overlay-min.js,editor-min.js,editor/biz/ext/editor-plugin-pkg-min.js"></script>
<?php
    include ('inc/ft.php');
?>