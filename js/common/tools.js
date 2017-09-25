window.Tools = {};
/**
 * 消息提醒
 * @param msg
 */
Tools.msg = function (msg) {
    layer.open({
        content: msg
        , skin: 'msg'
        , time: 2 //2秒后自动关闭
    });
};
/**
 * 获取浏览器参数
 * @param name 参数名
 */
Tools.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};