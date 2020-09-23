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

    brands();
});

//==== Brands =================//
// function brands() {
//     if($(".our-brands").length) {
//         var counter = 1,
//         flag = false,
//         $grid, brandsList;

//         $.ajax({
//             url : './assets/scripts/GetCategoryBrandsNew.json',
//             type : 'GET',
//             dataType:'JSON',
//             success : function(data) {     
//             	brandsList = data;         
//                 appendBrands(brandsList,brandsLoaded);  
//                 loadOnScroll();
//             }
//         });    
//     }  

//     function loadOnScroll() {
//     	$(".our-brands .filter").each(function() {
//             var select = $(this).find("select");
//             if (select.children('option:first-child').is(':selected')) {
//                 flag = true;
//             }

//             select.change(function() {
//                 if($(this).children('option:first-child').is(':selected')) {
//                     flag = true;
//                 } else {
//                     flag = false;   
//                 }
//             })
//         });

//         $(window).scroll(function() {
//             if(flag == true) {
//                 var windowBottom = $(window).scrollTop() + $(window).height();
//                 var objectBottom = $(".our-brands .filters .brand").last().outerHeight() + $(".our-brands .filters .brand").last().offset().top;
                
//                 if(counter < brandsList.length) {
//                     if(windowBottom > objectBottom) {
//                     	counter++;
//  						appendBrands(brandsList,brandsLoaded);
//                     }
//                 } 
//             }
//         });
//     }

//     function appendBrands(jsonArray,callback) {
//         var category = jsonArray.filter(function(category) {
//             return category.id === counter;           
//         });	

//         $.each(category, function(index, value) {  
//             createBrands(category);
//         });

//         if(typeof callback == "function") {
//             callback();      
//         }
//     }  

//     function createBrands(jsonArray) {
//         $.each(jsonArray, function(index, value) {
//             $.each(value.products, function(index, value) {
//                 var subcategories = value.subcategories.join().replace(/,/g, " ");
//                 var countries = value.countries.join().replace(/,/g, " ");
//                 var brand = $('<div class="col-sm-6 col-lg-4 col-xxl-3 brand text-center mb-5 '+value.category+' '+subcategories+' '+value.type+' '+countries+' '+value.partner+'">'+
//                     '<div class="brand-img d-flex justify-content-center align-items-center p-5">'+
//                         '<div class="w-100">'+
//                             '<img src="'+value.logo+'">'+
//                         '</div>'+
//                     '</div>'+
//                     '<div class="px-2 brand-text">'+
//                         '<h3 class="mt-4 mb-1">'+value.title+'</h3>'+
//                         '<p>'+value.text+'</p>'+
//                     '</div>'+
//                     '<a href="'+value.url+'" class="position-absolute w-100 h-100"></a>'+
//                 '</div>'); 

//                 $grid = $(".our-brands .filters").isotope({
//                     itemSelector: '.brand',
//                     layoutMode: 'fitRows'
//                 });
                
//                 $(".our-brands .filters").append(brand).isotope('appended', brand);
                
//             });
//         });
//     }

//     function brandsLoaded() {
//         $(".our-brands .filters").imagesLoaded(function() {
//             $grid.one( 'arrangeComplete', function() {
//                 SetUpGridCols($(".our-brands .brand-img"));
//                 SetUpGridCols($(".our-brands .brand-text"));
//             });

//             filterBrands(brandsList);

//         });     
//     }

//     function filterBrands(jsonArray) {
//         //filter for each group
//    		// $('.our-brands select').each(function () {
   			

//    		// 	$(this).on('change', function (event) {
//    		// 		var filters = {};
//    		// 		var filterGroup = $(this).attr('data-filter-group');
//      //            // set filter for group
//      //            filters[filterGroup] = $(this).val();
//      //            // combine filters
//      //            var filterValue = concatValues(filters);
//      //            // set filter for Isotope
//      //            $grid.isotope({ filter: filterValue });
//      //        });
//      //   });

//    		$("select[data-filter-group=category]").each(function() {
//    			if(flag == true) {
//    				$(this).change(function (event) {
// 	            	if(counter < brandsList.length) {
// 	            		$grid.isotope( 'remove', $(".brand") );
// 	            		var val = $(this).val().split(".").join("");

// 	            		var category = jsonArray.filter(function(obj) {
// 				            return obj.category === val;           
// 				        });	
// 				        console.log(category)

// 				        $.each(category, function(index, value) {  
// 				            createBrands(category);
// 				        });
// 	                } 	           	   
// 	            });
//    			} else {
//    				$(this).change(function() {
// 		        	var filters = {};
// 		            var category = $(this).find("option:selected").val().split('.').join("");
// 		            $(".our-brands .filter select[data-filter-group=sub-category]").find("option").not(":first").remove();
// 		            var categoryArr = brandsList.filter(function(obj) {
// 		                return obj.category === category;
// 		            });

// 		            $.each(categoryArr, function(index, value) {  
// 		                var options = value.subcategories;
// 		                $.each(options, function(index, value) {  
// 		                    var option = $("<option value='."+value+"'>"+value+"</option>");
// 		                    $(".our-brands .filter select[data-filter-group=sub-category]").append(option);
// 		                });
// 		            });

// 		            var filterGroupSub = $("select[data-filter-group=sub-category]").attr('data-filter-group');
// 		            $("select[data-filter-group=sub-category]").val("");
// 		            var emptySub = $("select[data-filter-group=sub-category]").val();
// 		            filters[filterGroupSub] = emptySub;
// 		            var filterValueSub = concatValues(filters);
// 		            $grid.isotope({ filter: filterValueSub });

// 		            var filterGroup = $(this).attr('data-filter-group');
// 		                // set filter for group
// 		            filters[filterGroup] = $(this).val();
// 		            // combine filters
// 		            var filterValue = concatValues(filters);
// 		            console.log(filterValue)
// 		            // set filter for Isotope
// 		            $grid.isotope({ filter: filterValue });
// 		        });
//    			}		
//    		});

        

//         // flatten object by concatting values
//         function concatValues(obj) {
//             var value = '';
//             for (var prop in obj) {
//                 value += obj[prop];
//             }
//             return value;
//         }        
//     }
// }

function brands() {
    // Business Unit
    $(".our-brands .filter select[data-filter-group=category]").change(function() {
        var category = $(this).find("option:selected").val();
        var allCountries = [];
        var allPartners = [];
        var types = [];

        $(".our-brands .filter select[data-filter-group=sub-category]").find("option").not(":first").remove();
        $(".our-brands .filter select[data-filter-group=type]").find("option").not(":first").remove();
        $(".our-brands .filter select[data-filter-group=country]").find("option").not(":first").remove();
        $(".our-brands .filter select[data-filter-group=partner]").find("option").not(":first").remove();
        var categoryArr = brandsList.filter(function(obj) {
            return obj.category === category;
        });

        $.each(categoryArr, function(index, value) {  
            var options = value.subcategories;
            $.each(options, function(index, value) {  
                var optionText;
                if(value.indexOf("-")) {
                    optionText = value.replace(/\-/g," ").capitalize();                      
                } else {
                    optionText = value.capitalize();
                }
                var option = $("<option value="+value+">"+optionText+"</option>");
                $(".our-brands .filter select[data-filter-group=sub-category]").append(option);
            });
            var products = value.products;
            $.each(products, function(index, value) {
                types.push(value.type);
                $.each(value.countries, function(index, value) {
                   allCountries.push(value);
                });
                allPartners.push(value.partner);
            });
        });

        if(types.includes("own")) {
            var option = $("<option value='own'>Own</option>");
            $(".our-brands .filter select[data-filter-group=type]").append(option);
        }
        if(types.includes("distributed")) {
            var option = $("<option value='distributed'>Distributed</option>");
            $(".our-brands .filter select[data-filter-group=type]").append(option);
        }

        var removeDuplicateCountries = allCountries.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });
        $.each(removeDuplicateCountries, function(index, value) {
            var option = $("<option value="+value+">"+value+"</option>");
            $(".our-brands .filter select[data-filter-group=country]").append(option);
        });

        var removeDuplicatePartners = allPartners.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });
        
        var removeEmptySpacesPartners = removeDuplicatePartners.filter(function (el) {
            return el != "";
        });
        $.each(removeEmptySpacesPartners, function(index, value) {
            var optionText;
            if(value.indexOf("-")) {
                optionText = value.replace(/\-/g," ").capitalize();                    
            } else {
                optionText = value.capitalize();
            }
            var option = $("<option value="+value+">"+optionText+"</option>");
            $(".our-brands .filter select[data-filter-group=partner]").append(option);
        });

        if($(this).find("option").first().is(":selected")) {
            allCountries = [];
            allPartners = [];
            $(".our-brands .filter select[data-filter-group=category]").find("option").not(":first").remove();
            $(".our-brands .filter select[data-filter-group=sub-category]").find("option").not(":first").remove();
            $(".our-brands .filter select[data-filter-group=country]").find("option").not(":first").remove();
            $(".our-brands .filter select[data-filter-group=partner]").find("option").not(":first").remove();
            $.each(brandsList, function(index, value) {  
                var category = value.category;
                var text = value.text;
                var categoryOption = $("<option value="+category+">"+text+"</option>");
                $(".our-brands .filter select[data-filter-group=category]").append(categoryOption);
                $.each(value.subcategories, function(index, value) {  
                    var optionText;
                    if(value.indexOf("-")) {
                        optionText = value.replace(/\-/g," ").capitalize();                      
                    } else {
                        optionText = value.capitalize();
                    }
                    var option = $("<option value="+value+">"+optionText+"</option>");
                    $(".our-brands .filter select[data-filter-group=sub-category]").append(option);
                });
                $.each(value.products, function(index, value) {  
                    $.each(value.countries, function(index, value) {
                        allCountries.push(value);
                    });
                    allPartners.push(value.partner);
                });
            });
            var removeDuplicateCountries = allCountries.filter( function( item, index, inputArray ) {
                   return inputArray.indexOf(item) == index;
            });
            $.each(removeDuplicateCountries, function(index, value) {
                var option = $("<option value="+value+">"+value+"</option>");
                $(".our-brands .filter select[data-filter-group=country]").append(option);
            });

            var removeDuplicatePartners = allPartners.filter( function( item, index, inputArray ) {
                return inputArray.indexOf(item) == index;
            });
            
            var removeEmptySpacesPartners = removeDuplicatePartners.filter(function (el) {
                return el != "";
            });
            $.each(removeEmptySpacesPartners, function(index, value) {
                var optionText;
                if(value.indexOf("-")) {
                    optionText = value.replace(/\-/g," ").capitalize();                    
                } else {
                    optionText = value.capitalize();
                }
                var option = $("<option value="+value+">"+optionText+"</option>");
                $(".our-brands .filter select[data-filter-group=partner]").append(option);
            });
        }
    });

    // Sub-category
    $(".our-brands .filter select[data-filter-group=sub-category]").change(function() {
        var allCountries = [];
        var allPartners = [];
        var types = [];
        var subcategory = $(this).find("option:selected").val();
        var products = [];
        $(".our-brands .filter select[data-filter-group=category]").find("option").not(":first").remove();
        $(".our-brands .filter select[data-filter-group=type]").find("option").not(":first").remove();
        if($(".our-brands .filter select[data-filter-group=country]").find("option").first().is(":selected")) {
            $(".our-brands .filter select[data-filter-group=country]").find("option").not(":first").remove();
        }
        $(".our-brands .filter select[data-filter-group=partner]").find("option").not(":first").remove();
        
        var categoryArr = brandsList.filter(function(obj) {
            if(obj.subcategories.find(function(item) {
                return item === subcategory;
            })) {
                return obj;
            }  
        });

        $.each(categoryArr, function(index, value) {  
            var category = value.category;
            var subcategories = value.subcategories;
            var text = value.text;
            var categoryOption = $("<option selected value="+category+">"+text+"</option>");
            $(".our-brands .filter select[data-filter-group=category]").append(categoryOption);
            $.each(value.products, function(index, value) {
                products.push(value);
            });
        });

        var subProducts = products.filter(function(prod) {
            if(prod.subcategories.find(function(sub) {
                return sub === subcategory;
            })) {
                return prod;
            }
        });

        $.each(subProducts, function(index, value) {  
            types.push(value.type);
            $.each(value.countries, function(index, value) {
               allCountries.push(value);
            });
            allPartners.push(value.partner);
        });

        if(types.includes("own")) {
            var option = $("<option value='own'>Own</option>");
            $(".our-brands .filter select[data-filter-group=type]").append(option);
        }
        if(types.includes("distributed")) {
            var option = $("<option value='distributed'>Distributed</option>");
            $(".our-brands .filter select[data-filter-group=type]").append(option);
        }

        var removeDuplicateCountries = allCountries.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });
        if($(".our-brands .filter select[data-filter-group=country]").find("option").first().is(":selected")) {
            $.each(removeDuplicateCountries, function(index, value) {
                var option = $("<option value="+value+">"+value+"</option>");
                $(".our-brands .filter select[data-filter-group=country]").append(option);
            });
        }

        var removeDuplicatePartners = allPartners.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });
        
        var removeEmptySpacesPartners = removeDuplicatePartners.filter(function (el) {
            return el != "";
        });

        $.each(removeEmptySpacesPartners, function(index, value) {
            var optionText;
            if(value.indexOf("-")) {
                optionText = value.replace(/\-/g," ").capitalize();                    
            } else {
                optionText = value.capitalize();
            }
            var option = $("<option value="+value+">"+optionText+"</option>");
            $(".our-brands .filter select[data-filter-group=partner]").append(option);
        });

        if($(this).find("option").first().is(":selected")) {
            allCountries = [];
            allPartners = [];
            $(".our-brands .filter select[data-filter-group=category]").find("option").not(":first").remove();
            $(".our-brands .filter select[data-filter-group=sub-category]").find("option").not(":first").remove();
            $(".our-brands .filter select[data-filter-group=country]").find("option").not(":first").remove();
            $(".our-brands .filter select[data-filter-group=partner]").find("option").not(":first").remove();
            $.each(brandsList, function(index, value) {  
                var category = value.category;
                var text = value.text;
                var categoryOption = $("<option value="+category+">"+text+"</option>");
                $(".our-brands .filter select[data-filter-group=category]").append(categoryOption);
                $.each(value.subcategories, function(index, value) {  
                    var optionText;
                    if(value.indexOf("-")) {
                        optionText = value.replace(/\-/g," ").capitalize();                   
                    } else {
                        optionText = value.capitalize();
                    }
                    var option = $("<option value="+value+">"+optionText+"</option>");
                    $(".our-brands .filter select[data-filter-group=sub-category]").append(option);
                });
            });
        }
    });

    // Type
    $(".our-brands .filter select[data-filter-group=type]").change(function() {
        var type = $(this).find("option:selected").val();
        var products = [];
        var allCountries = [];
        var allPartners = [];
        $(".our-brands .filter select[data-filter-group=sub-category]").find("option").not(":first").remove();
    });

    // Country

    $(".our-brands .filter select[data-filter-group=country]").change(function() {
        var country = $(this).find("option:selected").val();
        var products = [];
        var categories = [];
        var subcategories = [];
        $(".our-brands .filter select[data-filter-group=category]").find("option").not(":first").remove();
        $(".our-brands .filter select[data-filter-group=sub-category]").find("option").not(":first").remove();

        $.each(brandsList, function(index, value) {  
            $.each(value.products, function(index, value) {
                products.push(value);
            });
        });

        var subProducts = products.filter(function(prod) {
            if(prod.countries.find(function(sub) {
                return sub === country;
            })) {
                return prod;
            }
        });

        $.each(subProducts, function(index, value) {
            categories.push(value.category);
            $.each(value.subcategories, function(index, value) {
               subcategories.push(value);
            });
        });

        var removeDuplicateCategories = categories.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        $.each(removeDuplicateCategories, function(index, value) {
            var optionText = value.capitalize();
            var option = $("<option value="+value+">"+optionText+"</option>");
            $(".our-brands .filter select[data-filter-group=category]").append(option);
        });

        var removeDuplicateSubCategories = subcategories.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        $.each(removeDuplicateSubCategories, function(index, value) {
            var optionText;
            if(value.indexOf("-")) {
                optionText = value.replace(/\-/g," ").capitalize();                   
            } else {
                optionText = value.capitalize();
            }
            var option = $("<option value="+value+">"+optionText+"</option>");
            $(".our-brands .filter select[data-filter-group=sub-category]").append(option);
        });
    });

    // Every select
    $(".our-brands .filter").each(function() {
        $(this).find("select").change(function() {
            if($(this).find("option").first().is(":selected")) {
                $(".our-brands .filter select[data-filter-group=type]").find("option").not(":first").remove();
                var own = $("<option value='own'>Own</option>");
                var distributed = $("<option value='distributed'>Distributed</option>");
                $(".our-brands .filter select[data-filter-group=type]").append(own,distributed);
            }
        });
    });

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
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