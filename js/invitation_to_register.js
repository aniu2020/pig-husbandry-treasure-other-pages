!function () {
    var lastData = {};
    var tel = window.WEBBASE.extend({
        init: function () {//初始化
            //百分比圆圈初始化
            this.circleInit();
        },
        events: {
            "#J_user-get-btn click": "sureRegister",//确定注册
            "#J_get-tel-code click": "getCode",//获取注册验证码
        },
        /**
         * 百分比圆圈初始化
         */
        circleInit: function () {
            $('.circle').each(function (index, el) {
                var num = $(this).find('span').text() * 3.6;
                if (num <= 180) {
                    $(this).find('.right').css('transform', "rotate(" + num + "deg)");
                } else {
                    $(this).find('.right').css('transform', "rotate(180deg)");
                    $(this).find('.left').css('transform', "rotate(" + (num - 180) + "deg)");
                }
            });
        },
        /**
         * 电话验证
         * @returns {boolean}
         */
        telVerify: function () {
            //电话
            var $userTelVal = $('#J_user-tel').val();
            if (!$userTelVal) {
                Tools.msg('请输入电话号码！');
                return false;
            }
            var reTel = /^(86)?1[3,4,5,7,8]\d{9}$/;
            if (!reTel.test($userTelVal)) {
                Tools.msg('请输入正确的电话号码！');
                return false;
            }
            return true;
        },
        /**
         * 注册验证
         * @returns {boolean}
         */
        registerVerify: function () {

            //验证码
            var $telCodeVal = $('#J_tel-code').val();
            if (!$telCodeVal) {
                Tools.msg('请输入验证码！');
                return false;
            }

            lastData = {
                phone: $('#J_user-tel').val(), //注册人手机号
                captcha: $telCodeVal, //验证码
                invitePhone: Tools.getQueryString('invitePhone') || Tools.getQueryString('invitephone') || ''//邀请人手机号
            };

            return true;
        },
        /**
         * 获取注册验证码
         */
        getCode: function (e) {
            var self =$(e.currentTarget);
            if (!this.telVerify()) {
                return;
            }

            /**
             * 设置发送短信倒计时
             * @param _$getCode
             */
            var countDown = function (_$getCode) {
                var countDownNum = 60,
                    timer = null;
                timer = setInterval(function () {
                    if (countDownNum == 0) {
                        clearInterval(timer);
                        _$getCode
                            .removeClass('get-tel-code-disable')
                            .prop('disabled', false)
                            .val('获取验证码');
                        return;
                    }
                    countDownNum--;
                    _$getCode
                        .addClass('get-tel-code-disable')
                        .prop('disabled', true)
                        .val(countDownNum + 's后可重发');
                }, 1000);
            };

            $.ajax({
                url: 'http://119.23.206.84:8080/mzb-api-app/captcha/h5/sms',
                data: {
                    phone: $('#J_user-tel').val()
                },
                dataType: 'JSON',
                type: 'POST',
                // async: false,
                // dataType: 'JSONP',
                // type: 'GET',
                success: function (res) {

                    if (res.status == 1) {//成功 "status":1  失败："status":0,
                        countDown(self)
                    }else{
                        Tools.msg(res.msg);
                    }
                },
                error: function (res) {
                    console.log(res)
                    Tools.msg(res.msg || '网络错误，请稍后再试。');
                }
            })
        },
        /**
         * 确定注册
         */
        sureRegister: function () {
            if (!this.telVerify() && !this.registerVerify()) {
                return;
            }
            $.ajax({
                url: 'http://119.23.206.84:8080/mzb-api-app/user/h5/invite/register',
                data: lastData,
                dataType: 'JSON',
                type: 'POST',
                success: function (res) {
                    if (res.status == 1) {//成功 "status":1  失败："status":0,
                        Tools.msg('恭喜您，注册成功！');
                        // location.href="";//注册成功跳转

                    } else {
                        Tools.msg(res.msg);
                    }
                },
                error: function (res) {
                    console.log(res)
                    Tools.msg(res.msg || '网络错误，请稍后再试。');
                }
            })
        },


    });

    tel.init();
}();