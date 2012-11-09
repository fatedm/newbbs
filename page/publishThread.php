<?php
/**
 * Fileoverview:
 * User: dmm
 * Date: 12-10-29
 * Time: 下午4:08
 */
?>
<?php
$page = "publishThread";
$title = "发帖";
include ("inc/hd.php");
?>

<!--[if lt IE 8]>
<link href="http://a.tbcdn.cn/s/kissy/1.2.0/editor/theme/cool/editor-pkg-sprite-min.css" rel="stylesheet"/>
<![endif]-->
<!--[if gte IE 8]><!-->
<link href="http://a.tbcdn.cn/s/kissy/1.2.0/editor/theme/cool/editor-pkg-min-datauri.css" rel="stylesheet"/>
<!--<![endif]-->
<script>window.g_config={appId:9};</script>
<script>
    var UA_Opt = new Object;
    UA_Opt.LogTarget = ['j_title', 'boradId', 'msgpost','editorbodyid', 'j_submit'];
    UA_Opt.FormId = "publishThread";
    UA_Opt.MaxMCLog = 5;
    UA_Opt.MaxKSLog = 5;
    UA_Opt.MaxMPLog=5;
    UA_Opt.SendMethod=1;
    UA_Opt.Flag=14222;
    UA_Opt.Token = '1351499104141:0.23770782611303398';
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
        发表帖子

    </div><!--gd end-->
    <div id='bd'><!--bd start-->
        <div class='main'>
            <div class='title'>
                <h3>｜发表帖子 <a href="http://bbs.taobao.com/catalog/thread/1092001-259404853.htm?spm=0.0.0.1.d03055" target="_blank" style="color:red; font-weight: normal;">《淘宝论坛用户发帖规则》新手必读</a></h3>
            </div>
            <div class='post'>
                <form method="post" id="publishThread">
                    <input type="hidden" name="action" value="/forum/forum_thread_action"/>
                    <input type="hidden" name="_fmw.publi._0.g" value="1338197"/>
                    <input type="hidden" name="_fmw.publi._0.i" value=""/>
                    <input type="hidden" id="request_path" name="requestPath" value=""/>
                    <input type="hidden" name="_fmw.publi._0.u" value="AB9FBF8DAC17B1B172673456B2BC4592" />
                    <input type="hidden" name="event_submit_do_publish" value="anything" />
                    <input type="hidden" id="tbToken" name="_fmw.publi._0.t" value="e6fb8ee6e338e"/>
                    <table cellspacing="0" cellpadding="0" class="new">
                        <tbody>
                        <tr><th>帖子标题：</th>
                            <td><input type="text" class='text-long' id="j_title" name='_fmw.publi._0.s' value=''/>
                            </td>
                        </tr>

                        <tr><th>发表版面：</th>
                            <td>
                                <select name="_fmw.publi._0.b" id="boradId">
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
                            <td>
                                <textarea name="_fmw.publi._0.c" id="msgpost" style="width: 760px; height: 300px"></textarea>
                                <div style="float:right;margin-top:-20px">使用有问题？请看<a target="_blank" href="http://bbs.taobao.com/catalog/thread/1093005-250544615.htm">这里</a> </div>

                                <p class="verify m10">
                                    <input id="checkCodeInput" type="text" name="_fmw.publi._0.ch" maxlength="4" class="text"/>
                                </p>
                                <p style="clear:both;">
                                    <button name="button_publish" type="submit" title="发表" class="btn-m" id='j_submit'>发 表</button>
                                </p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
</div><!--bd end-->
</div><!--content end-->

<script src="http://a.tbcdn.cn/s/kissy/1.2.0/??uibase-min.js,component-min.js,dd-min.js,overlay-min.js,editor-min.js,editor/biz/ext/editor-plugin-pkg-min.js"></script>
<?php
    include ("inc/ft.php");
?>