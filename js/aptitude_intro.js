!function () {
    var Indexinit = 0,
        mySwiper = null;
    var aptitudeIntro = window.WEBBASE.extend({
        init: function () {//初始化
            this.swiperInit();
        },
        events: {
            ".J_intro-cont-item click": "introContItemClick",//资质图片点击
            "#J_close click": "closeClick",//关闭弹框轮播
        },
        /**
         * 资质图片点击
         */
        introContItemClick: function (e) {
            var selfIndex = $(e.currentTarget).index();
            $('#J_aptitude-img-slider').fadeIn();
            setTimeout(function () {
                mySwiper.slideTo(selfIndex+1, 500, false);
            }, 1000)

            // mySwiper.slideTo(selfIndex+1, 500, false);

        },
        /**
         * 关闭弹框轮播
         */
        closeClick: function () {
            $('#J_aptitude-img-slider').hide();
        },
        /**
         *  swiper初始化
         */
        swiperInit: function () {
            setTimeout(function () {
                mySwiper = new Swiper('.swiper-container', {
                    loop: true,//环路
                    initialSlide: Indexinit,//初始化索引
                    // slidesPerView:2,
                    zoom : true,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                })
            }, 1000)


        }
    });

    aptitudeIntro.init();
}();