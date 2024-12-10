$(function() {

  // 模拟以图搜图返回的所有图片列表
  var mockData = {
    Count: 100,
    ImageInfos: []
  }
  for(var i = 0; i < 100; i ++) {
    mockData.ImageInfos.push({
      PicName: 'http://www.r355.com/Ajax/imgtoliu.aspx?PPath=L3VwbG9hZEZpbGVzLzIwMjQxMjA5L2tzdGsvc21hbGxfMjAyNDEyMDkxMzAxNDI3NzY0LmpwZw%3d%3d',
      Score: 83,
      EntityId: 'qszx_one_2024041710444383097_28557'
    })
  }

  // 每页显示的数量
  var pageSize = 10

  // 初始化分页
  $('#pagination').Pagination({
    totalData: mockData.Count, // 总数据量
    showData: pageSize, // 每页显示的数据量
    pageCount: 5, // 分页栏显示的页码数量
    current: 1, // 当前页码
    coping: true, // 是否开启首页和尾页功能
    callback: function (api) {
      // 分页回调函数，在这里进行数据加载和页面渲染
      renderHtml(api.getCurrent() - 1)
    }
  })

  // 获取分页数据
  function renderHtml(page) {
    $('.img-container').html('')
    var html = ''
    for(var i = pageSize * page; i < pageSize * page + pageSize; i++) {
      if (i < mockData.Count) {
        html += '<li><img src=' + mockData.ImageInfos[i].PicName +' alt="' + i + '" /></li>'
      }
    }
    $('.img-container').html(html)
  }

  // 只有一页时分页隐藏
  // if (mockData.Count / pageSize <= 1) {
  //   $('#pagination').hide()
  // }

  // 初始化第一页
  renderHtml(0)

  // 点击选中关键字
  $('.n_txt li').click(function() {
    $('.n_txt li').removeClass('on')
    $(this).addClass('on')
  })

  // 拖拽dragover事件
  document.querySelector('.search-upload').addEventListener('dragover', function(event) {
    event.preventDefault()
    event.stopPropagation()
    $(this).addClass('drag-over')
  })

  // 拖拽dragleave事件
  document.querySelector('.search-upload').addEventListener('dragleave', function(event) {
    event.preventDefault()
    event.stopPropagation()
    $(this).removeClass('drag-over')
  })

  // 获取拖拽的文件
  document.querySelector('.search-upload').addEventListener('drop', function(event) {
    event.preventDefault()
    $(this).removeClass('drag-over')
    handleUploadFile(event.dataTransfer.files[0])
  })

  // 监听文件上传
  document.querySelector('.search-upload').addEventListener('change', function(event) {
    handleUploadFile(event.target.files[0])
  })

  // 处理上传文件
  function handleUploadFile(file) {
    console.log(file)
    if (!/^image\//.test(file.type)) {
      // $('.search-upload-loading').hide()
      $('.search-upload-error').show()
      return
    }
    var formData = new FormData()
    formData.append('file', file)
    $.ajax({
      url: '',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function(response) {
        console.log('文件上传成功');
        console.log(response);
      }
    })
  }

  // 关闭上传弹框
  $('.Submission').click(function() {
    $('.search-upload-error').hide()
  })

})