$(document).ready(function() {


    $("#modal-default").iziModal();

    headingHeight();
    SetUpGridCols($(".value-box .value-box-img"));
    fixedHeaderBar();
    counterDelay($(".ip-buttons .from-right"),0,0,0.1);
    swiper(".balenciaga-carousel");
    swiper(".sustainability-carousel");
    youtube();
    SetUpGridCols($(".balenciaga-carousel .swiper-slide"));
    SetUpGridCols($(".history .timeline-container .swiper-wrapper .swiper-slide .content"));
    SetUpGridCols($(".videos-carousel .swiper-container .swiper-slide .video-info"));
    timeline();
    customSelect();
    contactMap();
    videosCarousel();
    $(".departments .department-img").matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });
    nicescroll($("#worldwide-wrapper"),".ww-list");
    $(".general-section table").each(function() {
        $(this).wrap("<div class='table-responsive'></div>")
    });
 

    /*********************************************************
     *      MEGA MENU
     ********************************************************/


    (function() {

        var $megaMenu = $('#mega-menu');
        var $header = $('#header');
        var $triggerBtn = $('.triggerToggleMenu');

        $triggerBtn.on('click', function (ev) {

            ev.preventDefault();
            var isCollapsed = $megaMenu.hasClass('menu-open');

            if (isCollapsed) {

                $('body').css('overflow', 'auto')
                $megaMenu.removeClass('menu-open');
                $header.removeClass('menu-open');
                $megaMenu.find('.active').removeClass('active')

            } else {

                $('body').css('overflow', 'hidden')
                $megaMenu.addClass('menu-open');
                $header.addClass('menu-open');
                $megaMenu.find('.menu-side').css({'max-height': $megaMenu.height() + 'px'});

            }

        });

        $megaMenu.find('.link-list > li > a').on('click', function (ev) {
            var $this = $(this);
            var $sublist = $this.next('.sub-list');
            var hasSubList = $sublist.length;
            var isOpen = $this.hasClass('active');

            if (hasSubList) {
                ev.preventDefault();

                if (isOpen) {
                    $this.removeClass('active');
                    $sublist.slideUp(200);
                } else {
                    $this.addClass('active');
                    $sublist.slideDown(200);
                }

            }

        })

    }())


    //====  On Click Expand World Wide top wrapper =================//
    $('.triggerWorldwide').on('click', function () {

        var $this = $('.triggerWorldwide');
        var $wwWrapper = $('#worldwide-wrapper');
        var height = $wwWrapper.height() + 'px';
        var $canvas = $('.off-canvas-wrapper');
        var pxFromTop = $(document).scrollTop();


        // CLOSE Worldwide
        if ($wwWrapper.hasClass('open')) {

            $this.removeClass('is-active');
            $wwWrapper.removeClass('open');
            //$("body").removeClass("overflow-hidden");
            $("#header").removeClass("position-absolute");

            // CLOSE with None
            if ($wwWrapper.hasClass('fixed')) {
                $wwWrapper.removeClass('fixed');
            }
            // CLOSE with SlideUP
            else {
                addInlineTransform($canvas, null, 'none');
            }

        }
        // OPEN Worldwide
        else {

            $this.addClass('is-active');
            $wwWrapper.addClass('open');
            //$("body").addClass("overflow-hidden");
            $("#header").addClass("position-absolute");

            // OPEN with SlideDown
            if (pxFromTop < ($wwWrapper.height()/3)) {
                addInlineTransform($canvas, 'translateY', height);
            }
            // OPEN with Block
            else {
                $wwWrapper.addClass('fixed');
            }

        }


    });


    /*********************************************************
     *      SLIDER WITH PAGINATION
     ********************************************************/


    if ($('#mainSlider').length) {

        var $pagination = $('.slide-pagination');


        //====  Setup Slider Configs =================//
        var slider = new MasterSlider();

        slider.setup('mainSlider' , {
            width:1920,
            height: 894,
            layout: "fullwidth",
            view:"fade",
            grabCursor: false,
            instantStartLayers: true,
            autoplay: true,
            loop: true

        });


        //====  On Slide Change add the active class to pagination =================//
        slider.api.addEventListener(MSSliderEvent.CHANGE_START , function(){

            var selector = ".index-" + (slider.api.index() + 1);

            $pagination.find('.line').removeClass('active');
            $pagination.find(selector).addClass('active');

        });


        //====  On Click at pagination list go to the right slide =================//
        $pagination.find('.line').on('click', function () {

            var $this = $(this);
            var index = parseInt($this.data('index'));

            slider.api.gotoSlide(index - 1);

        });


    }

    $('.openModal').on('click', function (ev) {

        ev.preventDefault();

        var url = $(this).data('url');
        var title = $(this).data('title');

        $("#modal").iziModal({
            title: title,
            history: false,
            width: 854,
            iframeHeight: 480,
            iframe : true,
            fullscreen: true,
            iframeURL: url,
            headerColor: '#000000'
        }).iziModal('open');


    });


    $('.hamburger').on('click', function () {
        $(this).toggleClass('is-active');
    });

});

/***********************************
 DOCUMENT / WINDOW EVENTS
 ***********************************/

$(document).click(function( ev ) {



});


// $(window).on('resize', throttle(function (event) {

//     reCalculateWW();

// }, 50));


$(window).on('scroll', throttle(function (event) {

    fixedHeaderBar();

}, 50));

$(window).on("load", throttle(function (e) {

    $(".loader").fadeOut(600, function() {
        animations($(".from-top,.from-bottom,.from-left,.from-right"),"90%", "-10px");
        zoomIn();
        animations($(".bg-color"),"55%", "-10%");
        counter();
        zoomOut($(".hm-common"),".zoomOut");
    });

}, 50));

$(window).on('resizeend', throttle(function(e) {

  headingHeight();
  reCalculateWW();

}, 50));

/*********  Throttle Function  ***********/
function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}


/*********  Detect if Touch Screen Exist  ***********/
function is_touch_device() {
    return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));
}


function fixedHeaderBar() {

    var $worldwide = $('#worldwide-wrapper')
    var $header = $('#header');
    var pxFromTop = $(document).scrollTop()

    if (pxFromTop > 20) {

        $header.addClass('scrolled');
        $worldwide.addClass('scrolled');

    } else {

        $header.removeClass('scrolled');
        $worldwide.removeClass('scrolled');

    }

}

//====  On Click Expand World Wide top wrapper =================//
function reCalculateWW() {

    var $wwWrapper = $('#worldwide-wrapper');
    var height = $wwWrapper.height() + 'px';
    var $canvas = $('.off-canvas-wrapper');

    if ($('.triggerWorldwide').hasClass('is-active')) {
        addInlineTransform($canvas, 'translateY', height);
    }

}

//====  Adds Inline transform on element =================//
function addInlineTransform($elem, type, value) {
    if (type) {
        $elem.css({
            '-webkit-transform' : type + '(' + value + ')',
            '-ms-transform'     : type + '(' + value + ')',
            'transform'         : type + '(' + value + ')'
        });
    } else {
        $elem.css({
            '-webkit-transform' : value,
            '-ms-transform'     : value,
            'transform'         : value
        });
    }


}

//==== Calculates Intro Heading Height and adds margin-top on general-section-img =================//
function headingHeight() {
    if($(".intro").length && $(".general-section").length) {
        var introHeadingHeight = $(".intro h1").outerHeight();
        $(".general-section .general-section-img.negative-margin").css("margin-top",- introHeadingHeight - 93);
    }
}

//==== MatchHeight =================//
function SetUpGridCols(element) {
    element.matchHeight
    ({
        byRow: false,
        property: 'height',
        target: null,
        remove: false
    });
}

//==== Counter Delay =================//
function counterDelay(element,counter,delay,delayTime) {
    element.each(function() {

        if (counter == 0) {
            delay = 0;
        } else {
            delay += delayTime;
        }

        $(this).css("transition-delay", delay + "s");

        counter++;
    })
}

//==== Animations =================//
function animations(element, offset1, offset2) {
    if(element.length) {
        element.each(function() {
            $(this).waypoint(function(direction) {
                if ((direction == "down") && ($(this.element).visible(true))) {
                    $(this.element).addClass("fire");
                } else {
                    $(this.element).removeClass("fire");
                }
            }, {offset: offset1});

            $(this).waypoint(function(direction) {
                if ((direction == "up") && ($(this.element).visible(true))) {
                    $(this.element).addClass("fire");
                } else {
                    $(this.element).removeClass("fire");
                }
            }, {offset: offset2});
        });
    } 
}

//==== Counter =================//
function counter() {
    if($(".counterup").length) {
        var options = {  
          useEasing: true,
          useGrouping: true,
          separator: '.',
          decimal: ',',
          prefix: '',
          suffix: ''
        };

        if ($('body').hasClass('ENG')) {
            options.separator = ',';
            options.decimal = '.';
        }

        $('.counterup').each(function() {
            var decimal = 0;

            if($(this).text().indexOf(".") !== -1) {
                decimal = $(this).text().split(".")[1].length;
            }

            var counter = new CountUp(this, 0, $(this).text(), decimal, 1, options);

            $(this).waypoint(function (direction) {
                if (direction === 'down') {
                    counter.reset();
                    counter.start();
                }
            }, {
                offset: 'bottom-in-view'
            });

            $(this).waypoint(function (direction) {
                if (direction === 'up') {
                    counter.reset();
                    counter.start();
                }
            }, {
                offset: '-5%'
            });
        });
    }  
}

//==== ZoomIn =================//
function zoomIn() {
    if($(".zoom-in").length) {
        $(".zoom-in").each(function() {
            $(this).waypoint(function() {
               $(this.element).addClass("fire");
            }, {offset: "75%"});
        });
    }   
}

//==== ZoomOut =================//
function zoomOut(parent,element) {
    if(element.length) {
        parent.each(function() {
            var controller = new ScrollMagic.Controller();

            var scene = new ScrollMagic.Scene({
              triggerElement: this,
              duration: "100%",
              triggerHook: 1
            })

            var timeline = new TimelineMax();

            var tween = TweenMax.from(this.querySelectorAll(element),1,{scale:1.2,ease:Power0.easeOut});

            timeline.add(tween)
            scene.setTween(timeline)
            scene.addTo(controller);
        });
    }
}

//==== Swiper =================//
function swiper(element) {
    if($(element).length) {
        var mySwiper = new Swiper (element+' .swiper-container', {
            loop: true,
            zoom: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        var slides = mySwiper.slides.length - 2;

        if(slides == 1) {
            $(element+' .swiper-container').find(".swiper-button-prev,.swiper-button-next").hide();
        }
    }
}

//==== Swiper =================//
function youtube() {
    $(document).on('click', '.youtube-btn', function (event) {
        event.preventDefault();
        var url = $(this).data("url");
        $('#youtube').iziModal({
            history: false,
            width: 900,
            iframeHeight: 500,
            iframe : true,
            fullscreen: true,
            iframeURL: url}).iziModal("open");
    });
}

//==== Nicescroll =================//
function nicescroll(element,wrapper) {
    if(element.length) {
        element.niceScroll(wrapper,{
            cursorcolor:"white",
            cursorwidth:"5px",
            autohidemode: false,
            bouncescroll: false
        });

        element.getNiceScroll().resize();
    } 
}

//==== Timeline =================//
function timeline() {
    if($(".timeline-container").length) {
        var mySwiper = new Swiper ('.timeline-container', {
            slidesPerView: "auto",
            grabCursor: true,
            parallax: true,
            slidesOffsetBefore: 97,
            centeredSlides: false,
            on: {
                slideChange: function() {
                   var index = mySwiper.realIndex;
                   if(index > 0) {
                        mySwiper.params.centeredSlides = true;   
                    } else {
                        mySwiper.params.centeredSlides = false;
                    }
                    mySwiper.update();
                }
            },
            breakpoints: {
                1200: {
                  slidesOffsetBefore: 57
                },
                992: {
                  slidesOffsetBefore: 0
                }
              }
        })

        $('.timeline-container').on('click', '.swiper-slide', function (e) {
            e.stopPropagation();
            var index = $(this).index();
            if (index > 0) {
                mySwiper.params.centeredSlides = true; 
            } else {
                mySwiper.params.centeredSlides = false;
            }
            mySwiper.update();
            mySwiper.slideTo(index);
        });

        $('.timeline-container').on('click', '.swiper-button-next', function (e) {
            e.stopPropagation();
            mySwiper.params.centeredSlides = true; 
            mySwiper.update();
            mySwiper.slideNext();
        });

        $('.timeline-container').on('click', '.swiper-button-prev', function (e) {
            e.stopPropagation();
            var index = mySwiper.realIndex;
            if (index > 1) {
                mySwiper.params.centeredSlides = true; 
            } else {
                mySwiper.params.centeredSlides = false;
            }
            mySwiper.update();
            mySwiper.slidePrev();
        });
    } 
}

//==== Custom Select =================//
function customSelect() {
    if($(".custom-select").length) {
        $(".custom-select").select2({
            minimumResultsForSearch: -1,
            placeholder: "Select country",
            width: "100%"
        });

        $('.custom-select').on('select2:open', function (e) {
            $(".select2-results__options").unbind("mousewheel");
            $(".select2-results").niceScroll(".select2-results__options",{
                cursorcolor:"#00baf2",
                cursorwidth:"6px",
                autohidemode: false,
                bouncescroll: false,
                background:"#efefef",
                cursorborder: "0"
            });

            $(".select2-results").getNiceScroll().resize();
        });
    }
}

//==== Press Release =================//
function pressRelease() {
    if($(".press-release-carousel").length) {
        var galleryThumbs = new Swiper('.press-release-carousel .gallery-thumbs', {
          slidesPerView: 3,
          spaceBetween: 12,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          breakpoints: {
            575.98: {
              slidesPerView: 2
            }
          }
        });

        var mySwiper = new Swiper ('.press-release-carousel .main-gallery', {
            zoom: false,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            thumbs: {
                swiper: galleryThumbs
            },
            on: {
                slideChangeTransitionEnd: function () {
                    if($(".swiper-slide-active").prev().find(".youtube-video").length) {
                        var playerId = $(".swiper-slide-active").prev().find("iframe").attr("id");
                        var player = YT.get(playerId);
                        player.stopVideo();
                    }
                    if($(".swiper-slide-active").next().find(".youtube-video").length) {
                        var playerId = $(".swiper-slide-active").next().find("iframe").attr("id");
                        var player = YT.get(playerId);
                        player.stopVideo();
                    }
                    if($(".swiper-slide-active").find(".youtube-video").length) {
                        var playerId = $(".swiper-slide-active").find("iframe").attr("id");
                        var player = YT.get(playerId);
                        player.playVideo();
                    }
                }
            }
        });

        var slides = mySwiper.slides.length;

        if(slides == 1) {
            $(".press-release-carousel").find(".navigation-btns").hide();
        }
    }
}

//==== Videos Carousel =================//
function videosCarousel() {
    if($(".videos-carousel").length) {
      var counter = 1;
      var mySwiper = new Swiper ('.videos-carousel .swiper-container', {
          zoom: false,
          spaceBetween: 35,
          slidesPerView: 'auto',
          scrollbar: {
            el: '.videos-carousel .swiper-scrollbar',
            draggable: true,
          },
          breakpoints: {
              575.98: {
                slidesPerView: 1,
                spaceBetween: 0
              }
          },
          on: {
              init: function () {
                $(".videos-carousel .swiper-container .swiper-slide").each(function() {
                    var id = $(this).find(".youtube-video").attr("id");
                    var videoId = $(this).find(".youtube-video").data("video-id");
                                       
                    $(this).find(".video-thumb[data-player='"+id+"']").attr("src","https://img.youtube.com/vi/"+videoId+"/0.jpg");   
                });
              }
          },
      });     
    }
}

function contactMap() {
    if($("#contact-map").length) {
        google.maps.event.addDomListener(window, 'load', init);
    }

    function init() {

        var mapOptions = {

            zoom: 14,
            scrollwheel: false,
            disableDefaultUI: true,

            center: new google.maps.LatLng(38.041645, 23.808642),

            styles: [
                {
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 40
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f0f0f0"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#f0f0f0"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f0f0f0"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#f0f0f0"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4d6059"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#7f8d89"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#7f8d89"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#00baf2"
                        },
                        {
                            "lightness": "1"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ebebeb"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#e3e0e0"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#d1d1d1"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#d3d3d3"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#2b3638"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#2b3638"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#9cdcf9"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#24282b"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]

        };


        var mapElement = document.getElementById('contact-map');


        var map = new google.maps.Map(mapElement, mapOptions);

        // var contentString = '<div id="map-content" p-2>'+
        //     '<h2 class="mb-1">GR. SARANTIS S.A.</h2>'+
        //     '<p>26, Amaroussiou - Halandriou Street<br>'+
        //     '151 25 Maroussi, Athens, Greece<br>'+
        //     'Tel: +30 210 6173000 - Fax: +30 210 6197081<br>'+
        //     'e-mail: <a href="mailto:info@sarantis.gr">info@sarantis.gr</a></p>'+
        //     '</div>';

        // var infowindow = new google.maps.InfoWindow({
        //     content: contentString
        // });

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(38.041645, 23.808642),
            animation: google.maps.Animation.DROP,
            map: map,
            icon: "./assets/images/icons/pin.png"
        });

        // marker.addListener('click', function() {
        //     infowindow.open(map, marker);
        // });

    }
}