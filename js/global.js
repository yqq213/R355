var WEB = 'http://www.R355.com/';

try {
    document.domain = "R355.com"
} catch(e) {}
jQuery.extend({
    evalJSON: function(strJson) {
        return eval("(" + strJson + ")")
    }
});
jQuery.extend({
    toJSON: function(A) {
        var D = typeof A;
        if ("object" == D) {
            if (Array == A.constructor) {
                D = "array"
            } else {
                if (RegExp == A.constructor) {
                    D = "regexp"
                } else {
                    D = "object"
                }
            }
        }
        switch (D) {
        case "undefined":
        case "unknown":
            return;
            break;
        case "function":
        case "boolean":
        case "regexp":
            return A.toString();
            break;
        case "number":
            return isFinite(A) ? A.toString() : "null";
            break;
        case "string":
            return '"' + A.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g,
            function() {
                var G = arguments[0];
                return (G == "\n") ? "\\n": (G == "\r") ? "\\r": (G == "\t") ? "\\t": ""
            }) + '"';
            break;
        case "object":
            if (A === null) {
                return "null"
            }
            var C = [];
            for (var F in A) {
                var E = jQuery.toJSON(A[F]);
                if (E !== undefined) {
                    C.push(jQuery.toJSON(F) + ":" + E)
                }
            }
            return "{" + C.join(",") + "}";
            break;
        case "array":
            var C = [];
            for (var B = 0; B < A.length; B++) {
                var E = jQuery.toJSON(A[B]);
                if (E !== undefined) {
                    C.push(E)
                }
            }
            return "[" + C.join(",") + "]";
            break
        }
    }
});
var Browser = new Object();
Browser.isMozilla = (typeof document.implementation != "undefined") && (typeof document.implementation.createDocument != "undefined") && (typeof HTMLDocument != "undefined");
Browser.isIE = window.ActiveXObject ? true: false;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") != -1);
Browser.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != -1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
var Tools = new Object();
Tools.htmlEncode = function(A) {
    return A.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
};
Tools.trim = function(A) {
    if (typeof(A) == "string") {
        return A.replace(/^\s*|\s*$/g, "")
    } else {
        return A
    }
};
Tools.isEmpty = function(A) {
    switch (typeof(A)) {
    case "string":
        return Tools.trim(A).length == 0 ? true: false;
        break;
    case "number":
        return A == 0;
        break;
    case "object":
        return A == null;
        break;
    case "array":
        return A.length == 0;
        break;
    default:
        return true
    }
};
Tools.isNumber = function(B) {
    var A = /^[\d|\.|,]+$/;
    return A.test(B)
};
Tools.isInt = function(B) {
    if (B == "") {
        return false
    }
    var A = /\D+/;
    return ! A.test(B)
};
Tools.isEmail = function(A) {
    var B = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
    return B.test(A)
};
Tools.isTel = function(A) {
    var B = /^[\d|\-|\s|\_]+$/;
    return B.test(A)
};
Tools.fixEvent = function(B) {
    var A = (typeof B == "undefined") ? window.event: B;
    return A
};
Tools.srcElement = function(A) {
    if (typeof A == "undefined") {
        A = window.event
    }
    var B = document.all ? A.srcElement: A.target;
    return B
};
Tools.isTime = function(B) {
    var A = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;
    return A.test(B)
};
Tools.stringLength = function(A) {
    return A.replace(/[^\x00-\xff]/gi, "xx").length
};
function rowindex(A) {
    if (Browser.isIE) {
        return A.rowIndex
    } else {
        table = A.parentNode.parentNode;
        for (i = 0; i < table.rows.length; i++) {
            if (table.rows[i] == A) {
                return i
            }
        }
    }
}
function getPosition(C) {
    var B = C.offsetTop;
    var A = C.offsetLeft;
    while (C = C.offsetParent) {
        B += C.offsetTop;
        A += C.offsetLeft
    }
    var D = {
        top: B,
        left: A
    };
    return D
}
function cleanWhitespace(B) {
    var B = B;
    for (var A = 0; A < B.childNodes.length; A++) {
        var C = B.childNodes[A];
        if (C.nodeType == 3 && !/\S/.test(C.nodeValue)) {
            B.removeChild(C)
        }
    }
}
function isEmail(B) {
    res = /^[0-9a-zA-Z_\-\.]+@[0-9a-zA-Z_\-]+(\.[0-9a-zA-Z_\-]+)*$/;
    var A = new RegExp(res);
    return ! (B.match(A) == null)
}
function $int(A, B) {
    A = isNaN(parseInt(A)) ? 1 : parseInt(A);
    A = A <= 0 ? 1 : A;
    if (B) {
        A = A > B.length ? 0 : A - 1
    }
    return A
}

/* 控制#textarea字符长度 */
//A 类型
//B 字符长度
//C 控制元素的id
function lentxt(A,B,C)
{
  var s_content = $(C)[0].value;

  if(A == 1 && (s_content == '评论不能超过'+B+'个字' || s_content == '字数上限'+B)){
    $(C)[0].value = '';
    return  false;
  }

  var s_num = s_content.replace(/[\r\n]/g, '').length;

  if(s_num > B)
  {
    $(C)[0].value = s_content.substring(0,B);
    return  false;
  }
  else
  {
    return  true;
  }
}
