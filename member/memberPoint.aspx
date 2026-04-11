
<html>
<head>
<title>会员中心-R355服饰资讯网</title>
<meta name="Description"  content="R355服饰资讯网,专业的服装设计网站,为您提供最专业的时装设计,时装设计图,时尚服装图片,环保时装设计,时装设计图片,个性时尚服装图片,服装设计图片,服装款式设计图,服装图案,服装杂志,时装杂志,服装书籍,时装书籍,时装发布,时装发布会等信息">
<meta name="keywords" content="时装设计图,时尚服装图片,环保时装设计,时装设计图片,个性时尚服装图片,服装设计图片,服装款式设计图,服装图案,服装杂志,时装杂志,服装书籍,时装书籍,时装发布,时装发布会">
<meta name="subject" content="服装设计" />
<meta name="searchtitle" content="服装设计,R355服饰资讯网" />
<meta name="language" content="chinese" />
<meta name="location" content="China" />
<meta name="resource-type" content="Good WebSites" />
<meta name="email" content="R355@R355.com" />
<meta name="author" content="R355服饰资讯网,http://www.R355.com" />
<link href="/css/base.css" rel="stylesheet" type="text/css">
<link href="/css/master.css" rel="stylesheet" type="text/css">
<link href="/css/user.css" rel="stylesheet" type="text/css">
    <link href="/css/list.css" rel="stylesheet" type="text/css">
    <link href="/css/new2022.css" rel="stylesheet" type="text/css">
</head>
<body class="color_a">

<script src="/js/jquery-1.7.2.min.js"></script>
<section>
  <link href="/css/header.css" rel="stylesheet" type="text/css" />
  <link href="//at.alicdn.com/t/c/font_4789865_f95hj9izwcr.css" rel="stylesheet">
  <script src="/js/vue.global.js"></script>
  <script src="/js/menu.js?v=0.0121"></script>
  <!-- 引入防xss攻击js -->
  <script src="/js/purify.min.js"></script>

  <div id="header">
    <a href="/" title="R355服饰资讯网"><img src="/images/header/logo.png" class="header-logo"></a>
    <div class="header-first">
      <div class="search">
        <div class="search-icon">
          <img src="/images/header/icon-search.png" alt="">
        </div>
        <input placeholder="请输入品牌名" class="search-input" value="" id="key_barnd" />
        <div class="search-camera">
          <img src="/images/header/camera-icon.png" />
        </div>
        <div class="search-btn">全站搜</div>
        <!-- 拍照搜索弹框 -->
        <div class="search-pop">
          <div class="search-content">
            <div class="search-drop">拖拽图片到这里</div>
            <div class="upload-wrap">
              <input type="file" class="upload-pic" />
              <span class="upload-text">选择文件</span>
            </div>
             
          </div>
          <div class="upload-error" style="display: none;">
            <div class="upload-error-text" style="color:red">抱歉，您上传的文件不是图片格式，请<a href="javascript:void(0)">重新上传</a></div>
            <div class="upload-error-text">仅支持2M以下jpg，jpeg，png，bmp，gif格式图片</div>
          </div>
          <div class="upload-loading" style="display: none;">正在加载图片...</div>
          <div class="upload-close"></div>
        </div>
      </div>
      <div class="header-first-right">
        <a href="/about/downLoadUrl.aspx"><div class="header-first-exe"><img src="/images/header/exe-icon.png" />桌面客户端</div></a>
        
         <div class="header-first-user">欢迎您，<span>wusuowei(点数会员) <a href="/member/default.aspx" class="app" style="color: #ff0000;">会员中心</a> | <a href="/member/loginOut.aspx">退 出</a></span></div>
   
      </div>
    </div>
    <!-- 导航菜单 -->
    <div class="navs">
       <li
        class="navs-item"
        v-for="(item, index) in menuList"
        :key="index"
        @mouseenter="mouseEnterNav($event, item)"
        @mouseleave="handleMouseLeave"
        @click="handleClickMenu($event, item)"
      >
        <img :src="item.icon" v-if="item.icon" style="pointer-events: none;" />
        <span v-if="item.name" style="pointer-events: none;">{{ item.name }}</span>
      </li>
       <!-- 导航菜单箭头 -->
      <span
        id="navArrow"
        class="iconfont icon-a-xingzhuang12"
        :style="{color: currentNav.backgroundTop, transform: navModalVisible ? 'translate3D(0, -40%, 0)' : 'translate3D(0, 0, 0)'}"
        @mouseenter="navModalVisible = true"
        @mouseleave="navModalVisible = false"
      >
      </span>
    </div>
    <!-- 导航菜单下拉项 -->
    <div class="nav-modal-wrap">
      <div
        class="navs-modal"
        ref="navModal"
        :style="{background: currentNav.background, transform: navModalVisible ? 'translate3D(0, 0, 0)' : 'translate3D(0, calc(-100% - 1px), 0)'}"
        :class="currentNav.class"
        
        @mouseenter="navModalVisible = true"
        @mouseleave="navModalVisible = false"
      >
        <div class="navs-modal-top" :style="{background: currentNav.backgroundTop}">
          <span class="circle" :style="{background: currentNav.backgroundTop}"></span>
        </div>
        <div class="navs-modal-content">
          <div class="navs-modal-content-left">
            <div class="category" v-for="(item, index) in currentNav.children" :key="index">
              <div class="section" @click="jumpTo(item)">
                <div class="icon-wrap">
                  <img :src="item.icon" />
                </div>
                <p class="label">{{ item.name }}</p>
              </div>
              <div class="wrap-nav">
                <li class="sub-nav" v-for="(child, index) in item.subMenu" :key="index" @click="jumpTo(child)">{{ child.name }}</li>
              </div>
              <div class="desc" v-if="item.desc">{{ item.desc }}</div>
            </div>
          </div>
          <div class="navs-modal-content-right" v-if="currentNav.category_intro">
            <div>
              <p class="intro-title">
                <img src="/images/header/intro-title.png" style="margin-right: 5px;">栏目介绍
              </p>
              <p class="intro-text">{{ currentNav.category_intro }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 <script>
    
    $(function() {
        $(".search-btn").on("click", function(){
            var brandkey=$("#key_barnd").val();
            if(brandkey!='')
            {
                window.location.href="/kstk/search-0-0-0-"+brandkey+"-1.html";
            }
        });
    })

    const {createApp, ref, computed} = Vue

    const app = createApp({
      setup() {
        const navModalVisible = ref(false)

        const currentNav = ref({})

        const hoverFontColor = computed(() => currentNav.value.backgroundTop)

        const menuList = window.menuList

        let timeId = 0  // 定时器id，计算鼠标停留时间

        // 鼠标移动到菜单
        function mouseEnterNav(e, item) {
          timeId = setTimeout(() => {
            showModal(e, item)
          }, 2000)
        }

        // 显示菜单
        function showModal(e, item) {
          currentNav.value = item
          if (item.children) navModalVisible.value = true
          let navArrowDom = document.querySelector('#navArrow')
          navArrowDom.style.left = (e.target.offsetLeft + 20 * (window.innerWidth / 1920)) + 'px'
        }

        // 鼠标离开菜单
        function handleMouseLeave() {
          clearTimeout(timeId)
          navModalVisible.value = false
        }

        // 点击菜单
        function handleClickMenu(e, item) {
          clearTimeout(timeId)
          showModal(e, item)
          jumpTo(item)
        }

        // 点击导航菜单跳转
        function jumpTo(item) {
          if (item.link) {
            item.open ? window.open(item.link) : window.location.href = item.link
          }
        }

        return {
          navModalVisible,
          currentNav,
          hoverFontColor,
          menuList,
          mouseEnterNav,
          handleMouseLeave,
          jumpTo,
          handleClickMenu
        }
      }
    })

    app.mount("#header")

  </script>

</section>

    <div class="user">
<div class="user_titel">点数消费记录</div>
<div class="user_info" style="margin-bottom:0">
<div class="info_left"><img src="/images/user.png" width="61" height="61"><p>wusuowei</p></div>
<div class="info_right"><h3>您的会员信息</h3>
  <p>会员类型：<span>点数会员</span></p><p>账户信息：<span>剩余点数：621，到期时间：2026/10/21 11:32:22</span></p></div>
<div class="info_btn"><a href="buyPoint.aspx">充值点数</a></div>
<div style="clear:both"></div>
</div>
</div>
<div class="user_nav">
<ul>
<li><a href="buyPoint.aspx"><span class="icon1 iconfont">&#xe615;</span>充值点数</a></li>
<li><a href="user_recharge.aspx"><span class="icon1 iconfont">&#xe615;</span>充值记录</a></li>
<li class="on"><a href="memberPoint.aspx"><span class="icon1 iconfont">&#xe615;</span>点数消费记录</a></li>

<li><a href="http://wpa.qq.com/msgrd?v=3&amp;uin=18550168&amp;site=qq&amp;menu=yes" target="_blank"><span class="icon1 iconfont">&#xe612;</span>客服中心</a></li>


</ul>
</div>
<div class="user_tab"><table width="100%" border="0" cellspacing="0" cellpadding="5">

  <tr class="hr">
    <td width="62%" nowrap>消费详情</td>
    <td width="15%" nowrap>消费时间</td>
    <td width="14%" nowrap>消费点数</td>
  </tr>
 
    <tr><td>零售分析：【<a href="https://www.r355.com/jdfx/show.aspx?oid=943&_id=29870" target="_blank">详细信息</a>】</td><td>2026/4/11 10:48:42</td><td>30</td></tr><tr><td>查看市场款式(第2237页)【<a href="https://www.r355.com/kstk/scks.aspx?oid=2&cid=67&fgid=0&mlid=0&lxid=0&bxid=0&kid=0&bid=0&aid=0&a2id=0&sexid=0&scid=0&bnch=&jid=0&p=2237" target="_blank">详细信息</a>】</td><td>2026/4/11 10:43:21</td><td>5</td></tr><tr><td>查看市场款式(第2239页)【<a href="https://www.r355.com/kstk/scks.aspx?oid=2&cid=67&fgid=0&mlid=0&lxid=0&bxid=0&kid=0&bid=0&aid=0&a2id=0&sexid=0&scid=0&bnch=&jid=0&p=2239" target="_blank">详细信息</a>】</td><td>2026/4/11 10:43:17</td><td>5</td></tr><tr><td>查看市场款式(第10页)【<a href="https://www.r355.com/kstk/scks.aspx?oid=2&cid=67&fgid=0&mlid=0&lxid=0&bxid=0&kid=0&bid=0&aid=0&a2id=0&sexid=0&scid=0&bnch=&jid=0&p=10" target="_blank">详细信息</a>】</td><td>2026/4/11 10:43:13</td><td>5</td></tr><tr><td>查看市场款式(第6页)【<a href="https://www.r355.com/kstk/scks.aspx?oid=2&cid=67&fgid=0&mlid=0&lxid=0&bxid=0&kid=0&bid=0&aid=0&a2id=0&sexid=0&scid=0&bnch=&jid=0&p=6" target="_blank">详细信息</a>】</td><td>2026/4/11 10:43:08</td><td>5</td></tr><tr><td>查看市场款式(第3页)【<a href="https://www.r355.com/kstk/scks.aspx?oid=2&cid=67&fgid=0&mlid=0&lxid=0&bxid=0&kid=0&bid=0&aid=0&a2id=0&sexid=0&scid=0&bnch=&jid=0&p=3" target="_blank">详细信息</a>】</td><td>2026/4/11 10:43:03</td><td>5</td></tr><tr><td>大牌图案：Ralph_Lauren9.cdr【<a href="/uploadFiles/20260331/sctuan/202603311602056906.jpg" target="_blank">详细信息</a>】</td><td>2026/4/11 10:39:17</td><td>50</td></tr><tr><td>查看市场款式(第3281页)【<a href="https://www.r355.com/kstk/scks.aspx?oid=2&cid=270&fgid=0&mlid=0&lxid=0&bxid=0&kid=0&bid=0&aid=0&a2id=0&sexid=0&scid=0&bnch=&jid=0&p=3281" target="_blank">详细信息</a>】</td><td>2026/4/11 10:33:12</td><td>5</td></tr><tr><td>订货会：2026秋冬_Versace Jeans_造型搭配_欧洲大牌资料服装【<a href="/uploadFiles/20260321/jtss/202603211657425779.jpg" target="_blank">详细信息</a>】</td><td>2026/4/11 10:27:43</td><td>2</td></tr><tr><td>订货会：2026秋冬_Versace Jeans_造型搭配_欧洲大牌资料服装(第1页)【<a href="https://www.r355.com/qszx/show_jtss.aspx?oid=907&_id=32263&p=1" target="_blank">详细信息</a>】</td><td>2026/4/11 10:27:38</td><td>1</td></tr><tr><td>图案趋势：2026/27春夏男装图案趋势预测：植物野趣【<a href="https://www.r355.com/qszx/show.aspx?Oid=13&_id=31766" target="_blank">详细信息</a>】</td><td>2026/4/11 10:25:51</td><td>30</td></tr><tr><td>款式设计任务ID：1775722959【<a href="https://hxzt.oss-cn-shenzhen.aliyuncs.com/ksszImg/20260409/small_V02X22VXR8JT46F606V444F22.png" target="_blank">详细信息</a>】</td><td>2026/4/9 16:23:21</td><td>18</td></tr><tr><td>款式设计任务ID：1775722866【<a href="https://hxzt.oss-cn-shenzhen.aliyuncs.com/ksszImg/20260409/small_ZTDZ042T0FJX4448R46J68H6Z.png" target="_blank">详细信息</a>】</td><td>2026/4/9 16:21:42</td><td>18</td></tr><tr><td>款式设计任务ID：1775722734【<a href="https://hxzt.oss-cn-shenzhen.aliyuncs.com/ksszImg/20260409/small_FH42HBD6004LJ0BRJH60JH4P2.png" target="_blank">详细信息</a>】</td><td>2026/4/9 16:19:21</td><td>18</td></tr><tr><td>款式设计任务ID：1775722645【<a href="https://hxzt.oss-cn-shenzhen.aliyuncs.com/ksszImg/20260409/small_844D00X820B0VPJN4H8BP28BJ.png" target="_blank">详细信息</a>】</td><td>2026/4/9 16:18:14</td><td>18</td></tr><tr><td>款式设计任务ID：1775722534【<a href="https://hxzt.oss-cn-shenzhen.aliyuncs.com/ksszImg/20260409/small_X66486B80JRX824V480LXPB20.png" target="_blank">详细信息</a>】</td><td>2026/4/9 16:16:02</td><td>18</td></tr><tr><td>款式设计任务ID：1775722313【<a href="https://hxzt.oss-cn-shenzhen.aliyuncs.com/ksszImg/20260409/small_2T642LB4648FFBXFFZ646TLB6.png" target="_blank">详细信息</a>】</td><td>2026/4/9 16:12:26</td><td>18</td></tr><tr><td>款式设计任务ID：1775722225【<a href="https://hxzt.oss-cn-shenzhen.aliyuncs.com/ksszImg/20260409/small_600X60R866X4N0V2D60TP6RP2.png" target="_blank">详细信息</a>】</td><td>2026/4/9 16:11:03</td><td>18</td></tr><tr><td>趋势书籍：2026春夏男装裤装趋势整理分析书籍(第1页)【<a href="https://www.r355.com/djyc/show.aspx?cid=947&_id=18277&p=1" target="_blank">详细信息</a>】</td><td>2026/4/3 12:21:54</td><td>1</td></tr><tr><td>月刊：【BRT】R355趋势2025.10月份刊_衬衣/外套市场分析(第1页)【<a href="https://www.r355.com/books/show.aspx?cid=946&_id=17967&p=1" target="_blank">详细信息</a>】</td><td>2026/4/3 12:11:10</td><td>1</td></tr>
</table>
     <div style="clear:both"></div>
<div class="pages" style="margin-top:15px"><span id="Pagination"><span class="pagination"><a href='/member/memberPoint-1.html' style=" display:none">上一页</a><a href="/member/memberPoint-1.html" class="current">1</a><a href="/member/memberPoint-2.html" class="prev">2</a><a href="/member/memberPoint-3.html" class="prev">3</a><a href="/member/memberPoint-4.html" class="prev">4</a><a href="/member/memberPoint-5.html" class="prev">5</a><a href="/member/memberPoint-6.html">…</a><a href="/member/memberPoint-72.html"  class="next">72</a><a href="/member/memberPoint-2.html"  class="next">下一页</a></span><input id="formatString" type="hidden" value="/member/memberPoint-" /><span class="searchPage"><span class="page-sum">共<strong class="allPage">72</strong>页</span> <span class="page-go"><input type='text' class='textPut' placeholder="输入页码" id='gotopagepager' onKeyUp='if((event.keyCode ? event.keyCode : event.which ? event.which : event.charCode)==13){gotoPage()}'/><a href="javascript:;" onclick="gotoPage()">跳转</a></span></span></span></div>
</div>

 <link rel="stylesheet" type="text/css" href="/js/artdialog/ui-dialog.css" />
<link rel="stylesheet" href="/css/validate.css" />
<ul class="kf">
  <li class="li1">
    <div class="show_a"> <em></em>
      <div style="padding-left:10px">
        <div class="kf_titel">在线客服</div>
        <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=18550168&amp;site=qq&amp;menu=yes" target="_blank"><img border="0" style="margin-top:5px" title="点击这里给我发消息" alt="点击这里给我发消息" src="http://wpa.qq.com/pa?p=2:18550168:41"></a></div>
     
    </div>
  </li>
  <li class="li2">
    <div class="show_b"><em></em>
      <div class="kf_titel">联系我们</div>
      <p>020-31232355</p>
    </div>
  </li>
  <li class="li3">
    <div class="show_c">
    <form id="feedbackform" name="feedbackform" url="/Ajax/addneed.ashx">
      <div class="kf_titel">会员需求与建议</div>
      <em></em>
      <textarea rows="5" name="xqjy" class="textarea" placeholder="请在此详细输入您公司目前所需资料类型或提交宝贵意见，我司将会在最短的时间内为您上传所需的资料，谢谢！"></textarea>
      <div class="lay"><input type="submit" id="btnSubmit_feedback" class="Submission1" value="提交"></div>
        </form>
    </div>
  </li>
  <a href="http://widget.weibo.com/dialog/follow.php?fuid=2825343592&refer=www.r355.com&language=zh_cn&type=widget_page&vsrc=app_followbutton&backurl=http%3A%2F%2Fwww.r355.com%2F&rnd=1395281896175" title="新浪微博
  " target="_blank">
  <li class="li4"></li>
  </a>
  <li class="li5">
    <div class="show_d"><em></em><img src="/images/weixin_code.png" width="106" height="240"></div>
  </li>
  <li class="li7"></li>
</ul>
<section>
  <link href="/css/footer.css" rel="stylesheet" type="text/css" />
  <div id="footer">
    <img src="/images/footer/innovative-future.png" class="footer-future" />
    <div class="footer-contact">
      <img src="/images/footer/wechat-icon.png" />
      <img src="/images/footer/qq-icon.png" />
      <img src="/images/footer/phone-icon.png" />
    </div>
    <div class="footer-line"></div>
    <div class="footer-bot">
      <div class="footer-bot-left">
        <div class="footer-bot-navs">
          <li class="nav-item">
            <a href="/about/R355-1636.html">关于我们</a>
          </li>
          <li class="nav-item">
            <a href="/about/R355-1637.html">联系我们</a>
          </li>
          <li class="nav-item">
            <a href="/about/R355-1632.html">免责声明</a>
          </li>
          <li class="nav-item">
            <a href="/about/R355-1633.html">会员须知</a>
          </li>
          <li class="nav-item">
            <a href="/about/R355-1639.html">收费说明</a>
          </li>
          <li class="nav-item">
            <a href="/about/R355-1640.html">汇款方式</a>
          </li>
          <li class="nav-item">
            <a href="/about/R355-1641.html">办理流程</a>
          </li>
        </div>
        <p>Copyright 2007-2024 R355.com， All Rights Reserved 闽 ICP 备 07502261 号-1</p>
      </div>
      <img src="/images/footer/qrcode.png" style="width: 94px; height: 94px;">
    </div>
  </div>
</section>
<script src="/js/jquery.min.js"></script>
<script src="/js/jquery.SuperSlide.js"></script> 
<script src="/js/base.js"></script>
<script src="/js/smcm.js"></script>
<script type="text/javascript" src="/js/Mouse.js" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8" src="/js/artdialog/dialog-plus-min.js"></script>
            <script type="text/javascript" src="/js/jquery.form.min.js"></script>
            <script type="text/javascript" src="/js/Validform_v5.3.2_min.js"></script>
<input name="webBot1$turl" type="hidden" id="webBot1_turl" value="https://www.r355.com/member/memberPoint.aspx" />
<script src="/js/purify.min.js"></script>
 <script>
       $(function () {
           AjaxInitForm('#feedbackform', '#btnSubmit_feedback', 0);
          $(this).keypress(function (e) {
              var key = window.event ? e.keyCode : e.which;
              if (key.toString() == "13") {
                  return false;
              }
          });
          var searchEmptyHtml = '<div class="wrap-tips"><div class="search-tips"><p class="cnt-tips">您可以点击上面字母快速检索品牌；</p><div class="extra"><p class="cnt">需要查看所有品牌，请点击：</p><a href="javascript:void(0)" onClick="getSiftDataTop(\'id\',\'topBrandStr\',\'all\');" title="查看所有品牌" class="link-btn">查看所有品牌</a></div><i class="notice-status"></i></div></div>';
          var tipText = '请输入品牌名称';
          $(".text_a").click(function () {
              $(".ChoiceLayerTop").removeClass("currentTagR");

              //默认选中A
              $("#searchLetterTop a.current").removeClass('current');
              //$("#searchLetterTop a").eq(0).addClass('current');
              var text = $(".text_a").val();
              if (text != '' && text.substr(0, 1) != '请') {
                  checkLetter(text);
                  getSiftDataTop('id', 'topBrandStr', text.substr(0, 1).toUpperCase());
              } else {
                  $('#searchContentTop').html(searchEmptyHtml);
              }
              if (text == tipText)
                  $(".text_a").val('');
          });

          $("#searchLetterTop a").click(function () {
              $("#searchLetterTop a.current").removeClass('current');
              $(this).addClass('current');
              var lt = ($(this).text() == '其他') ? 'qt' : $(this).text();
              getSiftDataTop('id', 'topBrandStr', lt);
          });

          $(".Btnclose").click(function () {
              $(".ChoiceLayerTop").addClass("currentTagR");
              var text = $(".text_a").val();
              if (text == '')
                  $(".text_a").val(tipText);
          });

          $("#topBrandStr").keyup(function (e) {
              var arr = [13, 37, 38, 39, 40];
              if (jQuery.inArray(e.keyCode, arr) != -1) return;
              var lt = $(this).val();
              if (lt == '') {
                  $('#searchContentTop').html(searchEmptyHtml);
              } else {
                  checkLetter(lt);
                  getSiftDataTop('text', 'topBrandStr', lt);
              }
          });
      });

      function getSiftDataTop(tp, tag, lt) {
          var hi = '加载中...';
          $('#searchContentTop').html(hi);
          $.ajax({
              type: "post",
              url: "/ajax/ret_brand_list_all.ashx",
              data:{ cartype:lt,bid:0,tp:tp },
              dataType: "html",
              success: function (data) {
                  $('#searchContentTop').html(data);
              }
          });
      }
  </script> 
</body>
</html>
