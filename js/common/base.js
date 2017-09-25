window.WEBBASE={};
window.WEBBASE.extend = function (obj) {
    var data = {
        bindEvent: function () {
            var $body = $('body');
            $body.unbind();
            for (var key in this.events) {
                (function (keys, that) {
                    var selector = keys.split(' ')[0];
                    var eventName = keys.split(' ')[1];
                    var fnName = that.events[keys];
                    $body.off(eventName, selector);
                    $body.on(eventName, selector, function (e) {
                        that[fnName].apply(that, [e]);
                    });
                })(key, this);
            }
        }
    };
    $.extend(true, data, obj);
    data.bindEvent();
    return data;
};
