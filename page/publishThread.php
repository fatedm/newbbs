<?php
/**
 * Fileoverview:
 * User: dmm
 * Date: 12-10-29
 * Time: ����4:08
 */
?>
<?php
$page = "publishThread";
$title = "����";
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
        <a class="bbs-index" href="http://bbs.taobao.com/index.htm" target="_top">�Ա���̳</a>
        <span>&gt;</span>
        <a href="http://bbs.taobao.com/catalog/963001.htm">
            �����۽�
        </a>
        <span>&gt;</span>
        ��������

    </div><!--gd end-->
    <div id='bd'><!--bd start-->
        <div class='main'>
            <div class='title'>
                <h3>���������� <a href="http://bbs.taobao.com/catalog/thread/1092001-259404853.htm?spm=0.0.0.1.d03055" target="_blank" style="color:red; font-weight: normal;">���Ա���̳�û������������ֱض�</a></h3>
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
                        <tr><th>���ӱ��⣺</th>
                            <td><input type="text" class='text-long' id="j_title" name='_fmw.publi._0.s' value=''/>
                            </td>
                        </tr>

                        <tr><th>������棺</th>
                            <td>
                                <select name="_fmw.publi._0.b" id="boradId">
                                    <option  value="1062098">�����񹫸桿</option>
                                    <option  value="1061105">��ʵս���顿</option>
                                    <option  value="1060588">������ҵ�硿</option>
                                    <option  value="1060587">������˼�롿</option>
                                    <option  value="11755510">�����̹��¡�</option>
                                    <option  value="11633510">�����̻��</option>
                                    <option  value="11870014">���������¡�</option>
                                    <option  value="12986011">��������ϡ�</option>
                                    <option  value="11906512">�����̷�̸��</option>
                                    <option  value="11596010">���ȵ�۲졿</option>
                                    <option  value="11632011">��SNSӪ����</option>
                                    <option  value="12933510">��ÿ�ղ�����</option>
                                    <option  value="11435512">���ʹھ��ֲ���</option>
                                    <option  value="11632510">����ת�Խ�ҡ�</option>
                                    <option  value="11545010">��������ѡ��</option>
                                    <option  value="11622510">���ɴ�����Ʒ��</option>
                                    <option  value="11912010">���Ա�ֱ���䡿</option>
                                    <option  value="13215010">���ĺ�Ժ��ѵ��</option>
                                    <option  value="12271010">������Ӫ��ѧԺ��</option>
                                    <option  value="12832012">���Ա���ױ��Ŀ��</option>
                                    <option  value="12832013">���Ա�������Ŀ��</option>
                                    <option  value="12830511">���Ա��Ҿ���Ŀ��</option>
                                    <option  value="12829011">���Ա�ĸӤ��Ŀ��</option>
                                </select>
                            </td>
                        </tr>

                        <tr><th>�������ģ�</th>
                            <td>
                                <textarea name="_fmw.publi._0.c" id="msgpost" style="width: 760px; height: 300px"></textarea>
                                <div style="float:right;margin-top:-20px">ʹ�������⣿�뿴<a target="_blank" href="http://bbs.taobao.com/catalog/thread/1093005-250544615.htm">����</a> </div>

                                <p class="verify m10">
                                    <input id="checkCodeInput" type="text" name="_fmw.publi._0.ch" maxlength="4" class="text"/>
                                </p>
                                <p style="clear:both;">
                                    <button name="button_publish" type="submit" title="����" class="btn-m" id='j_submit'>�� ��</button>
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