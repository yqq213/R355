$(function() {

  // 初始化日期插件
  $('#startDate').datepicker({
    dateFormat: 'yy-mm-dd',
  });
  $('#endDate').datepicker({
    dateFormat: 'yy-mm-dd',
  });

  // 分页
  $("#pagination").Pagination({
    totalData: 100, // 总数据量
    showData: 20, // 每页显示的数据量
    pageCount: 5, // 分页栏显示的页码数量
    current: 1, // 当前页码
    coping: true, // 是否开启首页和尾页功能
    callback: function (api) {
      // 调用接口
    },
  });

  // 点击选中作品
  $('.list-content-choose').on('click', '.item-choose', function() {
    $(this).toggleClass("selected");
    $('.select-num').text($('.list-content-choose .selected').length)
  })

  // 点击批量操作
  $('.batch-operate').click(function() {
    $('.list-content-choose').show()
    $('.cancel-operate').show()
    $('.bottom-select').show()
    $('.list-content').hide()
    $(this).hide()
  })

  // 点击取消
  $('.cancel-btn').click(function() {
    $('.list-content-choose').hide()
    $('.cancel-operate').hide()
    $('.bottom-select').hide()
    $('.list-content').show()
    $('.batch-operate').show()
  })

  // 选中只看未下载
  $('.cancel-operate .checkbox').change(function() {
    // todo
  })

  // 切换生图作品和参考图
  $('.navs .nav-item').click(function() {
    $('.navs .nav-item').removeClass('active')
    $(this).addClass('active')
    if ($(this).hasClass('nav-work')) {
      // 生图作品
      $('.work-content').show()
      $('.refer-content').hide()
    } else if ($(this).hasClass('nav-refer')) {
      // 参考图
      $('.work-content').hide()
      $('.refer-content').show()
    }
  })

  // 关闭弹框
  $('.modal-wrap .modal-close').click(function() {
    $('#enlarge-modal').hide()
    $('#create-modal').hide()
  })

  // 点击生图作品
  $('.list-content ').on('click', '.item-card .img-item', function() {
    $('#enlarge-modal').show()
  })

  // 放大图切换图片
  $('#enlarge-modal').on('click', '.left-list .item', function() {
    $('#enlarge-modal .left-list .item').removeClass('active')
    $(this).addClass('active')
  })

  // 创建参考图
  $('.create-btn').click(function() {
    $('#create-modal').show()
  })

  // 上传参考图
  $('#createUpload').change(function() {
    
  })
})
