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
    if ($(this).hasClass('second')) $('.upload-img img').css('aspect-ratio', '1')
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
    }
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
      $('.base-container').hide()
      $('.refer-container').show()
    }
  })
  // 点击切换精品库类型
  $('.base-types li').click(function() {
    $('.base-types li').removeClass('active')
    $(this).addClass('active')
  })
  // 点击选中精品库
  $('.grid-item').click(function() {
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
  $('.upload-input').change(function(e) {
    console.log($(this))
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    $.ajax({
      url: "",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        
      }
    });
    // 上传成功
    $(this).parent().hide()
    $(this).parent().siblings('.upload-img').show()
    $(this).parent().siblings('.upload-img').find('img').attr('src', '/images/ai-dress/recent-img.jpeg')
  })
  // 上传参考图
  $('.refer-upload').change(function(e) {
    console.log(e.target.files)
  })
  // 立即生成
  $('.generateBtn').click(function() {
    $('.database').hide()
    $('.result-empty').hide()
    $('.ai-result').show()
    $('.result-wrap').show()
    $('.result-item .result-loading').show()
    setTimeout(function() {
      $('.result-item .result-loading').hide()
    }, 3000)
  })
})