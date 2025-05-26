/**
* 图片浏览
* @author baln balncom@gmail.com
*/
document.write('<scr' + 'ipt ' + 'type="text/javascript" src="/js/jqDnR.js"' + '>' + '</scr' + 'ipt>');
document.write('<link rel="stylesheet" type="text/css" href="/css/enlarge_file.css" media="all" />');
var box_html = '<div id="box_view" style="display: none;">'
+ '<div id="box_right">'
+ '<a class="b_close" onclick="viewPic.close();" title="关闭"></a>'
+ '<div class="desc" id="imgDesc">这里是文字描述..</div>'
+ '<div class="loading" id="loading" style="display: none;">清晰图片加载中...</div><span id="errorMsg" style="display: none;">a</span>'
+ '<a class="prev" id="prevPic" onclick="viewPic.prevPic();return false;" href="javascript:void(0);"></a>'
+ '<a class="next" id="nextPic" onclick="viewPic.nextPic();return false;" href="javascript:void(0);"></a>'
+ '<img src="https://www.r355.com/images/spacer.gif" id="imgShow" class="dragAble" style="display: none;" alt="" />'
+ '<ul class="imgFt" id="imgFt"></ul>'
+ '</div>'
+ '</div>'
+ '<div id="box_tools" style="display: none;">'
+ '<div class="wrap">'
+ '<div class="box_tools_bg inner">'
+ '<span class="box_tools_bg l">&nbsp;</span>'
+ '<ul>'
+ '<li>'
+ '<div class="tl_text"><p><span id="pageNo">1/20</span></p><p><span id="picNo">8918191</span></p></div>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_line"><span class="box_tools_bg">&nbsp;</span></span>'
+ '<span class="tls tl_zoom_d"><a onmousedown="viewPic.ZoomPicAuto(\'start\',\'+\');return false;" onmouseup="viewPic.ZoomPicAuto(\'stop\');return false;" onmouseout="viewPic.ZoomPicAuto(\'stop\');return false;" class="box_tools_bg" title="点击放大" href="javascript:void(0);">点击放大</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_zoom_x"><a onmousedown="viewPic.ZoomPicAuto(\'start\',\'-\');return false;" onmouseup="viewPic.ZoomPicAuto(\'stop\');return false;" onmouseout="viewPic.ZoomPicAuto(\'stop\');return false;" class="box_tools_bg" title="点击缩小" href="javascript:void(0);">点击缩小</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_equal" id="t_equal"><a onclick="viewPic.setPicSize(\'org\');return false;" class="box_tools_bg" title="原图大小" href="javascript:void(0);">原图大小</a></span>'
+ '<span class="tls tl_size" id="t_size"><a onclick="viewPic.setPicSize(\'sui\');return false;" class="box_tools_bg" title="适合尺寸" href="javascript:void(0);">适合尺寸</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_line"><span class="box_tools_bg">&nbsp;</span></span>'
+ '<span class="tls tl_prev" id="t_prev"><a onclick="viewPic.prevPic();return false;" class="box_tools_bg" title="上一张" href="javascript:void(0);">上一张</a></span>'
+ '<span class="tls tl_prev_disable" id="t_prev_no" title="亲，没有上一张了"><span class="box_tools_bg">上一张</span></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_next" id="t_next"><a onclick="viewPic.nextPic();return false;" class="box_tools_bg" title="下一张" href="javascript:void(0);">下一张</a></span>'
+ '<span class="tls tl_next_disable" id="t_next_no" title="亲，下一张没有啦"><span class="box_tools_bg">下一张</span></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_paly" id="t_play"><a onclick="viewPic.nextPicAuto(\'play\');return false;" class="box_tools_bg" title="播放" href="javascript:void(0);">播放</a></span>'
+ '<span class="tls tl_stop" id="t_stop" style="display:none;"><a onclick="viewPic.nextPicAuto(\'stop\');return false;" class="box_tools_bg" title="暂停" href="javascript:void(0);">暂停</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_line"><span class="box_tools_bg">&nbsp;</span></span>'
+ '<span class="tls tl_favorite" id="t_favorite"><a onclick="save_this_page();return false;" class="box_tools_bg" title="亲，点我收藏喔" href="javascript:void(0);">收藏</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_print" id="t_print"><a onclick="viewPic.printPic();return false;" class="box_tools_bg" title="打印图片" href="javascript:void(0);">打印</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_d_psd" id="t_d_psd"><a class="box_tools_bg" title="下载PSD" href="javascript:void(0);" target="_blank">下载PSD</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_d_cdr" id="t_d_cdr"><a class="box_tools_bg" title="下载CDR" href="javascript:void(0);" target="_blank">下载CDR</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_d_ai" id="t_d_ai"><a class="box_tools_bg" title="下载AI" href="javascript:void(0);" target="_blank">下载AI</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_d_rar" id="t_d_rar"><a class="box_tools_bg" title="下载RAR" href="javascript:void(0);" target="_blank">下载RAR</a></span>'
+ '</li>'
+ '<li>'
+ '<span class="tls tl_line"><span class="box_tools_bg">&nbsp;</span></span>'
+ '<span class="tls tl_close"><a onclick="viewPic.close();return false;" class="box_tools_bg" title="关闭" href="javascript:void(0);">关闭</a></span>'
+ '</li>'
+ '</ul>'
+ '<span class="box_tools_bg r">&nbsp;</span>'
+ '</div>'
+ '</div>'
+ '</div>';
document.write(box_html);
var $id = function (s) {
    return (typeof s == "object") ? s : document.getElementById(s);
};
var autoPlay = null;
var autoZoom = null;
var isLoad = false;
var viewPic = {
    sCid: 0,
    curPicIndex: 0,
    totalPicNum: 0,
    arrPicList: null,
    showFt: 0,
    isVip: 0,
    init: function () {
        this.sCid = pageData.cid;
        this.arrPicList = pageData.arrPicList;
        this.totalPicNum = pageData.arrPicList.length;
        this.isVip = pageData.isVip;
        $('#box_view,#box_tools').fadeIn('fast');
        document.documentElement.style.overflow = 'hidden'; //隐藏滚动条
        if (this.isVip < 3) {
            document.ondragstart = function () { return false; }
            document.oncontextmenu = function () { return false; }
            document.onselectstart = function () { return false; }
            document.oncopy = function () { return false; }
            document.oncut = function () { return false; }
            document.onpaste = function () { return false; }
            $('#t_favorite,#t_print').hide();
            if (this.isVip == 1) {
                $('#t_favorite').show();
            }
        }
        this.setDocumentBg();
        this.setPosition();
        $("#imgShow").mousemove(viewPic.getMousePos);
        if (document.addEventListener) document.addEventListener("DOMMouseScroll", viewPic.imgZoom, false);
        document.onmousewheel = viewPic.imgZoom;
        //拖动
        $("#imgShow").jqDrag();
        var old_x, old_y;
        $('#imgShow').mousedown(function () {
            old_x = parseInt(jQuery('#imgShow').css('left'));
            old_y = parseInt(jQuery('#imgShow').css('top'));
        });
        $('#imgShow').mouseup(function (evt) {
            var bottunCode = evt.button || evt.which;
            if (bottunCode == 1) {
                var new_x = parseInt(jQuery('#imgShow').css('left'));
                var new_y = parseInt(jQuery('#imgShow').css('top'));
                if (new_x == old_x && new_y == old_y) {
                    viewPic.close();
                }
            }
        });
    },
    setPosition: function () {
        var scrollTop = $(window).scrollTop(), imgBox = $('#box_view');
        //imgBox.css('top', scrollTop).css('left',$(window).width()/2 - imgBox.width()/2);viewPic.addFavorite()
        $('#box_right,#box_view')
		.css('height', $(window).height())
        //.css('width',$(window).width());
    },
    initPicButton: function () {
        $('#t_prev,#t_next,#prevPic,#nextPic').show();
        $('#t_prev_no,#t_next_no').hide();
        if (this.curPicIndex <= 0) {
            //viewPic.showError('第一张', 3);
            $('#t_prev,#prevPic').hide(); $('#t_prev_no').show();
        }
        if (this.curPicIndex >= this.totalPicNum - 1) {
            //viewPic.showError('最后一张', 3);
            $('#t_next,#nextPic').hide(); $('#t_next_no').show();
        }
    },
    showPicNo: function () {
        $('#pageNo').html('<i>' + (this.curPicIndex + 1) + '</i>/' + this.totalPicNum);
    },
    goFirst: function () {
        if (this.totalPicNum > 0) {
            this.setPic(0);
        }
    },
    goLast: function () {
        this.setPic(this.totalPicNum - 1);
    },
    goPrevPic: function () {
        if (this.curPicIndex >= 0) {
            this.curPicIndex--;
            if (this.curPicIndex < 0) {
                this.curPicIndex = 0;
                return;
            }
            this.setPic(this.curPicIndex);
        }
    },
    goNextPic: function () {
        if (viewPic.curPicIndex < viewPic.totalPicNum) {
            viewPic.curPicIndex++;
            if (viewPic.curPicIndex > viewPic.totalPicNum - 1) {
                viewPic.curPicIndex = viewPic.totalPicNum - 1;
                viewPic.nextPicAuto('stop');
                return;
            }
            viewPic.setPic(viewPic.curPicIndex);
        }
    },
    prevPic: function () {
        setTimeout("viewPic.goPrevPic()", 10);
    },
    nextPic: function () {
        setTimeout("viewPic.goNextPic()", 10);
    },
    nextPicAuto: function (type) {
        if (type == 'play') {
            autoPlay = setInterval(viewPic.goNextPic, 4000);
            $('#t_play').hide(); $('#t_stop').show();
        }
        else if (type == 'stop') {
            clearInterval(autoPlay);
            $('#t_play').show(); $('#t_stop').hide();
        }
    },
    setPic: function (nIndex) {

        nIndex = parseInt(nIndex);
        this.curPicIndex = nIndex;

        this.loadPic(nIndex);
        this.getPicFt(nIndex);
        this.recentBrowse(nIndex);
        this.initPicButton();
        this.showPicNo();
        clearInterval(autoZoom);
        this.setPicPv(nIndex);

    },
    setPicPv: function (nIndex) {
        var sPid = this.arrPicList[nIndex].sPid;
        var sCid = this.arrPicList[nIndex].sCid;
        //alert(sPid);
        if (sCid == '1407') {
            $.get("/App/book/designtrend.php?act=setPicPv&sPid=" + sPid, function (data) {
                return true;
            });
        }
    },
    loadPic: function (nIndex) {
        if (!isLoad) {
            viewPic.init();
        }
        $('#t_d_psd,#t_d_ai,#t_d_cdr,#t_d_rar').hide();
        if (this.arrPicList[nIndex].sRarpsd) $('#t_d_psd').show(); $('#t_d_psd > a').attr('href', this.arrPicList[nIndex].sRarpsd);
        if (this.arrPicList[nIndex].sRarai) $('#t_d_ai').show(); $('#t_d_ai > a').attr('href', this.arrPicList[nIndex].sRarai);
        if (this.arrPicList[nIndex].sRarcdr) $('#t_d_cdr').show(); $('#t_d_cdr > a').attr('href', this.arrPicList[nIndex].sRarcdr);
        if (this.arrPicList[nIndex].sRarpic) $('#t_d_rar').show(); $('#t_d_rar > a').attr('href', this.arrPicList[nIndex].sRarpic);

        $('#picNo').html(this.arrPicList[nIndex].sPicNo);


       
        var imgShow = $('#imgShow');

        $('#loading').show();
        //小图片

        //加载临时图片 begbin
        /*if(this.sCid == 13) {
        showpic_url = 'http://www.sxxl.cn/show_pic.php?u='+getCookie("SxxlUserNameLogin")+'&cid=13&p='+viewPic.arrPicList[nIndex].sBigSrc+'&jsoncallback=?';
        $.getJSON(showpic_url, function(html){
        if (viewPic.arrPicList[nIndex].sSmallSrc && ($.browser.safari || $.browser.mozilla)) {
        var dheight = $(window).height();
        imgReady(viewPic.arrPicList[nIndex].sBigSrc, function (){
        imgShow.attr('src', viewPic.arrPicList[nIndex].sSmallSrc);
        imgShow.height(this.height).width(this.width);
        if(this.height >= dheight){
        imgShow.height(dheight).width(this.width*dheight/this.height);
        }
        viewPic.setPicPosition();
        },function() {
        imgShow.attr('src', html.img);
        viewPic.setPicSize('sui');
        });
        }
        else {
        imgShow.attr('src', html.img);
        viewPic.setPicSize('sui');
        }
        });
        } else {
        if (viewPic.arrPicList[nIndex].sSmallSrc && ($.browser.safari || $.browser.mozilla)) {
        var dheight = $(window).height();
        imgReady(viewPic.arrPicList[nIndex].sBigSrc, function (){
        imgShow.attr('src', viewPic.arrPicList[nIndex].sSmallSrc);
        imgShow.height(this.height).width(this.width);
        if(this.height >= dheight){
        imgShow.height(dheight).width(this.width*dheight/this.height);
        }
        viewPic.setPicPosition();
        },function() {
        imgShow.attr('src', viewPic.arrPicList[nIndex].sBigSrc);
        viewPic.setPicSize('sui');
        });
        }
        else {
        imgShow.attr('src', viewPic.arrPicList[nIndex].sBigSrc);
        viewPic.setPicSize('sui');
        }
        }*/
        //加载临时图片 end

        //正常图片 begin
        if (this.arrPicList[nIndex].sSmallSrc && ($.browser.safari || $.browser.mozilla)) {
            var dheight = $(window).height();
            imgReady(viewPic.arrPicList[nIndex].sBigSrc, function () {
                imgShow.attr('src', viewPic.arrPicList[nIndex].sSmallSrc);
                imgShow.height(this.height).width(this.width);
                if (this.height >= dheight) {
                    imgShow.height(dheight).width(this.width * dheight / this.height);
                }
                viewPic.setPicPosition();
            }, function () {
                imgShow.attr('src', viewPic.arrPicList[nIndex].sBigSrc);
                viewPic.setPicSize('sui');
            });
        }
        else {
            imgShow.attr('src', viewPic.arrPicList[nIndex].sBigSrc);
            viewPic.setPicSize('sui');
        }
        //正常图片 end
        document.onkeyup = function (e) {
            if (e == null) { // ie
                keyCode = event.keyCode;
            } else { // mozilla
                keyCode = e.which;
            }
            switch (keyCode) {
                case 27:
                    viewPic.close();
                    break;
                case 37: case 74:
                    viewPic.goPrevPic();
                    break;
                case 39: case 75: case 32:
                    viewPic.goNextPic();
                    break;
                case 36:
                    viewPic.goFirst();
                    break;
                case 35:
                    viewPic.goLast();
                    break;
            }
        }
        if ($("#showTag").val() == 'true')
        {
            $.ajax({
                url: '/Ajax/add_userPoint_img.ashx',
                type: 'POST',
                data: { imgUrl: viewPic.arrPicList[nIndex].sBigSrc, remark: viewPic.arrPicList[nIndex].remark, point: viewPic.arrPicList[nIndex].point, sSex: viewPic.arrPicList[nIndex].sSex, pid: viewPic.arrPicList[nIndex].sPid, itemID: viewPic.arrPicList[nIndex].sCid },
                dataType: 'json',
                success: function (res) {
                    if(res.status==0)
                    {
                        alert(res.msg);
                    }
                },
                error: function (res) {
                    // 错误时处理逻辑
                }
            });
        }
    },
    //图片详细说明
    imgDesc: function () {
        var desc = $('#imgDesc');
        desc.toggle();
    },
    //获取附图
    getPicFt: function (nIndex) {
        var sCid = this.arrPicList[nIndex].sCid;
        var sPid = this.arrPicList[nIndex].sPid;
        var sColumn = this.arrPicList[nIndex].sColumn;
        this.showFt = false;
        if (sCid == 18) {
            this.showFt = 1;
            $('#imgFt').show();
            $('#nextPic').css('right', 65);
        }
        else {
            $('#imgFt').hide();
            $('#nextPic').css('right', 5);
        }
        if (!this.showFt) {
            return;
        }
        if (this.arrPicList[nIndex].sDetail) {
            return;
        }
        var url = '/public/get_pic_ft.php';
        var param = '?cid=' + sCid + '&pid=' + sPid + '&i=' + nIndex + '&column=' + sColumn;
        $.ajax({
            type: "post",
            url: url + param,
            success: function (data) {
                if (data == 'failure')
                    viewPic.showError('对不起,获取附图失败!');
                else
                    $("#imgFt").html(data);
            }
        });
    },
    //浏览记录
    recentBrowse: function (nIndex) {
        $(".cla_" + nIndex).find("p").html("已浏览");
        $(".cla_" + nIndex).find("p").css("color", "red");
        var sCid = this.arrPicList[nIndex].sCid;
        var sPid = this.arrPicList[nIndex].sPid;
        var sTid = this.arrPicList[nIndex].sTid;
        if (sTid == null || typeof (sTid) == 'undefined') sTid = '';
        var sType = this.arrPicList[nIndex].sType;
        if (sType == null || typeof (sType) == 'undefined') sType = '';
        var sMember = this.arrPicList[nIndex].sMember;
        if (sMember == null || typeof (sMember) == 'undefined') sMember = '';
        if (sMember) {
            return;
        }
        var sSex = this.arrPicList[nIndex].sSex;
        if (sSex == null || typeof (sSex) == 'undefined') sSex = '';
        var sSpic = this.arrPicList[nIndex].sSpic;
        var sBpic = this.arrPicList[nIndex].sBpic;
        //保存浏览记录
        var url = '/KSTK/save_viewed_pic.ashx?cid=' + sCid + '&pid=' + sPid + '&tid=' + sTid + '&gender=' + sSex + '&picSmall=' + sSpic + '&picBig=' + sBpic + '&sType=' + sType + '&member=' + sMember;
        //        $.ajax({
        //            type: "post",
        //            url: url,
        //            success: function (data) {
        //                //alert(data);
        //            }
        //        });
    },
    //载入附图
    loadPicFt: function (file) {
        var imgShow = $('#imgShow');
        $('#loading').show();
        imgShow.attr('src', file);
        viewPic.setPicSize('sui');
        //setTimeout("viewPic.setPicSize('sui')", 50);
    },
    //附图选择
    imgFtChoose: function (id) {
        $("#ft" + id).addClass('current').siblings("#imgFt .fta").removeClass('current');
    },
    getMousePos: function (e) {
        var _this = $(this);
        var scrollTop = $(window).scrollTop();
        e = e || window.event;
        var curX = e.pageY ? e.pageX : event.clientX;
        var curY = e.pageY ? e.pageY : event.clientY;
        m_x = curX - parseFloat(_this.css('left')) - parseFloat(jQuery('#box_view').css('left'));
        m_y = curY - parseFloat(_this.css('top')) - scrollTop;
        return { m_x: m_x, m_y: m_y };
    },
    imgZoom: function (e) {
        e = e || window.event;
        var _this = $('#imgShow');
        var ow = parseFloat(_this.width()), oh = parseFloat(_this.height());
        var zoom = e.wheelDelta ? e.wheelDelta / 12000 : -e.detail / 200;
        if (oh < 530 && zoom < 0) return;
        var image = new Image();
        image.src = _this.attr('src');
        if (ow >= image.width * 2 && zoom > 0) return;
        var w = ow * (1 + zoom);
        var h = w * image.height / image.width;
        _this.width(w).height(h);
        var ol = parseFloat(_this.css('left')), ot = parseFloat(_this.css('top'))
        var l = (_this.width() - ow) / 2;
        var t = (_this.height() - oh) / 2;
        //_this.css('left', ol - (zoom*m_x)+'px').css('top', ot - (zoom*m_y)+'px');
        _this.css('left', (ol - l) + 'px').css('top', (ot - t) + 'px');
    },
    zoomPic: function () {
        var imgShow = $('#imgShow');
        var image = new Image();
        image.src = imgShow.attr('src');
        var ow = parseFloat(imgShow.width()), oh = parseFloat(imgShow.height()), ol = parseFloat(imgShow.css('left')), ot = parseFloat(imgShow.css('top'));
        var w = 0, h = 0, l = 0, t = 0;
        var size = 100;
        var imgwstep = image.width / size;
        var imghstep = image.height / size;
        if (oh < 530 && viewPic.zoomType == '-') return;
        if (ow >= image.width * 1.5 && viewPic.zoomType == '+') return;
        if (viewPic.zoomType == '+') {
            w = ow + imgwstep;
            l = ol - imgwstep / 2;
            t = ot - imghstep / 2;
        }
        else {
            w = ow - imgwstep;
            l = ol + imgwstep / 2 + 1;
            t = ot + imghstep / 2;
        }
        h = w * image.height / image.width;
        imgShow.width(w).height(h).css('left', l + 'px').css('top', t + 'px');
    },
    ZoomPicAuto: function (type, act) {
        if (type == 'start') {
            viewPic.zoomType = act;
            autoZoom = setInterval(this.zoomPic, 10);
        }
        else if (type == 'stop') {
            clearInterval(autoZoom);
        }
    },
    zoomPicMax: function () {
        var imgShow = $('#imgShow');
        var image = new Image();
        image.src = imgShow.attr('src');
        var tw = image.width * 2;
        var th = image.height * 2;
        imgShow.width(parseFloat(tw)).height(parseFloat(th));
        this.setPicPosition();
    },
    setPicSize: function (type) {
        var imgShow = $('#imgShow');
        var dheight = $(window).height();
        if (type == 'org') {
            $('#t_size').show(); $('#t_equal').hide();
        }
        else {
            $('#t_equal').show(); $('#t_size').hide();
        }
        imgReady(imgShow.attr('src'), function () {
            imgShow.height(this.height).width(this.width);
            if (imgShow.height() >= dheight && (type == 'sui')) {
                imgShow.height(dheight).width(this.width * dheight / this.height);
            }
            viewPic.setPicPosition();
            //setTimeout(function(){$('#loading').hide()}, 5000);
        }, function () {
            $('#loading').hide();
        });
    },
    setPicPosition: function () {
        this.setPosition();
        var imgShow = $('#imgShow');
        imgShow
		.css('left', parseFloat(jQuery(window).width()) / 2 - parseFloat(imgShow.width()) / 2 - parseFloat(jQuery('#box_view').css('left')))
		.css('top', parseFloat(jQuery('#box_right').css('height')) / 2 - parseFloat(imgShow.height()) / 2)
		.show();
    },
    addFavorite: function () {
        var sPid = this.arrPicList[this.curPicIndex].sPid;
        var sCid = this.arrPicList[this.curPicIndex].sCid;
        var sSmallSrc = this.arrPicList[this.curPicIndex].sSpic;
        var sBigSrc = this.arrPicList[this.curPicIndex].sBpic;
        var sDetail = this.arrPicList[this.curPicIndex].sDetail;
        /*if(sCid == 18){
        var url = '/public/favorite.php?pid='+sPid+'&cid='+sCid+'&detail='+sDetail;
        $.ajax({
        type: "post",
        url: url,
        success: function(data){
        viewPic.showError(data);
        }
        });
        }else{
        var url = '/member/new_p_mywork_group_memory.php?act=add_info&pid='+sPid+'&cid='+sCid+'&pic_big='+sBigSrc+'&pic_small='+sSmallSrc+'&height=400&width=378&keepThis=true&TB_iframe=true&modal=true';
        tb_show('', url, 'thickbox');
        }*/
        var url = '/member/new_p_mywork_group_memory.php?act=add_info&pid=' + sPid + '&cid=' + sCid + '&pic_big=' + sBigSrc + '&pic_small=' + sSmallSrc + '&height=400&width=378&keepThis=true&TB_iframe=true&modal=true';
        tb_show('', url, 'thickbox');
    },
    //打印图片
    printPic: function () {
        var cheMouse = $('#webBot1_cheMouse').val();
        if (cheMouse == "1") {
            alert("您还没有打印权限！");
            return false;
        }
        var imgShow = $('#imgShow');
        var image = new Image();
        image.src =imgShow.attr('src');
        var pw = image.width, ph = image.height, sw = 595, sh = 842;
        if (image.width > sw || image.height > sh) { //如果原图大小超出预设值，则保持图片正常打印
            if (image.width / image.height >= pw / ph) {
                pw = sw;
                ph = image.height * pw / image.width;
            }
            else {
                ph = sh;
                pw = image.width * ph / image.height;
            }
        }
        var w = window.open('', 'imgShow', 'scrollbars=0,toolbar=0,resizeble=0,location=0,width=1,height=1');
        w.document.body.innerHTML = '<img src="' + image.src + '" width="' + pw + '" height="' + ph + '" border="0" />';
        setTimeout(function () {
            w.focus();
            w.print();
            w.close();
        }, 200);
    },
    //设置背景颜色
    setDocumentBg: function () {
        isLoad = true;
        if (!$.browser.safari) {
            $("body").append("<iframe id='bgiframe'></iframe>");
        }
        $("body").append("<div id='bgdiv'></div>");
        $("#bgiframe,#bgdiv").click(viewPic.close);
    },
    close: function () {
        isLoad = false;
        clearInterval(autoPlay);
        $('#bgiframe,#bgdiv').remove();
        $('#box_view,#box_tools,#imgShow').hide(); //fadeOut('fast');
        if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
            $("body", "html").css({
                height: "auto",
                width: "auto"
            });
            $("html").css('overflow-x', 'hidden').css("overflow-y", '');
        }
        document.onkeydown = '';
        document.onkeyup = '';
        document.ondragstart = '';
        document.oncontextmenu = '';
        document.onselectstart = '';
        document.oncopy = '';
        document.oncut = '';
        document.onpaste = '';
        document.documentElement.style.overflow = ''; //显示滚动条
        return false;
    },
    showError: function (msg, sec) {
        $('#errorMsg').show().html(msg).mouseover(function () {
            $(this).hide();
        });
        if (sec != 0) {
            sec = sec == '' || sec == undefined ? 4 : sec;
            second = sec * 1000;
            setTimeout(function () {
                $('#errorMsg').hide()
            }, second);
        }
    }
}

/**
* 图片头数据加载就绪事件 - 更快获取图片尺寸
* @param	{String}	图片路径
* @param	{Function}	尺寸就绪
* @param	{Function}	加载完毕 (可选)
* @param	{Function}	加载错误 (可选)
* @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
alert('size ready: width=' + this.width + '; height=' + this.height);
});
*/
var imgReady = (function () {
    var list = [], intervalId = null,
    // 用来执行队列
	tick = function () {
	    var i = 0;
	    for (; i < list.length; i++) {
	        list[i].end ? list.splice(i--, 1) : list[i]();
	    };
	    !list.length && stop();
	},
    // 停止所有定时器队列
	stop = function () {
	    clearInterval(intervalId);
	    intervalId = null;
	};
    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
		img = new Image();
        img.src = url;
        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            $('#loading').hide();
            ready.call(img);
            load && load.call(img);
            return;
        };
        width = img.width;
        height = img.height;
        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };
        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
            // 如果图片已经在其他地方加载可使用面积检测
				newWidth * newHeight > 1024
				) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();
        // 完全加载完毕的事件
        img.onload = function () {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();
            load && load.call(img);
            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };
        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();