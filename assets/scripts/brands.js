$(function() {
	/*********************************************************
     *      HOME PAGE OWL CAROUSEL
     ********************************************************/

    $('.productBtn').click(function(ev) {

        ev.preventDefault();
        var $this = $(this);
        var $list = $this.closest('.product-list');

        $list.find('.productBtn').removeClass('active');
        $this.addClass('active');

    });

    if($('#brands-carousel').length) {
        (function(){

            var $carousel;

            // As poume oti auto einai ena fake ajax call pou fernei to data json

            setTimeout(function () {

                var data = [
                    {
                        imgPath: 'assets/images/bgs/carroten_bg.jpg',
                        logoPath: 'assets/images/logos/carroten_logo.png',
                        url: 'www.google.gr'
                    },
                    {
                        imgPath: 'assets/images/bgs/bioten_bg.jpg',
                        logoPath: 'assets/images/logos/bioten_logo.png',
                        url: 'www.google.gr'
                    },
                    {
                        imgPath: 'assets/images/bgs/str8_bg.jpg',
                        logoPath: 'assets/images/logos/str8_logo.png',
                        url: 'www.google.gr'
                    },
                    {
                        imgPath: 'assets/images/bgs/orzene_bg.jpg',
                        logoPath: 'assets/images/logos/orzene_logo.png',
                        url: 'www.google.gr'
                    },
                    {
                        imgPath: 'assets/images/bgs/bioten_bg.jpg',
                        logoPath: 'assets/images/logos/bioten_logo.png',
                        url: 'www.google.gr'
                    },
                    {
                        imgPath: 'assets/images/bgs/str8_bg.jpg',
                        logoPath: 'assets/images/logos/str8_logo.png',
                        url: 'www.google.gr'
                    },
                ]


                // dld sto success tou ajax 8a kaneis ta parakatw

                createHtmlFromData(data);

                $carousel = initializeCarousel(data.length);

                $('#brands-carousel').imagesLoaded( function() {
                  SetUpGridCols($(".bc-slide .bc-logo-wrapper"));
                });

            }, 500);

            $('.productBtn').on('click', function (ev) {

                ev.preventDefault();


                // Neo ajax call sto click tou button

                setTimeout(function () {

                    var data = [
                        {
                            imgPath: 'assets/images/bgs/carroten_bg.jpg',
                            logoPath: 'assets/images/logos/carroten_logo.png',
                            url: 'www.google.gr'
                        },
                        {
                            imgPath: 'assets/images/bgs/bioten_bg.jpg',
                            logoPath: 'assets/images/logos/bioten_logo.png',
                            url: 'www.google.gr'
                        },
                    ]


                    // dld sto success tou ajax 8a kaneis ta parakatw

                    $carousel.owlCarousel('destroy');

                    createHtmlFromData(data);

                    $carousel = initializeCarousel(data.length);

                    $('#brands-carousel').imagesLoaded( function() {
                      SetUpGridCols($(".bc-slide .bc-logo-wrapper"));
                    });

                }, 1000);

            });

            var width = 127;

            function createHtmlFromData(data) {

                if(data.length === 1) {
                    width = 147;
                } else if(data.length === 2) {
                    width = 137;
                } else if(data.length === 3) {
                    width = 127;
                } else if(data.length >= 4) {
                    width = 127;
                }

                var $carousel = $('#brands-carousel');

                $carousel.html('');

                var html = '';

                data.forEach(function (item) {
                    html += createSlide(item)
                });

                $carousel.append(html);
            }

            function createSlide(item) {

                var imagePath = "'" + item.imgPath + "'"
                var logoPath = "'" + item.logoPath + "'"

                var item = '<a href="' + item.url + '" class="bc-slide">';
                item += '<span class="bg" style="background-image: url(' + imagePath + ')">'+
                '<span class="d-flex justify-content-center align-items-center bc-logo-wrapper position-relative">'+
                '<img class="bc-logo" style="max-width:' + width + 'px" src=' + logoPath + '">'+
                '</span>'
                '</span>'
                item += '</a>'

                return item;
            }

            function initializeCarousel(count) {

                var responsiveObj;

                if (count === 1) {
                    responsiveObj = {
                        0:{
                            items:1,
                        },
                        420:{
                            items:1,
                        },
                        768:{
                            items:1,
                        },
                        991:{
                            items:1,
                        },
                        1200: {
                            items: 1
                        },
                        1480: {
                            items: 1
                        }
                    }
                }

                if (count === 2) {
                    responsiveObj = {
                        0:{
                            items:1,
                        },
                        420:{
                            items:1,
                        },
                        768:{
                            items:2,
                        },
                        991:{
                            items:2,
                        },
                        1200: {
                            items: 2
                        },
                        1480: {
                            items: 2
                        }
                    }
                }

                if (count === 3) {
                    responsiveObj = {
                        0:{
                            items:1,
                        },
                        420:{
                            items:1,
                        },
                        768:{
                            items:2,
                        },
                        991:{
                            items:2,
                        },
                        1200: {
                            items: 3
                        },
                        1480: {
                            items: 3
                        }
                    }
                }

                if (count >= 4) {
                    responsiveObj = {
                        0:{
                            items:1,
                        },
                        420:{
                            items:1,
                        },
                        768:{
                            items:2,
                        },
                        991:{
                            items:3,
                        },
                        1200: {
                            items: 3
                        },
                        1480: {
                            items: 4
                        }
                    }
                }


                return $('#brands-carousel').owlCarousel({
                    loop: false,
                    margin:12,
                    dots: false,
                    mouseDrag: false,
                    nav:true,
                    navText: ['<i class="fal fa-chevron-left"></i>','<i class="fal fa-chevron-right"></i>'],
                    responsiveClass:true,
                    // stagePadding: 25,
                    responsive: responsiveObj
                })
            }

        })();
    }

    //==== Brands =================//

    if($(".our-brands").length) {
        var $grid;

        $.ajax({
            url : './assets/scripts/GetCategoryBrandsNew.json',
            type : 'GET',
            dataType:'JSON',
            success : function(data) {
                brands(data);
            }
        });    
    }  
});

function brands(brandsList) { 
    var categoriesArray = [];
    var subcategoriesArray = [];
    var typesArray = [];
    var countriesArray = [];
    var partnersArray = [];

    $.each(brandsList, function(index, value) {
        categoriesArray.push({
            name: value.category,
            text: value.text
        });

        $.each(value.subcategories, function(index, value) {
            subcategoriesArray.push(value);
        });    

        $.each(value.products, function(index, value) {
            typesArray.push(value.type);
            $.each(value.countries, function(index, value) {
                countriesArray.push(value);
            });
            partnersArray.push(value.partner);
            var subcategories = value.subcategories.join().replace(/,/g, " ");
            var countries = value.countries.join().replace(/,/g, " ");
            var brand = $('<div class="col-sm-6 col-lg-4 col-xxl-3 brand text-center mb-5 '+value.category+' '+subcategories+' '+value.type+' '+countries+' '+value.partner+'">'+
                '<div class="brand-img d-flex justify-content-center align-items-center px-5">'+
                    '<div class="w-100">'+
                        '<img src="'+value.logo+'">'+
                    '</div>'+
                '</div>'+
                '<div class="px-2 brand-text">'+
                    '<h3 class="mt-4 mb-1">'+value.title+'</h3>'+
                    '<p>'+value.text+'</p>'+
                '</div>'+
                '<a href="'+value.url+'" class="position-absolute w-100 h-100"></a>'+
            '</div>'); 

            $grid = $(".our-brands .filters").isotope({
                itemSelector: '.brand',
                layoutMode: 'fitRows'
            });   
    
            $(".our-brands .filters").append(brand).isotope('appended', brand);                        
        });
    });

    SetUpGridCols($(".brand-img"));
    SetUpGridCols($(".brand-text"));

    $grid.imagesLoaded().progress( function() {
      $grid.isotope('layout');
    }); 

    //Append Categories Options
    $.each(categoriesArray, function(index, value) {
        var options = $("<option value='."+value.name+"'>"+value.text+"</option>");
        $("select[data-filter-group=category]").append(options);
    });

    //Append SubCategories Options
    var removeDuplicateSubcategories = removeDuplicates(subcategoriesArray);
    $.each(removeDuplicateSubcategories, function(index, value) {
        var optionText = capitalize(value);
        if(optionText.indexOf("-")) {
            optionText = optionText.replace(/\-/g," ")
        }
        var options = $("<option value='."+value+"'>"+optionText+"</option>");
        $("select[data-filter-group=sub-category]").append(options);
    });

    //Append Types Options
    var removeDuplicateTypes = removeDuplicates(typesArray);
    $.each(removeDuplicateTypes, function(index, value) {
        var optionText = capitalize(value);
        var options = $("<option value='."+value+"'>"+optionText+"</option>");
        $("select[data-filter-group=type]").append(options);
    });

    //Append Countries Options
    var removeDuplicateCountries = removeDuplicates(countriesArray);
    $.each(removeDuplicateCountries, function(index, value) {
        var options = $("<option value='."+value+"'>"+value+"</option>");
        $("select[data-filter-group=country]").append(options);
    });

    //Append Partners Options
    var removeDuplicatePartners = removeDuplicates(partnersArray);
    var removeEmptySpacesPartners = removeEmptySpaces(removeDuplicatePartners);
    $.each(removeEmptySpacesPartners, function(index, value) {
        var optionText = capitalize(value);
        if(optionText.indexOf("-")) {
            optionText = optionText.replace(/\-/g," ")
        }
        var options = $("<option value='."+value+"'>"+optionText+"</option>");
        $("select[data-filter-group=partner]").append(options);
    });

    var filters = {};

    $('.our-brands select').each(function () {
        $(this).on('change', function (event) {                 
           var filterGroup = $(this).attr('data-filter-group');
            // set filter for group
            filters[filterGroup] = $(this).val();
            // combine filters
            var filterValue = concatValues(filters);
            // set filter for Isotope
            $grid.isotope({ filter: filterValue });

            var strall = []; 
            $grid.on('layoutComplete', function( event, laidOutItems ) {
                $.each(laidOutItems, function(index, value) {
                    strall.push($(value.element).attr("class").split(" "));
                });
                var concatArray = strall.reduce(function(r, a) {
                    return r.concat(a)
                }, []);
                var dropdown = $('select option:not([value=""])');
                dropdown.each(function(el){
                    var nowfilter = $(this).attr('value').replace(/\./g,"");
                    if(concatArray.includes(nowfilter)) {
                        $(this).show().attr("visible", true);
                    } else {
                        $(this).hide().attr("visible", false);
                    }
                });
                    
                $('.our-brands select').each(function () {  
                    if($(this).find("option[visible=true]").length === 1) {
                        $(this).children("option[visible=true]").attr("selected", true);
                    } else if($(this).find("option[visible=true]").length === 0) {
                        $(this).attr("disabled", true);
                    } else {
                        $(this).children("option").attr("selected", false);
                        $(this).attr("disabled", false);
                    }
                });
            });          
        });
   });

    function concatValues(obj) {
        var value = '';
        for (var prop in obj) {
            value += obj[prop];
        }
        return value;
    }  

    function capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }       

    function removeDuplicates(array) {      
        return array.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });
    }    

    function removeEmptySpaces(array) {
        return array.filter( function( item ) {
            return item !== "";
        });
    }
}

if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();
   
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;

    var kValue;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
   
    res.length = c; // shrink down array to proper size
    return res;
  };
}

if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0; 

      // Steps 3, 4, 5, 6, 7      
      var k = 0; 
      var value;

      if (arguments.length >= 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++; 
        }

        // 3. If len is 0 and initialValue is not present,
        //    throw a TypeError exception.
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' );
        }
        value = o[k++];
      }

      // 8. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kPresent be ? HasProperty(O, Pk).
        // c. If kPresent is true, then
        //    i.  Let kValue be ? Get(O, Pk).
        //    ii. Let accumulator be ? Call(
        //          callbackfn, undefined,
        //          « accumulator, kValue, k, O »).
        if (k in o) {
          value = callback(value, o[k], k, o);
        }

        // d. Increase k by 1.      
        k++;
      }

      // 9. Return accumulator.
      return value;
    }
  });
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    enumerable: false,
    value: function(obj) {
        var newArr = this.filter(function(el) {
          return el == obj;
        });
        return newArr.length > 0;
      }
  });
}