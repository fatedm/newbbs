<div class="layout seller-tools">
    <h2 class="icon-title"><strong></strong></h2>
    <ul class="seller-tools-list">
        <cms:imageLink group="营销工具导航" title="营销工具导航(164X124)" defaultRow="6" row="18">
        #foreach($item in $imageLinkList)
        <li#if($velocitycount%6 == 0) class="last" #end>
            <a href="$item.href" class="juhuasuan" title="$item.text">
                <img src="$item.img">
            </a>
        </li>
        #end
        </cms:imageLink>
    </ul>
</div>