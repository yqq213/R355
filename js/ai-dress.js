$(function() {
  // 点击切换最近任务
  $('.task-item').click(function() {
    $('.task-item').removeClass('active')
    $(this).addClass('active')
  })
  // 点击切换图像比例
  $('.btn-tabs .tab').click(function() {
    $('.btn-tabs .tab').removeClass('active')
    $(this).addClass('active')
    if ($(this).hasClass('first')) $('.upload-img img').css('aspect-ratio', '3/4')
    if ($(this).hasClass('second')) $('.upload-img img').css('aspect-ratio', '1');
    $("#bili").val($(this).data("bili"))

  })
  // 点击切换上身类别
  $('.dress-tabs .tab').click(function(index) {
    console.log($(this).index())
    $('.dress-tabs .tab').removeClass('active')
    $(this).addClass('active')
    if ($(this).index() == 2) {
      $('.single').show()
      $('.multi').hide()
    }
    if ($(this).index() == 3) {
        $('.single').hide()
        $('.multi').show()
    };
    $("#type_id").val($(this).data("type_id"));

  })
  // 点击选择模特进入精品库
  $('.upload-model-empty').click(function() {
    $('.ai-result').hide()
    $('.database').show()
  })
  // 关闭精品库
  $('.close-database').click(function() {
    $('.ai-result').show()
    $('.database').hide()
  })
  // 自动修图开关切换
  $('.func-wrap .iconfont').click(function() {
    $('.icon-kaiguanguan').toggle()
    $('.icon-kaiguankai').toggle()
  })
  // 点击切换精品库
  $('.base-navs li').click(function() {
    $('.base-navs li').removeClass('active')
    $(this).addClass('active')
    if ($(this).attr('data-type') === '1') {
      $('.base-container').show()
      $('.refer-container').hide()
    }
    if ($(this).attr('data-type') === '2') {
        $('.base-container').hide();
        $('.refer-container').show();
        huiwa_model_scene(3, 1, 0);
    }
  })
  // 点击切换精品库类型
  $('.base-types li').click(function() {
    $('.base-types li').removeClass('active')
    $(this).addClass('active');
    $("#auto_hand_refine").val($(this).data("auto_hand_refine"))

  })
  // 点击选中精品库
  $('#my_model_scene').on('click', '.grid-item', function() {
    $(this).toggleClass('selected')
    var selectedLength = $('.grid-container .selected').length
    if (selectedLength) {
      $('.select-btns').show()
      $('.select-text').text('已选“男士-外套”等' + selectedLength + '张')
      $('.upload-model-empty .img').html('<img src="/images/ai-dress/recent-img.jpeg" style="width: 100%; height: 100%;" /><span class="label flexCenter">共' + selectedLength + '张</span>')
    } else {
      emptyFun()
    }
  })
  // 清空模特参考图
  $('.empty-refer').click(function() {
    $('.grid-container .grid-item').removeClass('selected')
    emptyFun()
  })
  // 清空选中
  function emptyFun() {
    $('.select-btns').hide()
    $('.select-text').text('')
    $('.upload-model-empty .img').html('<img src="/images/ai-dress/img-add-icon.png" />')
  }
  // 点击切换参考图来源
  $('.original li').click(function() {
    $('.original li').removeClass('active')
    $(this).addClass('active')
  })
  // 点击切换参考比例
  $('.ratio li').click(function() {
    $('.ratio li').removeClass('active')
    $(this).addClass('active')
  })
  // 上传单件衣服或多件衣服
  $('.upload-input').change(function (e) {
      var action = $(this).data('action');
      var file = e.target.files[0];
      if (file.size / 1024 / 1024 > 2 || !/^image\//.test(file.type)) {
          alert("文件格式不正确，文件不能超过2M")
          return
      }
    var formData = new FormData();
    formData.append("file", file);
    var that = this
    $.ajax({
      url: '/Ajax/stTools.aspx?action=huiwatast',
      type: "POST",
      dataType: "json",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
          if (response.state == 200) {
              if (action == 'shangzhuang' || action == 'single') {
                  $("#original_image_url").val(response.msgbox);
              }
              else if (action == 'xiazhuang') {
                  $("#original_image_url_2").val(response.msgbox);
              };
              // 上传成功
              $(that).parent().hide()
              $(that).parent().siblings('.upload-img').show()
              $(that).parent().siblings('.upload-img').find('img').attr('src', response.msgbox)
          }
          else {
              alert(response.msg);
          }
      }
    });
   
  })
  // 上传参考图
  $('#my_model_scene').on('change', '.refer-upload', function(e) {
    debugger
    var file=e.target.files;
    var formData = new FormData()
    formData.append('file', file)
    $.ajax({
        url: '/Ajax/stTools.aspx?action=scene',
        type: 'POST',
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.state == 200) {
                $('#my_model_scene').append(response.msgbox);
            }
            else {
                alert(response.msg);
            }
        },
        complete: function () {

        }
    })
  })
  // 立即生成
  $('.generateBtn').click(function () {
      var bili = $("#bili").val();
      var type_id = $("#type_id").val();
      var original_image_url = $("#original_image_url").val();
      var original_image_url_2 = $("#original_image_url_2").val();
      var scene_id = $("#scene_id").val();
      var image_count = $("#image_count").val();
      var auto_hand_refine = $("#auto_hand_refine").val();
      var cat_id = $("#cat_id").val();
      $.ajax({
          url: '/Ajax/huiwaAPI.ashx?action=addTask',
          type: 'POST',
          data: [bili, type_id, original_image_url, original_image_url_2, scene_id, image_count, auto_hand_refine, cat_id],
          dataType: "json",
          contentType: false,
          processData: false,
          success: function (response) {
              if (response.state == 200) {

              }
              else {
                  alert(response.msg);
              }
          },
          complete: function () {

          }
      });

      $('.database').hide();
      $('.result-empty').hide();
      $('.ai-result').show();
      $('.result-wrap').show();
      $('.result-item .result-loading').show();
      setTimeout(function () {
          $('.result-item .result-loading').hide();
      }, 3000);
  });
    // 获取我的参考图
  function huiwa_model_scene(model_type, bili, cat) {
      $('#my_model_scene').html("");
      $('#my_model_scene').append('<li class="grid-item grid-item-upload flexCenter"><div class="grid-item-upload-btn flexCenter"><span class="iconfont icon-upload grid-item-upload-icon"></span>上传参考图<input type="file" multiple class="refer-upload"></div><p class="upload-text">支持批量上传</p></li>');
      $.ajax({
          type: 'POST',
          url: '/Ajax/huiwaAPI.ashx?action=model_scene',
          type: 'html',
          data: { model_type, bili, cat},
                  beforeSend: function (XMLHttpRequest) {
              //ShowLoading();
          },
              success: function (json, textStatus) {
              $('#my_model_scene').append(json);
          },
              complete: function (XMLHttpRequest, textStatus) {
              //HideLoading();
          },
          error: function () {
              //请求出错处理
          }
      });
  };
})

