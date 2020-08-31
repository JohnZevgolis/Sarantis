$(function() {
  picturesCarousel();
});

//==== Pictures Carousel =================//
function picturesCarousel() {
    if($(".pictures-carousel").length) {
      $.ajax({
            url : './assets/scripts/galeries.json',
            type : 'GET',
            dataType:'JSON',
            success : function(data) {                   
                appendGalleries(data, function() {
                  var galleriesThumbs = new Swiper('.pictures-carousel .gallery-thumbs', {
                    slidesPerView: 4,
                    grabCursor: true,
                    spaceBetween: 34,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    scrollbar: {
                      el: '.pictures-carousel .swiper-scrollbar',
                      draggable: true,
                    },
                    breakpoints: {
                      1479.98: {
                        slidesPerView: 3
                      },
                      1199.98: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                      },
                      991.98: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                      },
                      767.98: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                      },
                      575.98: {
                        slidesPerView: 1,
                        spaceBetween: 0
                      }
                    }
                  });

                  var galleriesCarousel = new Swiper ('.pictures-carousel .main-gallery', {
                      simulateTouch: false,
                      zoom: false,
                      thumbs: {
                          swiper: galleriesThumbs
                      }
                  });
                });

                appendFirstAlbum(data, function() {
                    var albumCarousel = new Swiper ('.pictures-carousel .album-gallery-1', {
                        zoom: false,
                        observer: true,
                        navigation: {
                            nextEl: '.album-gallery-1 .swiper-button-next',
                            prevEl: '.album-gallery-1 .swiper-button-prev',
                        }
                    });

                    var slides = albumCarousel.slides.length;

                    if(slides == 1) {
                        $(".pictures-carousel").find(".navigation-btns").hide();
                    }    
                });     
            }
        }); 

        $(".gallery-thumbs .swiper-slide").click(function() {
            var id = $(this).data("id");
            if($(".pictures-carousel .main-gallery .swiper-wrapper .swiper-slide").find(".album-gallery-"+id+" .swiper-wrapper").children().length === 0) {
              $.ajax({
                url : './assets/scripts/galeries2.json',
                type : 'GET',
                dataType:'JSON',
                success : function(data) {
                  appendRandomAlbum(data, id, function() {
                      var albumCarousel = new Swiper ('.pictures-carousel .album-gallery-'+id+'', {
                          zoom: false,
                          navigation: {
                              nextEl: '.album-gallery-'+id+' .swiper-button-next',
                              prevEl: '.album-gallery-'+id+' .swiper-button-prev',
                          }
                      });

                      var slides = albumCarousel.slides.length;  

                      if(slides == 1) {
                          $(".pictures-carousel").find(".navigation-btns").hide();
                      }
                  });
                }
              });
            }
        }); 

        function appendGalleries(albums, callback) {
            $(".pictures-carousel .gallery-thumbs .swiper-slide").each(function() {
              var id = $(this).data("id");
              var albums = $('<div class="swiper-slide">'+
                    '<div class="swiper-container album-gallery album-gallery-'+id+'">'+
                        '<div class="swiper-wrapper"></div>'+
                        '<div class="justify-content-end position-absolute navigation-btns">'+
                            '<div class="swiper-button-prev mr-1 d-flex justify-content-center align-items-center">'+
                                '<i class="ion-ios-arrow-round-back"></i>'+
                            '</div>'+
                            '<div class="swiper-button-next d-flex justify-content-center align-items-center">'+
                                '<i class="ion-ios-arrow-round-forward"></i>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>');

              $(".pictures-carousel .main-gallery .swiper-wrapper").first().append(albums);
            });

            if(typeof callback == "function") {
                callback();      
            }
        }

        function appendFirstAlbum(albums, callback) {
            $.each(albums.album, function(index, value) {
                var firstGalleryAlbum = $('<div class="swiper-slide bg-img" style="background-image:url('+value+')"></div>');
                $(".pictures-carousel .main-gallery .swiper-wrapper .swiper-slide").first().find(".album-gallery-1 .swiper-wrapper").append(firstGalleryAlbum);
            });

            if(typeof callback == "function") {
                callback();      
            }
        }

        function appendRandomAlbum(albums, id, callback) {
            $.each(albums.album, function(index, value) {
                var randomGalleryAlbum = $('<div class="swiper-slide bg-img" style="background-image:url('+value+')"></div>');
                $(".pictures-carousel .main-gallery .swiper-wrapper .swiper-slide").find(".album-gallery-"+id+" .swiper-wrapper").append(randomGalleryAlbum);            
            });         

            if(typeof callback == "function") {
                callback();      
            } 
        }
    }
}