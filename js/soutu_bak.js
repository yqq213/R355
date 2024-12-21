$(function() {

  // 模拟以图搜图返回的所有图片列表

  //for(var i = 0; i < 100; i ++) {
  //  mockData.ImageInfos.push({
  //    PicName: 'http://www.r355.com/Ajax/imgtoliu.aspx?PPath=L3VwbG9hZEZpbGVzLzIwMjQxMjA5L2tzdGsvc21hbGxfMjAyNDEyMDkxMzAxNDI3NzY0LmpwZw%3d%3d',
  //    Score: 83,
  //    EntityId: 'qszx_one_2024041710444383097_28557'
  //  })
  //}

  // 每页显示的数量
  var pageSize = 20

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
   
    if (mockData.Count == 0) {
        $("#pagination").hide();
        $(".img-container").hide();
        $('.empty-container').show();
    }
    else
    {
        $('.img-container').html('')
        var html = ''
        for (let i = pageSize * page; i < pageSize * page + pageSize; i++) {
            if (i < mockData.Count) {
                var picurl = "https://www.r355.com/uploadFiles/" + mockData.ImageInfos[i].PicName;

                // 将图片url转为base64
                fetch(picurl).then(function(response) {
                  return response.blob()
                }).then(function(blob) {
                  var reader = new FileReader()
                  reader.onloadend = function () {
                    picurl = reader.result;  // Base64 图片
                    console.log(i);
                    html += '<li><a href="javascript:;" itemprop="url" class="img_click js-data-collect"><img src="' + picurl + '" data-original="' + picurl.replace('small_', '') + '" alt="' + mockData.ImageInfos[i].EntityId + '" /></a></li>';
                    $('.img-container').html(html)
                  };
                  reader.readAsDataURL(blob);
                })
            }
        }
    }
   
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
        url: '/Ajax/stTools.aspx',
        type: 'POST',
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.state == 200) {
                window.location.href = "/soutu.aspx?imgurl=" + response.msgbox;
            }
            else {
                $('.upload-error').show();
            }
        },
        complete: function () {
            setTimeout(function () {
                $('.upload-loading').hide()
                $('.search-content').show()
            }, 1000)
        }
    })
  }

  // 关闭上传弹框
  $('.Submission').click(function() {
    $('.search-upload-error').hide()
  })

})

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