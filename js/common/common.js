!function () {
    var com = window.WEBBASE.extend({
            init: function () {//初始化

            },
            events: {
                "#J_go-back click": "goBack",//返回
            },
            /**
             * 返回
             */
            goBack: function () {
                history.go(-1);
            }
        }
    );
    com.init();
}();