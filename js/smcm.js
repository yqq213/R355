function gotoPage() {
    var fitle = /^\d+$/;
    var gotopage = $("#gotopagepager").val();
    var formatString = $("#formatString").val();
    if (!fitle.test(gotopage)) { alert('请输入正确的页码!'); return; }
    document.location = formatString + gotopage + ".html";
}

function NoViewMsg() {
    if (confirm("您没有权限查看图片，请注册或与客服联系0595-83026355 \n\n 点击确定进入注册页面")) {
        location.href = "/member/reg.aspx";
        return;
    }
}
function nodownload() {
    if (confirm("您没有权限查看及下载矢量图，请注册或与客服联系0595-83026355 \n\n 点击确定进入注册页面")) {
        location.href = "/member/reg.aspx";
        return;
    }
}
/*表单AJAX提交封装(包含验证)
------------------------------------------------*/
function AjaxInitForm(formObj, btnObj, isDialog, urlObj, callback) {
    var argNum = arguments.length; //参数个数
    $(formObj).Validform({
        tiptype: 3,
        callback: function (form) {
            //AJAX提交表单
            $(form).ajaxSubmit({
                beforeSubmit: formRequest,
                success: formResponse,
                error: formError,
                url: $(formObj).attr("url"),
                type: "post",
                dataType: "json",
                timeout: 50000
            });
            return false;
        }
    });

    //表单提交前
    function formRequest(formData, jqForm, options) {
        $(btnObj).prop("disabled", true);
        $(btnObj).val("提交中...");
    }

    //表单提交后
    function formResponse(data, textStatus) {
        if (data.status == 1) {
            $(btnObj).val("提交成功,正在返回...");
            //是否提示，默认不提示
            if (isDialog == 1) {
                var d = dialog({ content: data.msg }).show();
                setTimeout(function () {
                    d.close().remove();
                    if (argNum == 5) {
                        callback();
                    } else if (data.url) {
                        location.href = data.url;
                    } else if ($(urlObj).length > 0 && $(urlObj).val() != "") {
                        location.href = $(urlObj).val();
                    } else {
                        location.reload();
                    }
                }, 2000);
            } else {
                if (argNum == 5) {
                    callback();
                } else if (data.url) {
                    location.href = data.url;
                } else if ($(urlObj)) {
                    location.href = $(urlObj).val();
                } else {
                    location.reload();
                }
            }
        } else {
            dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
            $(btnObj).prop("disabled", false);
            $(btnObj).val("再次提交");
        }
    }
    //表单提交出错
    function formError(XMLHttpRequest, textStatus, errorThrown) {
        dialog({ title: '提示', content: '状态：' + textStatus + '；出错提示：' + errorThrown, okValue: '确定', ok: function () { } }).showModal();
        $(btnObj).prop("disabled", false);
        $(btnObj).val("再次提交");
    }
}