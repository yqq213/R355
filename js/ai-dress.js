$(function () {
  // 点击切换最近任务
  $(".task-item").click(function () {
    $(".task-item").removeClass("active");
    $(this).addClass("active");
  });
  // 点击切换图像比例
  $(".btn-tabs .tab").click(function () {
    $(".btn-tabs .tab").removeClass("active");
    $(this).addClass("active");
    if ($(this).hasClass("first"))
      $(".upload-img img").css("aspect-ratio", "3/4");
    if ($(this).hasClass("second"))
      $(".upload-img img").css("aspect-ratio", "1");
    $("#bili").val($(this).data("bili"));
    $(".ai-result").show();
    $(".database").hide();
    $("#tktype").val("0");
    $(".base-navs li").removeClass("active");
    $(".base-navs li:first-child").addClass("active");

    $(".grid-container .grid-item").removeClass("selected"); //清空模特参考图
    emptyFun();
  });
  // 点击切换上身类别
  $(".dress-tabs .tab").click(function (index) {
    console.log($(this).index());
    $(".dress-tabs .tab").removeClass("active");
    $(this).addClass("active");
    if ($(this).index() == 2) {
      $(".single").show();
      $(".multi").hide();
    }
    if ($(this).index() == 3) {
      $(".single").hide();
      $(".multi").show();
    }
    $("#type_id").val($(this).data("type_id"));
  });
  // 点击选择模特进入精品库
  $(".upload-model-empty").click(function () {
    $(".ai-result").hide();
    $(".database").show();
    if ($("#tktype").val() == 0) {
      $(".base-container").show();
      $(".refer-container").hide();
    } else {
      $(".base-container").hide();
      $(".refer-container").show();
    }
    $(".base-types li").removeClass("active");
    $(".base-types li:first-child").addClass("active");
    huiwa_model_scene("", $("#tktype").val(), $("#bili").val());
  });
  // 关闭精品库
  $(".close-database").click(function () {
    $(".ai-result").show();
    $(".database").hide();
  });
  // 自动修图开关切换
  $(".func-wrap .iconfont").click(function () {
    $(".icon-kaiguanguan").toggle();
    $(".icon-kaiguankai").toggle();
    $("#auto_hand_refine").val($(this).data("auto_hand_refine"));
  });
  // 点击切换精品库
  $(".base-navs li").click(function () {
    $(".base-navs li").removeClass("active");
    $(this).addClass("active");
    var tktype = $(this).attr("data-type");
    $("#tktype").val(tktype);
    if ($(this).attr("data-type") === "0") {
      $(".base-container").show();
      $(".refer-container").hide();
    }
    if ($(this).attr("data-type") === "1") {
      $(".base-container").hide();
      $(".refer-container").show();
    }
    huiwa_model_scene("", tktype, $("#bili").val());
  });
  // 点击切换精品库类型
  $(".base-types li").click(function () {
    $(".base-types li").removeClass("active");
    $(this).addClass("active");
    huiwa_model_scene($(this).data("id"), 0, $("#bili").val());
  });
  // 点击选中精品库
  $("#my_model_scene,#jp_model_scene").on("click", ".grid-item", function (e) {
    $(this).toggleClass("selected");
    var selectedLength = $(".grid-container .selected").length;
    if (selectedLength > 5) {
      alert("最多可选5张");
      return $(this).toggleClass("selected");
    }
    if (selectedLength) {
      // 获取选中参数
      var param = [];
      $(".grid-container .selected").each(function (index, element) {
        param.push({
          id: $(element).attr("data-model_id"),
          name: $(element).find(".item-desc").text(),
          url: $(element).find(".item-img").attr("src"),
        });
      });
      console.log(param);
      $(".select-btns").show();
      $(".select-text").text("已选“男士-外套”等" + selectedLength + "张");
      $(".upload-model-empty .img").html(
        '<img src="' +
          param.at(-1).url +
          '" style="width: 100%; height: 100%;" /><span class="label flexCenter">共' +
          selectedLength +
          "张</span>"
      );
    } else {
      emptyFun();
    }
  });
  // 清空模特参考图
  $(".empty-refer").click(function () {
    $(".grid-container .grid-item").removeClass("selected");
    emptyFun();
  });
  // 清空选中
  function emptyFun() {
    $("#scene_id").val("");
    $(".select-btns").hide();
    $(".select-text").text("");
    $(".upload-model-empty .img").html(
      '<img src="/images/ai-dress/img-add-icon.png" />'
    );
  }
  // 点击切换参考图来源
  $(".original li").click(function () {
    $(".original li").removeClass("active");
    $(this).addClass("active");
  });
  // 点击切换我的参考比例
  //$('.bili').click(function () {
  //   $('.bili').removeClass('active')
  //  $(this).addClass('active');
  //  huiwa_model_scene("", $("#tktype").val(), $("#bili").val());
  //})
  // 上传单件衣服或多件衣服
  $(".upload-input").change(function (e) {
    var action = $(this).data("action");
    var file = e.target.files[0];
    if (file.size / 1024 / 1024 > 2 || !/^image\//.test(file.type)) {
      alert("文件格式不正确，文件不能超过2M");
      return;
    }
    var formData = new FormData();
    formData.append("file", file);
    var that = this;
    $.ajax({
      url: "/Ajax/stTools.aspx?action=hwtast",
      type: "POST",
      dataType: "json",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.state == 200) {
          if (action == "shangzhuang" || action == "single") {
            $("#original_image_url").val(response.msgbox);
          } else if (action == "xiazhuang") {
            $("#original_image_url_2").val(response.msgbox);
          }
          // 上传成功
          $(that).siblings(".upload-empty").hide();
          $(that).siblings(".upload-img").show();
          $(that)
            .siblings(".upload-img")
            .find("img")
            .attr("src", response.msgbox);
        } else {
          alert(response.msg);
        }
      },
    });
  });
  // 上传参考图
  $("#my_model_scene").on("change", ".refer-upload", function (e) {
    var files = e.target.files;
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    $.ajax({
      url: "/Ajax/stTools.aspx?action=scene",
      type: "POST",
      data: formData,
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.state == 200) {
          $("#my_model_scene").append(response.msgbox);
        } else {
          alert(response.msg);
        }
      },
      complete: function () {},
    });
  });
  // 立即生成
  $(".generateBtn").click(function () {
    var bili = $("#bili").val();
    var type_id = $("#type_id").val();
    var original_image_url = $("#original_image_url").val();
    var original_image_url_2 = $("#original_image_url_2").val();
    var scene_id = $("#scene_id").val();
    var image_count = $("#image_count").val();
    var auto_hand_refine = $("#auto_hand_refine").val();
    var cat_id = $("#cat_id").val();
    $.ajax({
      url: "/Ajax/hwAPI.ashx?action=addTask",
      type: "POST",
      data: [
        bili,
        type_id,
        original_image_url,
        original_image_url_2,
        scene_id,
        image_count,
        auto_hand_refine,
        cat_id,
      ],
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.state == 200) {
        } else {
          alert(response.msgbox);
        }
      },
      complete: function () {},
    });

    $(".database").hide();
    $(".result-empty").hide();
    $(".ai-result").show();
    $(".result-wrap").show();
    $(".result-item .result-loading").show();
    setTimeout(function () {
      $(".result-item .result-loading").hide();
    }, 3000);
  });
  // 获取我的参考图
  function huiwa_model_scene(model_type, cat, bili) {
    if (cat == 0) {
      $("#jp_model_scene").html("");
    } else {
      $("#my_model_scene").html("");
      $("#my_model_scene").append(
        '<li class="grid-item grid-item-upload flexCenter"><div class="grid-item-upload-btn flexCenter"><span class="iconfont icon-upload grid-item-upload-icon"></span>上传参考图<input type="file" multiple class="refer-upload"></div><p class="upload-text">支持批量上传</p></li>'
      );
    }
    loadPagination()
    renderHtml(0)
    //var bili = $("#bili").val();
    $.ajax({
      type: "POST",
      url: "/Ajax/hwAPI.ashx?action=model_scene",
      type: "html",
      data: { model_type, bili, cat },
      beforeSend: function (XMLHttpRequest) {
        //ShowLoading();
      },
      success: function (json, textStatus) {
        if (cat == 0) {
          $("#jp_model_scene").append(json);
        } else {
          $("#my_model_scene").append(json);
        }
      },
      complete: function (XMLHttpRequest, textStatus) {
        //HideLoading();
      },
      error: function () {
        //请求出错处理
      },
    });
  }

  var mockData = {
    Count: 100,
    ImageInfos: [],
  };

  // 每页显示的数量
  var pageSize = 18;

  // 加载分页
  function loadPagination() {
    // 初始化分页
    $("#pagination").Pagination({
      totalData: mockData.Count, // 总数据量
      showData: pageSize, // 每页显示的数据量
      pageCount: 5, // 分页栏显示的页码数量
      current: 1, // 当前页码
      coping: true, // 是否开启首页和尾页功能
      callback: function (api) {
        // 分页回调函数，在这里进行数据加载和页面渲染
        renderHtml(api.getCurrent() - 1);
      },
    });
  }

  // 获取分页数据
  function renderHtml(page) {
    if (mockData.Count == 0) {
      $("#pagination").hide();
      $("#jp_model_scene").html(
        '<div style="text-align:center; padding-bottom:30px; font-size:16px;width:100%">找不到类似相关图片！</div>'
      );
    } else {
      $("#jp_model_scene").html("");
      var html = "";
      for (var i = pageSize * page; i < pageSize * page + pageSize; i++) {
        if (i < mockData.Count) {
          html += '<li class="grid-item" data-model_id="22071227269" data-id="1"><img src="/sceneImg/20250101/202501011919565001542.jpg" class="item-img"><div class="item-desc">【3:4】白底金发女士正面</div><span class="iconfont icon-xuanzhong checkIcon"></span></li>';
        }
      }
      $("#jp_model_scene").html(html);
    }
  }

});
