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
                mySwiper.slideTo(selfIndex + 1, 500, false);
            }, 500)
        },
        /**
         * 关闭弹框轮播
         */
        closeClick: function () {
            $('#J_aptitude-img-slider').fadeOut();
        },
        /**
         *  swiper初始化
         */
        swiperInit: function () {
            mySwiper = new Swiper('.swiper-container', {
                loop: true,//环路
                initialSlide: Indexinit,//初始化索引
                // slidesPerView:2,
                // zoom: true,
                // zoomToggle: false,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
            })

        },
        touchInit: function () {
            var oldX, oldY, startX, startY, startWidth, startHeight,
                moveD,
                isMove = false,
                isZoom = false,
                lastClickTime = 0,
                $body = $('body');
            var $opImg = $body.find('.swiper-slide').find('img');
            var imgMousedown = function (e) {
                if (e.target.className != 'img-touch') return;

                if (e.touches.length == 1) {
                    var nowTime = Math.round(new Date().getTime() / 1000),
                        x = $opImg.position().left,
                        y = $opImg.position().top;
                    lastClickTime = nowTime;
                }
                else if (e.touches.length >= 2) {
                    isMove = false;
                    isZoom = true;
                    var x1 = e.touches[0].pageX,
                        y1 = e.touches[0].pageY,
                        x2 = e.touches[1].pageX,
                        y2 = e.touches[1].pageY;

                    startX = $opImg.position().left;
                    startY = $opImg.position().top;
                    startWidth = $opImg.width();
                    startHeight = $opImg.height();

                    moveD = getDistance(x1, y1, x2, y2);

                    return;
                }

                isMove = true;
                oldX = e.touches[0].pageX;
                oldY = e.touches[0].pageY;
                startX = $opImg.position().left;
                startY = $opImg.position().top;
                e.preventDefault();
                e.stopPropagation();
                return false;
            };

            var getDistance = function (x1, y1, x2, y2) {
                return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 2);
            };

            var img_mouseup = function (e) {
                if (e.target.className != 'img-touch') return;

                isZoom = false;
                isMove = false;
            };

            var imgMousemove = function (e) {
                if (isZoom) {
                    if (e.touches.length >= 2) {
                        var x1, y1, x2, y2, d1;
                        x1 = e.touches[0].pageX;
                        y1 = e.touches[0].pageY;
                        x2 = e.touches[1].pageX;
                        y2 = e.touches[1].pageY;
                        d1 = getDistance(x1, y1, x2, y2);
                        var rate = d1 / moveD;
                        var w = startWidth * rate;
                        var h = startHeight * rate;

                        $opImg.width(w);
                        $opImg.height(h);
                        $opImg.css('left', (startWidth - w) / 2 + startX + 'px');
                        $opImg.css('top', (startHeight - h) / 2 + startY + 'px');
                    }

                    return;
                }

                if (!isMove) return;
                x = e.changedTouches[0].pageX - oldX;
                y = e.changedTouches[0].pageY - oldY;

                $opImg.css('top', y + startY + 'px');
                $opImg.css('left', x + startX + 'px');
            };
            document.addEventListener('touchstart', imgMousedown, false);
            document.addEventListener('touchend', img_mouseup, false);
            document.addEventListener('touchmove', imgMousemove, false);
        }
    });

    aptitudeIntro.init();
}();