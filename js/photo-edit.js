$(function() {
  // 点击切换操作按钮
  $('.content-right-top .control-btn-item').click(function() {
    $('.content-right-top .control-btn-item').removeClass('btn-selected')
    $(this).addClass('btn-selected')
  })

  // 点击切换操作类型
  $('.edit-nav-items .edit-item').click(function() {
    $('.edit-nav-items .edit-item').removeClass('active')
    $(this).addClass('active')
  })

  // 生成结果切换
  $('.right-result .result-item').click(function() {
    $('.right-result .result-item').removeClass('selected')
    $(this).addClass('selected')
  })

  // 生成结果收起
  $('.result-arrow-up').click(function() {
    $(this).hide()
    $('.result-arrow-down').show()
    $('.result-container').hide()
  })

  // 生成结果展开
  $('.result-arrow-down').click(function() {
    $(this).hide()
    $('.result-arrow-up').show()
    $('.result-container').show()
  })

  // 点击切换重绘内容操作按钮
  $('.right-params .control-btn-item').click(function() {
    $('.right-params .control-btn-item').removeClass('btn-selected')
    $(this).addClass('btn-selected')
  })

  // 笔刷进度条
  layui.use('slider', function(){
    var slider = layui.slider;
    //渲染
    slider.render({
      elem: '#slider',  //绑定元素
      min: 10, //最小值
      max: 100, //最大值
      value: 30, //初始值
      theme: '#657eb9', //主题色
    });
  });

  // 重绘区上传
  layui.use('upload', function(){
    var upload = layui.upload;
    //执行实例
    var uploadInst = upload.render({
      elem: '.params-shadow-btn', //绑定元素
      url: '/Ajax/stTools.aspx?action=hwtast', //上传接口
      done: function(res){
        //上传完毕回调
      },
      error: function(){
        //请求异常回调
      }
    });
  });

  layui.use(function() {
    // 从我的作品导入起止时间
    var laydate = layui.laydate;
    laydate.render({
      elem: '#importRange',
      range: ['#importStartRange', '#importEndRange ']
    });
  })

  // 从我的作品导入
  $('.importWorkBtn').click(function() {
    layer.open({
      type: 1, // page 层类型
      area: ['70%', '650px'],
      title: false,
      shade: 0.6, // 遮罩透明度
      shadeClose: false, // 点击遮罩区域，关闭弹层
      maxmin: false, // 允许全屏最小化
      anim: 0, // 0-6 的动画形式，-1 不开启
      content: $('#importWorkModal'),
    });
  })
})