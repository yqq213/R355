$(function () {
  if ($("#_id").val() > 0) {
    $(".result-container").append("任务正努力加载中...，请稍后！");
    $(".select-text").append($("#scene_text").val());
    $(".upload-model-empty .img").html(
      '<img src="https://www.r355.com/' +
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
    //console.log($(this).index());
    $(".dress-tabs .tab").removeClass("active");
    $(this).addClass("active");
    if ($(this).index() == 2) {
      $(".single").show();
      $(".multi").hide();
      if($("#original_image_url").val()=='')
      {
          $(".single .upload-empty").show();
          $(".single .upload-img").hide();
      }
      else
      {
          $(".single .upload-empty").hide();
          $(".single .upload-img").show();
      }
    }
    if ($(this).index() == 3) {
      $(".single").hide();
      $(".multi").show();
      if ($("#original_image_url").val() == '') {
          $("#multi_1 .upload-empty").show();
          $("#multi_1 .upload-img").hide();
      }
      else {
          $("#multi_1 .upload-empty").hide();
          $("#multi_1 .upload-img").show();
      }
      if ($("#original_image_url_2").val() == '') {
          $("#multi_2 .upload-empty").show();
          $("#multi_2 .upload-img").hide();
      }
      else {
          $("#multi_2 .upload-empty").hide();
          $("#multi_2 .upload-img").show();
      }
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
    huiwa_model_scene("", 0, $("#bili").val());
    huiwa_model_scene("", 1, $("#bili").val());
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
    //huiwa_model_scene("", tktype, $("#bili").val());
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
          if ($(element).attr("model_id") != 'undefined')
          {
              secce += $(element).attr("model_id") + ",";
              param.push({
                  id: $(element).attr("model_id"),
                  name: $(element).find(".item-desc").text(),
                  url: $(element).find(".item-img").attr("src"),
              });
          }
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
          '张</span><div class="img-edit-btn"><span class="iconfont"></span>编辑选区</div>'
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
    if (file.size / 1024 / 1024 > 5 || !/^image\//.test(file.type)) {
      $.NZ_MsgBox.alert({
        title: "温馨提示！",
        content: "图片格式不正确或大小超过5M!",
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
        if (files[i].size / 1024 / 1024 > 10 || !/^image\//.test(files[i].type)) {
            $.NZ_MsgBox.alert({
                title: "温馨提示！",
                content: "图片格式不正确或大小超过10M!",
                type: "warning",
            });
            return;
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
      beforeSend: function (XMLHttpRequest) { $.NZ_MsgBox.tipsbar({ title: "通知", content: "模特参考图正在训练中，请稍后~", type: "info", showtime: 3000 }); },
      success: function (response) {
        if (response.state == 200) {
          $("#my_model_scene").append(response.msgbox);
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
  });
  // 立即生成
  $(".generateBtn").click(function () {
    var bili = $("#bili").val();
    $("#task_status").val(2);
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
    if (scene_id.includes('undefined')) {
        $.NZ_MsgBox.alert({
            title: "温馨提示！",
            content: "模特参考图参数错误！",
            type: "error",
        });
        return;
    }

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
          var cat_id = $("#sel_cat_id").val();
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
                $.NZ_MsgBox.tipsbar({
                    title: "通知",
                    content:
                      '创建成功！<span style="color:#ff0000;">请等待任务执行完成~</span>',
                    type: "success",
                    showtime: 3000,
                    processbar: false,
                });
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
                
                task_image_get_st(response.task_id);
              } else {
                $.NZ_MsgBox.alert({
                  title: "温馨提示！",
                  content: response.msgbox,
                  type: "error",
                });
              }
            },
            complete: function () { $('.generateBtn').removeClass('loading'); },
          });
        }
      },
    });
  });
    var mockData = {
        Count: 0,
        Count_1: 0,
      ImageInfos: [],
    };
  // 获取我的参考图
    function huiwa_model_scene(model_type, cat, bili) {
    $.ajax({
        type: "POST",
        url: "/Ajax/hwAPI.ashx?action=model_scene_count",
        dataType: "JSON",
        data: { model_type: model_type, bili: bili, cat: cat},
        beforeSend: function (XMLHttpRequest) {
        }, success: function (json, textStatus) {
            if (cat == 0)
            {
                mockData.Count = json.state;
            }
            else
            {
                mockData.Count_1 = json.state;
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
            loadPagination(model_type, cat, bili);
        },
        error: function () {
        },
    });
   
  }
  // 获取生图信息
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
        $(".result-container").html(json.msgbox);
      },
      complete: function (XMLHttpRequest, textStatus) {
          //HideLoading();
          $('.item').viewer({
              url: 'data-original',
              rotatable: false,
              scalable: false,
              title: false
          });
      },
      error: function () {
        //请求出错处理
      },
    });
  }

  function task_image_get_st(id) {
      task_image_get(id);
      if ($("#task_status").val() == 2)
      {
          var intervalId = setInterval(function () {
              task_image_get(id);
              if ($("#task_status").val() == 4) {
                  // 移除生成中
                  //$('.generateBtn').removeClass('loading');
                  clearInterval(intervalId);
              }
          }, 5000);
      }
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
      var totalnum=mockData.Count;
      if(cat==1)
      {
          totalnum=mockData.Count_1;
      }
      if (totalnum > pageSize)
      {
          $("#pagination_" + cat).Pagination({
              totalData: totalnum, // 总数据量
              showData: pageSize, // 每页显示的数据量
              pageCount: 5, // 分页栏显示的页码数量
              current: 1, // 当前页码
              coping: true, // 是否开启首页和尾页功能
              callback: function (api) {
                  renderHtml(model_type, cat, bili, api.getCurrent())
              },
          });
      }
    // 获取第一页数据
    renderHtml(model_type, cat, bili, 1);
  }

  // 根据分页页数获取数据
  function renderHtml(model_type, cat, bili, index) {
    $.ajax({
      type: "POST",
      url: "/Ajax/hwAPI.ashx?action=model_scene",
      dataType: "html",
      data: { model_type: model_type, bili: bili, cat: cat, pageIndex: index, sceneIds: $("#scene_id").val() },
              beforeSend: function (XMLHttpRequest) {
      },success: function (json, textStatus) {
        if (cat == 0) {
          $("#jp_model_scene").html(json);
        } else {

            $("#my_model_scene").html('<li class="grid-item grid-item-upload flexCenter" style="height:12vw"><div class="grid-item-upload-btn flexCenter"><span class="iconfont icon-upload grid-item-upload-icon"></span>上传参考图<input type="file" multiple class="refer-upload"></div><p class="upload-text">支持批量上传</p></li>'+json);
      }
      },
          complete: function (XMLHttpRequest, textStatus) {
      },
          error: function () {
      },
    });
  }





  /********************** 编辑选区start **********************/

  // 选区操作类型，0：涂抹选区，1：擦除选区，2：自动选区
  let editType = 2
  // 当前选区类型，1：增加选区，2：减少选区
  let areaType = 1
  // 当前缩放比例
  let originScale = 1
  // 是否正在绘画
  let isDrawing = false
  // 是否是拖拽移动状态
  let isMoving = false
  // 主画布对象
  let fabricCanvas;
  // 全局变量保存初始状态
  let initialStates = [];

  // 点击编辑选区
  $('.upload-model-empty').on('click', '.img-edit-btn', function (e) {
    // 取消冒泡
    e.stopPropagation();
    // 打开编辑选区弹框
    layer.open({
      type: 1, // page 层类型
      area: ['90%', '80vh'],
      title: false,
      shade: 0.6, // 遮罩透明度
      shadeClose: false, // 点击遮罩区域，关闭弹层
      maxmin: false, // 允许全屏最小化
      anim: 0, // 0-6 的动画形式，-1 不开启
      content: $('#editAreaModal'),
      end: function() {
        // 关闭弹框回调
        if (fabricCanvas) {
          fabricCanvas.clear();
        }
      }
    });

    initFabricCanvas()
    loadFabricBg($('.edit-choose-item.active img').attr('src'))
    getScale()

    // 监听画布选中事件，选中时将所有图层聚集，方便移动
    fabricCanvas.on('selection:created', function(e) {
      // 只在移动图层状态下自动全选
      if (isMoving) {
        const all = fabricCanvas.getObjects();
        // 避免死循环：如果已经全选则不再全选
        if (!fabricCanvas.getActiveObject() || fabricCanvas.getActiveObject().type !== 'activeSelection' || fabricCanvas.getActiveObject().size() !== all.length) {
          const selection = new fabric.ActiveSelection(all, { canvas: fabricCanvas });
          fabricCanvas.setActiveObject(selection);
          fabricCanvas.requestRenderAll();
        }
      }
    })

    // 监听每次新增绘制内容（Path）后的事件
    fabricCanvas.on('path:created', function(e) {
      // e.path 就是新添加的 Path 对象
      // 在这里执行你的回调逻辑，比如记录初始状态
      recordInitialStates();
    });

    // 鼠标移入，设置鼠标形状
    fabricCanvas.on('mouse:over', function(e) {
      setCursorShape();
      // 只在图片上允许绘画
      if (isDrawing && e.target && e.target === fabricCanvas.getObjects()[0]) {
        fabricCanvas.isDrawingMode = true
      }
    });

    // 鼠标移出，恢复默认形状
    fabricCanvas.on('mouse:out', function(e) {
      // 鼠标移出时恢复默认
      fabricCanvas.defaultCursor = 'default';
      fabricCanvas.setCursor('default');
      fabricCanvas.renderAll();
    });

    // 监听 fabricCanvas 的 mouse:down 事件
    fabricCanvas.on('mouse:down', function(e) {
      // 判断是否为自动选区状态且点击的是图片对象（假设第一个对象是图片）
      if (editType === 2 && e.target && e.target === fabricCanvas.getObjects()[0]) {
        // 获取点击位置
        const pointer = fabricCanvas.getPointer(e.e);
        // 创建一个圆点对象
        const circle = new fabric.Circle({
          left: pointer.x - 8, // 8为半径，保证圆心在点击处
          top: pointer.y - 8,
          radius: 8,
          fill: areaType === 1 ? 'rgba(26, 88, 245, .8)' : 'rgba(226, 43, 82, .8)',
          selectable: false,
          evented: false
        });
        fabricCanvas.add(circle);
        fabricCanvas.requestRenderAll();
      }
    });
  })

  // 点击切换重绘内容操作按钮
  $('#editAreaModal .control-btn-item').click(function(a, b, c) {
    editType = $(this).index()
    $('#editAreaModal .control-btn-item').removeClass('btn-selected')
    $(this).addClass('btn-selected')
    // 取消移动状态
    isMoving = false
    $('#moveImgBtn').removeClass('on')
    if ($(this).index() === 2) {  // 自动选区
      $('.control-progress').hide()
      $('.addAreaBtn, .reduceAreaBtn').show()
      fabricCanvas.isDrawingMode = false;
      fabricCanvas.defaultCursor = 'url("/images/ai-dress/arrow-cursor.svg") 32 32, auto'
    } else {
      $('.control-progress').show()
      $('.addAreaBtn, .reduceAreaBtn').hide()
      isDrawing = true
    }
    // 初始笔刷大小为30
    if (editType === 0) enableBrush(30)
    if (editType === 1) enableEraser(30)
  })

  // 点击增加选区
  $('#editAreaModal .addAreaBtn').click(function() {
    areaType = 1
    $(this).addClass('active')
    $('#editAreaModal .reduceAreaBtn').removeClass('active')
  })

  // 点击减少选区
  $('#editAreaModal .reduceAreaBtn').click(function() {
    areaType = 2
    $(this).addClass('active')
    $('#editAreaModal .addAreaBtn').removeClass('active')
  })

  // 点击反选选区
  $('#editAreaModal.reverseAreaBtn').click(function() {
    
  })

  // 弹框点击取消
  $('.edit-cancel-btn').click(function() {
    layer.closeAll()
  })

  // 弹框点击确定
  $('.edit-confirm-btn').click(function() {
    layer.closeAll()
  })

  // 切换编辑选区选中图片
  $('#editAreaModal').on('click', '.edit-choose-item', function() {
    $('#editAreaModal .edit-choose-item').removeClass('active')
    $(this).addClass('active')
    if (fabricCanvas) fabricCanvas.clear();
    loadFabricBg($('.edit-choose-item.active img').attr('src'))
  })

  // 放大视图
  $('#enlargeBtn').click(function() {
    $('#reduceBtn').removeClass('disabled')
    originScale += 0.25
    if (originScale > 2) {
      originScale = 2
      $(this).addClass('disabled')
    }
    fabricCanvas.setZoom(originScale)
    // 让画布内容居中
    setViewCenter()
    fabricCanvas.renderAll()
    getScale()
  })

  // 缩小视图
  $('#reduceBtn').click(function() {
    $('#enlargeBtn').removeClass('disabled')
    originScale -= 0.25
    if (originScale < 0.25) {
      originScale = 0.25
      $(this).addClass('disabled')
    }
    fabricCanvas.setZoom(originScale)
    // 让画布内容居中
    setViewCenter()
    fabricCanvas.renderAll()
    getScale()
  })

  // 移动图片
  $('#moveImgBtn').click(function() {
    $(this).toggleClass('on')
    // 设置移动状态
    isMoving = $(this).hasClass('on')
    if (isMoving) {
      // 关闭绘画模式
      fabricCanvas.isDrawingMode = false;
      // // 允许拖动背景图片
      // if (fabricCanvas.backgroundImage) {
      //   fabricCanvas.backgroundImage.selectable = true;
      //   fabricCanvas.setActiveObject(fabricCanvas.backgroundImage);
      //   fabricCanvas.renderAll();
      // }
      // 一键全选所有对象
      const all = fabricCanvas.getObjects();
      fabricCanvas.discardActiveObject();
      const selection = new fabric.ActiveSelection(all, { canvas: fabricCanvas });
      fabricCanvas.setActiveObject(selection);
      fabricCanvas.requestRenderAll();
    } else {
      // 禁止所有对象拖动
      fabricCanvas.getObjects().forEach(obj => {
        obj.selectable = false;
      });
      fabricCanvas.discardActiveObject();
      fabricCanvas.requestRenderAll();
    }
  })

  // 点击复位视图
  $('#resetViewBtn').click(function() {
    // 恢复所有对象到初始状态
    const objects = fabricCanvas.getObjects();
    objects.forEach((obj, i) => {
      if (initialStates[i]) {
        obj.set(initialStates[i]);
      }
    });
    fabricCanvas.setZoom(1)
    fabricCanvas.requestRenderAll();
  })

  // 清空选区
  $('#emptyAreaBtn').click(function() {
    // 获取所有对象
    const objects = fabricCanvas.getObjects();
    // 假设初始化图片是第一个对象，只保留它
    objects.forEach((obj, i) => {
      if (i !== 0) {
        fabricCanvas.remove(obj);
      }
    });
    fabricCanvas.renderAll();
  })

  // $('#emptyAreaBtn').click(function() {
  //   // 清空右侧canvas
  //   targetCanvas = document.getElementById('targetCanvas')
  //   const tCtx = targetCanvas.getContext('2d')
  //   tCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height)
  //   // 清空左侧曲线背景canvas
  //   const ctxBg = originCanvasBg.getContext('2d')
  //   ctxBg.clearRect(0, 0, originCanvasBg.width, originCanvasBg.height)
  // })

  // 鼠标移入canvas
  // originCanvasBg.addEventListener('mouseenter', function(e) {
  //   if ($('#moveImgBtn').hasClass('on')) return;
  //   if (editType === 2) {
  //     $('#originCanvasBg').css('cursor', 'url("/images/ai-dress/arrow-cursor.svg") 32 32, auto');
  //   } else {
  //     // $('#originCanvasBg').css('cursor', 'url("/images/ai-dress/circle-cursor.svg") 8 8, auto');
  //     // updateBrushCursor(brushSize)
  //   }
  // });

  // 鼠标移出canvas
  // originCanvas.addEventListener('mouseleave', function(e) {
  //   $('#originCanvas').css('cursor', 'default');
  // });

  // 鼠标开始按下
  // originCanvasBg.addEventListener('mousedown', function(e) {
  //   if ($('#moveImgBtn').hasClass('on')) return;
  //   if (editType < 2) {
  //     isDrawing = true;
  //     const rect = originCanvasBg.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;
  //     lastPoint = { x, y };
  //   }
  // });

  // 鼠标移动
  // originCanvasBg.addEventListener('mousemove', function(e) {
  //   if ($('#moveImgBtn').hasClass('on')) return;
  //   if (isDrawing && editType < 2) {
  //     const rect = originCanvasBg.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;
  //     const ctx = originCanvasBg.getContext('2d');
  //     if (editType === 0) ctx.globalCompositeOperation = 'source-over'; // 正常绘制
  //     if (editType === 1) ctx.globalCompositeOperation = 'destination-out'; // 擦除模式
  //     ctx.beginPath();
  //     ctx.moveTo(lastPoint.x, lastPoint.y); // 用lastPoint作为起点
  //     ctx.lineTo(x, y);
  //     ctx.strokeStyle = 'rgba(101, 126, 185, 0.5)';
  //     // ctx.lineWidth = brushSize;
  //     ctx.lineCap = 'round';
  //     ctx.stroke();
  //     ctx.closePath();
  //     lastPoint = { x, y };
  //   }
  // })

  // 鼠标松开
  // originCanvasBg.addEventListener('mouseup', function(e) {
  //   isDrawing = false;
  //   lastPoint = null;
  // });

  // 鼠标移出canvas时也要停止绘制
  // originCanvasBg.addEventListener('mouseleave', function(e) {
  //   isDrawing = false;
  //   lastPoint = null;
  // });

  // 初始化绘制图片 src: 图片的地址 isOrigin: 是否是原图  showMask: 是否显示loading mask,默认为false
  function drawImg(src, isOrigin = true, showMask = false) {
    const img = new Image()
    img.src = src
    img.crossOrigin = "anonymous";
    img.onload = function () {
      let canvas;
      if (isOrigin) {
        canvas = document.getElementById('originCanvas')
        canvasBg = document.getElementById('originCanvasBg')
        // canvas.width = $('.draw-wrap.origin').width()
        canvas.height = $('.draw-wrap.origin').height()
        canvasBg.height = $('.draw-wrap.origin').height()
      } else {
        canvas = document.getElementById('targetCanvas')
        // canvas.width = $('.draw-wrap.target').width()
        canvas.height = $('.draw-wrap.target').height()
      }
      // 计算图片等比例缩放后的尺寸
      const aspectRatio = img.width / img.height
      const targetWidth = aspectRatio * canvas.height
      canvas.width = targetWidth
      if (isOrigin) canvasBg.width = targetWidth
      const ctx = canvas.getContext('2d')
      // 清空画布
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 计算绘制起始位置（水平居中）
      // const xPos = ($('.draw-wrap.origin').width() - targetWidth) / 2;
      // 绘制图像
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, targetWidth, canvas.height);
      // 加载mask
      if (showMask && editType === 2) drawMask(targetWidth)
      if (isOrigin) {
        // 绑定点击事件，绘制小圆
        $('#originCanvasBg').off('click').on('click', function (e) {
          if ($('#moveImgBtn').hasClass('on')) return;
          if (editType === 2) drawDot(e, ctx);
        });
      }
    }
  }

  // 初始化 Fabric Canvas
  function initFabricCanvas() {
    // 关闭所有对象的边框和控制点
    fabric.Object.prototype.borderColor = 'rgba(0,0,0,0)';
    fabric.Object.prototype.cornerColor = 'rgba(0,0,0,0)';
    fabric.Object.prototype.transparentCorners = true;
    fabric.Object.prototype.hasBorders = false;
    fabric.Object.prototype.hasControls = false;
    // 创建主画布
    fabricCanvas = new fabric.Canvas('originCanvas', {
      isDrawingMode: false, // 初始不启用绘画
      selection: false, // 只允许单选
      height: $('.draw-wrap.origin').height(),
      width: $('.draw-wrap.origin').width()
    });
    fabricCanvas.defaultCursor = 'url("/images/ai-dress/arrow-cursor.svg") 32 32, auto'
  }

  // 加载图片为背景
  function loadFabricBg(src) {
    fabric.Image.fromURL(src, function(img) {
      // 计算图片等比例缩放后的尺寸
      const scale = fabricCanvas.height / img.height;
      // 计算图片相对canvas x轴偏移量
      const aspectRatio = img.width / img.height
      const imgWidth = aspectRatio * fabricCanvas.height
      img.set({
        left: (fabricCanvas.width - imgWidth) / 2,
        top: 0,
        scaleX: scale,
        scaleY: scale,
        selectable: false, // 允许选中
        evented: true,
        erasable: false   // 不被橡皮擦擦除
      });
      fabricCanvas.add(img);
      fabricCanvas.sendToBack(img); // 保证图片在底层
      // 记录初始状态
      recordInitialStates()
      drawMask(imgWidth)
      // fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas), { erasable: false }); // erasable 为 false 时，背景图片不可被擦除
    }, { crossOrigin: 'anonymous' });
  }

  // 每次新增绘制内容后也要更新 initialStates
  function recordInitialStates() {
    initialStates = fabricCanvas.getObjects().map(obj => ({
      left: obj.left,
      top: obj.top,
      scaleX: obj.scaleX,
      scaleY: obj.scaleY,
      angle: obj.angle
    }));
  }

  // 涂抹选区
  function enableBrush(size) {
    // fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.width = size;
    fabricCanvas.freeDrawingBrush.color = 'rgba(101, 126, 185, .5)';
  }

  // 擦除选区
  function enableEraser(size) {
    // fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush = new fabric.EraserBrush(fabricCanvas);
    // fabricCanvas.freeDrawingBrush = new fabric.PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.width = size;
    // fabricCanvas.freeDrawingBrush.inverted = true
  }

  // 设置光标形状
  function setCursorShape() {
    const bgImg = fabricCanvas.getObjects()[0]; // 假设第一个是背景图片
    if (isMoving) {
      bgImg.hoverCursor = 'move';
    } else if (editType === 2) {
      bgImg.hoverCursor = 'url("/images/ai-dress/arrow-cursor.svg") 32 32, auto';
    } else {
      // bgImg.hoverCursor = getBrushCursor(fabricCanvas.freeDrawingBrush.width);
      bgImg.hoverCursor = 'crosshair';
    }
  }

  // 放大缩小之后，让画布内容居中
  function setViewCenter() {
    // 计算让内容居中的偏移
    const canvasWidth = fabricCanvas.getWidth();
    const canvasHeight = fabricCanvas.getHeight();
    const zoom = fabricCanvas.getZoom();

    // 以画布中心为锚点进行缩放
    const vp = fabricCanvas.viewportTransform;
    // 让画布内容居中
    vp[4] = canvasWidth / 2 - (canvasWidth / 2) * zoom;
    vp[5] = canvasHeight / 2 - (canvasHeight / 2) * zoom;
    fabricCanvas.setViewportTransform(vp);
  }

  // 获取当前缩放比例
  function getScale() {
    $('.editor-num span').text(Math.floor(fabricCanvas.getZoom() * 100))
  }

  // 绘制圆点
  // function drawDot(e, ctx) {
  //   // 获取canvas的边界
  //   const rect = originCanvas.getBoundingClientRect();
  //   // 计算点击位置相对于canvas的坐标
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;
  //   // 绘制小圆
  //   ctx.beginPath();
  //   ctx.arc(x, y, 8, 0, 2 * Math.PI); // 半径6，可调整
  //   ctx.fillStyle = areaType === 1 ? 'rgba(26, 88, 245, .8)' : 'rgba(226, 43, 82, .8)'; // 圆的颜色，可自定义
  //   ctx.fill();
  //   ctx.closePath();
  // }

  // 动态生成光标
  function getBrushCursor(size) {
    const cursorCanvas = document.createElement('canvas');
    cursorCanvas.width = size;
    cursorCanvas.height = size;
    const ctx = cursorCanvas.getContext('2d');
    // 填充背景为半透明黑色
    ctx.fillStyle = 'rgba(0, 0, 0, .3)';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    // 画白色描边圆环
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 - 1, 0, 2 * Math.PI);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    const dataURL = cursorCanvas.toDataURL('image/png');
    return `url(${dataURL}) ${size/2} ${size/2}, auto`;
  }

  // 扣图准备loading mask
  function drawMask(width) {
    const maskEle = document.querySelector('.canvas-mask')
    maskEle.style.width = `${width}px`
    $('.canvas-mask').show()
    // 模拟智能扣图准备完成后，关闭mask
    setTimeout(() => {
      closeMask()
      // 绘制右侧图片
      drawImg('/images/ai-dress/transparent.png', false)
    }, 3000)
  }

  function closeMask() {
    $('.canvas-mask').hide()
  }

  layui.use(function(){
    var slider = layui.slider;
    // 笔刷进度条
    slider.render({
      elem: '#slider',  //绑定元素
      min: 10, //最小值
      max: 100, //最大值
      value: 30, //初始值
      theme: '#657eb9', //主题色
      change: function(value){
        fabricCanvas.freeDrawingBrush.width = value;
      }
    });
  });

});
