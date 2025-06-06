//====================初始化验证表单====================
$(function () {
    //提交表单
    $("#btnSubmit").bind("click", function () {
        if ($("#txtUserName").val() == "" || $("#txtPassword").val() == "") {
            $("#msgtips").show();
            $("#msgtips").text("请填写用户名和登录密码！");
            return false;
        }
        console.log(DOMPurify.sanitize($("#txtUserName").val()))
        $.ajax({
            type: "POST",
            url: $("#loginform").attr("url"),
            dataType: "json",
            data: {
                "txtUserName": DOMPurify.sanitize($("#txtUserName").val()),
                "txtPassword": DOMPurify.sanitize($("#txtPassword").val()),
                "chkRemember": $("#chkRemember").prop("checked")
            },
            timeout: 20000,
            beforeSend: function (XMLHttpRequest) {
                $("#btnSubmit").attr("disabled", true);
                $("#msgtips").show();
                $("#msgtips").text("正在登录，请稍候...");
            },
            success: function (data, textStatus) {
                if (data.status == 1) {
                    if (typeof (data.url) == "undefined") {
                        if (typeof ($("#turl").val()) == "undefined") {
                            location.href = DOMPurify.sanitize($("#user_role1_turl").val());
                        }
                        else {
                            location.href = DOMPurify.sanitize($("#turl").val());
                        }
                    } else {
                        location.href = data.url;
                    }
                } else {
                    $("#btnSubmit").attr("disabled", false);
                    $("#msgtips").text(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#msgtips").text("状态：" + textStatus + "；出错提示：" + errorThrown);
                $("#btnSubmit").attr("disabled", false);
            }
        });
        return false;
    });
});