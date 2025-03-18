//导航
jQuery("#nav").slide({
  type: "menu",
  // 效果类型，针对菜单/导航而引入的参数（默认slide）
  titCell: ".nLi",
  //鼠标触发对象
  targetCell: ".sub",
  //titCell里面包含的要显示/消失的对象
  effect: "slideDown",
  //targetCell下拉效果
  delayTime: 300,
  //效果时间
  triggerTime: 0,
  //鼠标延迟触发时间（默认150）
  returnDefault: true,
});

//焦点图
jQuery(".slider").slide({
  titCell: ".hd ul",
  mainCell: ".bd ul",
  effect: "fold",
  autoPlay: true,
  autoPage: true,
  trigger: "click",
  mouseOverStop: false,
  /* 鼠标移到容器层继续播放*/
  /* 控制进度条 */
  startFun: function () {
    var timer = jQuery(".slider .timer");
    timer
      .stop(true, true)
      .animate(
        {
          width: "0%",
        },
        0
      )
      .animate(
        {
          width: "100%",
        },
        6000
      );
  },
});

//搜索框
//$(document).ready(function(){$(".text_a").focus(function(){$(".search_box").css("width","200px")});$(".text_a").blur(function(){$(".search_box").css("width","130px")})});

//客服
$(document).ready(function () {
  $(".li1").hover(function () {
    $(".show_a").fadeToggle(100);
  });
  $(".li2").hover(function () {
    $(".show_b").fadeToggle(100);
  });
  $(".li3").hover(function () {
    $(".show_c").fadeToggle(100);
  });
  $(".li5").hover(function () {
    $(".show_d").fadeToggle(100);
  });
});
$(".li7").click(function () {
  $("body,html").animate({ scrollTop: 0 }, 500);
});

//预加载
jQuery("#switchLoad").slide({ switchLoad: "_src", delayTime: 0 });

//检测高度
setTimeout(function () {
  $(".slider").height($(".right_img").height());
  $(window).resize(function () {
    //当浏览器窗口大小变化时执行
    $(".slider").height($(".right_img").height());
  });
  $(".slider .bd li img").height($(".right_img").height());
  $(window).resize(function () {
    //当浏览器窗口大小变化时执行
    $(".slider .bd li img").height($(".right_img").height());
  });

  $(".slider .bd li img").width($(".left_banner").width());
  $(window).resize(function () {
    //当浏览器窗口大小变化时执行
    $(".slider .bd li img").width($(".left_banner").width());
  });
}, 1000);

//内面导航
jQuery("#nav—b").slide({
  type: "menu", // 效果类型，针对菜单/导航而引入的参数（默认slide）
  titCell: ".nLi—b", //鼠标触发对象
  targetCell: ".sub—b", //titCell里面包含的要显示/消失的对象
  effect: "slideDown", //targetCell下拉效果
  delayTime: 300, //效果时间
  triggerTime: 0, //鼠标延迟触发时间（默认150）
  returnDefault: true, //鼠标移走后返回默认状态，例如默认频道是“预告片”，鼠标移走后会返回“预告片”（默认false）
});

//分页
(function ($) {
  $.PaginationCalculator = function (maxentries, opts) {
    this.maxentries = maxentries;
    this.opts = opts;
  };
  $.extend($.PaginationCalculator.prototype, {
    numPages: function () {
      return Math.ceil(this.maxentries / this.opts.items_per_page);
    },
    getInterval: function (current_page) {
      var ne_half = Math.floor(this.opts.num_display_entries / 2);
      var np = this.numPages();
      var upper_limit = np - this.opts.num_display_entries;
      var start =
        current_page > ne_half
          ? Math.max(Math.min(current_page - ne_half, upper_limit), 0)
          : 0;
      var end =
        current_page > ne_half
          ? Math.min(
              current_page + ne_half + (this.opts.num_display_entries % 2),
              np
            )
          : Math.min(this.opts.num_display_entries, np);
      return { start: start, end: end };
    },
  });
  $.PaginationRenderers = {};
  $.PaginationRenderers.defaultRenderer = function (maxentries, opts) {
    this.maxentries = maxentries;
    this.opts = opts;
    this.pc = new $.PaginationCalculator(maxentries, opts);
  };
  $.extend($.PaginationRenderers.defaultRenderer.prototype, {
    createLink: function (page_id, current_page, appendopts) {
      var lnk,
        np = this.pc.numPages();
      page_id = page_id < 0 ? 0 : page_id < np ? page_id : np - 1;
      appendopts = $.extend(
        { text: page_id + 1, classes: "" },
        appendopts || {}
      );
      if (page_id == current_page) {
        lnk = $("<a class='current'>" + appendopts.text + "</a>");
      } else {
        lnk = $("<a>" + appendopts.text + "</a>").attr(
          "href",
          this.opts.link_to.replace(/__id__/, page_id)
        );
      }
      if (appendopts.classes) {
        lnk.addClass(appendopts.classes);
      }
      lnk.data("page_id", page_id);
      return lnk;
    },
    appendRange: function (container, current_page, start, end, opts) {
      var i;
      for (i = start; i < end; i++) {
        this.createLink(i, current_page, opts).appendTo(container);
      }
    },
    getLinks: function (current_page, eventHandler) {
      var begin,
        end,
        interval = this.pc.getInterval(current_page),
        np = this.pc.numPages(),
        fragment = $("<span class='pagination'></span>");
      if (
        this.opts.prev_text &&
        (current_page > 0 || this.opts.prev_show_always)
      ) {
        fragment.append(
          this.createLink(current_page - 1, current_page, {
            text: this.opts.prev_text,
            classes: "prev",
          })
        );
      }
      if (interval.start > 0 && this.opts.num_edge_entries > 0) {
        end = Math.min(this.opts.num_edge_entries, interval.start);
        this.appendRange(fragment, current_page, 0, end, { classes: "sp" });
        if (
          this.opts.num_edge_entries < interval.start &&
          this.opts.ellipse_text
        ) {
          $(
            "<span class='pagination-break'>" +
              this.opts.ellipse_text +
              "</span>"
          ).appendTo(fragment);
        }
      }
      this.appendRange(fragment, current_page, interval.start, interval.end);
      if (interval.end < np && this.opts.num_edge_entries > 0) {
        if (
          np - this.opts.num_edge_entries > interval.end &&
          this.opts.ellipse_text
        ) {
          $(
            "<span class='pagination-break'>" +
              this.opts.ellipse_text +
              "</span>"
          ).appendTo(fragment);
        }
        begin = Math.max(np - this.opts.num_edge_entries, interval.end);
        this.appendRange(fragment, current_page, begin, np, { classes: "ep" });
      }
      if (
        this.opts.next_text &&
        (current_page < np - 1 || this.opts.next_show_always)
      ) {
        fragment.append(
          this.createLink(current_page + 1, current_page, {
            text: this.opts.next_text,
            classes: "next",
          })
        );
      }
      $("a", fragment).click(eventHandler);
      return fragment;
    },
  });
  $.fn.pagination = function (maxentries, opts) {
    opts = $.extend(
      {
        items_per_page: 1,
        num_display_entries: 4,
        current_page: 0,
        num_edge_entries: 1,
        link_to: "#",
        prev_text: "<i></i>上一页",
        next_text: "下一页<i></i>",
        ellipse_text: "...",
        prev_show_always: true,
        next_show_always: true,
        renderer: "defaultRenderer",
        show_if_single_page: false,
        load_first_page: false,
        callback: function () {
          return false;
        },
      },
      opts || {}
    );
    var containers = this,
      renderer,
      links,
      current_page;
    $(".page-btn").one("click", function () {
      var allPage = $(".allPage").text();
      var goPage = $(".page-go input").val() - 1;
      if (goPage > -1 && goPage < allPage) {
        opts.current_page = goPage;
        $("#Pagination").pagination(allPage, opts);
      } else {
        $("#Pagination").pagination(allPage);
      }
      $(".page-go input").val("");
    });
    function paginationClickHandler(evt) {
      var links,
        new_current_page = $(evt.target).data("page_id"),
        continuePropagation = selectPage(new_current_page);
      if (!continuePropagation) {
        evt.stopPropagation();
      }
      return continuePropagation;
    }
    function selectPage(new_current_page) {
      containers.data("current_page", new_current_page);
      links = renderer.getLinks(new_current_page, paginationClickHandler);
      containers.empty();
      links.appendTo(containers);
      var continuePropagation = opts.callback(new_current_page, containers);
      return continuePropagation;
    }
    current_page = parseInt(opts.current_page);
    containers.data("current_page", current_page);
    maxentries = !maxentries || maxentries < 0 ? 1 : maxentries;
    opts.items_per_page =
      !opts.items_per_page || opts.items_per_page < 0 ? 1 : opts.items_per_page;
    if (!$.PaginationRenderers[opts.renderer]) {
      throw new ReferenceError(
        "Pagination renderer '" +
          opts.renderer +
          "' was not found in jQuery.PaginationRenderers object."
      );
    }
    renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);
    var pc = new $.PaginationCalculator(maxentries, opts);
    var np = pc.numPages();
    containers.bind("setPage", { numPages: np }, function (evt, page_id) {
      if (page_id >= 0 && page_id < evt.data.numPages) {
        selectPage(page_id);
        return false;
      }
    });
    containers.bind("prevPage", function (evt) {
      var current_page = $(this).data("current_page");
      if (current_page > 0) {
        selectPage(current_page - 1);
      }
      return false;
    });
    containers.bind("nextPage", { numPages: np }, function (evt) {
      var current_page = $(this).data("current_page");
      if (current_page < evt.data.numPages - 1) {
        selectPage(current_page + 1);
      }
      return false;
    });
    links = renderer.getLinks(current_page, paginationClickHandler);
    containers.empty();
    if (np > 1 || opts.show_if_single_page) {
      links.appendTo(containers);
    }
    if (opts.load_first_page) {
      opts.callback(current_page, containers);
    }
  };
})(jQuery);

//子菜单

$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;
    var links = this.el.find(".link");
    links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el;
    ($this = $(this)), ($next = $this.next());
    $next.slideToggle();
    $this.parent().toggleClass("open");
    if (!e.data.multiple) {
      $el.find(".submenu").not($next).slideUp().parent().removeClass("open");
    }
  };

  var accordion = new Accordion($("#accordion"), false);
});

$(".submenu li").click(function () {
  $(".de_box").show(100);
});
$(".btn_more").click(function () {
  $(".more_txt").fadeToggle();
});
$(".pic_box").hover(function () {
  $(this).find(".cp_txt").fadeToggle();
});
$(function () {
  $(".submenu")
    .find("li a")
    .each(function (i) {
      $(this).click(function () {
        $(".submenu").find("li a").removeClass("su");
        $(this).addClass("su");
      });
    });
});
$(function () {
  $(".de1")
    .find("a")
    .each(function (i) {
      $(this).click(function () {
        $(".de1").find("a").removeClass("su");
        $(this).addClass("su");
      });
    });
});
$(function () {
  $(".de3")
    .find("a")
    .each(function (i) {
      $(this).click(function () {
        $(".de3").find("a").removeClass("su");
        $(this).addClass("su");
      });
    });
});
$(function () {
  $(".list")
    .find("a")
    .each(function (i) {
      $(this).click(function () {
        $(".list").find("a").removeClass("list_h");
        $(this).addClass("list_h");
      });
    });
});

$(function () {
  $(".list1")
    .find("a")
    .each(function (i) {
      $(this).click(function () {
        $(".list1").find("a").removeClass("list_h1");
        $(this).addClass("list_h1");
      });
    });
});

//产品列表
$(document).ready(function () {
  $(".accordion").width($(".contentW").width());
  $(window).resize(function () {
    //当浏览器窗口大小变化时执行
    $(".accordion").width($(".contentW").width());
  });
});

$(document).ready(function () {
  $(".submenu").width($(".contentW").width() - 600);
  $(window).resize(function () {
    //当浏览器窗口大小变化时执行
    $(".submenu").width($(".accordion").width() - 600);
  });
  $(".submenu1").width($(".contentW").width() - 220);
  $(window).resize(function () {
    //当浏览器窗口大小变化时执行
    $(".submenu1").width($(".accordion").width() - 220);
  });
});

$(document).ready(function () {
  $(".search_b").focus(function () {
    $(".slideTxtBox").fadeIn(100);
  });
  $(".tip a").click(function () {
    $(".slideTxtBox").fadeOut(100);
  });
});

//下拉菜单

$(function () {
  // 加载顶部页面
  reloadScript();
  $("#top_nav").load("../header.html", function() {
   reloadScript()
  });
  // 加载底部页面
  // $(".n-bottom").load("../footer.html");
  $(".selectBox .imitationSelect").on("click", function (event) {
    $(this).parent().next().fadeToggle(100); //ul弹窗展开
    $(this).next().toggleClass("fa-caret-up"); //点击input选择适合，小图标动态切换

    if (event.stopPropagation) {
      // 针对 Mozilla 和 Opera
      event.stopPropagation();
    } else if (window.event) {
      // 针对 IE
      window.event.cancelBubble = true;
    }
  });

  $(".selectUl li").click(function (event) {
    $(this).addClass("actived_li").siblings().removeClass("actived_li"); //点击当前的添加。actived_li这个类；其他的移除这个类名
    var oliName = $(this).attr("oliName"); //定义一个name属性，获取点击的元素属性赋值到当前，方便动态化传值
    var oliId = $(this).attr("oliId"); //定义一个id属性，获取点击的元素属性赋值到当前，方便动态化传值
    $(this).parent().prev().children().val(oliName); //把当前点击的name赋值到显示的input的val里面
    $(this).parent().prev().children().attr("oliName", oliName); //把当前点击的oliName赋值到显示的input的oliName里面
    $(this).parent().prev().children().attr("oliId", oliId); //把当前点击的oliId赋值到显示的input的oliId里面
  });
  $(document).click(function (event) {
    $(".inputCase .fa").removeClass("fa-caret-up").addClass("fa-caret-down"); //当点隐藏ul弹窗时候，把小图标恢复原状
    $(".selectUl").hide(); //当点击空白处，隐藏ul弹窗
  });
});

function checkLetter(lt) {
  var str_letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var str_val = str_letter.indexOf(lt.substr(0, 1).toUpperCase());
  if (str_val < 0) {
    $(".alphabeticalSearch a.current").removeClass("current");
    $(".others").addClass("current");
  } else {
    var parent = $("#check_" + lt.substr(0, 1).toUpperCase())
      .parent()
      .attr("id");
    $("#" + parent + " a.current").removeClass("current");
    $("#check_" + lt.substr(0, 1).toUpperCase()).addClass("current");
  }
}

$(document).ready(function () {
  $(".r4").hover(function () {
    $(".wx_show").fadeToggle(100);
  });
  $(".r14").hover(function () {
    $(".wx_show1").fadeToggle(100);
  });
});

//2018/08/13

// $(function () {
//     if ($("#top_nav").length) {
//         //获取要定位元素距离浏览器顶部的距离
//         var navH = $("#top_nav").offset().top + 176;
//         //滚动条事件
//         $(window).scroll(function () {
//             //获取滚动条的滑动距离
//             var scroH = $(this).scrollTop();
//             //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
//             if (scroH >= navH) {
//                 $("#top_nav").addClass("fixed_top");
//                 $(".color_box").addClass("fixed_nav");
//                 $("html").css("padding-top", "161px");
//             } else if (scroH < navH) {
//                 $("#top_nav").removeClass("fixed_top");
//                 $(".color_box").removeClass("fixed_nav");
//                 $("html").css("padding-top", "0px");
//             }
//         });
//     }
// });

//2018/08/14

function showDiv() {
  document.getElementById("popDiv").style.display = "block";
  document.getElementById("popIframe").style.display = "block";
  document.getElementById("bg").style.display = "block";
}

function closeDiv() {
  document.getElementById("popDiv").style.display = "none";
  document.getElementById("bg").style.display = "none";
  document.getElementById("popIframe").style.display = "none";
}

function showDiv_b() {
  document.getElementById("popDiv_b").style.display = "block";
  document.getElementById("popIframe_b").style.display = "block";
  document.getElementById("bg_b").style.display = "block";
}

function closeDiv_b() {
  document.getElementById("popDiv_b").style.display = "none";
  document.getElementById("bg_b").style.display = "none";
  document.getElementById("popIframe_b").style.display = "none";
}

function showDiv_c() {
  document.getElementById("popDiv_c").style.display = "block";
  document.getElementById("popIframe_c").style.display = "block";
  document.getElementById("bg_c").style.display = "block";
}

function closeDiv_c() {
  document.getElementById("popDiv_c").style.display = "none";
  document.getElementById("bg_c").style.display = "none";
  document.getElementById("popIframe_c").style.display = "none";
}

$(document).ready(function () {
  $(".right_btn").click(function () {
    $(".sm_box").fadeToggle(100);
  });
  $(".sm_Close").click(function () {
    $(".sm_box").fadeOut(100);
  });
});

// 是否展示标签，flag为true表示展示标签，为false表示不展示标签
function showTag(flag) {
  flag
    ? $(".patterns-ul").addClass("addTag")
    : $(".patterns-ul").removeClass("addTag");
}

// 给标签设置点数，value表示要添加的点数
function setValueToTag(value) {
  $(".addTag>li").attr("data-content-before", value);
  $(".addTag>.n-cp-box").attr("data-content-before", value);
}

function reloadScript() {
  // 点击外部隐藏搜图弹框
  document.addEventListener("click", function (event) {
    if (document.querySelector(".search-pop")) {
      var isClickPop = document
        .querySelector(".search-pop")
        .contains(event.target);
      var isClickButton =
        document.querySelector(".search-camera img") &&
        document.querySelector(".search-camera img").contains(event.target);
      var isClickNav = 
        $('.navs .navs-item:last') &&
        $('.navs .navs-item:last')[0].contains(event.target);
      var isClickBanner =
        document.querySelector(".banner .banner-search") &&
        document.querySelector(".banner .banner-search").contains(event.target);
      if (!isClickPop && !isClickButton && !isClickNav && !isClickBanner) {
        $(".search-pop").hide();
      }
    }
  });

  // 点击拍照图标显示搜图弹框
  document.querySelector(".search-camera img") &&
    document
      .querySelector(".search-camera img")
      .addEventListener("click", function () {
        $(".search-pop").show();
        $(".search-content").show();
        $(".upload-loading").hide();
        $(".upload-error").hide();
      });

  // 点击以图搜图菜单显示搜图弹框
  $(document).on('click', '.navs .navs-item:last', function() {
    $(".search-pop").show();
    $(".search-content").show();
    $(".upload-loading").hide();
    $(".upload-error").hide();
  })

  // 点击以图搜图banner显示搜图弹框
  $('.banner .banner-search').click(function() {
    $(".search-pop").show();
    $(".search-content").show();
    $(".upload-loading").hide();
    $(".upload-error").hide();
  })

  // 点击关闭按钮
  document.querySelector(".upload-close") &&
    document
      .querySelector(".upload-close")
      .addEventListener("click", function () {
        $(".search-pop").hide();
      });

  // 点击重新上传
  document.querySelector(".upload-error-text a") &&
    document
      .querySelector(".upload-error-text a")
      .addEventListener("click", function () {
        $(".upload-error").hide();
        $(".search-content").show();
      });

  // 拖拽dragover事件
  document.querySelector(".search-drop") &&
    document
      .querySelector(".search-drop")
      .addEventListener("dragover", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).addClass("drag-over");
      });

  // 拖拽dragleave事件
  document.querySelector(".search-drop") &&
    document
      .querySelector(".search-drop")
      .addEventListener("dragleave", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).removeClass("drag-over");
      });

  // 获取拖拽的文件
  document.querySelector(".search-drop") &&
    document
      .querySelector(".search-drop")
      .addEventListener("drop", function (event) {
        event.preventDefault();
        $(this).removeClass("drag-over");
        handleUploadFile(event.dataTransfer.files[0]);
      });

  // 监听文件上传
  document.querySelector(".upload-wrap input") &&
    document
      .querySelector(".upload-wrap input")
      .addEventListener("change", function (event) {
        handleUploadFile(event.target.files[0]);
      });

  // 处理上传文件
  function handleUploadFile(file) {
    //console.log(file)
    if (file.size / 1024 / 1024 > 2 || !/^image\//.test(file.type)) {
      $(".search-content").hide();
      $(".upload-loading").hide();
      $(".upload-error").show();
      return;
    }
    // 显示上传loading
    $(".search-content").hide();
    $(".upload-loading").show();
    var formData = new FormData();
    formData.append("file", file);
    $.ajax({
      url: "/Ajax/stTools.aspx?action=soutu",
      type: "POST",
      data: formData,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.state == 200) {
          $(".search-pop").hide();
          window.location.href = "/soutu.aspx?imgurl=" + response.msgbox;
        } else if (response.state == 1) {
          $(".search-pop").hide();
          showDiv();
        } else {
          $(".upload-error").show();
        }
      },
      complete: function () {
        setTimeout(function () {
          $(".upload-loading").hide();
          $(".search-content").show();
        }, 1000);
      },
    });
  }
}
