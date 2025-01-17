// 每页显示的数量
var pageSize = 18;
var pageIndex = 1;
var mockData = {
  Count: 0,
  Count_1: 0,
  ImageInfos: [],
};
$(function () {
  // 初始化日期插件
  $("#startDate").datepicker({
    dateFormat: "yy-mm-dd",
  });
  $("#endDate").datepicker({
    dateFormat: "yy-mm-dd",
  });
  loadWork(1);
  loadWork(2);
  // 点击选中作品
  $(".list-content-choose").on("click", ".item-choose", function () {
    $(this).toggleClass("selected");
    $(".select-num").text($(".list-content-choose .selected").length);
  });

  // 点击批量操作
  $(".search-btn").click(function () {
    loadWork($(this).data("id"));
  });
  // 点击批量操作
  $(".batch-operate").click(function () {
    $(".list-content-choose").show();
    $(".cancel-operate").show();
    $(".bottom-select").show();
    $(".list-content").hide();
    $(this).hide();
  });

  // 点击取消
  $(".cancel-btn").click(function () {
    $(".list-content-choose").hide();
    $(".cancel-operate").hide();
    $(".bottom-select").hide();
    $(".list-content").show();
    $(".batch-operate").show();
  });

  // 选中只看未下载
  $(".cancel-operate .checkbox").change(function () {
    // todo
  });

  // 切换生图作品和参考图
  $(".navs .nav-item").click(function () {
    $(".navs .nav-item").removeClass("active");
    $(this).addClass("active");
    if ($(this).hasClass("nav-work")) {
      // 生图作品
      $(".work-content").show();
      $(".refer-content").hide();
    } else if ($(this).hasClass("nav-refer")) {
      // 参考图
      $(".work-content").hide();
      $(".refer-content").show();
    }
  });

  // 关闭弹框
  $(".modal-wrap .modal-close").click(function () {
    $("#enlarge-modal").hide();
    $("#create-modal").hide();
  });

  // 点击生图作品
  $(".list-content").on("click", ".item-card .img-item", function () {
    modalHtml($(this).data("id"));
    $("#enlarge-modal").show();
  });

  // 放大图切换图片
  $("#enlarge-modal").on("click", ".left-list .item", function () {
    $("#enlarge-modal .left-list .item").removeClass("active");
    $(this).addClass("active");
    $("#task_image").attr("src", $(this).data("task_image"));
    $("#scene_image").attr("src", $(this).data("scene_image"));
    $("#huiwa_task_id").text($(this).data("huiwa_task_id"));
    $("#imageToDownload").attr("src", $(this).data("task_image"));
  });

  // 创建参考图
  $(".create-btn").click(function () {
    $("#create-modal").show();
  });

  // 上传参考图
  $("#createUpload").change(function (e) {
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
      beforeSend: function (XMLHttpRequest) {
        $.NZ_MsgBox.tipsbar({
          title: "通知",
          content: "模特参考图正在训练中，请稍后~",
          type: "info",
          showtime: 2000,
        });
      },
      success: function (response) {
        if (response.state == 200) {
          $.NZ_MsgBox.tipsbar({
            title: "通知",
            content: '上传成功！<span style="color:#ff0000;">Success!</span>',
            type: "success",
            showtime: 3000,
            processbar: false,
          });
          loadWork(2);
          $("#create-modal").hide();
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
});

function loadWork(cat) {
  let data = {
    model_type: $("#model_type").val(),
    startDate: $("#startDate").val(),
    endDate: $("#endDate").val(),
    work_key: $("#work_key").val(),
    cat: cat,
  };
  if (cat == 2) {
    data = {
      model_type: $("#model_type").val(),
      work_key: $("#key2").val(),
      cat: cat,
    };
  }
  $.ajax({
    type: "POST",
    url: "/Ajax/hwAPI.ashx?action=get_my_work_count",
    dataType: "JSON",
    data: data,
    beforeSend: function (XMLHttpRequest) {},
    success: function (json, textStatus) {
      if (cat == 1) {
        mockData.Count = json.state;
      } else {
        mockData.Count_1 = json.state;
      }
    },
    complete: function (XMLHttpRequest, textStatus) {
      loadPagination(cat);
    },
    error: function () {},
  });
}

// 加载分页
function loadPagination(cat) {
  // 初始化分页
  var totalnum = mockData.Count_1;
  if (cat == 1) {
    totalnum = mockData.Count;
    pageSize = 15;
  }
  //console.log(totalnum + '-' + pageSize+'-'+cat);
  if (totalnum > pageSize) {
    $("#pagination_" + cat).Pagination({
      totalData: totalnum, // 总数据量
      showData: pageSize, // 每页显示的数据量
      pageCount: 5, // 分页栏显示的页码数量
      current: 1, // 当前页码
      coping: true, // 是否开启首页和尾页功能
      callback: function (api) {
        pageIndex = api.getCurrent();
        renderHtml(cat, api.getCurrent());
      },
    });
  }
  // 获取第一页数据
  renderHtml(cat, 1);
}

// 根据分页页数获取数据
function renderHtml(cat, index) {
  let data = {
    model_type: $("#model_type").val(),
    startDate: $("#startDate").val(),
    endDate: $("#endDate").val(),
    work_key: $("#work_key").val(),
    cat: cat,
    pageIndex: index,
  };
  if (cat == 2) {
    data = {
      model_type: $("#model_type").val(),
      work_key: $("#key2").val(),
      cat: cat,
      pageIndex: index,
    };
  }
  $.ajax({
    type: "POST",
    url: "/Ajax/hwAPI.ashx?action=get_my_work",
    dataType: "html",
    data: data,
    beforeSend: function (XMLHttpRequest) {},
    success: function (json, textStatus) {
      if (cat == 1) {
        $(".list-content").html(json);
      } else {
        $(".refer-list").html(json);
      }
    },
    complete: function (XMLHttpRequest, textStatus) {},
    error: function () {},
  });
}

function modalHtml(id) {
  $.ajax({
    type: "POST",
    url: "/Ajax/hwAPI.ashx?action=get_task_info",
    dataType: "html",
    data: { id },
    beforeSend: function (XMLHttpRequest) {},
    success: function (json, textStatus) {
      // $(".modal-content").html(json);
    },
  });
}

function del(id, item) {
  $.NZ_MsgBox.confirm({
    title: "确认删除？",
    content: "删除后将无法找回数据！",
    type: "warning",
    callback: function (resu) {
      if (resu) {
        $.ajax({
          type: "POST",
          url: "/Ajax/hwAPI.ashx?action=delwork",
          dataType: "JSON",
          data: { id, item },
          beforeSend: function (XMLHttpRequest) {},
          success: function (json, textStatus) {
            if (json.state == 1) {
              $.NZ_MsgBox.tipsbar({
                title: "通知",
                content:
                  '删除成功！<span style="color:#ff0000;">Success!</span>',
                type: "success",
                showtime: 3000,
                processbar: false,
              });
              $("#enlarge-modal").hide();
              $("#create-modal").hide();
              if (item == "task") {
                renderHtml(1, pageIndex);
                mockData.Count = mockData.Count - 1;
              } else {
                renderHtml(2, pageIndex);
                mockData.Count_1 = mockData.Count_1 - 1;
              }
              //if (item == 'task') {
              //    loadWork(1);
              //}
              //else {
              //    loadWork(2);
              //}
            } else {
              $.NZ_MsgBox.alert({
                title: "Error!错误！",
                content: "Error！错误！",
                type: "error",
              });
            }
          },
        });
      }
    },
  });
}

function imageToDownload(task_image) {
  let currentTime = new Date();
  var url = task_image;
  if ($("#imageToDownload").attr("src") != "") {
    url = $("#imageToDownload").attr("src");
  }
  var a = document.createElement("a");
  var event = new MouseEvent("click");
  a.download = "tack_" + getNowFormatDate() + ".png"; //下载图片名称  test
  a.href = url;
  //执行下载
  a.dispatchEvent(event);
}
function getNowFormatDate() {
  var date = new Date();

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate =
    year +
    month +
    strDate +
    date.getHours() +
    date.getMinutes() +
    date.getSeconds();
  return currentdate;
}
