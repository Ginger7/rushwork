
/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 *
 * from https://gist.github.com/gre/1650294
 */
EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
};

/* Функция анимации через rAF */
/* options:
		- duration
		- timing - timing function
		- draw - function that changes css properties
*/
function animateRAF(options) {
  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction от 0 до 1
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    // текущее состояние анимации
    var progress = EasingFunctions[options.timing](timeFraction)

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};


/* Операции с сервером через fetch */
let fetchHelpers = {
	checkStatus: function (response) {	// ошибку нужно выбрасывать вручную
		if (response.status >= 200 && response.status < 300) {
			return response
		} else {
			var error = new Error(response.statusText)
			error.response = response
			throw error
		}
	},
	parseJSON: function (response) {
		return response.json()
	}
};

/* Настройки плагина уведомлений */
let snotify_defaults = {	// setDefaults не работает
	timeout: 2500,
	showProgressBar: false,
};

$(function (){
    $("textarea").on('change keyup paste', function() {
        if ($(this).val().length > 0){
            $(this).parents('.form-group-text').addClass('hideLabel')
        } else{
            $(this).parents('.form-group-text').removeClass('hideLabel')
        }
    })
})

$(function () {
    var blogSwipper = $('.blog-slider');
    blogSwipper.each(function (index, el) {
        var blogSlider = new Swiper(this, {
            observer: true,
            loop: true,
            spaceBetween: 8,
            lazyLoading: true,
            preloadImages: false,
            lazy: true,
            slidesPerView: "auto",
            observeParents: true,
            autoHeight: true, calculateHeight: true,
            navigation: {
                nextEl: $(this).parent().find('.blog-slider-next')[0],
                prevEl: $(this).parent().find('.blog-slider-prev')[0]
            },
            breakpoints: {
                625: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                },
            },
        });

    });
})



$(function () {
    $(".brands-item").each(function (index) {
        if (window.innerWidth > 992) {
            if (index < 3) {
                if ($(this).find('li').length > 3) {
                    $(this).addClass('hidden');
                    let count = $(this).find('li').length - 3;
                    $(this).find('.brands-item__btn span').html(count)
                }
            } else {
                if ($(this).find('li').length > 5) {
                    $(this).addClass('hidden');
                    let count = $(this).find('li').length - 5;
                    $(this).find('.brands-item__btn span').html(count)
                }
            }
        } else {
            if ($(this).find('li').length > 5) {
                $(this).addClass('hidden');
                let count = $(this).find('li').length - 5;
                $(this).find('.brands-item__btn span').html(count)
            }
        }

    });
    $('.brands-item__btn').click(function () {
        $(this).parents('.brands-item').toggleClass('show')
        let count = $(this).parents('.brands-item').find('li').length - 3;
        $(this).toggleClass('show');
        $(this).hasClass('show') ? $(this).html('Скрыть') : $(this).html('Еще (<span>' + count + '</span>)')
    })
})
$(function () {
    var certificateSwipper = $('.certificate-slider .swiper-container');
    certificateSwipper.each(function (index, el) {
        var certificateSlider = new Swiper(this, {
            loop: true,
            slidesPerView: 1,
            slidesPerGroup: 1,
            lazyLoading: true,
            preloadImages: false,
            lazy: true,
            navigation: {
                nextEl: $(this).parents('.certificate-slider').find('.certificate-slider-next')[0],
                prevEl: $(this).parents('.certificate-slider').find('.certificate-slider-prev')[0]
            },
            pagination: {
                el: $(this).parents('.certificate-slider').find('.swiper-pagination')[0],
                clickable: true,
            },
            breakpoints: {
                425: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                },
                625: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                },
                992: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
            },
        });
    });
})


$('.cat-item-tabs a[href^="#"]').click(function () {
    let _href = $(this).attr("href");
    let pos = $(_href).offset().top - $('#header').outerHeight() * 2
    let collapse = $(_href).find('.collapse');
    collapse.collapse('show')
    $("html, body").animate({scrollTop: pos + "px"});
    return false;
});
$('.cat-item-collapse [data-toggle="collapse"]').click(function (e) {
    if ($(window).width() > 992) {
        e.preventDefault();
        return false;
    }
});


$(function () {
    if ($('#cat-item-table').length > 0) {

        let width = 300;
        $('#cat-item-table').find('.cat-table__header div').each(function () {
            width += $(this).width()
        })
        if ($('#cat-item-table').width() <= width) {
            let speed = 1;

            let scroll = document.querySelector('#cat-item-table');

            let left = 0;
            let drag = false;
            let coorX = 0;

            scroll.addEventListener('mousedown', function (e) {
                drag = true;
                coorX = e.pageX + this.offsetLeft;
            });
            document.addEventListener('mouseup', function () {
                drag = false;
                left = scroll.scrollLeft;
            });
            const circle = document.getElementById('circle');
            const circleStyle = circle.style;

            $("#cat-item-table")
                .mouseover(function (e) {
                    $('#circle').css({
                        display: 'block'
                    })
                })
                .mouseout(function (e) {
                    $('#circle').css({
                        display: 'none'
                    })
                });

            scroll.addEventListener('mousemove', function (e) {
                var div = $(".cat-table__last");
                var link = $(".cat-table__title");
                if (!div.is(e.target) && div.has(e.target).length === 0 && !link.is(e.target) && link.has(e.target).length === 0) {
                    window.requestAnimationFrame(() => {
                        circleStyle.top = `${e.clientY - circle.offsetHeight / 2}px`;
                        circleStyle.left = `${e.clientX - circle.offsetWidth / 2}px`;
                    });
                    if (drag) {
                        let pos = left - (e.pageX - this.offsetLeft - coorX) * speed;
                        $(".cat-table").scrollLeft(pos);
                    }

                    $('#cat-item-table').css('cursor', 'none')
                } else {
                    $('#circle').css('display', 'none')
                    $('#cat-item-table').css('cursor', 'auto')
                }
            });
        } else {
            let scroll = document.querySelector('#cat-item-table');
            $('#circle').css('display', 'none');
            $("#cat-item-table").mouseover(function (e) {
                $('#circle').css('display', 'none')
            })
            $('#cat-item-table').css('cursor', 'auto')
            scroll.addEventListener('mousemove', function (e) {
                $('#cat-item-table').css('cursor', 'auto')
            });

        }
    }
});


$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover click'
    });
})


$(function () {
    var swiperSlider = $('.cat-slider');
    swiperSlider.each(function (index, el) {
        let slides = $(this).find('.swiper-slide').length
        var catSlider = new Swiper(this, {
            spaceBetween: 0,
            slidesPerView: "auto",
            preloadImages: false,
            lazy: true,
            loop: $(this).find('.swiper-slide').length > 2 ? true : false,
            navigation: {
                nextEl: $(this).parent().find('.cat-slider-next')[0],
                prevEl: $(this).parent().find('.cat-slider-prev')[0]
            },
            breakpoints: {
                992: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    loop: $(this).find('.swiper-slide').length > 4 ? true : false,
                },
                1200: {
                    slidesPerView: 6,
                    slidesPerGroup: 1,
                    loop: $(this).find('.swiper-slide').length > 6 ? true : false,
                },
            },
        });

    });
    let swiperSliderSmall = $('.cat-slider-small');
    swiperSliderSmall.each(function (index, el) {
        let slidesSmall = $(this).find('.swiper-slide').length
        var catSliderSmall = new Swiper(this, {
            spaceBetween: 0,
            slidesPerView: "auto",
            preloadImages: false,
            lazy: true,
            loop: $(this).find('.swiper-slide').length > 2 ? true : false,
            navigation: {
                nextEl: $(this).parent().find('.cat-slider-next')[0],
                prevEl: $(this).parent().find('.cat-slider-prev')[0]
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    loop: $(this).find('.swiper-slide').length > 4 ? true : false,
                },
                1200: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    loop: $(this).find('.swiper-slide').length > 6 ? true : false,
                },
            },
        });

    });
})

$(function () {
    var catSwipper = $('.cat-sub .swiper-container');
    catSwipper.each(function (index, el) {
        var catSlider = new Swiper(this, {
            observer: true,
            loop: false,
            lazyLoading: true,
            preloadImages: false,
            lazy: true,
            spaceBetween: 20,
            slidesPerGroupAuto: "auto",
            slidesPerView: "auto",
            observeParents: true,
            init: false,
            autoHeight: true,
            navigation: {
                nextEl: $(this).parent().find('.cat-slider-next')[0],
                prevEl: $(this).parent().find('.cat-slider-prev')[0]
            },
            breakpoints: {
                1240: {
                },
            },

        });
        if ($(window).width() < 992) {
            catSlider.init()
        }
        $(window).on('resize', function () {
            if ($(window).width() > 992) {
                if ($(this).hasClass('.swiper-container-initialized')) {
                    catSlider.destroy()
                }
            } else {

                if (!$(this).hasClass('.swiper-container-initialized')) {
                    catSlider.init()
                }
            }
        })
    });
})


$(function () {
    $(".cat-item").each(function (index) {
        if ($(this).hasClass('cat-item_service')) {
            if ($(this).find('li').length > 3) {
                $(this).addClass('hidden');
                let count = $(this).find('li').length - 3;
                $(this).find('.cat-item-btn span').html(count)
            }
        } else {
            if ($(this).find('li').length > 4) {
                $(this).addClass('hidden');
                let count = $(this).find('li').length - 4;
                $(this).find('.cat-item-btn span').html(count)
            }
        }

    });
    $('.cat-item-btn').click(function () {
        $(this).parents('.cat-item').toggleClass('show')
        let count = $(this).parents('.cat-item').find('li').length - 3;
        $(this).toggleClass('show');
        $(this).hasClass('show') ? $(this).html('Скрыть') : $(this).html('Еще (<span>' + count + '</span>)')
    })
    $('.categories__btn').click(function () {
        $(this).parents('.categories').toggleClass('show')
        //$(this).parents('.categories').find('.categories__item:nth-of-type(n + 7)').toggle('')
        $(this).toggleClass('show');
        $(this).hasClass('show') ? $(this).find('span').html('Скрыть') : $(this).find('span').html('Все категории')
    })
    $('.cat-item').click(function () {
        if (window.innerWidth < 625) {
            window.location.href = $(this).attr('data-link')
        }
    })
})



$(function () {

    var compareSliders = $('.compare-slider');
    compareSliders.each(function (index, el) {
        let param = this;
        var compareSlider = new Swiper(this, {
            spaceBetween: 8,
            slidesPerView: "auto",
            navigation: {
                nextEl: $(this).parent().find('.swiper-button-next')[0],
                prevEl: $(this).parent().find('.swiper-button-prev')[0]
            },

            breakpoints: {
                625: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                },
                1300: {
                    slidesPerView: 5,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                }
            },
            on: {
                init: function () {
                    $.fn.setMaxHeights = function () {
                        var maxHeight = this.map(function (i, e) {
                            return $(e).innerHeight();
                        }).get();
                        return this.innerHeight(Math.max.apply(this, maxHeight));
                    };
                    let params = $(param).parents('.compare-block').find('.compare-params__item')
                    $(params).filter(':nth-child(1)').setMaxHeights();
                    $(params).filter(':nth-child(2)').setMaxHeights();
                    $(params).filter(':nth-child(3)').setMaxHeights();
                    $(params).filter(':nth-child(4)').setMaxHeights();
                    $(params).filter(':nth-child(5)').setMaxHeights();
                    $(params).filter(':nth-child(6)').setMaxHeights();
                    $(params).filter(':nth-child(7)').setMaxHeights();
                }
            }
        });
    });
})

$(function() {
    $('.btn-up').click(function() {
        $("html, body").animate({
            scrollTop:0
        },1000);
    })
})

$(window).scroll(function() {
    if ($(this).scrollTop() > ($(window).height() / 2)) {
        $('.btn-up').fadeIn();
    }
    else {
        $('.btn-up').fadeOut();
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
        $('#header').addClass('fixed');
    } else  {
        $('#header').removeClass('fixed');
    }
});


$('.btn-close-dropdown').click(function (e) {
    e.preventDefault();
    let parent = $(this).parents('.dropdown-menu')
    $(parent).dropdown('hide')
})


$(function () {
    let caption = $('.cat-item-gallery').attr('data-title')
    $('[data-fancybox="cat-item-gallery"]').fancybox({
        baseClass: 'gallery-fancybox',
        buttons: [
            "close"
        ],
        thumbs: {
            autoStart: true,
            axis: 'x'
        },
        btnTpl: {
            close:
                '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
                '<svg class="svg-icon" width="21" height="21">' +
                '    <use xlink:href="/static/img/svg-sprite/svg-symbols.svg#close"></use>' +
                '</svg>' +
                "</button>",

        },
        beforeLoad: function () {
            this.title = $(this.element).attr('data-title');
        },
        caption: function (instance, item) {
            return $(this).attr('data-title');
        },
        baseTpl:
            '<div class="fancybox-container header-cat header-form " role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="header-cat__header d-none d-lg-block">' +
            '        <div class="container-fluid">' +
            '            <div class="row flex-nowrap align-items-center">' +
            '                <div class="col">' +
            '                    Добро пожаловать в торговый дом «RUSHWORK». Если Вам понадобится наша помощь, позвоните нам по' +
            '                    телефону 8 (495) 292-87-93' +
            '                </div>' +
            '                <div class="col-auto">' +
            '                    <a href="#" class="btn btn-dark">Заказать обратный звонок</a>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '<div class="header-cat__search">' +
            '        <div class="container-fluid">' +
            '            <div class="row flex-nowrap align-items-center justify-content-between">' +
            '                <div class="col">' +
            '                    <h3>' + caption + '</h3>' +
            '                </div>' +
            '                <div class="col-auto">' +
            '                    {{buttons}}' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '<div class="header-cat__body"><div class="fancybox-stage"></div></div>' +
            '</div>',
    });
});
$(function () {
    var swiperCatThumbs = new Swiper(".cat-item-thumbs", {
        loop: $('.cat-item-thumbs').find('.swiper-slide').length > 4 ? true : false,
        spaceBetween: 10,
        slidesPerView: 4,
        preloadImages: false,
        lazy: true,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    var swiperCatGallery = new Swiper(".cat-item-gallery", {

        preloadImages: false,
        lazy: true,
        pagination: {
            clickable: true,
            el: ".swiper-pagination",
        },
        thumbs: {
            swiper: swiperCatThumbs,
        },
    });
});




$(function () {
    $('.show-modal').click(function (e) {
        e.preventDefault();
        let id = $(this).attr('href');
        $(id).addClass('open');
        $('header').addClass('blur');
        $('body').addClass('fixed');
    })
    $('.hide-modal').click(function (e) {
        e.preventDefault();
        let id = $(this).attr('href');
        $('header').removeClass('blur');
        $(id).removeClass('open');
        $('body').removeClass('fixed');
    })

    document.addEventListener('keydown', function (e) {
        let keyCode = e.keyCode;
        if (keyCode === 27) {
            $('.header-cat').removeClass('open');
            $('header').removeClass('blur');
            $('body').removeClass('fixed');
        }
    });

    $('.mcats_tabs a:not(.mcats__item_mobile)').on('click', function (event) {
        event.preventDefault();
        if ($(this).attr('data-link') != '' && $(this).attr('data-link')){
            location.href = $(this).attr('data-link')
        }
    })
    $('.mcats_tabs a:not(.mcats__item_mobile)').on('mouseenter', function (event) {
        event.preventDefault();
        $('.mcats_tabs a').removeClass('active').attr('aria-selected', false)
        $('#headerTabs').find('.tab-pane').removeClass('show').removeClass('active')
        let id = $(this).attr('href')
        $(id).tab('show');
        $(this).addClass('active');
    })
    $('.mcats_tabs .mcats__item_mobile').click(function (event) {
        event.preventDefault();
        $('.mcats_tabs a').removeClass('active').attr('aria-selected', false)
        $('#headerTabs').find('.tab-pane').removeClass('show').removeClass('active')
        let id = $(this).attr('href')
        $(id).tab('show');
        $('#header-cat_container').addClass('open');
    })


    $('.hide-modal-cat').click(function (event) {
        event.preventDefault();
        $('#header-cat_container').removeClass('open');
        let id = $(this).attr('href');
        $(id).removeClass('open');
        $('body').removeClass('fixed');
    })

    $('.hide-modal-cat').click(function (event) {
        event.preventDefault();
        $('#header-cat_container').removeClass('open');
        let id = $(this).attr('href');
        $(id).removeClass('open');
        $('body').removeClass('fixed');
    })

    $('.hide-modal-back').click(function (event) {
        event.preventDefault();
        $('#header-cat_container').removeClass('open');
    })
    $('.header-cat__search-form input').focus(function(){
       $(this).parents('.header-cat__search-form').addClass('focus')
    });
    $('.header-cat__search-form input').focusout(function(){
       $(this).parents('.header-cat__search-form').removeClass('focus')
    });
})

$(function () {
    $('.form-tabs-title a').on('click', function (event) {
        event.preventDefault();
        $('.form-tabs-title a').removeClass('active').attr('aria-selected', false)
        $('#formTabs .tab-pane').removeClass('show').removeClass('active')
        let id = $(this).attr('href')
        $(id).tab('show');
    })
    $('.btn-next').on('click', function (event) {
        event.preventDefault();
        $('.form-tabs-title a').removeClass('active').attr('aria-selected', false)
        let id = $(this).attr('href');
        const elem = Array.from(document.querySelectorAll('a')).find(
            el=>el.href.includes(id)
        );
        $(elem).addClass('active');
        $(id).tab('show');
    })
})

$(function () {

    var swiperCatThumbsModal = new Swiper(".modal-cat-item-thumbs", {
        loop: true,
        spaceBetween: 10,
        preloadImages: false,
        lazy: true,
        slidesPerView: 4,
    });

    var swiperCatGalleryModal = new Swiper(".modal-cat-item-gallery", {
        preloadImages: false,
        lazy: true,
        pagination: {
            clickable: true,
            el: ".swiper-pagination",
        },
        thumbs: {
            swiper: swiperCatThumbsModal,
        },
    });
    $('.show-modal-gallery').click(function (e) {
        e.preventDefault();
        let id = $(this).attr('href');
        $(id).addClass('open');
        $('header').addClass('blur');
        $('body').addClass('fixed');

        swiperCatThumbsModal.init();
        swiperCatGalleryModal.init();
    })
})


$(function () {
    let brandsSlider = new Swiper(".main-brands__swiper", {
        loop: true,
        slidesPerView: "auto",
        centeredSlides: false,
        preloadImages: false,
        lazy: true,
        spaceBetween: 8,
        navigation: {
            nextEl: "#main-brands-next",
            prevEl: "#main-brands-prev",
        },
        breakpoints: {
            768: {
                slidesPerView: 8,
                spaceBetween: 10,
                slidesPerGroup: 1,
            },
            992: {
                slidesPerView: 4,
                slidesPerGroup: 1,
            },
        },
    });
})

$(document).ready(function () {
    $("input[data-inputmask]").inputmask();
});

function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) {
        return text_forms[2];
    }
    if (n1 > 1 && n1 < 5) {
        return text_forms[1];
    }
    if (n1 == 1) {
        return text_forms[0];
    }
    return text_forms[2];
}

function handleFileSelect(evt) {
    var files = evt.target.files;
    console.log(files.length)
    if (files.length > 1) {
        $(evt.target).siblings('label').find('.form-file__names').html('Загружено ' + files.length + ' ' + declOfNum(files.length, ['файл', 'файла', 'файлов']));
    } else {
        $(evt.target).siblings('label').find('.form-file__names').html(files[0].name);
    }
}


var fileStore = [];
$(document).on('change', 'input[type=file]', function (e) {
    let maxSize = $(this).attr('data-size') * 1024 * 1024, thisSize = 0;

    $.each(this.files, function (index, value) {
        if (thisSize < value.size) {
            thisSize = value.size
        }
    })
    if (thisSize > maxSize) {
        $('#modal-error').find('h3').html('Размер выбранного файла превышает ' + $(this).attr('data-size') + 'Мб');
        $('#modal-error').modal('show');
        $(this).siblings('label').find('.form-file__title').html('Прикрепите файл');
    } else {
        fileStore.push.apply(fileStore, this.files);
        $(this).siblings('label').find('.form-file__title').html('Добавить файл');
        handleFileSelect(e)
    }
});

$(function () {
    let mainSlider = new Swiper(".main-slider", {
        loop: true,
        autoHeight:true,
        preloadImages: false,
        lazy: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 4000,
        },
        speed: 400,
        navigation: {
            nextEl: "#main-button-next",
            prevEl: "#main-button-prev",
        },
    });
})


$(function () {

	$('[data-toggle="tooltip"]').tooltip()

});
