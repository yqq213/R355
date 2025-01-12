$(function () {
  if ($("#_id").val() > 0) {
    $(".result-container").append("任务正努力加载中...，请稍后！");
    $(".select-text").append($("#scene_text").val());
    $(".upload-model-empty .img").html(
      '<img src="http://www.r355.com/' +
        $("#scene_img").val() +
        '" style="width: 100%; height: 100%;" /><span class="label flexCenter">共' +
        $("#scene_num").val() +
        "张</span>"
    );
    if ($("#type_id").val() == 1) {
      $(".single .upload-item .upload-empty").hide();
      $(".single .upload-item .upload-img").show();
    } else if ($("#type_id").val() == 2) {
      $(".multi").show();
      $(".single").hide();
      $(".multi .upload-item .upload-empty").hide();
      $(".multi .upload-item .upload-img").show();
    }
    $(".select-btns").show();
    //task_image_get($("#_id").val());
    task_image_get_st($("#_id").val());
  }
  $("#image_count").on("input", function () {
    if ($(this).val() > 8) {
      $(this).val(8);
    }
    total_point();
  });
  // 点击切换最近任务
  $(".task-item").click(function () {
    $(".task-item").removeClass("active");
    $(this).addClass("active");
  });
  // 点击切换图像比例
  $(".btn-tabs .tab").click(function () {
    $(".btn-tabs .tab").removeClass("active");
    $(this).addClass("active");
    if ($(this).hasClass("first")) {
      //$(".upload-img img").css("aspect-ratio", "3/4");
      $(".upload-model-empty .img").css("height", "124px");
    }
    if ($(this).hasClass("second")) {
      //$(".upload-img img").css("aspect-ratio", "1");
      $(".upload-model-empty .img").css("height", "93px");
    }
    $("#bili").val($(this).data("bili"));
    //$(".result-empty").show();
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
    if ($(this).hasClass("grid-item-upload")) return;
    $(this).toggleClass("selected");
    var selectedLength = $(".grid-container .selected").length;
    if (selectedLength > 5) {
      $.NZ_MsgBox.alert({
        title: "温馨提示！",
        content: "最多只能选5张模特参考图!",
        type: "warning",
      });
      return $(this).toggleClass("selected");
    }
    if (selectedLength) {
      // 获取选中参数
      var param = [];
      var secce = "";
      $(".grid-container .selected").each(function (index, element) {
        secce += $(element).attr("model_id") + ",";
        param.push({
          id: $(element).attr("model_id"),
          name: $(element).find(".item-desc").text(),
          url: $(element).find(".item-img").attr("src"),
        });
      });

      //console.log(param);
      $(".select-btns").show();
      $(".select-text").text(
        "已选“" + param.at(-1).name + "”等" + selectedLength + "张"
      );
      $(".upload-model-empty .img").html(
        '<img src="' +
          param.at(-1).url +
          '" style="width: 100%; height: 100%;" /><span class="label flexCenter">共' +
          selectedLength +
          "张</span>"
      );
      $("#scene_id").val(secce);
      total_point();
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
      $.NZ_MsgBox.alert({
        title: "温馨提示！",
        content: "图片格式不正确且大小不能超过2M!",
        type: "warning",
      });
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
          $.NZ_MsgBox.alert({
            title: "温馨提示！",
            content: response.msgbox,
            type: "error",
          });
        }
      },
    });
  });
  // 上传参考图
  $("#my_model_scene").on("change", ".refer-upload", function (e) {
    var files = e.target.files;
    var formData = new FormData();
    if (files.length.length > 5) {
      $.NZ_MsgBox.alert({
        title: "温馨提示！",
        content: "一次最多只能上传5张模特参考图!",
        type: "warning",
      });
      return;
    }
    for (var i = 0; i < files.length; i++) {
      if (files[i].size / 1024 / 1024 > 2 || !/^image\//.test(files[i].type)) {
      } else {
        formData.append("file", files[i]);
      }
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
          $.NZ_MsgBox.alert({
            title: "温馨提示！",
            content: response.msg,
            type: "error",
          });
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
    if (original_image_url == "") {
      if (type_id == 1) {
        $.NZ_MsgBox.alert({
          title: "温馨提示！",
          content: "请上传单件衣服！",
          type: "error",
        });
      } else {
        $.NZ_MsgBox.alert({
          title: "温馨提示！",
          content: "请上传上装平铺图！",
          type: "error",
        });
      }
      return;
    }
    var original_image_url_2 = $("#original_image_url_2").val();
    if (type_id == 2 && original_image_url_2 == "") {
      $.NZ_MsgBox.alert({
        title: "温馨提示！",
        content: "请上传下装平铺图！",
        type: "error",
      });
      return;
    }
    var scene_id = $("#scene_id").val();
    if (scene_id == "" || scene_id == ",") {
      $.NZ_MsgBox.alert({
        title: "温馨提示！",
        content: "请至少选择1张模特参考图！",
        type: "error",
      });
      return;
    }
    var image_count = $("#image_count").val();
    if (image_count == 0) {
      $.NZ_MsgBox.alert({
        title: "温馨提示！",
        content: "生图张数至少1张！",
        type: "error",
      });
      return;
    }
    $.NZ_MsgBox.confirm({
      title: "确认提交？",
      content: "此次生图任务，需支付" + $("#totalPoint").text() + "个点数。",
      type: "warning",
      callback: function (resu) {
        if (resu == true) {
          // 展示生成中
          $('.generateBtn').addClass('loading');
          var auto_hand_refine = $("#auto_hand_refine").val();
          var cat_id = $("#cat_id").val();
          $.ajax({
            url: "/Ajax/hwAPI.ashx?action=addTask",
            type: "POST",
            data: {
              bili: bili,
              type_id: type_id,
              original_image_url: original_image_url,
              original_image_url_2: original_image_url_2,
              scene_id: scene_id,
              image_count: image_count,
              auto_hand_refine: auto_hand_refine,
              cat_id: cat_id,
            },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
              //$(this).unbind("click");
            },
            success: function (response) {
              if (response.state == 200) {
                $(".result-container").html("");
                $(".database").hide();
                $(".result-empty").hide();
                $(".ai-result").show();
                $(".result-wrap").show();
                $(".btask-list li").removeClass("active");
                $("#addtime").text(response.addtime);
                $(".task-list li:first").after(response.msgbox);
                //task_image_get(response.task_id);
                $.NZ_MsgBox.tipsbar({
                  title: "通知",
                  content:
                    '创建成功！<span style="color:#ff0000;">请等待任务执行完成~</span>',
                  type: "success",
                  showtime: 3000,
                  processbar: false,
                });
                task_image_get_st(response.task_id);
              } else {
                $.NZ_MsgBox.alert({
                  title: "温馨提示！",
                  content: response.msgbox,
                  type: "error",
                });
              }
            },
            complete: function () {},
          });
        }
      },
    });
  });
    var mockData = {
      Count: 0,
      ImageInfos: [],
    };
  // 获取我的参考图
  function huiwa_model_scene(model_type, cat, bili) {
    if (cat == 0) {
      $("#jp_model_scene").html("");
    } else {
      $("#my_model_scene").html("");
      $("#my_model_scene").append(
        '<li class="grid-item grid-item-upload flexCenter" style="height:12vw"><div class="grid-item-upload-btn flexCenter"><span class="iconfont icon-upload grid-item-upload-icon"></span>上传参考图<input type="file" multiple class="refer-upload"></div><p class="upload-text">支持批量上传</p></li>'
      );
    }
    $.ajax({
        type: "POST",
        url: "/Ajax/hwAPI.ashx?action=model_scene_count",
        dataType: "JSON",
        data: { model_type: model_type, bili: bili, cat: cat},
        beforeSend: function (XMLHttpRequest) {
        }, success: function (json, textStatus) {
            mockData.Count = json.state;
        },
        complete: function (XMLHttpRequest, textStatus) {
            loadPagination(model_type, cat, bili);
        },
        error: function () {
        },
    });
   
  }
  // 获取我的参考图
  function task_image_get(id) {
    $(".result-container").html("");
    $(".database").hide();
    $(".result-empty").hide();
    $(".ai-result").show();
    $(".result-wrap").show();
    $.ajax({
      type: "POST",
      url: "/Ajax/hwAPI.ashx?action=image_get",
      dataType: "JSON",
      data: { id },
      beforeSend: function (XMLHttpRequest) {
        //ShowLoading();
      },
      success: function (json, textStatus) {
        $("#task_status").val(json.state);
        $(".result-container").append(json.msgbox);
      },
      complete: function (XMLHttpRequest, textStatus) {
        //HideLoading();
      },
      error: function () {
        //请求出错处理
      },
    });
  }

  function task_image_get_st(id) {
    task_image_get(id);
    var intervalId = setInterval(function () {
      task_image_get(id);
      if ($("#task_status").val() == 4) {
        // 移除生成中
        $('.generateBtn').removeClass('loading');
        clearInterval(intervalId);
      }
    }, 5000);
  }
  function total_point() {
    var user_point = $("#user_point").val();
    var image_count = $("#image_count").val();
    var scene_id = $("#scene_id").val();
    $("#totalPoint").val(user_point * image_count);
    if (scene_id != "") {
      scene_id = scene_id.slice(0, -1);
      var ddaystrs = new Array();
      ddaystrs = scene_id.split(",");
      $("#totalPoint").text(user_point * image_count * ddaystrs.length);
    }
  }

 

  // 每页显示的数量
  var pageSize = 18;
  // 加载分页
  function loadPagination(model_type, cat, bili) {
    // 初始化分页
    $("#pagination").Pagination({
      totalData: mockData.Count, // 总数据量
      showData: pageSize, // 每页显示的数据量
      pageCount: 5, // 分页栏显示的页码数量
      current: 1, // 当前页码
      coping: true, // 是否开启首页和尾页功能
      callback: function (api) {
        renderHtml(model_type, cat, bili, api.getCurrent())
      },
    });
    // 获取第一页数据
    renderHtml(model_type, cat, bili, 1);
  }

  // 根据分页页数获取数据
  function renderHtml(model_type, cat, bili, index) {
    $.ajax({
      type: "POST",
      url: "/Ajax/hwAPI.ashx?action=model_scene",
      dataType: "html",
      data: { model_type: model_type, bili: bili, cat: cat, pageIndex: index },
              beforeSend: function (XMLHttpRequest) {
      },success: function (json, textStatus) {
        if (cat == 0) {
          $("#jp_model_scene").html(json);
      } else {
          $("#my_model_scene").html(json);
      }
      },
          complete: function (XMLHttpRequest, textStatus) {
      },
          error: function () {
      },
    });
  }
});
